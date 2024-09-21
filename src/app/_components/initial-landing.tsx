import { motion } from "framer-motion";

const gradient1 = "#151981";
const gradient2 = "#47346D";

const variants = [
  `radial-gradient(circle, ${gradient1}, ${gradient2})`,
  `radial-gradient(at left top, ${gradient1}, ${gradient2})`,
];

export default function InitialLandingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[95svh] min-w-[96svw]">
      <motion.div
        className="absolute top-0 left-0 flex flex-col min-h-full min-w-full justify-center items-center rounded-md"
        initial={{ opacity: 0 }} // Start faded out
        animate={{ opacity: 1 }} // Animate to fully visible
        transition={{
          duration: 2,
          repeat: Infinity, // Repeat infinitely
          repeatType: "mirror", // Reverse back and forth
        }}
        style={{
          background: variants[1],
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 flex flex-col min-h-full min-w-full justify-center items-center rounded-md"
        initial={{ opacity: 1 }} // Start fully visible
        animate={{ opacity: 0 }} // Animate to fade out
        transition={{
          duration: 2,
          repeat: Infinity, // Repeat infinitely
          repeatType: "mirror", // Reverse back and forth
        }}
        style={{
          background: variants[0],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}