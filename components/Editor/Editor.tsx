import React from "react";
import Header from "./Header/Header";
import Content from "./Content";
import Sidebar from "./Sidebar/Sidebar";

export default function Editor() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col-reverse sm:flex-row overflow-hidden">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
