import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import QuizzesPanelsTable from "../Quiz/QuizzesPanelsTable";
import { UserProfile } from "@/types";
import { UserAvatar, UserAvatarImage } from "../User/UserAvatar";
import QuizzesPanelsContainer from "../Quiz/QuizzesPanelsContainer";

export default function Profile({ profile }: { profile: UserProfile }) {
  return (
    <div className="container flex flex-col gap-3 mt-3 mb-5">
      <div className="bg-card flex flex-col gap-3 p-3">
        <div className="flex gap-3 items-center rounded-md">
          <UserAvatarImage user={profile} className="w-16 h-16" />
          <div className="flex flex-col gap-1">
            <p className="max-w-44 truncate text-lg">{profile.name}</p>
            <p className="text-primary text-xs">@{profile.username}</p>
            <Badge className="self-start bg-primary/30 hover:bg-primary/30 text-primary gap-0.5">
              {profile.quizzes.length} Quizzes
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <h2 className="text-lg font-bold">Quizzes</h2>
        <QuizzesPanelsContainer quizzes={profile.quizzes}  />
      </div>
    </div>
  );
}
