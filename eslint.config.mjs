// NOTE: this intentionally does NOT use @eslint/eslintrc's FlatCompat to
// resolve "next/core-web-vitals" / "next/typescript" by name — that legacy
// resolution path trips a known upstream bug (circular reference inside the
// react-hooks plugin's config triggers a crash in ESLint's own error
// formatter; see eslint/eslint#20237 and vercel/next.js discussion #84596).
// eslint-config-next ships proper flat-config arrays directly, so importing
// them avoids the compat layer entirely.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
