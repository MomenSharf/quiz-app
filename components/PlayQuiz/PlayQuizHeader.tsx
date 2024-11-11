import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function PlayQuizHeader() {
  return (
    <div className="flex gap-3 p-1 bg-popover">
      <Button size="icon" variant='ghost'>
        <ArrowLeft className="w-4 h-4"/>
      </Button>
    </div>
  );
}
