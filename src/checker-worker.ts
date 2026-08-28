type SandboxRequest = { code: string; needles: string[]; start: number; end: number };

self.onmessage = ({ data }: MessageEvent<SandboxRequest>) => {
  const code = data.code.toLowerCase().replace(/\s+/g, '');
  const pass = data.needles.some((needle) => code.includes(needle.toLowerCase().replace(/\s+/g, '')));
  const trace = Array.from({ length: 7 }, (_, i) => Number((data.start + (data.end - data.start) * (i / 6) ** 0.72).toFixed(3)));
  self.postMessage({ pass, code, trace });
};
