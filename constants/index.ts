import { Icons } from "@/components/icons";
import { THEME_COLORS as colorsType } from "@/types/theme";
import { QuestionType } from "@prisma/client";
import { LucideProps } from "lucide-react";

export const UNSAVED_ID_PREFIX = "unsaved-";

export const COLORS: colorsType[] = [
  "zinc",
  "slate",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
];

export const THEME_COLORS: {
  id: number;
  label: colorsType;
  color: string;
}[] = [
  { id: 1, label: "zinc", color: "#7F8C8D" },
  { id: 2, label: "slate", color: "#6C7A89" },
  { id: 3, label: "red", color: "#E74C3C" },
  { id: 4, label: "rose", color: "#FF66CC" },
  { id: 5, label: "orange", color: "#F39C12" },
  { id: 6, label: "green", color: "#27AE60" },
  { id: 7, label: "blue", color: "#2980B9" },
  { id: 8, label: "yellow", color: "#F1C40F" },
  { id: 9, label: "violet", color: "#7c3aed" },
];

// export const CATEGORIES = [
//   "math",
//   "sport",
//   "art",
//   "geography",
//   "programming",
//   "science",
//   "cars",
//   "food",
//   "animals",
//   "nature",
//   "technology",
//   "history",
//   "literature",
//   "politics",
//   "space",
//   "health",
//   "fashion",
//   "languages",
//   "travel",
//   "culture",
//   "economics",
//   "business",
//   "mythology",
//   "architecture",
//   "psychology",
//   "education",
//   "philosophy",
//   "environment",
//   "sociology",
//   "religion",
//   "engineering",
//   "media",
//   "games",
//   "law",
//   "mathematics",
//   "philosophy",
//   "design",
//   "anthropology",
//   "astronomy",
//   "chemistry",
// ];

// export const CATEGORIES_WITH_LABEL = [
//   { value: "math", label: "Math" },
//   { value: "sport", label: "Sport" },
//   { value: "art", label: "Art" },
//   { value: "geography", label: "Geography" },
//   { value: "programming", label: "Programming" },
//   { value: "science", label: "Science" },
//   { value: "cars", label: "Cars" },
//   { value: "food", label: "Food" },
//   { value: "animals", label: "Animals" },
//   { value: "nature", label: "Nature" },
//   { value: "technology", label: "Technology" },
//   { value: "history", label: "History" },
//   { value: "literature", label: "Literature" },
//   { value: "politics", label: "Politics" },
//   { value: "space", label: "Space" },
//   { value: "health", label: "Health" },
//   { value: "fashion", label: "Fashion" },
//   { value: "languages", label: "Languages" },
//   { value: "travel", label: "Travel" },
//   { value: "culture", label: "Culture" },
//   { value: "economics", label: "Economics" },
//   { value: "business", label: "Business" },
//   { value: "mythology", label: "Mythology" },
//   { value: "architecture", label: "Architecture" },
//   { value: "psychology", label: "Psychology" },
//   { value: "education", label: "Education" },
//   { value: "philosophy", label: "Philosophy" },
//   { value: "environment", label: "Environment" },
//   { value: "sociology", label: "Sociology" },
//   { value: "religion", label: "Religion" },
//   { value: "engineering", label: "Engineering" },
//   { value: "media", label: "Media" },
//   { value: "games", label: "Games" },
//   { value: "law", label: "Law" },
//   { value: "mathematics", label: "Mathematics" },
//   { value: "philosophy", label: "Philosophy" },
//   { value: "design", label: "Design" },
//   { value: "anthropology", label: "Anthropology" },
//   { value: "astronomy", label: "Astronomy" },
//   { value: "chemistry", label: "Chemistry" },
// ];

export const DESKTOP_SIDEBAR_ITEMS = [
  {
    route: "/",
    label: "Home",
    icon: Icons.home, // Replace with actual SVG icon component or path
  },
  {
    route: "/dashboard",
    label: "Dashboard",
    icon: Icons.dashboard, // Replace with actual SVG icon component or path
  },
  {
    route: "/quizzes",
    label: "Quizzes",
    icon: Icons.quizzes, // Replace with actual SVG icon component or path
  },
  {
    route: "/settings",
    label: "Settings",
    icon: Icons.settings, // Replace with actual SVG icon component or path
  },
  {
    route: "/profile",
    label: "Profile",
    icon: Icons.profile, // Replace with actual SVG icon component or path
  },
  {
    route: "/bookmarked",
    label: "Bookmarked",
    icon: Icons.bookmark, // Replace with actual SVG icon component or path
  },
  {
    route: "/notifications",
    label: "Notifications",
    icon: Icons.notification, // Replace with actual SVG icon component or path
  },
];

export const PASTEL_COLORS = {
  violet: "hsl(262, 83%, 95%)",
  red: "hsl(0, 100%, 95%)",
  orange: "hsl(30, 100%, 95%)",
  rose: "hsl(340, 100%, 95%)",
  green: "hsl(120, 60%, 95%)",
  blue: "hsl(220, 100%, 95%)",
  yellow: "hsl(60, 100%, 95%)",
  slate: "hsl(210, 20%, 95%)",
  zinc: "hsl(0, 0%, 90%)", // A soft pastel gray "zinc"
};

export const QUESTION_TYPES: QuestionType[] = [
  "UNSELECTED",
  "SINGLE_CHOICE",
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
  "FILL_IN_THE_BLANK",
  "SHORT_ANSWER",
  "MATCHING_PAIRS",
  "ORDER",
  "PICK_IMAGE",
  "CODE",
] as const;

export const VISIBILITY_OPTIONS = ["PUBLIC", "PRIVATE"] as const;

export const DIFFICULTY_LEVELS = ["EASY", "MEDIUM", "HARD"] as const;

export const QUESTION_TYPES_WITH_LABEL_AND_ICONS: {
  value: (typeof QUESTION_TYPES)[number];
  label: string;
  icon: (props: LucideProps) => JSX.Element;
}[] = [
  {
    value: "SINGLE_CHOICE",
    label: "Single Choice",
    icon: Icons.checkSquare,
  },
  {
    value: "MULTIPLE_CHOICE",
    label: "Multiple Choice",
    icon: Icons.checkList,
  },
  {
    value: "TRUE_FALSE",
    label: "True/False",
    icon: Icons.trueFalse,
  },
  {
    value: "FILL_IN_THE_BLANK",
    label: "Fill in the Blank",
    icon: Icons.write,
  },
  {
    value: "SHORT_ANSWER",
    label: "Short Answer",
    icon: Icons.write,
  },
  // {
  //   value: "LONG_ANSWER" ,
  //   label: "Long Answer",
  //   icon: Icons.write,
  // },
  {
    value: "MATCHING_PAIRS",
    label: "Matching",
    icon: Icons.match,
  },
  {
    value: "ORDER",
    label: "Order",
    icon: Icons.reorder,
  },
  {
    value: "PICK_IMAGE",
    label: "Picture Choice",
    icon: Icons.picture,
  },
  {
    value: "CODE",
    label: "Code",
    icon: Icons.code,
  },
];
