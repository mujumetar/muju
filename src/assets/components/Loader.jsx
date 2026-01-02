// import { useEffect, useState } from "react";

// const LOADER_TIME = 2000; // minimum 2 seconds

// export default function Loader() {
//     const [visible, setVisible] = useState(true);
//     const [progress, setProgress] = useState(0);

//     const logoText = "< Muzammil />";

//     useEffect(() => {
//         const startTime = Date.now();

//         // Animate progress from 0 to 100
//         const progressInterval = setInterval(() => {
//             const elapsed = Date.now() - startTime;
//             setProgress(Math.min((elapsed / LOADER_TIME) * 100, 100));
//         }, 16);

//         // Hide loader after min time
//         const hideTimer = setTimeout(() => setVisible(false), LOADER_TIME);

//         return () => {
//             clearInterval(progressInterval);
//             clearTimeout(hideTimer);
//         };
//     }, []);

//     if (!visible) return null;

//     return (
//         <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-700 animate-fadeIn">
//             {/* Logo with Shader Glow */}
//             <div className="relative text-4xl md:text-5xl font-bold text-white tracking-wider mb-6 overflow-hidden">
//                 <span className="relative z-10">{logoText}</span>
//                 {/* Animated gradient shine */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 opacity-30 animate-shimmer"></div>
//             </div>

//             {/* Cinematic Progress Bar */}
//             <div className="w-64 h-2 rounded-full bg-white/10 overflow-hidden relative mb-4">
//                 <div
//                     className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 transition-all duration-75"
//                     style={{ width: `${progress}%` }}
//                 />
//                 <div className="absolute left-0 top-0 h-full w-1 bg-white/50 animate-loaderGlow"></div>
//             </div>

//             {/* Optional: Subtitle */}
//             <div className="text-sm text-white/70 tracking-widest animate-pulse">
//                 Loading...
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";

const LOADER_TIME = 2000; // minimum 2 seconds

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const logoText = "< Webers.iorg />";

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / LOADER_TIME) * 100, 100));
    }, 16);

    const hideTimer = setTimeout(() => setVisible(false), LOADER_TIME);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/10 backdrop-blur-md transition-opacity duration-700 animate-fadeIn">

      {/* Logo with Glitch */}
      <div className="relative font-text-4xl font-primary md:text-6xl font-extrabold text-black tracking-wider mb-8 overflow-hidden ">
        <span className="relative z-10 glitch font-text-3xl font-primary md:text-6xl" data-text={logoText}>
          {logoText}
        </span>
      </div>

      {/* Fully Black Progress Bar */}
      <div className="w-64 h-0.5 rounded-full bg-black/10 overflow-hidden relative mb-6">
        <div
          className="h-full bg-black transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtitle with pulse */}
      <div className="text-sm md:text-base text-black/70 tracking-widest animate-pulse font-mono">
        Loading...
      </div>
    </div>
  );
}
