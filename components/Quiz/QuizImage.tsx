import Image from "next/image";

export default function QuizImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden">
      <Image
        // src={imageUrl}
        src="/assets/images/hero.webp"
        alt="question Image"
        width={800} // Replace with your desired pixel width
        height={600} // Replace with your desired pixel height
        priority
        style={{
          aspectRatio: "4 / 3", // Maintains the 4:3 aspect ratio
        }}
        className="rounded-xl"
      />
    </div>
  );
}
