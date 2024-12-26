import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatTimeAgo } from "@/lib/utils";
import { DashboardFoldersWithQuiz, DashboardQuiz } from "@/types";
import { Edit, EllipsisVertical, Layers } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDashboardContext } from "@/components/Library/Context";
import QuizMenu from "./Quiz/QuizMenu";
import FolderMenu from "./Folder/FolderMenu";
import QuizDrawer from "./Quiz/QuizDrawer";
import FolderDrawer from "./Folder/FolderDrawer";

export default function DataCard({
  data,
}: {
  data: DashboardQuiz | DashboardFoldersWithQuiz;
}) {
  const {
    state: { selectedQuizzesIds },
    toggleQuizSelection,
  } = useDashboardContext();
  const router = useRouter();
  const isFolder = "parentId" in data;
  const dataPath = `/${isFolder ? "dashboard/folders" : "quiz"}/${data.id}`;
  return (
    <tr className="bg-white p-3 rounded-lg mb-3">
      <td className="p-2 rounded-tl-md rounded-bl-md">
        <div className="flex justify-center items-center">
          {!isFolder && (
            <Checkbox
              checked={selectedQuizzesIds.includes(data.id)}
              onClick={() => toggleQuizSelection(data.id)}
            />
          )}
        </div>
      </td>

      <td className="w-full flex justify-start gap-2 p-2 pl-0">
        <div
          className="flex flex-col rounded-md overflow-hidden cursor-pointer"
          onClick={() => router.push(dataPath)}
        >
          {!isFolder ? (
            data.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt="question Image"
                width={100}
                height={75}
                priority
                style={{
                  aspectRatio: "4 / 3",
                }}
                className="rounded-md"
              />
            ) : (
              <div className="w-[80px] h-[60px] sm:w-[100px] sm:h-[75px] flex justify-center items-center object-contain rounded-md overflow-hidden min-w-16 sm:min-w-20 bg-[hsl(var(--primary)_/_10%)] ">
                <Icons.quizzes className="w-7 h-7 fill-primary" />
              </div>
            )
          ) : (
            <div className="w-[80px] h-[60px] sm:w-[100px] sm:h-[75px] flex justify-center items-center object-contain rounded-md overflow-hidden min-w-16 sm:min-w-20 bg-[hsl(var(--primary)_/_10%)] ">
              <Icons.folder className="w-7 h-7 fill-primary" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <p
            className="truncate  sm:max-w-60  font-medium cursor-pointer hover:text-primary transition-colors text-xs sm:text-base"
            onClick={() => router.push(dataPath)}
            title={data.title}
          >
            {data.title}
          </p>
          <div className="flex gap-1">
            {isFolder ? (
              <div className="flex gap-1">
                <Badge className="bg-primary/30 hover:bg-primary/30 text-primary items-center gap-0.5">
                  <Icons.quizzes className="w-3 h-3 fill-primary" />
                  {data._count.quizzes} Quizzes
                </Badge>
                <Badge className="bg-primary/30 hover:bg-primary/30 text-primary items-center  gap-0.5">
                  <Icons.folder className="w-3 h-3 fill-primary" />
                  {data._count.subfolders} Folder
                </Badge>
              </div>
            ) : (
              <Badge className="bg-primary/30 hover:bg-primary/30 text-primary items-center gap-0.5">
                <Layers className="w-3 h-3 text-primary" />
                {data._count.questions} Questions
              </Badge>
            )}
          </div>
        </div>
      </td>
      <td className="hidden lg:table-cell p-2">
        <p className="max-w-40 truncate">{formatTimeAgo(data.updatedAt)}</p>
      </td>
      <td className="hidden lg:table-cell truncate p-2">
        <p className="max-w-40 truncate">{formatTimeAgo(data.createdAt)}</p>
      </td>
      <td className="hidden sm:table-cell p-2">
        {!isFolder && (
          <div className="flex gap-2 justify-center">
            <Button
              size="icon"
              className=""
              onClick={() => router.push(`/play/${data.id}`)}
            >
              <Icons.play className="w-4 h-4 fill-white" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => router.push(`/editor/${data.id}`)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        )}
      </td>
      <td className="p-2 rounded-tr-md rounded-br-md">
        <div className="flex justify-center items-center">
          {isFolder ? (
            <>
              <div className="hidden sm:block">
                <FolderMenu
                  pathname="/dashboard"
                  folder={data}
                  className="p-0 w-4"
                  variant='ghost'

                >
                  <EllipsisVertical className="w-4 h-4" />
                </FolderMenu>
              </div>
              <div className="sm:hidden">
                <FolderDrawer
                  pathname="/dashboard"
                  folder={data}
                  className="p-0 w-4"
                  variant='ghost'
                >
                  <EllipsisVertical className="w-4 h-4" />
                </FolderDrawer>
              </div>
            </>
          ) : (
            <>
              <div className="hidden sm:block">
                <QuizMenu pathname="/dashboard" quiz={data} className="p-0 w-4" variant='ghost'>
                  <EllipsisVertical className="w-4 h-4" />
                </QuizMenu>
              </div>
              <div className="sm:hidden">
                <QuizDrawer
                  pathname="/dashboard"
                  quiz={data}
                  className="p-0 w-4 cursor-pointer"
                  variant='ghost'
                >
                  <EllipsisVertical className="w-4 h-4" />
                </QuizDrawer>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
