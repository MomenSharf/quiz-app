import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-proj-QUWBYfTy2aL8jjByRT5wT3BlbkFJ52LRIayVRxUxKotFn3aa",
  dangerouslyAllowBrowser: true  // This is the default and can be omitted
});

export async function openn(prompt: string) {
  const response = await client.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data[0].url;

  return image_url;
}
