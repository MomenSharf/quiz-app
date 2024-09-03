import Image from "next/image";
import React from "react";

export default function QuestionImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col w-full border border-primary rounded-md overflow-hidden">
      <Image
        src={imageUrl}
        alt="question Image"
        layout="responsive" // Maintain aspect ratio
        width={4}
        height={3}
        className="object-contain"
      />
    </div>
  );
}
