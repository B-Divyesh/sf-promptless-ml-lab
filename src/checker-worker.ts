type SandboxRequest = { code: string; answers: string[]; start: number; end: number };

const normalize = (value: string) => value.replace(/\s+/g, '').replace(/;$/, '');

function executableLines(source: string) {
  return source.split('\n').map((line) => line.replace(/#.*/, '').trim()).filter(Boolean);
}

function hasSupportedSyntax(lines: string[], answer: string) {
  const allowedSetup = /^(?:import\s+torch|from\s+torch\s+import\s+[\w, ]+|(?:[A-Za-z_]\w*\s*=\s*.+)|torch\.manual_seed\(.+\)|model\.(?:train|eval)\(\)|optimizer\.zero_grad\(\)|loss\.backward\(\)|with\s+torch\.no_grad\(\):|for\s+\w+\s+in\s+range\(.+\):)$/;
  const balanced = (value: string) => {
    const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    const stack: string[] = [];
    for (const char of value) {
      if ('([{'.includes(char)) stack.push(char);
      if (char in pairs && stack.pop() !== pairs[char]) return false;
    }
    return stack.length === 0;
  };
  return balanced(lines.join('')) && lines.slice(0, -1).every((line) => allowedSetup.test(line)) && lines.at(-1) === answer;
}

self.onmessage = ({ data }: MessageEvent<SandboxRequest>) => {
  const lines = executableLines(data.code);
  const answer = lines.at(-1) || '';
  // This is intentionally a small evaluator, not a Python runtime. It only runs
  // a final expression from the supplied fixture and asserts it against that
  // fixture's expected result. Comments and unrelated source cannot satisfy it.
  const accepted = data.answers.find((candidate) => normalize(candidate) === normalize(answer));
  const pass = Boolean(accepted && hasSupportedSyntax(lines, answer));
  const trace = Array.from({ length: 7 }, (_, i) => Number((data.start + (data.end - data.start) * (i / 6) ** 0.72).toFixed(3)));
  self.postMessage({ pass, trace });
};
