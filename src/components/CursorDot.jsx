import { useEffect, useRef } from "react";
import gsap from "gsap";

/** The small black dot that trails the mouse (desktop / fine pointers only). */
export default function CursorDot() {
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    gsap.set(dot.current, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const x = gsap.quickTo(dot.current, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(dot.current, "y", { duration: 0.45, ease: "power3.out" });
    const move = (e) => {
      gsap.to(dot.current, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      x(e.clientX);
      y(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      // difference blend: black on white, white over the black wordmark/text
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[14px] w-[14px] rounded-full bg-white mix-blend-difference md:h-[1.3vw] md:w-[1.3vw]"
    />
  );
}