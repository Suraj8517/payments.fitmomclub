import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV = ["Classes", "Community", "Journal", "Join"];
const LOCATION = "Berlin, DE";
const TIMEZONE = "Europe/Berlin";

function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** Fixed navbar + clock. The small logo fades in once the hero is scrolled past. */
export default function Header() {
  const logo = useRef(null);
  const time = useClock();

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top -40%",
      onToggle: (self) =>
        gsap.to(logo.current, { autoAlpha: self.isActive ? 1 : 0, duration: 0.4, overwrite: "auto" }),
    });
    return () => st.kill();
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 pt-5 font-sans md:px-[50px] md:pt-[40px]">
        <a
          ref={logo}
          href="/"
          className="pointer-events-auto invisible text-sm font-extrabold tracking-tight md:text-base"
        >
          Fitmom Club®
        </a>
        <nav className="pointer-events-auto ml-auto flex gap-4 text-[11px] font-extrabold uppercase tracking-tight md:ml-0 md:w-[40%] md:max-w-[640px] md:justify-between md:text-base">
          {NAV.map((n) => (
            <a key={n} href={`/${n.toLowerCase()}`} className="hover:opacity-60">
              {n}
            </a>
          ))}
        </nav>
      </header>

 
    </>
  );
}