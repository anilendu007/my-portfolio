// Tiny WebAudio synth: no audio files needed.
let ctx, on = true;
export const isOn = () => on;
export const setOn = v => { on = v; try { localStorage.setItem('sfx', v ? '1' : '0'); } catch {} };
export const loadPref = () => { try { on = localStorage.getItem('sfx') !== '0'; } catch {} return on; };
export function tone(f = 440, d = .08, type = 'sine', v = .05, slide = 0, delay = 0) {
  if (!on || typeof window === 'undefined') return;
  try {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + delay;
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + d + .03);
  } catch {}
}
export const sfx = {
  hover: () => tone(1100, .035, 'triangle', .015),
  click: () => { tone(520, .07, 'square', .03, 260); },
  push: () => tone(95, .11, 'sine', .14, -45),
  flip: () => { tone(300, .06, 'triangle', .05, 500); tone(700, .08, 'triangle', .04, 300, .05); },
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .28, 'triangle', .06, 0, i * .09)),
  glitch: () => { tone(220, .45, 'sawtooth', .05, -170); tone(60, .5, 'square', .05, 40, .05); },
};

