import Image from 'next/image';
import React from 'react'

export default function QuizImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden max-w-full">
        <Image
          src={imageUrl}
          // src='/assets/images/categories/ART.jpg'
          alt="question Image"
          width={800} // Replace with your desired pixel width
          height={600} // Replace with your desired pixel height
          priority
          style={{
            aspectRatio: "4 / 3", // Maintains the 4:3 aspect ratio
          }}
          className="rounded-lg"
        />
    </div>
  );
}
