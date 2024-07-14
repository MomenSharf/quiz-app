import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="">
      <div className="bg-primary flex justify-center w-fit overflow-hidden">
        <Image alt="logo" src="/images/logo.png" width={50} height={50} />
      </div>
    </div>
  );
}
