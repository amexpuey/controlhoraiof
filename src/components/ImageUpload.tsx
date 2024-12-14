import React from 'react';

interface ImageUploadProps {
  currentImage: string;
  onImageSelect: (file: File) => void;
  label: string;
  inputId: string;
}

export default function ImageUpload({ currentImage, onImageSelect, label, inputId }: ImageUploadProps) {
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex items-center gap-4">
        <img
          src={currentImage}
          alt={label}
          className="h-20 w-20 object-cover rounded-lg"
        />
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageSelect(file);
          }}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
}