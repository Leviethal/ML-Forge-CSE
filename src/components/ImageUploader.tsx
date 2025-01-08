import React from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageUploaderProps {
  setOriginalImage: (image: string | null) => void;
  setProcessedImage: (image: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  setOriginalImage, 
  setProcessedImage 
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        setOriginalImage(result);
        setIsProcessing(true);
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProcessedImage(result);
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-800 rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-purple-400">Upload Image</h2>
      
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isProcessing ? (
            <div className="text-center">
              <LoadingSpinner />
              <p className="mt-4 text-gray-400">Enhancing image...</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mb-4 text-purple-400" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
            </>
          )}
        </div>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isProcessing}
        />
      </label>
    </motion.div>
  );
};