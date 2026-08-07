import type { Metadata } from "next";
import Link from "next/link";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Lalith: a student who refuses to stop building — who I am, what drives me, and how I think.",
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who Am I?",
    body: [
      "My name is Lalith. I'm still a student.",
      "I'm not a founder. I'm not an engineer. I'm not an expert. Not yet.",
      "I'm just someone who refuses to stop building.",
      "Every day, I'm trying to become a little more capable than I was yesterday. That's really the only competition I care about.",
    ],
  },
  {
    title: "I Think Too Much",
    body: [
      "I spend an unhealthy amount of time thinking. Not worrying — thinking. About technology. About humanity. About why some companies survive for generations while others disappear. About why great products feel effortless. About how software changes people's lives. About what artificial intelligence will mean twenty years from now.",
      "Sometimes I'll spend hours thinking about a single idea before writing the first line of code. Sometimes I'll throw away weeks of work because I know it can be better. It's frustrating. But I can't help it.",
    ],
  },
  {
    title: "I Fall In Love With Ideas",
    body: [
      "Most people fall in love with outcomes. Money. Titles. Recognition. I fall in love with possibilities. A blank repository. A notebook page. A product idea. A problem nobody seems interested in solving.",
      "There's something magical about creating something that didn't exist yesterday. That feeling never gets old.",
    ],
  },
  {
    title: "I Care More About Becoming Than Arriving",
    body: [
      "People ask what I want to become. Software engineer. Entrepreneur. AI researcher. Product builder. The truth is... those are just labels.",
      "What I actually want is to become someone capable of solving increasingly difficult problems. If I become that person, everything else will follow naturally.",
    ],
  },
  {
    title: "School Doesn't Define Me",
    body: [
      "I'm a student. I study for exams. I complete assignments. I worry about marks like everyone else. But school is only one part of my life.",
      "When classes end, another education begins. That's when I open documentation, watch conference talks, read engineering blogs, debug code that refuses to work, design interfaces nobody asked me to design, and build products nobody may ever use. Because that's how I learn.",
    ],
  },
  {
    title: "I Build Because I Have To",
    body: [
      "People often ask why I work on so many projects. The answer isn't productivity. It's curiosity.",
      "I genuinely need to know if an idea can exist. Once the question enters my mind, it becomes difficult to ignore. So I build. Not because I'm certain it'll succeed. But because I need to find out.",
    ],
  },
  {
    title: "Failure Doesn't Scare Me",
    body: [
      "Unused repositories don't scare me. Deleted code doesn't scare me. Starting over doesn't scare me. Staying the same does.",
      "Every failed project teaches something the successful ones never could. I'd rather build ten imperfect things than spend years imagining one perfect thing.",
    ],
  },
  {
    title: "My Relationship With Technology",
    body: [
      "I don't see technology as entertainment. I see it as leverage. A single line of code can save thousands of hours. A well-designed product can improve millions of lives. One engineer can build something that reaches every continent.",
      "That's incredible. That's the kind of impact I want to create.",
    ],
  },
  {
    title: "Why Artificial Intelligence Fascinates Me",
    body: [
      "AI isn't interesting to me because it's popular. It's interesting because it changes what's possible. It allows individuals to create what previously required entire companies. It lowers the barrier between imagination and execution.",
      "We're living through one of the biggest technological shifts in history. I don't want to watch it happen. I want to help build it.",
    ],
  },
  {
    title: "My Biggest Strength",
    body: [
      "Curiosity. Not intelligence. Not talent. Curiosity.",
      "I ask a lot of questions. Sometimes too many. But every answer reveals another question. That loop never ends. I hope it never does.",
    ],
  },
  {
    title: "My Biggest Weakness",
    body: [
      "I dream faster than I execute. My mind is usually several steps ahead of my current abilities. I'll imagine the tenth version before I've finished the first. That means I sometimes restart instead of finishing.",
      "It's something I'm learning to control. Because ideas don't change the world. Finished work does.",
    ],
  },
  {
    title: "Why I Document My Journey",
    body: [
      "I'm not documenting because I've already succeeded. I'm documenting because I haven't. Years from now, I want to remember what the beginning looked like. The confusion. The excitement. The late nights. The bugs. The tiny victories. The moments when I nearly gave up.",
      "Those are the parts people rarely see.",
    ],
  },
  {
    title: "What Success Means To Me",
    body: [
      "Success isn't becoming famous. Success isn't owning expensive things. Success is earning the ability to wake up every morning and work on problems that genuinely matter.",
      "Success is creating tools that improve someone else's life. Success is building something that continues creating value long after I'm gone.",
    ],
  },
  {
    title: "What I Hope People Say About Me",
    body: [
      "Not... \"He was rich.\" Not... \"He was famous.\" Not even... \"He was brilliant.\"",
      "I hope they say: \"If Lalith cared about a problem, he didn't just complain about it. He built something.\"",
    ],
  },
  {
    title: "The Person I'm Trying To Become",
    body: [
      "Someone who learns relentlessly. Someone who stays curious. Someone who treats people with respect. Someone who values truth over ego. Someone who builds more than they consume. Someone whose work speaks louder than their words.",
      "I'm not there yet. But every project is another step.",
    ],
  },
  {
    title: "To My Future Self",
    body: [
      "If you're reading this years from now... I hope you never lost your curiosity. I hope you still get excited by empty folders and impossible ideas. I hope you still remember what it felt like to be the student who believed anything could be built with enough patience.",
      "And if you've accomplished everything you once dreamed of... I hope you've found even bigger dreams.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="mb-10 flex flex-col gap-3">
        <p className="font-mono text-sm" style={{ color: "var(--page-accent)" }}>
          $ cat README.md
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Beyond the Resume
        </h1>
        <p style={{ color: "var(--page-muted)" }}>
          If you&apos;re looking for a list of achievements, technologies, or
          certificates, this page probably isn&apos;t what you&apos;re
          expecting. This is simply me.
        </p>
      </header>

      <section className="flex flex-col gap-10">
        {sections.map((s) => (
          <div key={s.title} className="flex max-w-2xl flex-col gap-3">
            <h2
              className="font-mono text-sm font-bold uppercase tracking-wider"
              style={{ color: "var(--page-accent)" }}
            >
              {s.title}
            </h2>
            {s.body.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-lg" : ""}
                style={{ color: i === 0 ? "var(--page-fg)" : "var(--page-muted)" }}
              >
                {p}
              </p>
            ))}
          </div>
        ))}

        <blockquote
          className="max-w-2xl border-l-2 pl-6 italic"
          style={{ borderColor: "var(--page-accent)" }}
        >
          <p style={{ color: "var(--page-muted)" }}>
            This website isn&apos;t proof that I&apos;ve become extraordinary.
            It&apos;s proof that I decided to start.
          </p>
        </blockquote>
      </section>

      <section className="mt-16 flex flex-col gap-6">
        <h2
          className="font-mono text-sm font-bold uppercase tracking-wider"
          style={{ color: "var(--page-accent)" }}
        >
          What I work with
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--page-line)" }}
            >
              <h3
                className="mb-3 text-sm font-bold uppercase tracking-wider"
                style={{ color: "var(--page-accent)" }}
              >
                {cat.title}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm"
                    style={{ color: "var(--page-muted)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--page-muted)" }}>
          This site is built with Next.js and TypeScript. The centerpiece is a
          fully client-side terminal — every command runs in your browser, with
          history, autocomplete, themes, and a virtual filesystem.{" "}
          <Link
            href="/workspace"
            className="font-medium underline underline-offset-4"
            style={{ color: "var(--page-accent)" }}
          >
            Try it →
          </Link>
        </p>
      </section>
    </main>
  );
}
