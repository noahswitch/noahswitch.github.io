import { Cloud, Settings, Shield, Code2, Network, Database, Sparkles, Award, Languages } from "lucide-react";
import { skillCategories, certifications, languages } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SkillCard } from "@/components/ui/SkillCard";

const icons = {
  cloud: Cloud,
  cog: Settings,
  shield: Shield,
  code: Code2,
  network: Network,
  database: Database,
  sparkles: Sparkles,
};

export function Skills() {
  return (
    <section id="skills" className="section-pad" aria-labelledby="skills-heading-x">
      <div className="wrap">
        <SectionHeading
          index="02"
          label="TECH STACK"
          title="Skills & expertise"
          description="Competencies built across enterprise deployments, open-source projects, and academic research. Hover — or tap — a card for a quick note on how I use it."
        />

        <div className="mt-14 space-y-10">
          {skillCategories.map((category) => {
            const Icon = icons[category.icon as keyof typeof icons];
            return (
              <Reveal key={category.id}>
                <div className="mb-4 flex items-center gap-2.5">
                  <Icon size={16} className="text-signal" />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-mist">
                    {category.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <SkillCard key={skill.name} name={skill.name} blurb={skill.blurb} />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          <Reveal>
            <div className="mb-4 flex items-center gap-2.5">
              <Award size={16} className="text-signal" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-mist">
                Certifications
              </h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.name} className="glass flex items-center justify-between gap-4 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-paper">{cert.name}</p>
                    <p className="text-xs text-mist-2">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-mist-2">{cert.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="mb-4 flex items-center gap-2.5">
              <Languages size={16} className="text-signal" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-mist">Languages</h3>
            </div>
            <ul className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <li key={lang.name} className="glass flex items-center gap-2.5 rounded-xl px-4 py-3">
                  <span className="text-sm font-medium text-paper">{lang.name}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-teal">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
