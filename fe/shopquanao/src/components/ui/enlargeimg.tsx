import { useState } from "react";
import Image from "next/image";

type ImagePreviewProps = {
  src: string; // link ảnh nhỏ
  alt?: string;
  width?: number;
  height?: number;
  className?:string
};

export function ImagePreview({ src, alt = "", width = 100, height = 100 ,className=''}: ImagePreviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Ảnh nhỏ */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onClick={() => setOpen(true)}
      />

      {/* Modal hiển thị ảnh to */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setOpen(false)} // click ra ngoài để tắt
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              width={600}
              height={800}
              className="rounded-lg object-contain"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow hover:cursor-pointer"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
