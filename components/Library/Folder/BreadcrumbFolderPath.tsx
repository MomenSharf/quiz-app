"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { FolderPathSegment } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

type BreadcrumbProps = {
  path: FolderPathSegment[];
  currentFolderId?: string;
};

export default function BreadcrumbDemoFolderPath({
  path,
  currentFolderId,
}: BreadcrumbProps) {
  const router = useRouter();  

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs font-medium">
        <Link href="/library" className="hover:text-primary">
          LIBRARY
        </Link>
        <BreadcrumbSeparator />
        {path.map(({ id, title }) => (
          <>
            <BreadcrumbItem
              key={id}
              onClick={() => {
                if (id !== currentFolderId) {
                  router.push(`/library/folders/${id}`);
                }
              }}
              className={cn({
                "cursor-pointer hover:text-primary": id !== currentFolderId,
                "text-primary": id === currentFolderId,
              })}
            >
              {title.toUpperCase()}
            </BreadcrumbItem>
            {id !== currentFolderId && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
