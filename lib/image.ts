"use server";

import sharp from "sharp";

export async function convertToAvif(file: File | undefined): Promise<File | undefined> {
  if (!file) return ;
  // Convert File object to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Process image with Sharp
  const avifBuffer = await sharp(buffer).toFormat("avif").toBuffer();

  // Create a new File object from the buffer
  const avifFile = new File(
    [avifBuffer],
    file.name.replace(/\.[^/.]+$/, ".avif"),
    {
      type: "image/avif",
    }
  );

  return avifFile;
}
