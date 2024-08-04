import Image from "next/image";
import React from "react";
import { Icons } from "../icons";

export default function Logo() {
  return (
    <div className="bg-primary w-14 h-14 flex justify-center items-center overflow-hidden">
      {/* <Image alt="logo" src="/assets/images/logo.png" width={50} height={50} />  */}
      <Icons.logo className="w-9 h-9 fill-primary-foreground" />
    </div>
  );
}
