import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const CARDS = [
  { src: "https://picsum.photos/seed/mobius1/600/750", bg: "#14110d", rot: -21, spread: -6 },
  { src: "https://picsum.photos/seed/mobius2/600/750", bg: "#7a6a55", rot: -5, spread: 4 },
  { src: "https://picsum.photos/seed/mobius3/600/750", bg: "#f2d64b", rot: -13, spread: -5 },
  { src: "https://picsum.photos/seed/mobius4/600/750", bg: "#fde98a", rot: -9, spread: -4 },
  { src: "https://picsum.photos/seed/mobius5/600/750", bg: "#ff8a00", rot: 5, spread: 4 },
];

export default function Hero() {
  const root = useRef(null);
  const cardRefs = useRef([]);
  const ready = useRef(false);

  // Entrance: only navbar + wordmark visible, then after 2s text + images rise in
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: reduce ? 0 : .5,
        onComplete: () => (ready.current = true),
        defaults: { duration: reduce ? 0.01 : 1.2, ease: "power4.out" },
      });

      tl.fromTo(
        "[data-intro]",
        { y: 80, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.12 }
      ).fromTo(
        cardRefs.current,
        { y: () => window.innerHeight, rotation: (i) => CARDS[i].rot + 25, autoAlpha: 0 },
        {
          y: 0,
          rotation: (i) => CARDS[i].rot,
          autoAlpha: 1,
          duration: reduce ? 0.01 : 1.4,
          stagger: 0.1,
        },
        0
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const fan = (out) => {
    if (!ready.current) return;
    gsap.to(cardRefs.current, {
      rotation: (i) => CARDS[i].rot + (out ? CARDS[i].spread : 0),
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-white px-5 pb-0 pt-5 font-sans text-black md:px-[50px] md:pt-[40px]"
    >
      {/* Top: description + nav */}
      <header className="relative z-20 pt-14 md:pt-0">
        <p
          data-intro
          className="invisible max-w-[22rem] text-[1.05rem] font-normal leading-[1.45] tracking-tight md:max-w-[26rem] md:text-[1.2rem] md:leading-[1.2]"
        >
          <strong className="font-extrabold">Fitmom Club®</strong> — a fitness community for mothers
          built on strength, movement, and routines that fit real life. Based online, training
          globally, we help busy moms feel strong, energized, and supported at every stage of
          motherhood.
        </p>

      </header>

      {/* Image stack */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div
          className="pointer-events-auto relative aspect-[3/4] w-[50vw] max-w-[380px] md:w-[20vw]"
          onPointerEnter={() => fan(true)}
          onPointerLeave={() => fan(false)}
        >
          {CARDS.map((c, i) => (
            <img
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              src={c.src}
              alt=""
              draggable={false}
              style={{ backgroundColor: c.bg }}
              className="invisible absolute inset-0 h-full w-full select-none object-cover will-change-transform"
            />
          ))}
        </div>
      </div>

      {/* Bottom: meta + wordmark */}
      <div className="relative z-0">
        <div className="mb-4 flex items-end justify-between font-extrabold md:mb-[1.5vw]">
          <span className="text-2xl tracking-tight md:text-[2.6rem]">© 2018-26</span>
        </div>

        {/* Two lines on mobile, one line from md up */}
        <h1 className="-mb-[2.2vw] flex select-none flex-col whitespace-nowrap text-[27vw] font-black leading-[0.78] tracking-[-0.055em] md:mb-[.5vw] md:flex-row md:gap-[0.22em] md:text-[14.4vw]">
          <span>Fitmom</span>
          <span className="flex items-start">
            Club
            
          </span>
        </h1>
      </div>
    </section>
  );
}