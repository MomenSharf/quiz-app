'use client'
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "@/components/item";

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function Page() {
  const [items, setItems] = useState(initialItems);

  return (
    <Reorder.Group
      axis="y"
      onReorder={setItems}
      values={items}
      style={{ height: 250, border: "1px solid black", overflowY: "auto" }}
      layoutScroll
    >
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}
