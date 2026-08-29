// @ts-nocheck -- the interpreter intentionally accepts one recursive runtime
// value union; browser behavior is covered by the fixture regression suite.
type Atom = number | string | boolean | null;
type Value = Atom | Value[] | Tensor | Model | Optimizer | ((...args: Value[]) => Value);
type Request = { code: string; drillId: string; starter: string; seed: number; start: number; end: number };

/* This is a closed, PyTorch-shaped expression runtime. It never evaluates
   JavaScript or Python: only the tokens and operations below can run. */
class Tensor {
  constructor(readonly value: number | number[] | number[][]) {}
  get shape() { return shape(this.value); }
  size() { return this.shape; }
  float() { return this; }
  mean(dim?: number) { return new Tensor(reduce(this.value, 'mean', dim)); }
  sum(dim?: number) { return new Tensor(reduce(this.value, 'sum', dim)); }
  std() { const xs = flat(this.value); const m = avg(xs); return new Tensor(Math.sqrt(xs.reduce((n, x) => n + (x - m) ** 2, 0) / (xs.length - 1))); }
  argmin() { const xs = flat(this.value); return new Tensor(xs.indexOf(Math.min(...xs))); }
}
class Model { evalMode = false; eval() { this.evalMode = true; return this; } }
class Optimizer { cleared = false; zero_grad() { this.cleared = true; return this; } }
const shape = (v: unknown): number[] => Array.isArray(v) ? [v.length, ...shape(v[0])] : [];
const flat = (v: number | number[] | number[][]): number[] => Array.isArray(v) ? v.flatMap((x) => flat(x as number | number[])) : [v];
const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const raw = (v: Value): number | number[] | number[][] => v instanceof Tensor ? v.value : v as number | number[] | number[][];
const scalar = (v: Value) => { const n = raw(v); if (typeof n !== 'number') throw Error('scalar required'); return n; };
const deep = <T>(v: T): T => JSON.parse(JSON.stringify(v));
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const close = (a: number, b: number, e = .0001) => Math.abs(a - b) <= e;
const map = (v: number | number[] | number[][], f: (n: number) => number): number | number[] | number[][] => Array.isArray(v) ? v.map((x) => map(x as number | number[], f)) : f(v);
const zip = (a: number | number[] | number[][], b: number | number[] | number[][], f: (x: number, y: number) => number): number | number[] | number[][] => {
  if (!Array.isArray(a) && !Array.isArray(b)) return f(a, b);
  if (!Array.isArray(a)) return (b as unknown[]).map((x) => zip(a, x as number | number[], f));
  if (!Array.isArray(b)) return a.map((x) => zip(x as number | number[], b, f));
  if (a.length === b.length) return a.map((x, i) => zip(x as number | number[], b[i] as number | number[], f));
  if (!Array.isArray(a[0]) && Array.isArray(b[0])) return (b as number[][]).map((x) => zip(a, x, f));
  if (Array.isArray(a[0]) && !Array.isArray(b[0])) return (a as number[][]).map((x) => zip(x, b, f));
  throw Error('shape mismatch');
};
const reduce = (v: number | number[] | number[][], op: 'sum'|'mean', dim?: number): number | number[] => {
  const calc = (xs: number[]) => op === 'sum' ? xs.reduce((a, b) => a + b, 0) : avg(xs);
  if (dim === undefined) return calc(flat(v));
  if (dim === 0 && Array.isArray(v) && Array.isArray(v[0])) return (v[0] as number[]).map((_, i) => calc((v as number[][]).map((row) => row[i])));
  if (dim === 1 && Array.isArray(v) && Array.isArray(v[0])) return (v as number[][]).map(calc);
  throw Error('dimension unsupported');
};
const matmul = (left: number | number[] | number[][], right: number | number[] | number[][]): number | number[] | number[][] => {
  const a = Array.isArray(left[0]) ? left as number[][] : [left as number[]];
  const b = Array.isArray(right[0]) ? right as number[][] : (right as number[]).map((x) => [x]);
  if (a[0].length !== b.length) throw Error('matrix mismatch');
  const out = a.map((row) => b[0].map((_, j) => row.reduce((n, x, i) => n + x * b[i][j], 0)));
  return !Array.isArray(left[0]) && !Array.isArray(right[0]) ? out[0][0] : !Array.isArray(right[0]) ? out.map((r) => r[0]) : out;
};

type Token = { t: 'n'|'s'|'id'|'op'|'p'|'e'; v: string };
function lex(s: string) { const out: Token[] = []; for (let i = 0; i < s.length;) { if (/\s/.test(s[i])) { i++; continue; } const r = s.slice(i); const n = r.match(/^(?:\d+\.?(?:\d*)?|\.\d+)/); const id = r.match(/^[A-Za-z_]\w*/); const str = r.match(/^(?:"([^"\\]|\\.)*"|'([^'\\]|\\.)*')/); const op = r.match(/^(?:\*\*|==|>=|<=|-=|@|[+\-*/&><=])/); if (n) { out.push({t:'n',v:n[0]}); i+=n[0].length; } else if (str) { out.push({t:'s',v:str[0].slice(1,-1)}); i+=str[0].length; } else if (id) { out.push({t:'id',v:id[0]}); i+=id[0].length; } else if (op) { out.push({t:'op',v:op[0]}); i+=op[0].length; } else if ('()[]{}.,:'.includes(s[i])) { out.push({t:'p',v:s[i++]}); } else throw Error('unsupported token'); } return [...out,{t:'e' as const,v:''}]; }
class Parse {
  i = 0; constructor(readonly tokens: Token[], readonly env: Record<string, Value>) {}
  at(v?: string) { const t = this.tokens[this.i++]; if (v && t.v !== v) throw Error('syntax'); return t; }
  is(v: string) { return this.tokens[this.i].v === v; }
  run() { const v = this.expr(); if (!this.is('')) throw Error('trailing code'); return v; }
  expr(min = 0): Value { let left = this.primary(); const p: Record<string, number> = {'==':1,'>=':1,'>':1,'<':1,'&':2,'+':3,'-':3,'@':4,'*':5,'/':5,'**':6}; while ((p[this.tokens[this.i].v] ?? -1) >= min) { const op = this.at().v; left = operate(op, left, this.expr(p[op] + (op === '**' ? 0 : 1))); } return left; }
  primary(): Value { const token = this.at(); let value: Value;
    if (token.t === 'n') value = Number(token.v); else if (token.t === 's') value = token.v;
    else if (token.v === '-') value = operate('*', -1, this.primary());
    else if (token.v === '(') { value = this.expr(); if (this.is(',')) { const values = [value]; while (this.is(',')) { this.at(','); if (!this.is(')')) values.push(this.expr()); } value = values; } this.at(')'); }
    else if (token.v === '[') { const values: Value[] = []; while (!this.is(']')) { values.push(this.expr()); if (!this.is(',')) break; this.at(','); } this.at(']'); value = values; }
    else if (token.v === '{') { const obj: Record<string, Value> = {}; while (!this.is('}')) { const key = this.at(); this.at(':'); obj[key.v] = this.expr(); if (!this.is(',')) break; this.at(','); } this.at('}'); value = obj as Value; }
    else if (token.t === 'id') { if (token.v === 'True') value = true; else if (token.v === 'False') value = false; else if (token.v === 'None') value = null; else { value = this.env[token.v]; if (value === undefined) throw Error('unknown name'); } } else throw Error('expression unsupported');
    while (true) { if (this.is('.')) { this.at('.'); value = prop(value, this.at().v); } else if (this.is('(')) { this.at('('); const args: Value[] = []; const named: Record<string, Value> = {}; while (!this.is(')')) { if (this.tokens[this.i].t === 'id' && this.tokens[this.i+1].v === '=') { const name = this.at().v; this.at('='); named[name] = this.expr(); } else args.push(this.expr()); if (!this.is(',')) break; this.at(','); } this.at(')'); if (typeof value !== 'function') throw Error('not a function'); value = value(...args, named as Value); } else if (this.is('[')) { this.at('['); const start = this.is(':') ? undefined : scalar(this.expr()); if (this.is(':')) { this.at(':'); const end = this.is(']') ? undefined : scalar(this.expr()); this.at(']'); value = (raw(value) as unknown[]).slice(start, end) as Value; } else { this.at(']'); value = (raw(value) as unknown[])[start] as Value; } } else break; }
    return value;
  }
}
function operate(op: string, left: Value, right: Value): Value { const a = raw(left), b = raw(right); if (op === '@') return new Tensor(matmul(a,b)); if (op === '*' && Array.isArray(a) && typeof b === 'number' && Number.isInteger(b)) return Array.from({ length: b }, () => deep(a)).flat() as Value; const fn: Record<string,(x:number,y:number)=>number> = {'+':(x,y)=>x+y,'-':(x,y)=>x-y,'*':(x,y)=>x*y,'/':(x,y)=>x/y,'**':(x,y)=>x**y,'==':(x,y)=>Number(x===y),'>=':(x,y)=>Number(x>=y),'>':(x,y)=>Number(x>y),'<':(x,y)=>Number(x<y),'&':(x,y)=>Number(Boolean(x)&&Boolean(y))}; const v = zip(a,b,fn[op]); return left instanceof Tensor || right instanceof Tensor ? new Tensor(v) : v as Value; }
function prop(v: Value, name: string): Value { if (v instanceof Tensor) { const map: Record<string, Value> = {shape:v.shape as Value,size:v.size.bind(v),float:v.float.bind(v),mean:v.mean.bind(v),sum:v.sum.bind(v),std:v.std.bind(v),argmin:v.argmin.bind(v)}; if (name in map) return map[name]; } if (v instanceof Model && name === 'eval') return v.eval.bind(v); if (v instanceof Optimizer && name === 'zero_grad') return v.zero_grad.bind(v); if (v && typeof v === 'object' && name in (v as object)) return (v as Record<string, Value>)[name]; throw Error('property unsupported'); }
function runtime(seed: number) { let state = seed >>> 0; const random = () => ((state = (1664525 * state + 1013904223) >>> 0) / 2 ** 32); const functional: Record<string, Value> = {
  one_hot: (v, options) => { const classes = scalar((options as Record<string, Value>).num_classes); return new Tensor(flat(raw(v)).map((n) => Array.from({length:classes},(_,i)=>Number(i===n)))); },
  binary_cross_entropy_with_logits: (logits, y) => { const xs = flat(raw(logits)), ys = flat(raw(y)); return new Tensor(xs.reduce((sum,x,i)=>sum + Math.max(x,0) - x*ys[i] + Math.log1p(Math.exp(-Math.abs(x))),0)/xs.length); }
}; const torch: Record<string, Value> = {
  tensor:(v)=>new Tensor(deep(raw(v))), arange:(n)=>new Tensor(Array.from({length:scalar(n)},(_,i)=>i)), ones:(d)=>{ const [r,c] = raw(d) as number[]; return new Tensor(Array.from({length:r},()=>Array(c).fill(1))); }, manual_seed:(n)=>{state=scalar(n)>>>0;return null;}, randperm:(n)=>{const xs=Array.from({length:scalar(n)},(_,i)=>i);for(let i=xs.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[xs[i],xs[j]]=[xs[j],xs[i]];}return new Tensor(xs);}, rand:(n)=>new Tensor(Array.from({length:scalar(n)},random)), sigmoid:(v)=>new Tensor(map(raw(v),x=>1/(1+Math.exp(-x)))), relu:(v)=>new Tensor(map(raw(v),x=>Math.max(0,x))), nn:{functional,Sequential:()=>new Model(),Dropout:()=>new Model()}, optim:{SGD:()=>new Optimizer()}
}; return {torch:torch as Value,F:functional as Value,tuple:(v)=>raw(v) as Value,float:(v)=>v==='inf'?Infinity:scalar(v),range:(n)=>Array.from({length:scalar(n)},(_,i)=>i) as Value} as Record<string,Value>; }
const lines = (source: string) => source.split('\n').map((line) => line.replace(/#.*/, '').trim()).filter(Boolean);
function fixture(starter: string, seed: number) { const env = runtime(seed); for (const line of lines(starter)) { if (line === 'import torch') continue; const assignment = line.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/); if (assignment) env[assignment[1]] = new Parse(lex(assignment[2]),env).run(); else new Parse(lex(line),env).run(); } return env; }
function check(id: string, value: Value, env: Record<string, Value>) { const v = raw(value); const mean = (x: Value) => scalar((x as Tensor).mean()); const std = (x: Value) => scalar((x as Tensor).std());
  switch(id) { case 'tensor-shapes': return same(v,[8,3]); case 'broadcast-bias': return same(v,[[1.25,-.5],[1.25,-.5],[1.25,-.5],[1.25,-.5]]); case 'seeded-shuffle': return Array.isArray(v)&&same([...v].sort((a,b)=>(a as number)-(b as number)),Array.from({length:12},(_,i)=>i)); case 'split-indices': return Array.isArray(v)&&v.length===16&&same(v,(raw(env.perm) as unknown[]).slice(0,16)); case 'standardize': return value instanceof Tensor&&close(mean(value),0)&&close(std(value),1); case 'one-hot': return same(v,[[1,0,0],[0,0,1],[0,1,0],[1,0,0],[0,0,1],[0,1,0]]); case 'linear-forward': return same(v,[.4,.4,.4,.4,.4]); case 'mse-loss': return typeof v==='number'&&close(v,.0625); case 'gradient-step': return typeof v==='number'&&close(v,-.06); case 'logit': return same(v,[1,1,1,1]); case 'sigmoid': return Array.isArray(v)&&(v as number[]).every(n=>n>0&&n<1)&&close((v as number[])[2],.5); case 'threshold': return same(v,[0,1,1,0,1,0,1,0]); case 'bce': return typeof v==='number'&&close(v,.255,.01); case 'accuracy': return typeof v==='number'&&close(v,.8); case 'relu': return same(v,[0,0,.4,1.2,0,0]); case 'two-layer': return same(v,[[4.5],[4.5],[4.5]]); case 'dropout-mode': return value instanceof Model&&value.evalMode; case 'batch-loss': return typeof v==='number'&&close(v,.375); case 'zero-grad': return value instanceof Optimizer&&value.cleared; case 'early-stop': return typeof v==='number'&&close(v,.38); case 'confusion': return typeof v==='number'&&close(v,2); case 'precision': return typeof v==='number'&&close(v,.8); case 'recall': return typeof v==='number'&&close(v,2/3); case 'overfit-gap': return typeof v==='number'&&close(v,.31); case 'knn-distance': return typeof v==='number'&&close(v,2); case 'kmeans-centroid': return same(v,[2.5,2.5]); case 'pca-center': return value instanceof Tensor&&flat(raw(value.mean(0))).every(n=>close(n,0)); case 'replay-seed': return Array.isArray(v)&&v.length===4; case 'save-config': return Boolean(v&&typeof v==='object'&&['seed','lr','epochs'].every(k=>k in (v as object))); default:return false; }
}
self.onmessage = ({data}: MessageEvent<Request>) => { let pass=false; let reason = ''; try { const given=lines(data.code), base=lines(data.starter); if (given.length!==base.length+1 || !base.every((line,i)=>line===given[i])) throw Error('fixture changed'); const env=fixture(data.starter,data.seed); const answer=given.at(-1)!; if (/^(?:for\b|while\b|import\b|from\b|raise\b|with\b)/.test(answer)) throw Error('statement unsupported'); const update=answer.match(/^([A-Za-z_]\w*)\s*-=(.+)$/); const value=update ? (env[update[1]]=operate('-',env[update[1]],new Parse(lex(update[2]),env).run())) : new Parse(lex(answer),env).run(); pass=check(data.drillId,value,env); } catch (error) { pass=false; reason = error instanceof Error ? error.message : String(error); } const trace=Array.from({length:7},(_,i)=>Number((data.start+(data.end-data.start)*(i/6)**.72).toFixed(3))); self.postMessage({pass,trace,reason}); };
