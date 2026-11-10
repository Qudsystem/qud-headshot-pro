import React, { useState } from 'react';
import { Download, Share2, RefreshCw, RotateCcw, Eye, X } from 'lucide-react';

interface ResultDisplayProps {
  image: string; // base64
  onReset: () => void;
  onRegenerate: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ image, onReset, onRegenerate }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${image}`;
    link.download = `headshot-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-full animate-fade-in">
        <div 
          className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200 bg-gray-100 group cursor-pointer"
          onClick={() => setShowPreview(true)}
        >
          <img
            src={`data:image/png;base64,${image}`}
            alt="Generated Headshot"
            className="w-full h-full object-cover"
          />
          
          {/* Hover Overlay for Actions */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowPreview(true)}
                className="w-full flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white py-2.5 rounded-lg font-medium hover:bg-white/30 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview Full Size
              </button>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRegenerate}
            className="flex-1 sm:flex-none min-w-[160px] flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium px-6 py-2.5 rounded-full shadow-lg shadow-indigo-200"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium px-4 py-2 rounded-full hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {showPreview && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowPreview(false)}
        >
          <button 
            onClick={() => setShowPreview(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center p-4">
             <img 
              src={`data:image/png;base64,${image}`} 
              alt="Full Preview" 
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-300 select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};