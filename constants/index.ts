import { Icons } from "@/components/icons";
import { THEME_COLORS as colorsType } from "@/types/theme";
import { Category, QuestionType } from "@prisma/client";
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
  "PICK_ANSWER",
  "TRUE_FALSE",
  "FILL_IN_THE_BLANK",
  "SHORT_ANSWER",
  "MATCHING_PAIRS",
  "ORDER",
] as const;

export const VISIBILITY_OPTIONS = ["PUBLIC", "PRIVATE"] as const;

export const QUESTION_TYPES_WITH_LABEL_AND_ICONS: {
  value: QuestionType;
  label: string;
  icon: (props: LucideProps) => JSX.Element;
}[] = [
  {
    value: "PICK_ANSWER",
    label: "Pick Answer",
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
    icon: Icons.textInupt,
  },
  {
    value: "SHORT_ANSWER",
    label: "Short Answer",
    icon: Icons.write,
  },
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
];

export const TIMELIMIT_OPTIONS = [
  { label: "5 seconds", value: 5000 },
  { label: "10 seconds", value: 10000 },
  { label: "15 seconds", value: 15000 },
  { label: "20 seconds", value: 20000 },
  { label: "30 seconds", value: 30000 },
  { label: "45 seconds", value: 45000 },
  { label: "1 minute", value: 60000 },
  { label: "2 minutes", value: 120000 },
  { label: "3 minutes", value: 180000 },
  { label: "5 minutes", value: 300000 },
  { label: "10 minutes", value: 600000 },
  { label: "15 minutes", value: 900000 },
  { label: "20 minutes", value: 1200000 },
];

export const POINTS_OPTIONS = [
  { label: "1 point", value: 1 },
  { label: "2 points", value: 2 },
  { label: "3 points", value: 3 },
  { label: "4 points", value: 4 },
  { label: "5 points", value: 5 },
  { label: "6 points", value: 6 },
  { label: "7 points", value: 7 },
  { label: "8 points", value: 8 },
  { label: "9 points", value: 9 },
  { label: "10 points", value: 10 },
  { label: "11 points", value: 11 },
  { label: "12 points", value: 12 },
  { label: "13 points", value: 13 },
  { label: "14 points", value: 14 },
  { label: "15 points", value: 15 },
  { label: "16 points", value: 16 },
  { label: "17 points", value: 17 },
  { label: "18 points", value: 18 },
  { label: "19 points", value: 19 },
  { label: "20 points", value: 20 },
];

export const CATEGORY_OPTIONS_LIST: { label: string; value: Category; id: number }[] = [
  { label: "Science", value: "SCIENCE", id: 1 },
  { label: "Math", value: "MATH", id: 2 },
  { label: "History", value: "HISTORY", id: 3 },
  { label: "Geography", value: "GEOGRAPHY", id: 4 },
  { label: "Literature", value: "LITERATURE", id: 5 },
  { label: "Technology", value: "TECHNOLOGY", id: 6 },
  { label: "Sports", value: "SPORTS", id: 7 },
  { label: "Art", value: "ART", id: 8 },
  { label: "Language", value: "LANGUAGE", id: 9 },
  { label: "General Knowledge", value: "GENERAL_KNOWLEDGE", id: 10 },
  { label: "Politics", value: "POLITICS", id: 11 },
  { label: "Economics", value: "ECONOMICS", id: 12 },
  { label: "Philosophy", value: "PHILOSOPHY", id: 13 },
  { label: "Psychology", value: "PSYCHOLOGY", id: 14 },
  { label: "Biology", value: "BIOLOGY", id: 15 },
  { label: "Chemistry", value: "CHEMISTRY", id: 16 },
  { label: "Physics", value: "PHYSICS", id: 17 },
  { label: "Computer Science", value: "COMPUTER_SCIENCE", id: 18 },
  { label: "Religion", value: "RELIGION", id: 19 },
  { label: "Nature", value: "NATURE", id: 20 },
  { label: "Education", value: "EDUCATION", id: 21 },
];


export const LETTER_MAPPING: { [key: number]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "L",
  12: "M",
  13: "N",
  14: "O",
  15: "P",
  16: "Q",
  17: "R",
  18: "S",
  19: "T",
  20: "U",
  21: "V",
  22: "W",
  23: "X",
  24: "Y",
  25: "Z",
};
