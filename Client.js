'use client';
import { useEffect, useRef, useState } from 'react';
import { sfx, setOn, loadPref, isOn } from '../lib/sfx';
import { facts, projects, links } from '../data/content';

/* Scroll-driven intro: a scan line reveals the name as you scroll. */
export function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last = -1, done = false;
    const upd = () => {
      const max = Math.max(1, el.offsetHeight - innerHeight);
      const p = reduce ? 1 : Math.min(1, Math.max(0, scrollY / max));
      el.style.setProperty('--p', p);
      const s = Math.floor(p * 11);
      if (s !== last) { if (last >= 0 && !reduce) sfx.hover(); last = s; }
      if (p > .98 && !done) { done = true; el.classList.add('done'); if (!reduce) sfx.win(); }
      else if (p < .9 && done) { done = false; el.classList.remove('done'); }
    };
    upd(); addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd);
    return () => { removeEventListener('scroll', upd); removeEventListener('resize', upd); };
  }, []);
  return (
    <section className="hero" ref={ref} style={{ '--p': 0 }} id="top">
      <div className="pin">
        <p className="hint label">ECE @ IGDTUW · Delhi · scroll to reveal ↓</p>
        <div className="nmwrap"><h1 className="name">Riya Tiwari</h1><i className="scan" aria-hidden /></div>
        <div className="intro">
          <p>Building small things in C++, getting lost in big questions, and treating every bug as a very rude teacher.</p>
          <div className="actions"><a className="btn" href="#work">See what I&apos;ve built</a><a className="btn ghost" href="#contact">Say hi</a></div>
        </div>
      </div>
    </section>
  );
}

export function SoundToggle() {
  const [on, set] = useState(true);
  useEffect(() => set(loadPref()), []);
  return <button className="snd" aria-pressed={on} onClick={() => { const v = !isOn(); setOn(v); set(v); if (v) sfx.win(); }}>sound {on ? 'on' : 'off'}</button>;
}

export function Facts() {
  const [f, setF] = useState({});
  return <div className="facts">{facts.map((x, i) => (
    <button key={x.front} className="flip" aria-pressed={!!f[i]} onClick={() => { setF({ ...f, [i]: !f[i] }); sfx.flip(); }}>
      <span className="face front"><span className="label">0{i + 1}</span><b>{x.front}</b><em>tap to flip</em></span>
      <span className="face back">{x.back}</span>
    </button>))}</div>;
}

const MAX = 2147483647;
export function Y2038() {
  const [now, setNow] = useState(null), [sim, setSim] = useState(0), t = useRef();
  useEffect(() => { const u = () => setNow(Math.floor(Date.now() / 1000)); u(); const i = setInterval(u, 1000); return () => { clearInterval(i); clearTimeout(t.current); }; }, []);
  const val = sim === 0 ? now : sim === 1 ? MAX : -MAX - 1;
  const bits = val === null ? '0'.repeat(32) : (val >>> 0).toString(2).padStart(32, '0');
  const date = val === null ? '…' : new Date(val * 1000).toUTCString().replace('GMT', 'UTC');
  const left = now === null ? null : MAX - now;
  const brk = () => { setSim(1); sfx.click(); t.current = setTimeout(() => { setSim(2); sfx.glitch(); }, 1500); };
  return (
    <div className={`y38 ${sim === 2 ? 'glitch' : ''}`}>
      <p className="big">{left === null ? '…' : left.toLocaleString('en-IN')}<small> seconds until 32-bit time runs out</small></p>
      <div className="bits" aria-hidden>{bits.split('').map((b, i) => <i key={i} className={(b === '1' ? 'on ' : '') + (i === 0 ? 'sign' : '')} />)}</div>
      <p className="mono" aria-live="polite">{val === null ? '' : `unix = ${val.toLocaleString('en-IN')}`}<br />{date}</p>
      <div className="actions">
        <button className="btn" disabled={sim === 1} onClick={brk}>{sim === 0 ? 'Break the clock' : sim === 1 ? 'Adding one second…' : 'Welcome to 1901'}</button>
        {sim !== 0 && <button className="btn ghost" onClick={() => { clearTimeout(t.current); setSim(0); sfx.click(); }}>Reset reality</button>}
      </div>
    </div>
  );
}

export function Collab() {
  const eye = useRef(null), box = useRef(null);
  useEffect(() => {
    const m = e => {
      const r = box.current.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * .53);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
      eye.current.style.transform = `translate(${dx / d * 15 * k}px,${dy / d * 9 * k}px)`;
    };
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m);
  }, []);
  const stars = [[30, 40], [250, 30], [60, 230], [260, 200], [220, 90], [40, 130], [270, 140], [90, 270]];
  return (
    <svg ref={box} className="keyhole" viewBox="0 0 300 300" role="img" aria-label="An eye peeking through a keyhole, following your cursor">
      <rect width="300" height="300" fill="#1f3f95" />
      {stars.map(([x, y], i) => <circle key={i} className="star" style={{ animationDelay: i * .4 + 's' }} cx={x} cy={y} r="2.2" fill="#fff" />)}
      <circle cx="150" cy="105" r="58" fill="#eeb07e" stroke="#000" strokeWidth="3" />
      <path d="M118 150h64l24 125H94z" fill="#eeb07e" stroke="#000" strokeWidth="3" />
      <ellipse cx="150" cy="168" rx="54" ry="34" fill="#fff" stroke="#000" strokeWidth="3" />
      <g ref={eye} className="iris"><circle cx="150" cy="168" r="27" fill="#7a9a1e" stroke="#000" strokeWidth="3" /><circle cx="150" cy="168" r="12" /><circle cx="160" cy="157" r="5" fill="#fff" /></g>
    </svg>
  );
}

/* Global effects: scroll reveals, sound on UI, custom cursor, console + keyboard easter egg. */
export function Fx() {
  const [toast, setToast] = useState('');
  useEffect(() => {
    document.documentElement.classList.add('js');
    loadPref();
    console.log('%cHello, curious human.', 'font:700 16px monospace;color:#d4ff3a');
    console.log('You opened the console. This is not a bug, it is an undocumented side quest.');
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .15 });
    document.querySelectorAll('.rv').forEach(n => io.observe(n));

    const root = document.documentElement;
    const bo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const d = e.target.dataset; root.style.setProperty('--bg', d.bg); root.style.setProperty('--ink', d.ink); root.style.setProperty('--acc', d.acc); } }), { rootMargin: '-50% 0px -50% 0px' });
    document.querySelectorAll('[data-bg]').forEach(n => bo.observe(n));

    const cv = document.querySelector('.stars'), g = cv.getContext('2d'), calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroEl = document.querySelector('.hero'), rs = root.style, cl = x => Math.min(1, Math.max(0, x));
    let W, H, v = 0, ly = scrollY, sraf, sS = 0, sQ = 0, nextM = 1500, ms = [];
    const S = Array.from({ length: 180 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * .8 + .2 }));
    const fit = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    const tick = t => {
      const sy = scrollY; v += (Math.abs(sy - ly) - v) * .12; ly = sy;
      const hh = Math.max(1, heroEl.offsetHeight - H), after = sy - hh, tot = Math.max(1, document.documentElement.scrollHeight - H - hh);
      const ts = cl(after / (H * .7)), tq = cl(after / tot);
      if (calm) { sS = ts; sQ = tq; } else { sS += (ts - sS) * .12; sQ += (tq - sQ) * .1; }
      rs.setProperty('--hp', cl(sy / hh)); rs.setProperty('--s', sS); rs.setProperty('--q', sQ);
      g.clearRect(0, 0, W, H); g.strokeStyle = '#cfe6ff';
      for (const s of S) { const y = ((((s.y - sy * s.z * .0003) % 1) + 1) % 1) * H; g.globalAlpha = .2 + s.z * .6; g.lineWidth = s.z * 1.6; g.beginPath(); g.moveTo(s.x * W, y); g.lineTo(s.x * W, y + 1 + v * s.z * .5); g.stroke(); }
      if (!calm) {
        if (t > nextM || (v > 40 && Math.random() < .03)) { ms.push({ x: W * (.25 + Math.random() * .75), y: Math.random() * H * .4, vx: -(9 + Math.random() * 6), vy: 5 + Math.random() * 4, l: 1 }); nextM = t + 2500 + Math.random() * 4500; }
        ms = ms.filter(m => m.l > 0);
        for (const m of ms) { const gr = g.createLinearGradient(m.x, m.y, m.x - m.vx * 7, m.y - m.vy * 7); gr.addColorStop(0, '#fff'); gr.addColorStop(1, 'rgba(255,255,255,0)');
          g.globalAlpha = m.l; g.strokeStyle = gr; g.lineWidth = 1.8; g.beginPath(); g.moveTo(m.x, m.y); g.lineTo(m.x - m.vx * 7, m.y - m.vy * 7); g.stroke(); m.x += m.vx; m.y += m.vy; m.l -= .014; }
        sraf = requestAnimationFrame(tick);
      }
    };
    fit(); addEventListener('resize', fit); tick(0);

    let lastH = 0;
    const over = e => { const t = e.target.closest?.('a,button'); if (t && t !== lastH) { lastH = t; sfx.hover(); } else if (!t) lastH = 0; };
    const click = e => { if (e.target.closest?.('a,button:not(.flip):not(.snd)')) sfx.click(); };
    addEventListener('pointerover', over); addEventListener('click', click);

    let buf = '';
    const key = e => {
      if (e.target.closest?.('input,textarea,select,[contenteditable]') || e.metaKey || e.ctrlKey || e.altKey) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf === 'tabs') { sfx.glitch(); setToast('No critical errors detected. Existential questions remain unresolved.'); }
    };
    addEventListener('keydown', key);
    const open = () => { sfx.win(); setToast('You found a feature I almost forgot I added.'); };
    addEventListener('egg', open);

    // cursor
    let raf, x = 0, y = 0, cx = 0, cy = 0; const c = document.querySelector('.cursor');
    const fine = matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mv = e => { x = e.clientX; y = e.clientY; const t = e.target.closest?.('a,button,[data-cursor]'); c.classList.toggle('big', !!t); c.dataset.label = t?.dataset.cursor || ''; };
    const loop = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.transform = `translate(${cx}px,${cy}px)`; raf = requestAnimationFrame(loop); };
    if (fine) { document.documentElement.classList.add('fine'); addEventListener('pointermove', mv); loop(); }
    return () => { io.disconnect(); bo.disconnect(); cancelAnimationFrame(sraf); removeEventListener('resize', fit); cancelAnimationFrame(raf); removeEventListener('pointerover', over); removeEventListener('click', click); removeEventListener('keydown', key); removeEventListener('egg', open); removeEventListener('pointermove', mv); };
  }, []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 4200); return () => clearTimeout(t); }, [toast]);
  return <><div className="bgimg" aria-hidden><img src="/img/void.jpg" alt="" /></div><canvas className="stars" aria-hidden /><div className="cursor" aria-hidden /><div className="toast" role="status">{toast && <span>{toast} <button onClick={() => setToast('')} aria-label="Dismiss">×</button></span>}</div></>;
}
export const EggDot = () => <button className="dot" aria-label="A small decorative dot. Press if you dare." onClick={() => dispatchEvent(new Event('egg'))}>●</button>;

const CMD = {
  help: () => ['commands: whoami, ls, projects, skills, 2038, contact, date, sudo hire riya, clear', 'unlisted: a few. Good luck.'],
  whoami: () => ['riya: ECE @ IGDTUW, Delhi. First year. Dangerous with a search bar.'],
  ls: () => ['about/  projects/  journey/  rabbit-holes.txt (do not open)'],
  projects: () => projects.map(p => `${p.n}  ${p.name}`),
  skills: () => ['HTML, CSS, C, C++, and a growing list of things I googled at 2 AM'],
  '2038': () => ['03:14:07 UTC, 19 Jan 2038. 32-bit clocks wrap to 1901. See the lab above.'],
  contact: () => [links.email, links.linkedin, links.github],
  date: () => [new Date().toUTCString()],
  'sudo hire riya': () => ['[sudo] password for recruiter: ********', 'Access granted.', `Send the offer to ${links.email}. She reads email, tabs permitting.`],
  'rm -rf /': () => ['Nice try. Everything here is backed up by curiosity.'],
  exit: () => ['There is no exit, only more tabs.'],
  coffee: () => ['Error 418: I am a teapot.'],
  hello: () => ['Hello, human. Try "help".'],
};
export function Terminal() {
  const [log, setLog] = useState([{ c: null, o: ['booting riya.sh ... ok', 'Type "help", or tap a command below.'] }]), [v, setV] = useState(''), box = useRef(null);
  useEffect(() => { box.current.scrollTop = box.current.scrollHeight; }, [log]);
  const run = raw => {
    const c = raw.trim().toLowerCase().replace(/\s+/g, ' '); if (!c) return;
    if (c === 'clear') return setLog([]);
    sfx.click(); const f = CMD[c];
    setLog(l => [...l, { c: raw, o: f ? f() : [`command not found: ${c}. Try "help".`] }]);
  };
  return (<>
    <div className="term">
      <div className="tbox" ref={box} aria-live="polite">{log.map((e, i) => <div key={i}>{e.c !== null && <p className="cmd">$ {e.c}</p>}{e.o.map((l, k) => <p key={k}>{l}</p>)}</div>)}</div>
      <form onSubmit={e => { e.preventDefault(); run(v); setV(''); }}><span>riya@igdtuw:~$</span><input value={v} onChange={e => setV(e.target.value)} aria-label="Terminal command" autoComplete="off" autoCapitalize="off" spellCheck="false" /></form>
    </div>
    <div className="chips">{['help', 'whoami', 'projects', 'sudo hire riya'].map(c => <button key={c} onClick={() => run(c)}>{c}</button>)}</div>
  </>);
}
