import { FlaskConical, ShieldAlert, Zap, Hourglass } from "lucide-react";
import { research } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ResearchCard } from "./ResearchCard";
import { withBasePath } from "@/lib/basePath";

const paperIcons = { dziribert: FlaskConical, "auto-fl-iot": ShieldAlert, "xai-ids": Zap };

export function Research() {
  return (
    <section id="research" className="section-pad" aria-labelledby="research-heading-x">
      <div className="wrap">
        <SectionHeading
          index="04"
          label="ACADEMIC RESEARCH"
          title="Research & experiments"
          description="Published and ongoing ML research with a focus on federated learning, privacy-preserving NLP, and low-resource language modelling."
        />

        <div className="mt-14 space-y-6">
          {research.map((paper) => (
            <ResearchCard
              key={paper.id}
              paper={paper}
              icon={paperIcons[paper.id as keyof typeof paperIcons]}
              figure={
                paper.id === "xai-ids"
                  ? {
                      src: withBasePath("/ASREM2026/assets/xai-ids/03_model_comparison_bar.png"),
                      width: 1932,
                      height: 882,
                      alt: "Bar chart comparing macro F1 scores of Random Forest, XGBoost, and LightGBM on the RT-IoT2022 benchmark",
                    }
                  : undefined
              }
            />
          ))}

          <Reveal>
            <div className="glass flex flex-col items-center justify-center gap-3 rounded-3xl px-7 py-14 text-center">
              <Hourglass size={22} className="text-mist-2" />
              <h3 className="font-display text-lg font-medium text-mist">Next paper</h3>
              <p className="max-w-xs text-sm text-mist-2">Currently in progress. Check back soon.</p>
              <span className="glass rounded-full px-3 py-1 font-mono text-xs text-teal">
                In Progress
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
