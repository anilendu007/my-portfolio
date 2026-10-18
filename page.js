import { links, projects, journey, marquee } from '../data/content';
import { Hero, SoundToggle, Facts, Y2038, Terminal, Collab, Fx, EggDot } from '../components/Client';

const Head = ({ n, children, id }) => <header className="head rv" id={id}><span className="label">{n}</span><h2>{children}</h2></header>;
// Each section tints the dark page differently; colours blend as you scroll, with stars always visible.
const T = (bg, acc) => ({ 'data-bg': bg, 'data-ink': '#ecebe6', 'data-acc': acc });
const C = {
  void: T('#05060a', '#d4ff3a'), about: T('#0a1105', '#d4ff3a'), facts: T('#04111a', '#6fd3ff'), alert: T('#150607', '#ff5a3c'),
  work: T('#08080b', '#d4ff3a'), term: T('#120c22', '#b9a2ff'), log: T('#1a0b07', '#ff7a59'), chan: T('#06122e', '#d4ff3a'), tx: T('#05050a', '#ff7a59'),
};

export default function Home() {
  const loop = [...marquee, ...marquee];
  return (<>
    <noscript><style>{'.hero{--p:1!important;height:auto!important}.rv{opacity:1!important;transform:none!important}'}</style></noscript>
    <a className="skip" href="#about">Skip intro</a>
    <header className="nav"><a href="#top" className="logo">riya<span>.</span></a>
      <nav aria-label="Primary"><a href="#about">About</a><a href="#work">Work</a><a href="#journey">Journey</a><a href="#contact">Contact</a></nav><SoundToggle /></header>
    <main>
      <div {...C.void}><Hero /></div>
      <div className="marq" aria-hidden><div>{loop.map((m, i) => <span key={i}>{m} <b>✦</b> </span>)}</div></div>

      <section id="about" className="sec split" {...C.about}>
        <Head n="01 / Hello">Hi, I&apos;m Riya.</Head>
        <div className="prose rv">
          <p>I study Electronics &amp; Communication Engineering at IGDTUW, which means my days are spent negotiating with electrons and my nights are spent wondering why I&apos;m reading about something else entirely.</p>
          <p>I start with one question. Three tabs later I&apos;m somewhere new, usually learning something I wasn&apos;t looking for. I&apos;ve decided to call this a research method.</p>
          <p>I&apos;m in my first year, so I won&apos;t pretend to have a ten-year plan. I&apos;m collecting problems, building small things, and writing down every mistake (there&apos;s a whole repo for it).</p>
        </div>
      </section>

      <section className="sec" {...C.facts}><Head n="02 / Facts, not a résumé">Flip a few cards</Head><div className="rv"><Facts /></div></section>

      <section className="sec split" {...C.alert}>
        <Head n="03 / Fun fact">The year 2038 has a bug.</Head>
        <div className="rv"><p className="prose p">On 19 January 2038 at 03:14:07 UTC, systems that keep time as a signed 32-bit number run out of room and wrap around to 13 December 1901. I intend to be in the room when it happens, holding a patch and probably too many tabs. Meanwhile, here&apos;s the countdown. Go ahead and break it.</p><Y2038 /></div>
      </section>

      <section id="work" className="sec" {...C.work}><Head n="04 / Work">Things I&apos;ve built</Head>
        <ul className="rows">{projects.map(p => (
          <li key={p.n} className="rv"><a href={p.href} target="_blank" rel="noopener noreferrer" data-cursor="Open">
            <span className="n">{p.n}</span><span className="t"><h3>{p.name}</h3><p>{p.desc}</p></span>
            <span className="tags">{p.tags.map(t => <i key={t}>{t}</i>)}</span><span className="go" aria-hidden>↗</span></a></li>))}</ul>
        <p className="note rv">All public on <a href={links.github}>GitHub</a>. The rest is still cooking.</p>
      </section>

      <section className="sec split" {...C.term}><Head n="05 / Terminal">Ask my terminal.</Head>
        <div className="rv"><p className="prose p">Because every engineer&apos;s website needs a command line. Type something, or tap a command.</p><Terminal /></div></section>

      <section id="journey" className="sec" {...C.log}><Head n="06 / Journey">So far</Head>
        <ol className="journey">{journey.map(j => <li className="rv" key={j.what}><span className="label">{j.when}</span><b>{j.what}</b><em>{j.where}</em></li>)}</ol></section>

      <section className="sec collab rv" {...C.chan}><Collab /><div><span className="label">07 / Collab</span><h2>A project with you…</h2><p className="lede">Let&apos;s work together! Wanna collaborate with me? Hit me up on any of my socials or drop an email. Bonus points if the idea is slightly too ambitious.</p></div></section>

      <section id="contact" className="sec contact" {...C.tx}><Head n="08 / Contact">Found something interesting? Tell me about it.</Head>
        <a className="mail rv" href={`mailto:${links.email}`} data-cursor="Write">{links.email}</a>
        <p className="soc rv"><a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></p>
      </section>
    </main>
    <footer><span>© {new Date().getFullYear()} Riya Tiwari. Built with curiosity and one suspiciously long search history.</span><span>psst: type &ldquo;tabs&rdquo; <EggDot /></span></footer>
    <Fx />
  </>);
}
