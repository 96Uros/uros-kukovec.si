import { useEffect, useRef } from "react";

export function Starfield() {
  const starfieldRef = useRef(null);

  useEffect(() => {
    const starfield = starfieldRef.current;
    if (!starfield) return;

    const starsCount = 70;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starsCount; i += 1) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      fragment.appendChild(star);
    }

    starfield.appendChild(fragment);
  }, []);

  return <div className="starfield" ref={starfieldRef} aria-hidden="true" />;
}
