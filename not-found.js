import Link from 'next/link';
export default function NotFound() {
  return <main className="nf"><p className="label">Error 404</p><h1>This page wandered off down a rabbit hole.</h1><p>Last seen three links ago, reading something unrelated.</p><Link className="btn" href="/">Back to the surface</Link></main>;
}
