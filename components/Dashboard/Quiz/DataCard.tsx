import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatTimeAgo } from "@/lib/utils";
import { DashboardFoldersWithQuiz, DashboardQuiz } from "@/types";
import { Edit, EllipsisVertical, Layers } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function DataCard({
  data,
}: {
  data: DashboardQuiz | DashboardFoldersWithQuiz;
}) {
  const isFolder = "parentId" in data;
  return (
    <tr className="bg-white p-3 rounded-lg mb-3">
      <td className="p-2 pr-0 rounded-tl-md rounded-bl-md">
        {!isFolder && <Checkbox id="terms" />}
      </td>

      <td className="w-full flex justify-start gap-2 p-2">
        <div className="flex flex-col rounded-md overflow-hidden">
          {!isFolder ? (
            data.image && data.image.url ? (
              <Image
                src={data.image.url}
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
              <div className="w-[100px] h-[75px] flex justify-center items-center object-contain rounded-md overflow-hidden min-w-16 sm:min-w-20 bg-[hsl(var(--primary)_/_10%)] ">
                <Icons.quizzes className="w-7 h-7 fill-primary" />
              </div>
            )
          ) : (
            <div className="w-[100px] h-[75px] flex justify-center items-center object-contain rounded-md overflow-hidden min-w-16 sm:min-w-20 bg-[hsl(var(--primary)_/_10%)] ">
              <Icons.folder className="w-7 h-7 fill-primary" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <p className="truncate font-medium">{data.title}</p>
          <div className="flex gap-1">
            {isFolder ? (
              <Badge className="bg-primary/30 hover:bg-primary/30 text-primary items-center gap-0.5">
                <Icons.quizzes className="w-3 h-3 fill-primary" />
                {data._count.quizzes} Quizzes
              </Badge>
            ) : (
              <Badge className="bg-primary/30 hover:bg-primary/30 text-primary items-center gap-0.5">
                <Layers className="w-3 h-3 text-primary" />
                {data._count.questions} Questions
              </Badge>
            )}
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell p-2">
        <p className="max-w-40 truncate">{formatTimeAgo(data.updatedAt)}</p>
      </td>
      <td className="hidden lg:table-cell truncate p-2">
        <p className="max-w-40 truncate">{formatTimeAgo(data.createdAt)}</p>
      </td>
      <td className="hidden sm:table-cell p-2">
        {!isFolder && (
          <div className="flex gap-2 justify-center">
            <Button size="icon" className="">
              <Icons.play className="w-4 h-4 fill-white" />
            </Button>
            <Button size="icon" variant="outline">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        )}
      </td>
      <td className="p-2 rounded-tr-md rounded-br-md">
        <Button size="icon" variant="ghost" className="p-0 w-4">
          <EllipsisVertical className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
}
