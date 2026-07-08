import { Mail, Github, Linkedin, Send, GraduationCap, Rss, MapPin } from "lucide-react";
import { profile, links, openToList } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

const socials = [
  { href: links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: links.github, label: "GitHub", icon: Github },
  { href: links.researchgate, label: "ResearchGate", icon: GraduationCap },
  { href: links.telegram, label: "Telegram", icon: Send },
  { href: links.blog, label: "Blog", icon: Rss },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading-x"
      className="relative overflow-hidden section-pad"
    >
      <div
        className="ambient-blob pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-3xl [animation-duration:18s]"
        style={{ background: "radial-gradient(ellipse, rgba(232,170,76,0.09), transparent 70%)" }}
        aria-hidden
      />

      <div className="wrap relative text-center">
        <Reveal className="mx-auto max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-signal">
            {"// 07 — REACH ME"}
          </p>
          <h2
            id="contact-heading-x"
            className="font-display mt-5 text-4xl font-medium leading-[1.05] tracking-tight text-paper sm:text-5xl md:text-6xl"
          >
            Let&apos;s build something
            <br />
            meaningful together.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mist">
            Whether it&apos;s a senior role, a research collaboration, or just a conversation —
            I&apos;m always happy to connect with people building interesting things.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 font-mono text-sm text-mist-2">
            <MapPin size={14} className="text-signal" />
            {profile.location}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2.5">
          {openToList.map((item) => (
            <span key={item} className="glass rounded-full px-4 py-2 text-sm text-mist">
              {item}
            </span>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href={links.email}
              className="inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-ink"
            >
              <Mail size={16} />
              Email Me
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="mt-14">
          <p className="font-mono text-xs uppercase tracking-widest text-mist-2">Also find me on</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-mist transition-colors hover:text-paper"
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
