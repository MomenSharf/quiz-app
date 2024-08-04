// Breadcrumbimport { Breadcrumbs, BreadcrumbItem, BreadcrumbLink } from '@shadcn/ui'; // Adjust the import based on actual component names and paths
// import { useRouter } from 'next/router';

// interface FolderPathSegment {
//   id: string;
//   title: string;
// }

// interface BreadcrumbProps {
//   path: FolderPathSegment[];
//   currentFolderId: string;
// }

// const Breadcrumb = ({ path, currentFolderId }: BreadcrumbProps) => {
//   const router = useRouter();

//   const handleClick = (id: string) => {
//     if (id !== currentFolderId) {
//       router.push(`/my-quizzes/folder/${id}`);
//     }
//   };

//   return (
//     <Breadcrumbs>
//       {path.map(({ id, title }, index) => (
//         <BreadcrumbItem key={id}>
//           <BreadcrumbLink
//             onClick={() => handleClick(id)}
//             isDisabled={id === currentFolderId}
//           >
//             {title}
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//       ))}
//     </Breadcrumbs>
//   );
// };

// export default Breadcrumb;
