import { useEffect, useRef, useState } from "react";

type Phase = "typing" | "paused" | "erasing";

const TYPE_SPEED = 38;
const ERASE_SPEED = 22;
const PAUSE_DURATION = 3000;

/**
 * Typewriter hook that cycles through an array of strings,
 * typing each one out character by character, pausing, then
 * erasing before moving to the next.
 */
export function useTypewriter(texts: string[]): string {
  const [display, setDisplay] = useState("");
  const phase = useRef<Phase>("typing");
  const idx = useRef(Math.floor(Math.random() * texts.length));
  const charPos = useRef(0);

  useEffect(() => {
    if (texts.length === 0) return;

    let timer: ReturnType<typeof setTimeout>;
    let active = true;

    function tick() {
      if (!active) return;
      const current = texts[idx.current];

      if (phase.current === "typing") {
        charPos.current++;
        setDisplay(current.slice(0, charPos.current));

        if (charPos.current >= current.length) {
          phase.current = "paused";
          timer = setTimeout(tick, PAUSE_DURATION);
        } else {
          timer = setTimeout(tick, TYPE_SPEED);
        }
      } else if (phase.current === "paused") {
        phase.current = "erasing";
        timer = setTimeout(tick, ERASE_SPEED);
      } else {
        charPos.current--;
        setDisplay(current.slice(0, charPos.current));

        if (charPos.current <= 0) {
          idx.current = (idx.current + 1) % texts.length;
          phase.current = "typing";
          timer = setTimeout(tick, TYPE_SPEED + 200);
        } else {
          timer = setTimeout(tick, ERASE_SPEED);
        }
      }
    }

    timer = setTimeout(tick, TYPE_SPEED);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [texts]);

  return display;
}
