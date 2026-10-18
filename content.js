export const links = {
  github: 'https://github.com/anilendu007',
  linkedin: 'https://www.linkedin.com/in/riya-tiwariab2b20409',
  email: 'anilendu007@gmail.com',
};
export const marquee = ['HTML', 'CSS', 'C', 'C++', 'Circuits', 'Questions', 'Unfinished tabs', 'Edge cases'];

// The fronts are prompts; the backs are jokes + one real line. Swap in whatever you like.
export const facts = [
  { front: 'Superpower', back: 'Turning one quick search into a full research expedition.' },
  { front: 'Unusual interest', back: 'Collecting questions faster than I collect answers.' },
  { front: 'Harmless habit', back: 'Opening "just one more" tab. It has never been just one.' },
  { front: 'Currently', back: 'Teaching sand to think. (First-year ECE, it\'s going well.)' },
  { front: 'Weakness', back: 'A genuinely good edge case. I will chase it for hours.' },
  { front: 'Debugging style', back: 'Ask why, break it again, write down what happened.' },
];

// Public repos only, descriptions paraphrased from GitHub.
const gh = 'https://github.com/anilendu007/';
export const projects = [
  { n: '01', name: 'Black-Scholes Options Pricing Library', desc: 'A C++20 options pricing engine: closed-form Black-Scholes formulas, multi-threaded Greeks, and parallelised Monte Carlo simulation.', tags: ['C++20', 'Finance', 'Multithreading'], href: gh + 'Black-Scholes-Options-Pricing-Library' },
  { n: '02', name: 'Kelly Criterion Simulation', desc: 'Monte Carlo experiments in C++ and Python that pit stochastic paths against log-utility optimisation to see what the Kelly formula really does.', tags: ['C++', 'Python', 'Monte Carlo'], href: gh + 'Kelly-Criterion-Simulation' },
  { n: '03', name: 'Matrix Transformation Circuit Solver', desc: 'A circuit solver written from scratch: multi-loop networks become matrices, and a hand-built Gaussian elimination finds the unknown currents.', tags: ['C++', 'Circuits', 'Linear algebra'], href: gh + 'Matrix-Transformation-Circuit-Solver' },
  { n: '04', name: 'LeetCode Solves', desc: 'A running record of mathematical, combinatorial and low-level algorithm problems, and how I got stuck on them.', tags: ['C++', 'DSA'], href: gh + 'LeetCode-Solves' },
  { n: '05', name: 'lesson-learned', desc: 'My personal log of technical hurdles, bugs and performance fixes. A repo for mistakes, so I only make new ones.', tags: ['Notes', 'Debugging'], href: gh + 'lesson-learned' },
];

export const journey = [
  { when: 'Aug 2026', what: 'B.Tech, Electronics & Communication Engineering', where: 'IGDTUW, Delhi' },
  { when: 'Sep 2026', what: 'Research Team Member, 2026–27 cohort', where: 'Minerva' },
  { when: 'Sep 2026', what: 'Selected as a Super<30> mentee: top 60 of 400+ students', where: 'Super30' },
  { when: 'Earlier', what: 'Honoured at the IIT Bhubaneswar Ideathon', where: 'IIT Bhubaneswar' },
];
