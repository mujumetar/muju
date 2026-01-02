import { useEffect, useRef } from "react";

const RING_SIZE = 32;

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const hoveringRef = useRef(false);

    useEffect(() => {
        if (window.innerWidth < 768) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let raf;

        const move = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!dotRef.current) return;

            dotRef.current.style.transform = `
        translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)
      `;
        };

        const animate = () => {
            if (!ringRef.current) {
                raf = requestAnimationFrame(animate);
                return;
            }

            ringX += (mouseX - ringX) * 0.3;
            ringY += (mouseY - ringY) * 0.3;

            const isHover = hoveringRef.current;

            ringRef.current.style.transform = `
        translate3d(
          ${ringX - RING_SIZE / 2}px,
          ${ringY - RING_SIZE / 2}px,
          0
        )
        scale(${isHover ? 1.3 : 1})
      `;

            ringRef.current.style.boxShadow = isHover
                ? "0 0 0 10px rgba(0,0,0,0.15), 0 0 20px rgba(0,0,0,0.25)"
                : "none";

            raf = requestAnimationFrame(animate);
        };
        window.addEventListener("mouseleave", () => {
            ringRef.current.style.opacity = 0;
        });
        window.addEventListener("mouseenter", () => {
            ringRef.current.style.opacity = 1;
        });

        const onEnter = () => (hoveringRef.current = true);
        const onLeave = () => (hoveringRef.current = false);

        window.addEventListener("mousemove", move);

        const hoverTargets = document.querySelectorAll(
            "a, button, input, textarea, .card-hover"
        );

        hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        raf = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", move);

            hoverTargets.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    return (
        <>
            {/* DOT */}
            <div
                ref={dotRef}
                className="text-foreground"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "currentColor",
                    pointerEvents: "none",
                    zIndex: 9999,
                    willChange: "transform",
                }}
            />

            {/* RING */}
            <div
                ref={ringRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: RING_SIZE,
                    height: RING_SIZE,
                    borderRadius: "50%",
                    border: "1px solid rgba(120,120,120,.6)",
                    pointerEvents: "none",
                    zIndex: 9998,
                    transformOrigin: "center",
                    willChange: "transform",
                    transition: "box-shadow 0.2s ease",
                }}
            />
        </>
    );
}
