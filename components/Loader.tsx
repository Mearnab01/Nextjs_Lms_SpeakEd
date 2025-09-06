import { motion, AnimatePresence } from "framer-motion";
import { Mic, AudioLines, Volume2 } from "lucide-react";

interface LoaderProps {
  isLoading?: boolean;
  message?: string;
}

const Loader = ({
  isLoading = true,
  message = "Plaease Wait...",
}: LoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex flex-col items-center justify-center"
        >
          {/* Animated voice waves */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="absolute -inset-8 bg-blue-500/20 rounded-full blur-xl"
            />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Mic className="h-16 w-16 text-blue-400" />
            </motion.div>

            {/* Surrounding voice waves */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-blue-400/30 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1 + i * 0.3,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{ width: 80 + i * 40, height: 80 + i * 40 }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-2">SpeakEd</h3>
            <p className="text-slate-300 mb-6">{message}</p>

            {/* Animated dots */}
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Floating voice elements */}
          <motion.div
            className="absolute bottom-10 left-1/4 opacity-40"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Volume2 className="h-8 w-8 text-purple-400" />
          </motion.div>

          <motion.div
            className="absolute top-10 right-1/4 opacity-40"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -15, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 0.5,
            }}
          >
            <AudioLines className="h-8 w-8 text-blue-400" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
