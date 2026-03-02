import { useEffect, useState } from "react";

export default function useBottomSentinel(ref) {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const target = ref?.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearBottom(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        rootMargin: "0px 0px -16% 0px",
        threshold: [0, 0.01, 0.25, 1]
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref]);

  return isNearBottom;
}
