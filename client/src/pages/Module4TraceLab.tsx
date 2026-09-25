import { Link, useLocation } from "wouter";
import Module4AnimatedTrace from "@/components/Module4AnimatedTrace";

export default function Module4TraceLab() {
  const [location] = useLocation();
  const hash = location === "/labs/hash-maps";
  const lesson = hash ? 1 : 2;
  return (
    <main className="m4a-standalone">
      <div className="m4a-standalone-shell">
        <header className="m4a-standalone-header">
          <img
            src="/manus-storage/tech460-logo_04dcbc26.png"
            alt="TECH460 logo"
          />
          <div>
            <strong>TECH460 · Interactive Learning Platform</strong>
            <p>Created by Dr. Vicki Bealman</p>
          </div>
          <Link href={`/module/4/lesson${lesson}`}>
            Return to Lesson {lesson}
          </Link>
        </header>
        <h1>{hash ? "Hash-map animation lab" : "Two-pointer animation lab"}</h1>
        <p className="m4a-standalone-note">
          A standalone companion visualization for Module 4. Predict each
          operation, advance it manually, or use Play to watch the complete
          trace. This lab does not record grades or change course progress.
        </p>
        <Module4AnimatedTrace
          key={hash ? "hash" : "pointers"}
          kind={hash ? "hash" : "pointers"}
          standalone
        />
        <footer>
          <p>
            Official CodeSignal lessons and activities are accessed through
            their individual links in Canvas Module 4. This visualization
            explains a companion algorithm and does not submit work.
          </p>
          <p>
            <Link href={hash ? "/labs/two-pointers" : "/labs/hash-maps"}>
              Open the {hash ? "two-pointer" : "hash-map"} lab
            </Link>{" "}
            · <Link href="/module/4">Module 4 overview</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
