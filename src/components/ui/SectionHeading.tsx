import { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <p className="font-mono text-sm text-signal tracking-wide">
        <span className="text-mist-2">{"// "}</span>
        {index} — {label}
      </p>
      <h2 className="font-display mt-4 text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-paper">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg text-mist leading-relaxed ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
