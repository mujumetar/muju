// import {
//   motion,
//   useScroll,
//   useTransform,
//   useMotionValue,
//   useSpring,
//   useVelocity,
// } from "framer-motion";
// import { useEffect } from "react";

// export default function GlobalParallax3D() {
//   const { scrollYProgress, scrollY } = useScroll();

//   /* ───── Scroll velocity (KEY DETAIL) ───── */
//   const velocity = useVelocity(scrollY);
//   const velocityFactor = useTransform(velocity, [-1500, 0, 1500], [1.8, 1, 1.8]);

//   /* ───── Base transforms ───── */
//   const ySlow = useTransform(scrollYProgress, [0, 1], [0, -160]);
//   const yFast = useTransform(scrollYProgress, [0, 1], [0, -320]);
//   const rotate = useTransform(scrollYProgress, [0, 1], [0, 14]);

//   /* ───── Cursor magnetic effect ───── */
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
//   const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

//   useEffect(() => {
//     const move = (e) => {
//       mouseX.set((e.clientX / window.innerWidth - 0.5) * 60);
//       mouseY.set((e.clientY / window.innerHeight - 0.5) * 60);
//     };
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, [mouseX, mouseY]);

//   /* ───── Wave distortion driver ───── */
//   const wave = useMotionValue(0);
//   useEffect(() => {
//     let frame;
//     const animate = () => {
//       wave.set(wave.get() + 0.015);
//       frame = requestAnimationFrame(animate);
//     };
//     animate();
//     return () => cancelAnimationFrame(frame);
//   }, [wave]);

//   const waveOffset = useTransform(wave, (v) => Math.sin(v) * 18);
//   const dynamicWave = useTransform(
//     [waveOffset, velocityFactor],
//     ([w, vel]) => w * vel
//   );

//   return (
//     <div
//       className="hidden md:block fixed inset-0 pointer-events-none"
//       style={{ perspective: "1600px", zIndex: -1 }}
//     >
//       {/* ───── INTERACTIVE CURVED LINES ───── */}
//       <motion.svg
//         style={{
//           y: ySlow,
//           rotateX: rotate,
//           rotateY: springX,
//           transform: "translateZ(-140px)",
//         }}
//         className="absolute right-0 top-0 h-full w-[60%]"
//         viewBox="0 0 800 1000"
//         fill="none"
//       >
//         <motion.path
//           d="M 140 -100 C 520 200 300 600 720 1100"
//           stroke="rgba(150,150,150,0.35)"
//           strokeWidth="1.5"
//           style={{ translateY: dynamicWave }}
//         />

//         <motion.path
//           d="M 260 -120 C 640 260 420 660 760 1200"
//           stroke="rgba(150,150,150,0.22)"
//           strokeWidth="1"
//           style={{ translateY: dynamicWave }}
//         />

//         <motion.path
//           d="M 80 200 C 300 420 260 720 520 920"
//           stroke="rgba(180,180,180,0.18)"
//           strokeWidth="0.8"
//           style={{ translateY: dynamicWave }}
//         />
//       </motion.svg>

//       {/* ───── REACTIVE GLOW ORB ───── */}
//       <motion.div
//         style={{
//           y: yFast,
//           x: springX,
//           rotateX: springY,
//           rotateY: springX,
//           transform: "translateZ(100px)",
//         }}
//         className="absolute right-40 top-1/3 w-44 h-44
//                    rounded-full
//                    bg-gradient-to-br from-primary/30 to-secondary/20
//                    blur-[120px]"
//       />

//       {/* ───── MAGNETIC 3D PANEL ───── */}
//       <motion.div
//         style={{
//           y: ySlow,
//           x: springX,
//           rotateX: springY,
//           rotateY: springX,
//           transform: "translateZ(160px)",
//         }}
//         whileHover={{
//           scale: 1.07,
//           rotateX: -8,
//           rotateY: 12,
//         }}
//         transition={{ type: "spring", stiffness: 120, damping: 18 }}
//         className="absolute right-32 top-[48%]
//                    w-36 h-36
//                    rounded-2xl
//                    border border-border/60
//                    bg-card/60 backdrop-blur-xl
//                    shadow-[0_40px_120px_rgba(0,0,0,0.25)]"
//       />
//     </div>
//   );
// }

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useVelocity,
} from "framer-motion";
import { useEffect } from "react";

export default function GlobalParallax3D() {
  const { scrollYProgress, scrollY } = useScroll();

  /* ───── Scroll velocity ───── */
  const velocity = useVelocity(scrollY);
  const velocityFactor = useTransform(velocity, [-1500, 0, 1500], [1.8, 1, 1.8]);

  /* ───── Base transforms ───── */
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -380]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  /* ───── Cursor magnetic effect ───── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 80);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);


  /* ───── Wave distortion driver ───── */
  const wave = useMotionValue(0);
  useEffect(() => {
    let frame;
    const animate = () => {
      wave.set(wave.get() + 0.012);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [wave]);


  const waveOffset = useTransform(wave, (v) => Math.sin(v) * 24);
  const waveOffset2 = useTransform(wave, (v) => Math.cos(v * 0.8) * 18);
  const dynamicWave = useTransform(
    [waveOffset, velocityFactor],
    ([w, vel]) => w * vel
  );


  /* ───── Floating rotation ───── */
  const floatRotate = useTransform(wave, (v) => Math.sin(v * 0.5) * 8);

  return (
    <div
      className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: "2000px", zIndex: -1 }}
    >
      {/* ───── AMBIENT GRADIENT BACKDROP ───── */}
      <motion.div
        style={{ y: ySlow, scale }}
        className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vh] opacity-40"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/15 blur-[100px] rounded-full" />
      </motion.div>

      {/* ───── INTERACTIVE CURVED LINES ───── */}
      <motion.svg
        style={{
          y: ySlow,
          rotateX: rotate,
          rotateY: springX,
        }}
        className="absolute right-0 top-0 h-full w-[65%]"
        viewBox="0 0 800 1000"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary flowing curve */}
        <motion.path
          d="M 100 -80 C 480 180 280 520 700 1050"
          stroke="url(#lineGrad1)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{ translateY: dynamicWave }}
        />

        {/* Secondary curve */}
        <motion.path
          d="M 200 -120 C 600 220 380 600 740 1150"
          stroke="url(#lineGrad2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ translateY: waveOffset2 }}
        />

        {/* Tertiary subtle curve */}
        <motion.path
          d="M 50 150 C 280 380 220 680 480 880"
          stroke="hsl(var(--muted-foreground) / 0.15)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="8 12"
          style={{ translateY: dynamicWave }}
        />

        {/* Accent curve */}
        <motion.path
          d="M 300 -50 C 550 150 480 400 680 700"
          stroke="hsl(var(--primary) / 0.12)"
          strokeWidth="0.8"
          strokeLinecap="round"
          style={{ translateY: waveOffset }}
        />
      </motion.svg>

      {/* ───── FLOATING GEOMETRIC SHAPES ───── */}

      {/* Large glass orb */}
      <motion.div
        style={{
          y: yFast,
          x: springX,
          rotateX: springY,
          rotateY: springX,
          rotate: floatRotate,
        }}
        className="absolute right-[15%] top-[20%] w-64 h-64"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent blur-[80px]" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-[40px]" />
      </motion.div>

      {/* Medium reactive orb */}
      <motion.div
        style={{
          y: yMedium,
          x: useTransform(springX, (v) => v * -0.5),
          rotateX: useTransform(springY, (v) => v * 0.8),
          rotateY: useTransform(springX, (v) => v * 0.8),
        }}
        className="absolute right-[35%] top-[55%] w-32 h-32"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 to-accent/20 blur-[60px]" />
      </motion.div>

      {/* ───── 3D GLASS PANEL - PRIMARY ───── */}
 {/* ───── 3D GLASS MONOLITH (REPLACEMENT) ───── */}
<motion.div
  style={{
    y: ySlow,
    x: springX,
    rotateX: springY,
    rotateY: springX,
  }}
  whileHover={{
    rotateX: -18,
    rotateY: 22,
    scale: 1.12,
  }}
  transition={{ type: "spring", stiffness: 140, damping: 18 }}
  className="
    absolute right-[12%] top-[40%]
    w-28 h-56
    rounded-[2rem]
    backdrop-blur-2xl
    border border-white/20
    bg-gradient-to-br
    from-white/15
    via-white/5
    to-transparent
    shadow-[0_30px_80px_rgba(0,0,0,0.25)]
    before:absolute before:inset-0 before:rounded-[2rem]
    before:bg-gradient-to-b
    before:from-white/20
    before:to-transparent
    before:opacity-50
  "
>
  {/* Inner light core */}
  <div className="absolute inset-4 rounded-[1.5rem] bg-gradient-to-t from-primary/20 via-transparent to-secondary/15 blur-xl" />

  {/* Edge highlight */}
  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />

  {/* Vertical glow line */}
  <div className="absolute left-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
</motion.div>


      {/* ───── 3D GLASS PANEL - SECONDARY ───── */}
      <motion.div
        style={{
          y: yMedium,
          x: useTransform(springX, (v) => v * 0.6),
          rotateX: useTransform(springY, (v) => v * 0.7),
          rotateY: useTransform(springX, (v) => v * 0.7),
          rotate: floatRotate,
        }}
        whileHover={{
          scale: 1.1,
          rotateX: 8,
          rotateY: -12,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="absolute right-[28%] top-[28%] w-24 h-24 rounded-2xl
                   border border-border/30
                   bg-gradient-to-tl from-card/60 to-card/30
                   backdrop-blur-xl
                   shadow-[0_4px_20px_rgba(0,0,0,0.08),0_20px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </motion.div>

      {/* ───── FLOATING DOTS ───── */}
      {[
        { x: "18%", y: "65%", size: 6, delay: 0 },
        { x: "25%", y: "35%", size: 4, delay: 0.5 },
        { x: "40%", y: "72%", size: 5, delay: 1 },
        { x: "8%", y: "48%", size: 3, delay: 1.5 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-primary/40"
          style={{
            right: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}

      {/* ───── RING ELEMENT ───── */}
      <motion.div
        style={{
          y: yFast,
          rotateX: rotate,
          rotateY: springX,
          rotate: useTransform(wave, (v) => v * 20),
        }}
        className="absolute right-[5%] top-[70%] w-28 h-28"
      >
        <div className="absolute inset-0 rounded-full border border-border/20" />
        {/* <div className="absolute inset-2 rounded-full border border-border/15" /> */}
        <div className="absolute inset-4 rounded-full border border-primary/10 animate-" />
      </motion.div>

      {/* ───── GRID PATTERN OVERLAY ───── */}
      <motion.div
        style={{ y: ySlow, opacity: useTransform(scrollYProgress, [0, 0.5], [0.03, 0]) }}
        className="absolute right-0 top-0 w-1/2 h-full"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--muted-foreground) / 0.06) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--muted-foreground) / 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at 70% 30%, black 20%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
}