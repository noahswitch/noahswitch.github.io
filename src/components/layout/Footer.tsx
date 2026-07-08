import { profile } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex justify-center">
        <p className="font-mono text-xs text-mist-2">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
