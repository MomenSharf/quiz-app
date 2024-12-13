import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content";

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
