import { LucideProps } from "lucide-react";

export const Icons = {
  home: (props: LucideProps) => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-inherit"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
        fill="#1C274C"
      />
    </svg>
  ),
  myQuizzes: (props: LucideProps) => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      id="present-line"
      {...props}
    >
      <path d="M21,3H3A1,1,0,0,0,3,5V16a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V5a1,1,0,0,0,0-2ZM9,13a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V8a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Zm-6.92,6-1.3,1.62A1,1,0,0,1,8,21a1,1,0,0,1-.62-.22,1,1,0,0,1-.16-1.4l.3-.38Zm6.54,1.78A1,1,0,0,1,16,21a1,1,0,0,1-.78-.38L13.92,19h2.56l.3.38A1,1,0,0,1,16.62,20.78Z"></path>
    </svg>
  ),
  quizzes: (props: LucideProps) => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-inherit"
        d="M10.5766 8.70419C11.2099 7.56806 11.5266 7 12 7C12.4734 7 12.7901 7.56806 13.4234 8.70419L13.5873 8.99812C13.7672 9.32097 13.8572 9.48239 13.9975 9.5889C14.1378 9.69541 14.3126 9.73495 14.6621 9.81402L14.9802 9.88601C16.2101 10.1643 16.825 10.3034 16.9713 10.7739C17.1176 11.2443 16.6984 11.7345 15.86 12.715L15.643 12.9686C15.4048 13.2472 15.2857 13.3865 15.2321 13.5589C15.1785 13.7312 15.1965 13.9171 15.2325 14.2888L15.2653 14.6272C15.3921 15.9353 15.4554 16.5894 15.0724 16.8801C14.6894 17.1709 14.1137 16.9058 12.9622 16.3756L12.6643 16.2384C12.337 16.0878 12.1734 16.0124 12 16.0124C11.8266 16.0124 11.663 16.0878 11.3357 16.2384L11.0378 16.3756C9.88634 16.9058 9.31059 17.1709 8.92757 16.8801C8.54456 16.5894 8.60794 15.9353 8.7347 14.6272L8.76749 14.2888C8.80351 13.9171 8.82152 13.7312 8.76793 13.5589C8.71434 13.3865 8.59521 13.2472 8.35696 12.9686L8.14005 12.715C7.30162 11.7345 6.88241 11.2443 7.02871 10.7739C7.17501 10.3034 7.78993 10.1643 9.01977 9.88601L9.33794 9.81402C9.68743 9.73495 9.86217 9.69541 10.0025 9.5889C10.1428 9.48239 10.2328 9.32097 10.4127 8.99812L10.5766 8.70419Z"
        fill="#1C274C"
      />
      <path
        className="fill-inherit"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM18.5304 5.46955C18.8233 5.76245 18.8233 6.23732 18.5304 6.53021L18.1872 6.87348C17.8943 7.16637 17.4194 7.16637 17.1265 6.87348C16.8336 6.58058 16.8336 6.10571 17.1265 5.81282L17.4698 5.46955C17.7627 5.17666 18.2376 5.17666 18.5304 5.46955ZM5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L6.87359 5.81293C7.16648 6.10582 7.16648 6.5807 6.87359 6.87359C6.5807 7.16648 6.10582 7.16648 5.81293 6.87359L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM6.87348 17.1265C7.16637 17.4194 7.16637 17.8943 6.87348 18.1872L6.53043 18.5302C6.23754 18.8231 5.76266 18.8231 5.46977 18.5302C5.17688 18.2373 5.17688 17.7625 5.46977 17.4696L5.81282 17.1265C6.10571 16.8336 6.58058 16.8336 6.87348 17.1265ZM17.1265 17.1267C17.4194 16.8339 17.8943 16.8339 18.1872 17.1267L18.5302 17.4698C18.8231 17.7627 18.8231 18.2376 18.5302 18.5305C18.2373 18.8233 17.7624 18.8233 17.4695 18.5305L17.1265 18.1874C16.8336 17.8945 16.8336 17.4196 17.1265 17.1267ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"
        fill="#1C274C"
      />
    </svg>
  ),

  profile: (props: LucideProps) => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="style=fill">
        <g id="profile">
          <path
            className="fill-inherit"
            id="vector (Stroke)"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
            fill="#000000"
          />
          <path
            className="fill-inherit"
            id="rec (Stroke)"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
            fill="#000000"
          />
        </g>
      </g>
    </svg>
  ),
};