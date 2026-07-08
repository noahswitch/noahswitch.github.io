"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Github, Users } from "lucide-react";
import { profile, links } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

type GhUser = {
  public_repos: number;
  followers: number;
  created_at: string;
};

const FALLBACK_REPOS: Repo[] = [
  {
    id: -1,
    name: "noahswitch.github.io",
    html_url: links.github + ".io",
    description: "Personal portfolio — systems engineering, cloud architecture, and ML research.",
    stargazers_count: 0,
    forks_count: 0,
    language: "HTML",
    pushed_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: -2,
    name: "NoahSwitch-MailForge",
    html_url: "https://noahswitch.github.io/NoahSwitch-MailForge",
    description: "Email workflow and message-generation tool for daily communication.",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    pushed_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: -3,
    name: "Noah-Sign",
    html_url: "https://noahswitch.github.io/Noah-Sign",
    description: "Signature and document-signing helper for daily operations.",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    pushed_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: -4,
    name: "Doc2HTML",
    html_url: "https://noahswitch.github.io/Doc2HTML/",
    description: "Browser-native document editor with live bidirectional HTML sync.",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    pushed_at: new Date().toISOString(),
    fork: false,
  },
];

function RepoCardSkeleton() {
  return <div className="shimmer h-[168px] rounded-2xl border border-line" />;
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer noopener"
      className="glass group flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-signal/30"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm text-paper">{repo.name}</h3>
        <ExternalLink
          size={14}
          className="mt-0.5 shrink-0 text-mist-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
        />
      </div>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-mist-2">
        {repo.description ?? "No description provided."}
      </p>
      <div className="mt-4 flex items-center gap-4 font-mono text-xs text-mist-2">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-teal" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={12} /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={12} /> {repo.forks_count}
        </span>
      </div>
    </a>
  );
}

export function OpenSource() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [user, setUser] = useState<GhUser | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [repoRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.handle}/repos?sort=pushed&per_page=100`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(`https://api.github.com/users/${profile.handle}`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
        ]);

        if (!repoRes.ok || !userRes.ok) throw new Error("GitHub API unavailable");

        const repoData: Repo[] = await repoRes.json();
        const userData: GhUser = await userRes.json();

        const curated = repoData
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          )
          .slice(0, 6);

        setRepos(curated.length ? curated : FALLBACK_REPOS);
        setUser(userData);
      } catch {
        if (!controller.signal.aborted) {
          setFailed(true);
          setRepos(FALLBACK_REPOS);
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <section id="open-source" className="section-pad" aria-labelledby="open-source-heading-x">
      <div className="wrap">
        <SectionHeading
          index="05"
          label="OPEN SOURCE"
          title="Open source"
          description="Public repositories and daily tools, pulled live from GitHub."
        />

        <Reveal className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-paper"
          >
            <Github size={16} />@{profile.handle}
          </a>
          {user && (
            <span className="flex items-center gap-2 font-mono text-xs text-mist-2">
              <Users size={13} />
              {user.public_repos} public repos · {user.followers} followers
            </span>
          )}
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repos
            ? repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
            : Array.from({ length: 6 }).map((_, i) => <RepoCardSkeleton key={i} />)}
        </div>

        {failed && (
          <p className="mt-6 font-mono text-xs text-mist-2">
            Live GitHub data is unavailable right now — showing a curated fallback list instead.
          </p>
        )}
      </div>
    </section>
  );
}
