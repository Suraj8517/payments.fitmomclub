import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defaultPlans } from "./Plans";
import prenatal from "../assets/prenatal.webp";
import postnatal from "../assets/postnatal.webp";
import pro from "../assets/pro.webp";
import tone from "../assets/tone.webp";
import elite from "../assets/elite.webp";
gsap.registerPlugin(ScrollTrigger);

const css = `
@keyframes px-spin{to{transform:rotate(360deg)}}
@keyframes px-nudge{50%{transform:translateX(8px)}}
.px-scroll{scrollbar-width:thin;scrollbar-color:currentColor transparent}
.px-track{scrollbar-width:none}.px-track::-webkit-scrollbar{display:none}
`;

const ICONS = {
  Check: "M20 6 9 17l-5-5",
  Arrow: "M5 12h14M13 6l6 6-6 6",
  Back: "M19 12H5M11 6l-6 6 6 6",
};
const Icon = ({ name, className = "h-full w-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

const FOCUS = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-black";
const HEAD = "font-black leading-[0.88] tracking-[-0.055em]";


function PlanCard({ plan, index, k, flat, onChoose, count }) {
  const [months, setMonths] = useState("12");
  const [open, setOpen] = useState(false);
  const shown = open ? plan.features : plan.features.slice(0, 4);

  return (
    <div className={"flex flex-none justify-center " + (flat ? "w-full snap-center snap-always md:w-auto" : "w-screen md:w-auto")} data-card data-slide>
      <div style={flat ? undefined : { zoom: k, "--k": k }}>
        <article
          aria-label={plan.name}
          className={`group flex flex-col gap-5 md:flex-row md:items-center md:gap-11 ${
            flat ? "mx-auto w-full max-w-[600px] md:w-[min(91vw,950px)] md:max-w-none" : "w-[calc((100vw-32px)/var(--k))] md:w-[min(91vw,950px)]"
          }`}
        >
          {/* poster: a coloured "photo" like the hero stack, tilted, straightens on hover */}
          <div
            style={{ background: plan.bg, "--r": index % 2 ? "2.2deg" : "-2.2deg" }}
            className={`relative isolate flex aspect-[16/10] w-full overflow-hidden text-white flex-none rotate-[var(--r)] flex-col justify-between p-4 transition-transform duration-500 ease-out group-hover:rotate-0 group-focus-within:rotate-0 motion-reduce:transition-none md:aspect-[3/4] md:w-[390px] md:p-7`}
          >
            {plan.img && (
              <img
                src={plan.img}
                alt=""
                loading="lazy"
                draggable={false}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
            )}
            {/* soft shade so the white text stays readable on any photo */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-black/5 to-black/35" />
            <div className="flex justify-between text-[15px] font-extrabold tracking-tight">
              <span>{plan.tag}</span>
              <span>{String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}</span>
            </div>
            <div>
              <p className="text-[5.6rem] font-black leading-[0.8] tracking-[-0.07em] md:text-[9.5rem]">{plan.stat[0]}</p>
              <p className="mt-2 max-w-[15rem] text-[15px] font-semibold leading-snug">{plan.stat[1]}</p>
            </div>
          </div>

          {/* details */}
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-neutral-500">{plan.group}</p>
            <h3 className="mt-1 text-[clamp(2.1rem,8.5vw,3rem)] font-black leading-[0.9] tracking-[-0.05em] md:text-[clamp(2.6rem,4vw,4rem)]">{plan.name}</h3>
            <p className="mt-2 text-[1.05rem] font-medium">For {plan.for.toLowerCase()}</p>

            <div className="mt-4 flex gap-5" role="group" aria-label={`${plan.name} plan length`}>
              {["6", "9", "12"].map((m) => (
                <button
                  key={m}
                  aria-pressed={months === m}
                  onClick={() => setMonths(m)}
                  className={`border-b-2 pb-1 text-[16px] font-extrabold tracking-tight transition-opacity ${FOCUS} ${months === m ? "border-black" : "border-transparent opacity-40 hover:opacity-70"}`}
                >
                  {m} months
                </button>
              ))}
            </div>

            <ul className={"mt-4 text-[1rem] font-medium leading-snug " + (open ? "px-scroll max-h-[260px] overflow-y-auto overscroll-contain pr-2" : "")}>
              {shown.map((f) => (
                <li key={f} className="border-t border-black/15 py-[11px]">{f}</li>
              ))}
            </ul>

            {plan.features.length > 4 && (
              <button className={`mt-1 text-[16px] font-extrabold underline underline-offset-[3px] ${FOCUS}`} aria-expanded={open} onClick={() => setOpen(!open)}>
                {open ? "Show less" : `Show all ${plan.features.length} inclusions`}
              </button>
            )}

            <button
              onClick={() => onChoose(plan.name, months)}
              className={`mt-[22px] flex h-[60px] w-full items-center justify-between bg-black px-5 text-[17px] font-extrabold uppercase tracking-tight text-white transition-opacity hover:opacity-80 md:w-fit md:min-w-[290px] md:gap-10 ${FOCUS}`}
            >
              Choose {plan.tag}
              <span className="block h-[22px] w-[22px]"><Icon name="Arrow" /></span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Plans({
  plans = defaultPlans,
  onChoose = () => {},
  headline = ["Pick the plan", "that fits where", "you are today"],
  sticker = "Weight management + body toning",
  lede = "Plans for pregnancy, life after birth and everyday goals, plus a body toning program. Every plan runs for 6, 9 or 12 months.",
  help = { href: "#contact", label: "Talk to us" },
}) {
  const sec = useRef(null), track = useRef(null), st = useRef(null);
  const [k, setK] = useState(1);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const total = plans.length + 2; // intro + plans + outro
  const flat = reduced;

  useEffect(() => {
    const mq = (q, set) => {
      const m = window.matchMedia(q);
      const f = () => set(m.matches);
      f(); m.addEventListener("change", f);
      return () => m.removeEventListener("change", f);
    };
    const a = mq("(prefers-reduced-motion: reduce)", setReduced);
    const b = mq("(max-width: 767px)", setIsMobile);
    return () => { a(); b(); };
  }, []);

  // shrink cards on short screens so a whole card always fits
  useEffect(() => {
    const f = () => setK(
      flat
        ? 1
        : isMobile
        ? Math.max(0.55, Math.min(1.1, (innerHeight - 140) / 750))
        : Math.max(0.7, Math.min(1.35, (innerHeight - 110) / 700))
    );
    f(); window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, [flat, isMobile]);

  // vertical scroll -> horizontal movement
  useLayoutEffect(() => {
    if (flat) return;
    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
      const factor = isMobile ? 2 : 1; // mobile: a longer scroll per card
      st.current = ScrollTrigger.create({
        trigger: sec.current,
        start: "top top",
        end: () => "+=" + dist() * factor,
        pin: true,
        scrub: isMobile ? 0.6 : true,
        invalidateOnRefresh: true,
        animation: gsap.to(track.current, { x: () => -dist(), ease: "none" }),
        snap: isMobile ? { snapTo: 1 / (total - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.12, ease: "power2.inOut" } : undefined,
        onUpdate: (self) => setActive(Math.round(self.progress * (total - 1))),
      });
    }, sec);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [flat, isMobile, k, plans, total]);

  const slides = () => Array.from(track.current?.querySelectorAll("[data-slide]") || []);

  const goToSlide = (i) => {
    const s = slides()[i];
    if (!s) return;
    if (flat) {
      const t = track.current;
      t.scrollTo({ left: s.offsetLeft - (t.clientWidth - s.offsetWidth) / 2 });
      return;
    }
    const d = Math.max(1, track.current.scrollWidth - window.innerWidth);
    const x = Math.min(d, Math.max(0, s.offsetLeft + s.offsetWidth / 2 - window.innerWidth / 2));
    const { start, end } = st.current;
    window.scrollTo({ top: start + (x / d) * (end - start), behavior: "smooth" });
  };

  // keyboard focus on an off-screen card brings it into view
  const onFocus = (e) => {
    if (flat || !e.target.matches?.(":focus-visible")) return;
    const i = slides().findIndex((s) => s.contains(e.target));
    const r = slides()[i]?.getBoundingClientRect();
    if (r && (r.left < 0 || r.right > innerWidth)) goToSlide(i);
  };

  // swipe row (reduced motion): track which slide is centred
  const onTrackScroll = () => {
    if (!flat) return;
    const t = track.current.getBoundingClientRect();
    const mid = t.left + t.width / 2;
    let best = 0, bd = Infinity;
    slides().forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bd) { bd = d; best = i; }
    });
    setActive(best);
  };

  const ctrl = `flex h-12 w-12 flex-none items-center justify-center bg-black text-white disabled:opacity-30 ${FOCUS}`;

  return (
    <section
      id="plans"
      ref={sec}
      aria-label="Plans"
      className={`relative bg-white font-sans text-black ${flat ? "py-14" : "h-svh overflow-hidden"}`}
    >
      <style>{css}</style>
      <div className={"flex flex-col " + (flat ? "" : "h-full")}>
        <div className="relative min-h-0 flex-1">
          <div
            ref={track}
            onFocus={onFocus}
            onScroll={onTrackScroll}
            className={"relative flex items-center will-change-transform " +
              (flat
                ? "px-track snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-6 md:gap-12 md:px-[6vw]"
                : "h-full w-max gap-0 md:gap-[clamp(28px,3vw,56px)] md:px-[clamp(20px,6vw,110px)]")}
          >
            {/* intro */}
            <div data-slide className={"flex flex-none items-center " + (flat ? "min-h-[420px] w-full snap-center snap-always md:w-max" : "w-screen px-4 md:w-max md:px-0")}>
              <div className="relative w-max max-w-full py-2" style={flat ? undefined : { zoom: k, "--k": k }}>
                <p className="mb-5 inline-block -rotate-3 bg-black px-4 py-2 text-[clamp(14px,1.2vw,20px)] font-extrabold uppercase tracking-tight text-white">{sticker}</p>
                <h2 className={`${HEAD} m-0 whitespace-nowrap text-[clamp(2.8rem,14vw,4.4rem)] md:text-[clamp(2.5rem,7.5vw,6.8rem)]`}>
                  {headline.map((l) => <span key={l} className="block">{l}</span>)}
                </h2>
                <p className="mt-6 max-w-[calc((100vw-32px)/var(--k,1))] text-[clamp(16px,4.4vw,19px)] font-medium leading-snug md:max-w-[580px] md:text-[clamp(18px,1.55vw,24px)]">{lede}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-[16px] font-extrabold uppercase" aria-hidden="true">
                  {isMobile || reduced ? "Swipe or scroll" : "Keep scrolling"}
                  <Icon name="Arrow" className="h-7 w-7 animate-[px-nudge_1.6s_ease-in-out_infinite] motion-reduce:animate-none" />
                </span>
              </div>
            </div>

            {plans.map((p, i) => <PlanCard key={p.name} plan={p} index={i} k={k} flat={flat} onChoose={onChoose} count={plans.length} />)}

            {/* outro */}
            <div data-slide className={"flex-none " + (flat ? "flex min-h-[320px] w-full snap-center snap-always flex-col justify-center md:w-[min(84vw,480px)]" : "w-screen px-4 md:w-[min(84vw,480px)] md:px-0 md:pr-[4vw]")}>
              <h3 className={`${HEAD} m-0 text-[clamp(2.8rem,13vw,4rem)] md:text-[clamp(3.2rem,6vw,6.2rem)]`}>Not sure which one?</h3>
              <p className="mb-6 mt-5 text-[17px] font-medium leading-snug md:text-[20px]">
                Tell us about your goals and health history and we’ll point you to the right plan.
              </p>
              <a href={help.href} className={`inline-flex h-14 items-center gap-2.5 self-start bg-black px-6 text-[18px] font-extrabold uppercase tracking-tight text-white transition-opacity hover:opacity-80 ${FOCUS}`}>
                {help.label}
                <span className="block h-[22px] w-[22px]"><Icon name="Arrow" /></span>
              </a>
            </div>
          </div>
        </div>

        {/* mobile controls */}
        {isMobile && (
          <div className="flex items-center justify-between gap-3 px-4 pb-5 pt-2" role="group" aria-label="Browse plans">
            <button onClick={() => goToSlide(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous" className={ctrl}>
              <Icon name="Back" className="h-5 w-5" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: total }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to ${i === 0 ? "intro" : i === total - 1 ? "help" : plans[i - 1].name}`}
                  aria-current={active === i}
                  className={`h-2.5 rounded-full border-2 border-black p-0 transition-all duration-200 ${FOCUS} ${active === i ? "w-6 bg-black" : "w-2.5 bg-transparent"}`}
                />
              ))}
            </div>
            <button onClick={() => goToSlide(Math.min(total - 1, active + 1))} disabled={active === total - 1} aria-label="Next" className={ctrl}>
              <Icon name="Arrow" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}