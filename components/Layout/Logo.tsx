import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="w-full">
      <div className="w-full bg-primary flex justify-center overflow-hidden">
        <Image alt="logo" src="/assets/images/logo.png" width={50} height={50} />
      </div>
    </div>
  );
}
