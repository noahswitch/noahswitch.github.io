import { Users, Zap, Brain, TrendingUp } from "lucide-react";
import { achievements } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

const icons = { users: Users, zap: Zap, brain: Brain, "trending-up": TrendingUp };

export function Achievements() {
  return (
    <div className="border-y border-line py-14" role="region" aria-label="Key achievements">
      <div className="wrap">
        <Reveal stagger={0.1} className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          {achievements.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <div key={item.label} className="flex flex-col gap-2">
                <Icon size={18} className="text-signal" />
                <span className="font-display text-3xl font-medium text-paper sm:text-4xl">
                  {item.value}
                </span>
                <span className="text-sm text-mist-2 leading-snug">{item.label}</span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </div>
  );
}
