import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { ReorderIcon } from "./Icon";
import { useRaisedShadow } from "@/hooks/use-raised-shadow";

interface Props {
  item: string;
  id: string
}

export const Item = ({ item, id }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={id}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <span>{item}</span>
      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  );
};
