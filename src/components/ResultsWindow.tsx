import React from 'react';
import { motion } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { ImageIcon } from 'lucide-react';

interface ResultsWindowProps {
  originalImage: string | null;
  processedImage: string | null;
}

export const ResultsWindow: React.FC<ResultsWindowProps> = ({
  originalImage,
  processedImage
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-800 rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-purple-400">Results</h2>
      
      {originalImage && processedImage ? (
        <div className="rounded-lg overflow-hidden">
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={originalImage} alt="Original" />}
            itemTwo={<ReactCompareSliderImage src={processedImage} alt="Enhanced" />}
            className="h-[400px] w-full object-cover rounded-lg"
          />
          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>Original</span>
            <span>Enhanced</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <ImageIcon className="w-12 h-12 mb-4" />
          <p>Upload an image to see the results</p>
        </div>
      )}
    </motion.div>
  );
};