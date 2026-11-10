import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (base64: string, mimeType: string) => void;
  onClear: () => void;
  selectedImage: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, onClear, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Extract base64 data and mime type
      // Data URL format: data:image/jpeg;base64,/9j/4AAQSk...
      const matches = result.match(/^data:(.+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        onImageSelect(base64Data, mimeType);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  if (selectedImage) {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
        <img src={`data:image/jpeg;base64,${selectedImage}`} alt="Original" className="w-full h-full object-cover" />
        <button
          onClick={onClear}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Remove image"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white text-xs py-2 text-center font-medium">
          Original Image
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative group border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ease-in-out text-center h-80 flex flex-col items-center justify-center cursor-pointer
        ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={handleFileChange}
      />
      <div className="bg-indigo-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
        <Upload className={`w-8 h-8 text-indigo-600 ${isDragging ? 'animate-bounce' : ''}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload your selfie</h3>
      <p className="text-gray-500 text-sm mb-4">Drag & drop, paste (Ctrl+V), or click to browse</p>
      <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
        <ImageIcon className="w-3 h-3" />
        <span>JPG, PNG, WebP</span>
      </div>
    </div>
  );
};