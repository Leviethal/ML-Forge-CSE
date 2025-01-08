import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploader } from './components/ImageUploader';
import { ResultsWindow } from './components/ResultsWindow';
import { Sparkles } from 'lucide-react';

function App() {
  const [processedImage, setProcessedImage] = React.useState<string | null>(null);
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen relative bg-gray-900 text-gray-100 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-liquid-art-background-48298-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" />
      </div>

      {/* Floating particles */}
      <AnimatePresence>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10
            }}
            animate={{ 
              y: -10,
              x: Math.random() * window.innerWidth 
            }}
            exit={{ y: window.innerHeight + 10 }}
            transition={{ 
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </AnimatePresence>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div 
              className="flex items-center justify-center gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                EnhanceAI
              </h1>
            </motion.div>
            <motion.p 
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transform your images with AI magic
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ImageUploader 
              setOriginalImage={setOriginalImage}
              setProcessedImage={setProcessedImage}
            />
            <ResultsWindow 
              originalImage={originalImage}
              processedImage={processedImage}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;