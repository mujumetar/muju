import { createContext, useContext } from "react";
import { useScroll, useSpring } from "framer-motion";

const Scroll3DContext = createContext(null);

export function Scroll3DProvider({ children }) {
  const { scrollYProgress } = useScroll();

  // Smooth scroll signal (important for 3D)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4,
  });

  return (
    <Scroll3DContext.Provider value={{ scrollYProgress: smoothProgress }}>
      {children}
    </Scroll3DContext.Provider>
  );
}

export const useScroll3D = () => useContext(Scroll3DContext);
