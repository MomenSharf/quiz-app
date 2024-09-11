// import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function App() {
  const [items, setItems] = useState(initialItems);

  const generateId = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return `id-${hash}`;
  }

  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items.map((item, i) => {
        const id = generateId(item)
        return <Item key={id} id={id} item={item} />
      }
      )}
    </Reorder.Group>
  );
}