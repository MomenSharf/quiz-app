import { Lightbulb } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function Hints() {
  return (
    <Button className="bg-primary/25 hover:bg-primary/15 text-primary rounded-full text-sm">
      <Lightbulb className="w-4 h-4" /> Hints
    </Button>
  );
}
