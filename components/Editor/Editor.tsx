import React from "react";
import Header from "./Header/Header";
import Sidebar from "./SideBar/Sidebar";

export default function Editor() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col-reverse sm:flex-row overflow-hidden">
        {/* Sidebar */}
        {/* <aside className="bg-gray-800 text-white w-64 overflow-y-auto p-4 flex-shrink-0">
          <h2 className="text-lg font-bold mb-4">Sidebar</h2>
          <div className="space-y-6">
            <p>Sidebar content block 1...</p>
            <p>Sidebar content block 2...</p>
            <p>Sidebar content block 3...</p>
            <p>Sidebar content block 4...</p>
            <p>Sidebar content block 5...</p>
            <p>Sidebar content block 6...</p>
            <p>Sidebar content block 7...</p>
            <p>Sidebar content block 8...</p>
            <p>Sidebar content block 9...</p>
            <p>Sidebar content block 10...</p>
            <p>Sidebar content block 7...</p>
            <p>Sidebar content block 8...</p>
            <p>Sidebar content block 9...</p>
            <p>Sidebar content block 10...</p>
            <p>Sidebar content block 7...</p>
            <p>Sidebar content block 8...</p>
            <p>Sidebar content block 9...</p>
            <p>Sidebar content block 10...</p>
          </div>
        </aside> */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <h2 className="text-lg font-bold mb-4">Main Content</h2>
          <div className="space-y-6">
            <p>Main content block 1...</p>
            <p>Main content block 2...</p>
            <p>Main content block 3...</p>
            <p>Main content block 4...</p>
            <p>Main content block 5...</p>
            <p>Main content block 6...</p>
            <p>Main content block 7...</p>
            <p>Main content block 3...</p>
            <p>Main content block 4...</p>
            <p>Main content block 5...</p>
            <p>Main content block 6...</p>
            <p>Main content block 7...</p>
            <p>Main content block 8...</p>
            <p>Main content block 9...</p>
            <p>Main content block 10...</p>
          </div>
        </main>
      </div>
    </div>
  );
}
