import { useUploadThing } from "@/lib/uploadthing";
import {
  QuestionValidtionType,
  QuizValidtionType,
} from "@/lib/validations/Quiz";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  createQuiz as createQuizPrisma
} from "@/lib/actions/quiz.actions";
import { cn } from "@/lib/utils";
import {
  ArrowBigLeftDash,
  ArrowRight,
  Check,
  CircleCheckBig,
  Ellipsis,
  Loader2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CreateDialogProps = {
  quizInfo: QuizValidtionType | null;
  questions: QuestionValidtionType[];
  files: Record<number, File>;
  userId: string;
  setStep: Dispatch<SetStateAction<number>>;
  setQuestions: Dispatch<SetStateAction<QuestionValidtionType[]>>;
  setQuizInfo: Dispatch<SetStateAction<QuizValidtionType>>;
  setIsAllSuccess: Dispatch<SetStateAction<boolean>>;
};
export default function CreateStatus({
  quizInfo,
  files,
  questions,
  userId,
  setStep,
  setQuizInfo,
  setQuestions,
  setIsAllSuccess
}: CreateDialogProps) {
  const [imagesUploading, setImageUploading] = useState<
    Record<
      number,
      {
        file: File;
        url: string | null;
        status: "uploading" | "waiting" | "success" | "failed";
        error: string | null;
      }
    >
  >([]);

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingSuccess, setiIuploadingSuccess] = useState(false);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isCreatingSuccess, setIsCreatingSuccess] = useState(false);


  const { startUpload } = useUploadThing("imageUploader");

  const uplaodImages = async () => {
    setIsUploading(true);

    Object.entries(imagesUploading).map(async (e, i) => {
      const [index, image] = e;

      setImageUploading((prev) => ({
        ...prev,
        [parseInt(index)]: {
          file: image.file,
          url: null,
          status: "uploading",
          error: null,
        },
      }));

      const uploadedImages = await startUpload([image.file]);

      if (uploadedImages) {
        setImageUploading((prev) => ({
          ...prev,
          [parseInt(index)]: {
            file: image.file,
            url: uploadedImages[0].url,
            status: "success",
            error: null,
          },
        }));

        if (i >= Object.entries(imagesUploading).length - 1) {
          setIsUploading(false);
          setiIuploadingSuccess(true);
        }
      } else {
        setImageUploading((prev) => ({
          ...prev,
          [parseInt(index)]: {
            file: image.file,
            url: null,
            status: "failed",
            error: "Failed to upload image",
          },
        }));
        if (parseInt(index) >= Object.entries(imagesUploading).length - 1) {
          setIsUploading(false);
          setiIuploadingSuccess(true);
        }
      }
    });
  };

  const createQuizFun = async () => {
    setIsCreatingQuiz(true);

    if (
      !Object.entries(imagesUploading).every(
        ([_, image]) => image.status === "success"
      )
    ) {
      setiIuploadingSuccess(false);
      return;
    }

    const quiz = {
      title: quizInfo?.title || "",
      imageUrl: quizInfo?.imageUrl || "",
      description: quizInfo?.description || "",
      difficulty: quizInfo?.difficulty || "EASY",
      categories: quizInfo?.categories || [],
      authorId: userId,
    };

    const questionsWithUrl = questions;

    Object.entries(imagesUploading).forEach(([index, image]) => {
      if (questionsWithUrl[parseInt(index) - 1]) {
        questionsWithUrl[parseInt(index) - 1].imageUrl = image.url || undefined;
      }
    });

    try {
      const quizCreated = await createQuizPrisma(quiz, questionsWithUrl);

      if (quizCreated) {
        setIsCreatingQuiz(false);
        setIsCreatingSuccess(true);
        setIsAllSuccess(true)
        setStep(0)
        setQuestions([]);
        setQuizInfo({
          title: "",
          imageUrl: undefined,
          categories: [],
          description: "",
          difficulty: "EASY",
          questions: [],
        });
      } else {
        toast({
          description: "Failed to create quiz, try again",
          variant: "destructive",
        });
        setIsCreatingQuiz(false)
      }
    } catch (error) {
      toast({
        description: "Failed to create quiz, try again",
        variant: "destructive",
      });
    }
  };



  useEffect(() => {
    if (Object.entries(files).length == 0) {
      setiIuploadingSuccess(true);
    } else {
      setiIuploadingSuccess(false);
      Object.entries(files).forEach((file) =>
        setImageUploading((prev) => ({
          ...prev,
          [parseInt(file[0])]: {
            file: file[1],
            url: null,
            status: "waiting",
            error: null,
          },
        }))
      );
    }

    
  }, [files]);



  return (
    <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
      <Card className="dark:bg-[var(--navbar)] min-w-[350px] items-center text-center shadow-md max-w-[35rem] boder-2 border-primary scale-75 sm:scale-100">
        <CardContent>
          <div className="flex justify-center">
            <Image src="/assest/images/logo.png" width={75} height={75} alt="logo" />
          </div>
          <CardTitle className="text-lg font-semibold -mt-5">
            Creating Status
          </CardTitle>
          <div className="flex flex-col gap-1 py-5">
            {!isUploadingSuccess ? (
              Object.entries(imagesUploading).map(([index, image]) => {
                const indexInt = parseInt(index);
                return (
                  <div
                    key={indexInt}
                    className={cn(
                      "text-xs sm:text-sm font-semibold flex gap-1 items-center",
                      {
                        "text-red-600": image.status === "failed",
                        "text-gray-500": image.status === "uploading",
                        "text-green-600": image.status === "success",
                        "text-muted-foreground": image.status === "waiting",
                      }
                    )}
                  >
                    {image.status === "uploading" ? (
                      <Loader2 className="animate-spin w-3" />
                    ) : image.status === "success" ? (
                      <Check className="w-3" />
                    ) : image.status === "failed" ? (
                      <X className="w-3" />
                    ) : image.status === "waiting" ? (
                      <Ellipsis className="w-3" />
                    ) : null}
                    Uplaoding{" "}
                    {indexInt === 0
                      ? "Quiz information Image"
                      : `Question ${index} image`}{" "}
                    , Status: {image.status}{" "}
                    {image.status === "failed" ? "try again" : ""}
                  </div>
                );
              })
            ) : !isCreatingSuccess ? (
              <div className="w-full h-full flex justify-center items-center text-sm text-gray-500">
                {isCreatingQuiz ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Creating Quiz game...
                  </>
                ) : (
                  "Create Quiz game"
                )}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center min-h-16">
                <CircleCheckBig className="w-8 h-8 text-green-500" />
              </div>
            )}
          </div>
          <div>
            {!isUploadingSuccess ? (
              <Button
                type="button"
                onClick={uplaodImages}
                disabled={isUploading || isCreatingQuiz}
              >
                {isUploading && (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                )}
                {isUploading ? "Uploading Images..." : "Uplaod images"}
              </Button>
            ) : !isCreatingSuccess ? (
              <Button
                type="button"
                onClick={createQuizFun}
                disabled={isCreatingQuiz}
              >
                {isCreatingQuiz ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            ) : (
              <Link href='/profile' className={cn(buttonVariants({variant: "outline"}))}>
                Profile <ArrowRight className="w-4 h-5 ml-1" />
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {!isCreatingSuccess && (
        <Button
          variant="outline"
          size="icon"
          className="self-start"
          onClick={() => setStep((prev) => prev - 1)}
        >
          <ArrowBigLeftDash className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
