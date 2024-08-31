import Image from "next/image";
import React from "react";

export default function QuestionImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col">
      <Image
        src={imageUrl}
        alt="question Image"
        layout="responsive" // Maintain aspect ratio
        width={4} // Relative width
        height={3}
        className="max-w-full object-contain"
      />
    </div>
  );
}
