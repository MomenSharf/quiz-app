// updateQuestionType.ts

type QuestionType = 
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "fill-in-the-blank"
  | "short-answer"
  | "long-answer"
  | "matching"
  | "order"
  | "ranking"
  | "picture-choice"
  | "drag-and-drop"
  | "interactive"
  | "code";

// Function to update question based on selected type
export function updateQuestionType(question: any, type: QuestionType) {
  switch (type) {
    case "single-choice":
      return {
        ...question,
        type,
        options: ["", "", "", ""],
        correctAnswer: ""
      };
    case "multiple-choice":
      return {
        ...question,
        type,
        options: ["", "", "", ""],
        correctAnswers: [""]
      };
    case "true-false":
      return {
        ...question,
        type,
        correctAnswer: "true" // Default to true, can be updated
      };
    case "fill-in-the-blank":
      return {
        ...question,
        type,
        correctAnswer: ""
      };
    case "short-answer":
      return {
        ...question,
        type,
        correctAnswer: ""
      };
    case "long-answer":
      return {
        ...question,
        type,
        correctAnswer: ""
      };
    case "matching":
      return {
        ...question,
        type,
        options: [
          { item: "", match: "" },
          { item: "", match: "" }
        ]
      };
    case "order":
      return {
        ...question,
        type,
        correctOrder: [""]
      };
    case "ranking":
      return {
        ...question,
        type,
        items: [""],
        correctRanking: [""]
      };
    case "picture-choice":
      return {
        ...question,
        type,
        options: [
          { imageUrl: "", label: "" },
          { imageUrl: "", label: "" }
        ],
        correctAnswer: ""
      };
    case "drag-and-drop":
      return {
        ...question,
        type,
        items: [
          { item: "", correctPosition: 0 }
        ]
      };
    case "interactive":
      return {
        ...question,
        type,
        correctAnswer: ""
        // Additional interactive elements can be added here
      };
    case "code":
      return {
        ...question,
        type,
        codeSnippet: "",
        correctAnswer: ""
      };
    default:
      return {
        ...question,
        type: "UNSPECIFIED" // If the type is not recognized, keep it unspecified
      };
  }
}
