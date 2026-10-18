import { Space_Grotesk, Fraunces, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.scss';
const sans = Space_Grotesk({ subsets: ['latin'], variable: '--f-sans' });
const serif = Fraunces({ subsets: ['latin'], variable: '--f-serif', style: ['normal', 'italic'], axes: ['opsz'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--f-mono' });
export const metadata = {
  title: 'Riya Tiwari | ECE student pushing a very large question mark',
  description: 'First-year ECE student at IGDTUW. C++, circuits, simulations and an unreasonable number of open tabs.',
  openGraph: { title: 'Riya Tiwari', description: 'ECE @ IGDTUW. Curious, slightly chaotic, building things.', type: 'website' },
};
export const viewport = { themeColor: '#0a0a0c' };
export default function Layout({ children }) {
  return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body>{children}</body></html>;
}
