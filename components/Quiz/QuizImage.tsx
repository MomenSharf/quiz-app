import Image from "next/image";

export default function QuizImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden">
      <Image
        // src={imageUrl}
        src='/assets/images/hero.webp'
        alt="question Image"
        layout="responsive" // Maintain aspect ratio
        width={4}
        height={3}
        className="object-contain rounded-xl"
      />
    </div>
  );
}
