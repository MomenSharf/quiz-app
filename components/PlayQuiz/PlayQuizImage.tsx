import Image from 'next/image';
import React from 'react'

export default function PlayQuizImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col w-full rounded-md overflow-hidden">
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
