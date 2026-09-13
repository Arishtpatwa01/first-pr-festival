"use client";

import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";
import SpiderCard from "./SpiderCard";
import WovenCard from "./WovenCard";
import type { SpiderMember } from "@/utils/getData";

/**
 * The three winners, in order. Ranking here is a judgment call made by the
 * organizers after the event (commit history, resolved-conflict quality,
 * card craftsmanship) — not something derivable from the roster data alone,
 * so it's a fixed list rather than computed.
 */
const WINNERS: { githubUsername: string; rank: 1 | 2 | 3 }[] = [
  { githubUsername: "tihsrax7", rank: 1 },
  { githubUsername: "Sahil-Kachave", rank: 2 },
  { githubUsername: "PariHalai", rank: 3 },
];

const RANK_STYLE = {
  1: {
    label: "1st",
    accent: "#FFC531",
    glow: "rgba(255,197,49,0.55)",
    icon: Crown,
    order: "sm:order-2",
    lift: "sm:-translate-y-6",
    scale: "sm:scale-[1.06]",
  },
  2: {
    label: "2nd",
    accent: "#C9CDD6",
    glow: "rgba(201,205,214,0.4)",
    icon: Medal,
    order: "sm:order-1",
    lift: "",
    scale: "",
  },
  3: {
    label: "3rd",
    accent: "#CD7F32",
    glow: "rgba(205,127,50,0.4)",
    icon: Medal,
    order: "sm:order-3",
    lift: "",
    scale: "",
  },
} as const;

export default function Leaderboard({ members }: { members: SpiderMember[] }) {
  const podium = WINNERS.map((w) => ({
    ...w,
    member: members.find((m) => m.githubUsername.toLowerCase() === w.githubUsername.toLowerCase()),
  })).filter((w): w is typeof w & { member: SpiderMember } => Boolean(w.member));

  if (podium.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-10">
      <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
        <h2 className="flex items-center gap-3 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
          <Trophy className="h-8 w-8 text-[#FFC531] sm:h-10 sm:w-10" />
          Top of the <span className="text-web-scarlet">Archive</span>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
          festival winners
        </span>
      </div>

      <div className="flex flex-col items-stretch gap-8 sm:flex-row sm:items-end sm:gap-6">
        {podium.map(({ rank, member }, i) => {
          const style = RANK_STYLE[rank];
          const Icon = style.icon;
          return (
            <motion.div
              key={member.githubUsername}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex-1 ${style.order} ${style.lift} ${style.scale}`}
            >
              <div
                className="relative rounded-3xl border p-5 pt-8"
                style={{
                  borderColor: `${style.accent}55`,
                  background: `radial-gradient(circle at 50% 0%, ${style.accent}14, transparent 70%)`,
                  boxShadow: `0 0 60px -20px ${style.glow}`,
                }}
              >
                <div
                  className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border px-4 py-1.5 font-display text-sm uppercase tracking-wider"
                  style={{
                    background: "#08080A",
                    borderColor: style.accent,
                    color: style.accent,
                    boxShadow: `0 0 24px -4px ${style.glow}`,
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {style.label}
                </div>

                <div className="mx-auto max-w-[320px]">
                  {member.html ? (
                    <WovenCard member={member} index={i} />
                  ) : (
                    <SpiderCard member={member} index={i} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
