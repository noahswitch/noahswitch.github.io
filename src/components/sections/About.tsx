import Image from "next/image";
import { profile } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { withBasePath } from "@/lib/basePath";

export function About() {
  return (
    <section id="about" className="section-pad" aria-labelledby="about-heading-x">
      <div className="wrap">
        <SectionHeading index="01" label="WHO I AM" title="Background & experience" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal className="space-y-5">
              {profile.bio.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-mist">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2">
              {profile.values.map((value) => (
                <div key={value.title} className="glass rounded-2xl p-6">
                  <h3 className="font-display text-lg font-medium text-paper">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-2">{value.body}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal>
            <Tilt max={5} className="mx-auto w-full max-w-[280px] lg:mx-0">
              <div className="glass overflow-hidden rounded-3xl">
                <Image
                  src={withBasePath("/avatar.png")}
                  alt={`Portrait illustration of ${profile.fullName}`}
                  width={560}
                  height={560}
                  className="h-auto w-full"
                  priority={false}
                />
              </div>
            </Tilt>
            <div className="glass mt-5 rounded-2xl p-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-mist-2">
                Currently
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Administering enterprise infrastructure at Diamond Diagnostics Inc. while
                publishing federated-learning research on the side.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
