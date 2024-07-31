import {
  QuestionValidtionType,
  QuizValidtionType,
} from "@/lib/validations/Quiz";
import { Theme_colors as colorsType } from "@/types/theme";




export const QuestionsDefaultValues: QuestionValidtionType = {
  text: "",
  imageUrl: undefined,
  options: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],
};

export const QuizDefaultValues: QuizValidtionType = {
  title: "",
  imageUrl: undefined,
  categories: [],
  description: "",
  difficulty: "EASY",
  questions: [QuestionsDefaultValues],
};

export const NumberWords: {
  [key: number]: string;
} = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
};

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

export const Theme_colors: {
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

export const categories = [
  "math",
  "sport",
  "art",
  "geography",
  "programming",
  "science",
  "cars",
  "food",
  "animals",
  "nature",
  "technology",
  "history",
  "literature",
  "politics",
  "space",
  "health",
  "fashion",
  "languages",
  "travel",
  "culture",
  "economics",
  "business",
  "mythology",
  "architecture",
  "psychology",
  "education",
  "philosophy",
  "environment",
  "sociology",
  "religion",
  "engineering",
  "media",
  "games",
  "law",
  "mathematics",
  "philosophy",
  "design",
  "anthropology",
  "astronomy",
  "chemistry",
];

export const categoriesWithLabel = [
  { value: "math", label: "Math" },
  { value: "sport", label: "Sport" },
  { value: "art", label: "Art" },
  { value: "geography", label: "Geography" },
  { value: "programming", label: "Programming" },
  { value: "science", label: "Science" },
  { value: "cars", label: "Cars" },
  { value: "food", label: "Food" },
  { value: "animals", label: "Animals" },
  { value: "nature", label: "Nature" },
  { value: "technology", label: "Technology" },
  { value: "history", label: "History" },
  { value: "literature", label: "Literature" },
  { value: "politics", label: "Politics" },
  { value: "space", label: "Space" },
  { value: "health", label: "Health" },
  { value: "fashion", label: "Fashion" },
  { value: "languages", label: "Languages" },
  { value: "travel", label: "Travel" },
  { value: "culture", label: "Culture" },
  { value: "economics", label: "Economics" },
  { value: "business", label: "Business" },
  { value: "mythology", label: "Mythology" },
  { value: "architecture", label: "Architecture" },
  { value: "psychology", label: "Psychology" },
  { value: "education", label: "Education" },
  { value: "philosophy", label: "Philosophy" },
  { value: "environment", label: "Environment" },
  { value: "sociology", label: "Sociology" },
  { value: "religion", label: "Religion" },
  { value: "engineering", label: "Engineering" },
  { value: "media", label: "Media" },
  { value: "games", label: "Games" },
  { value: "law", label: "Law" },
  { value: "mathematics", label: "Mathematics" },
  { value: "philosophy", label: "Philosophy" },
  { value: "design", label: "Design" },
  { value: "anthropology", label: "Anthropology" },
  { value: "astronomy", label: "Astronomy" },
  { value: "chemistry", label: "Chemistry" },
];

import { Icons } from "@/components/icons";
import { User } from "lucide-react";

export const MobileSideBarItems = [
  {
    route: "/",
    label: "Home",
    icon: Icons.home, // Replace with actual SVG icon component or path
  },
  {
    route: "/my-quizzes",
    label: "My Quizzes",
    icon: Icons.myQuizzes, // Replace with actual SVG icon component or path
  },
  {
    route: "/quizzes",
    label: "Quizzes",
    icon: Icons.quizzes, // Replace with actual SVG icon component or path
  },
  {
    route: "/profile",
    label: "Profile",
    icon: Icons.profile  , // Replace with actual SVG icon component or path
  },
];
export const DescktopSideBarItems = [
  {
    route: "/",
    label: "Home",
    icon: Icons.home, // Replace with actual SVG icon component or path
  },
  {
    route: "/my-quizzes",
    label: "My Quizzes",
    icon: Icons.myQuizzes, // Replace with actual SVG icon component or path
  },
  {
    route: "/quizzes",
    label: "Quizzes",
    icon: Icons.quizzes, // Replace with actual SVG icon component or path
  },
];
