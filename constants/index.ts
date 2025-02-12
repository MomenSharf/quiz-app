import { Icons } from "@/components/icons";
import {
  Category,
  ImageManagerTabsType,
  LibrarySortOption,
  SearchQuizessArgs,
  SearchSortOption,
} from "@/types";
import { THEME_COLORS as colorsType } from "@/types/theme";
import { Prisma, QuestionType } from "@prisma/client";
import { subMonths } from "date-fns";
import { LucideProps } from "lucide-react";

export const PAGE_SIZE = 12

export const AVATAR_COLORS = [
  "#1ABC9C", // Turquoise
  "#2ECC71", // Emerald
  "#3498DB", // Peter River
  "#9B59B6", // Amethyst
  "#E74C3C", // Alizarin
  "#F1C40F", // Sunflower
  "#E67E22", // Carrot
  "#34495E", // Wet Asphalt
];

export const IMAGE_MANAGER_TABS: {
  label: string;
  value: ImageManagerTabsType;
}[] = [
  { label: "Upload", value: "upload" },
  { label: "Stock Photos", value: "stockPhotos" },
  { label: "Giphy GIFs", value: "giphyGIFS" },
];

export const UNSAVED_ID_PREFIX = "unsaved-";

export const LIBRARY_SORT_OPTIONS: LibrarySortOption[] = [
  "alphabetical",
  "reverseAlphabetical",
  "recentUpdate",
  "recentCreate",
  "oldestCreate",
  "oldestUpdate",
];
export const SEARCH_SORT_OPTIONS: SearchSortOption[] = [
  "highestRated",
  "mostRecent",
  "popular",
];

export const LIBRARY_SORT_OPTIONS_WITH_LABEL: {
  value: LibrarySortOption;
  label: string;
}[] = [
  { value: "alphabetical", label: "Alphabetical" },
  { value: "reverseAlphabetical", label: "Reverse Alphabetical" },
  { value: "recentUpdate", label: "Recently Updated" },
  { value: "recentCreate", label: "Recently Created" },
  { value: "oldestCreate", label: "Oldest Created" },
  { value: "oldestUpdate", label: "Oldest Updated" },
];
export const SEARCH_SORT_OPTIONS_WITH_LABEL: {
  value: SearchSortOption;
  label: string;
}[] = [
  { value: "highestRated", label: "Highes Rated" },
  { value: "popular", label: "Popular" },
  { value: "mostRecent", label: "Most Recent" },
];

export const COLORS: colorsType[] = [
  "zinc",
  "slate",
  "red",
  "rose",
  "orange",
  // "green",
  "blue",
  // "yellow",
  "violet",
];

export const THEME_COLORS: {
  id: number;
  label: colorsType;
  color: string;
}[] = [
  { id: 1, label: "violet", color: "#7c3aed" },
  { id: 2, label: "red", color: "#E74C3C" },
  { id: 3, label: "rose", color: "#FF66CC" },
  { id: 4, label: "orange", color: "#F39C12" },
  { id: 5, label: "blue", color: "#2980B9" },
  { id: 6, label: "zinc", color: "#7F8C8D" },
  { id: 7, label: "slate", color: "#6C7A89" },
  // { id: 6, label: "green", color: "#27AE60" },
  // { id: 8, label: "yellow", color: "#F1C40F" },
];

export const CATEGORIES: Category[] = [
  "SCIENCE",
  "MATH",
  "HISTORY",
  "GEOGRAPHY",
  "LITERATURE",
  "TECHNOLOGY",
  "SPORTS",
  "ART",
  "LANGUAGE",
  "GENERAL_KNOWLEDGE",
  "POLITICS",
  "ECONOMICS",
  "PHILOSOPHY",
  "PSYCHOLOGY",
  "BIOLOGY",
  "CHEMISTRY",
  "PHYSICS",
  "COMPUTER_SCIENCE",
  "RELIGION",
  "NATURE",
  "EDUCATION",
];

export const DESKTOP_SIDEBAR_ITEMS = [
  {
    route: "/",
    label: "Home",
    icon: Icons.home, // Replace with actual SVG icon component or path
  },
  {
    route: "/library",
    label: "Library",
    icon: Icons.library, // Replace with actual SVG icon component or path
  },
  {
    route: "/settings",
    label: "Settings",
    icon: Icons.settings, // Replace with actual SVG icon component or path
  },
  {
    route: "/search?isBookmarked=true",
    label: "Bookmarks",
    icon: Icons.bookmark, // Replace with actual SVG icon component or path
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

export const VISIBILITY_TYPE = ["PUBLIC", "PRIVATE"] as const;
export const VISIBILITY_OPTIONS = [
  { value: "PUBLIC", label: "Public" },
  { value: "PRIVATE", label: "Private" },
] as const;

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

export const CATEGORY_OPTIONS_LIST: {
  label: string;
  value: Category;
  id: number;
  color: string;
  icon: React.ElementType; // Store the actual icon component
}[] = [
  {
    label: "Science",
    value: "SCIENCE",
    id: 1,
    color: "--green-dark",
    icon: Icons.science,
  },
  {
    label: "Math",
    value: "MATH",
    id: 2,
    color: "--blue-dark",
    icon: Icons.math,
  },
  {
    label: "History",
    value: "HISTORY",
    id: 3,
    color: "--amber",
    icon: Icons.calendar,
  },
  {
    label: "Geography",
    value: "GEOGRAPHY",
    id: 4,
    color: "--teal",
    icon: Icons.map,
  },
  {
    label: "Literature",
    value: "LITERATURE",
    id: 5,
    color: "--purple-dark",
    icon: Icons.book,
  },
  {
    label: "Technology",
    value: "TECHNOLOGY",
    id: 6,
    color: "--indigo",
    icon: Icons.cpu,
  },
  {
    label: "Sports",
    value: "SPORTS",
    id: 7,
    color: "--red",
    icon: Icons.shose,
  },
  {
    label: "Art",
    value: "ART",
    id: 8,
    color: "--pink",
    icon: Icons.paintbrush,
  },
  {
    label: "Language",
    value: "LANGUAGE",
    id: 9,
    color: "--deep-orange",
    icon: Icons.language,
  },
  {
    label: "General",
    value: "GENERAL_KNOWLEDGE",
    id: 10,
    color: "--yellow",
    icon: Icons.discover,
  },
  {
    label: "Politics",
    value: "POLITICS",
    id: 11,
    color: "--navy",
    icon: Icons.politics,
  },
  {
    label: "Economics",
    value: "ECONOMICS",
    id: 12,
    color: "--orange",
    icon: Icons.dollar,
  },
  {
    label: "Philosophy",
    value: "PHILOSOPHY",
    id: 13,
    color: "--gray-extra-dark",
    icon: Icons.document,
  },
  {
    label: "Psychology",
    value: "PSYCHOLOGY",
    id: 14,
    color: "--pink-dark",
    icon: Icons.brain,
  },
  {
    label: "Biology",
    value: "BIOLOGY",
    id: 15,
    color: "--light-green",
    icon: Icons.microscope,
  },
  {
    label: "Chemistry",
    value: "CHEMISTRY",
    id: 16,
    color: "--blue",
    icon: Icons.chemistry,
  },
  {
    label: "Physics",
    value: "PHYSICS",
    id: 17,
    color: "--gray-dark",
    icon: Icons.physics,
  },
  {
    label: "Computer",
    value: "COMPUTER_SCIENCE",
    id: 18,
    color: "--amber",
    icon: Icons.computer,
  },
  {
    label: "Religion",
    value: "RELIGION",
    id: 19,
    color: "--purple-dark",
    icon: Icons.moon,
  },
  {
    label: "Nature",
    value: "NATURE",
    id: 20,
    color: "--green-dark",
    icon: Icons.mountain,
  },
  {
    label: "Education",
    value: "EDUCATION",
    id: 21,
    color: "--gray-medium",
    icon: Icons.education,
  },
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

export const QUESTION_MARK_TIMES: {
  [key in QuestionType]: number;
} = {
  UNSELECTED: 0,
  PICK_ANSWER: 3000, // 3 seconds for PickAnswer
  TRUE_FALSE: 3000, // 2 seconds for True/False
  FILL_IN_THE_BLANK: 6000, // 5 seconds for Fill-in-the-Blank
  SHORT_ANSWER: 8000, // 4 seconds for Short Answer
  MATCHING_PAIRS: 8000, // 6 seconds for Matching Pairs
  ORDER: 8000, // 7 seconds for Order type questions
};

export const HOME: {
  title: string;
  args: SearchQuizessArgs;
  route: string;
}[] = [
  {
    title: "Most Recent",
    args: {
      sortOption: "mostRecent",
    },
    route: "/search?sortBy=mostRecent",
  },
  {
    title: "Popular",
    args: {
      sortOption: "popular",
    },
    route: "/search?sortBy=popular",
  },
  {
    title: "Random selection",
    args: {},
    route: "/search",
  },
];
