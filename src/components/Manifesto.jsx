import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "Fitmom Club®", "brings", "strength", "and", "community", "together,",
  "turning", "effort", "into", "energy", "and", "motivation", "into", "confidence.",
];


const START = [
  [4, 125],  // Fitmom Club®  (below, left)
  [40, 114], // brings
  [62, 132], // strength
  [80, 120], // and
  [92, 78],  // community    
  [1, 142],  // together,
  [72, 35],  // turning
  [60, 44],  // effort
  [45, 136], // into
  [58, 22],  // energy
  [15, 128], // and
  [25, 146], // motivation
  [70, 140], // into
  [54, 71],  // confidence.
];

export default function Manifesto() {
  const section = useRef(null);
  const stage = useRef(null);
  const group = useRef(null);
  const para = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray("[data-w]");

      const scatter = () => {
        const w = stage.current.clientWidth;
        const h = stage.current.clientHeight;
        words.forEach((el, i) => {
          const [sx, sy] = START[i];
          gsap.set(el, {
            x: (sx / 100) * w - el.offsetLeft,
            y: (sy / 100) * h - el.offsetHeight / 2 - el.offsetTop,
          });
        });
      };
      scatter();
      ScrollTrigger.addEventListener("refreshInit", scatter);
      document.fonts?.ready.then(() => ScrollTrigger.refresh()); // measure after the font loads

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "+=250%", // scroll distance the section stays locked in place
            pin: true, // lock the section on screen until the timeline finishes
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        // scroll DOWN: scattered words fly in from all around and join into the sentence
        // scroll UP: the same tween plays backwards and the sentence breaks apart again
        .to(words, { x: 0, y: 0, ease: "power1.inOut", duration: 1, stagger: 0.02 }, 0)
        // hold the finished sentence, then lift it while the paragraph slides up
        .to(group.current, { y: "-30vh", ease: "power2.inOut", duration: 0.6 }, 1.7)
        .fromTo(
          para.current,
          { autoAlpha: 0, y: "18vh" },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.6 },
          1.8
        );

      return () => ScrollTrigger.removeEventListener("refreshInit", scatter);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative h-svh overflow-hidden bg-white font-sans text-black">
      <div ref={stage} className="relative h-svh overflow-hidden">
        <div ref={group} className="pt-[34vh] md:pt-[36vh]">
          <p className="w-full px-5 text-[9.4vw] font-bold leading-[1.12] tracking-[-0.04em] md:px-[50px] md:text-[4.8vw] md:leading-[1.2]">
            {WORDS.map((w, i) => (
              <span
                key={i}
                data-w
                className={`inline-block will-change-transform ${
                  i === 0 ? "ml-[12vw] whitespace-nowrap md:ml-[18vw]" : ""
                } ${i === WORDS.length - 1 ? "" : "mr-[0.26em]"}`}
              >
                {i === 0 ? (
                  <>
                    Fitmom Club<span className="relative -top-[0.3em] text-[0.55em]">®</span>
                  </>
                ) : (
                  w
                )}
              </span>
            ))}
          </p>

          <p
            ref={para}
            className="mt-[8vh] max-w-[34rem] px-5 text-sm font-medium leading-[1.4] md:ml-[19vw] md:max-w-[30vw] md:px-0 md:text-[1.5vw]"
          >
            At Fitmom Club®, we keep training simple, supportive, and flexible. We work closely with
            every mom, shaping each program around real schedules, real energy levels, and real
            goals. Nothing is rushed, and nothing essential is left behind. The result is a stronger
            body, a clearer mind, and a community that cheers you on.
          </p>
        </div>
      </div>
    </section>
  );
}