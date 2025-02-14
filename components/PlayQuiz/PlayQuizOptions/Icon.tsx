import { DragControls } from "framer-motion";
import { LucideProps } from "lucide-react";
import { getImgProps } from "next/dist/shared/lib/get-img-props";
import { forwardRef } from "react";

type Props = LucideProps & {
  dragControls: DragControls;
};

export const ReorderIcon = forwardRef<any, Props>(
  ({ dragControls, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        onPointerDown={(event) => dragControls.start(event)}
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 3.5C0.67157 3.5 0 2.82843 0 2C0 1.17157 0.67157 0.5 1.5 0.5C2.3284 0.5 3 1.17157 3 2C3 2.82843 2.3284 3.5 1.5 3.5zM1.5 8.5C0.67157 8.5 0 7.8284 0 7C0 6.1716 0.67157 5.5 1.5 5.5C2.3284 5.5 3 6.1716 3 7C3 7.8284 2.3284 8.5 1.5 8.5zM1.5 13.5C0.67157 13.5 0 12.8284 0 12C0 11.1716 0.67157 10.5 1.5 10.5C2.3284 10.5 3 11.1716 3 12C3 12.8284 2.3284 13.5 1.5 13.5zM6.5 3.5C5.6716 3.5 5 2.82843 5 2C5 1.17157 5.6716 0.5 6.5 0.5C7.3284 0.5 8 1.17157 8 2C8 2.82843 7.3284 3.5 6.5 3.5zM6.5 8.5C5.6716 8.5 5 7.8284 5 7C5 6.1716 5.6716 5.5 6.5 5.5C7.3284 5.5 8 6.1716 8 7C8 7.8284 7.3284 8.5 6.5 8.5zM6.5 13.5C5.6716 13.5 5 12.8284 5 12C5 11.1716 5.6716 10.5 6.5 10.5C7.3284 10.5 8 11.1716 8 12C8 12.8284 7.3284 13.5 6.5 13.5z"
          fill="#758CA3"
          className="fill-inherit stroke-inherit"
        />
      </svg>
    );
  }
);

ReorderIcon.displayName = "ReorderIcon";

// ref={ref}
// onPointerDown={(event) => dragControls.start(event)}
