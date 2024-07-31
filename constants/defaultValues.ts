// defaultValues.ts



export const InitialQuestion = {
  type: "unspecified",
  question: "",
  options: [],
  correctAnswer: "",
  correctAnswers: [],
  correctOrder: [],
  items: [],
  imageUrl: "",
  codeSnippet: ""
};

// Single Choice Default Values
export const SingleChoiceDefault = {
  type: "single-choice",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: ""
};

// Multiple Choice Default Values
export const MultipleChoiceDefault = {
  type: "multiple-choice",
  question: "",
  options: ["", "", "", ""],
  correctAnswers: [""]
};

// True/False Default Values
export const TrueFalseDefault = {
  type: "true-false",
  question: "",
  correctAnswer: "true"
};

// Fill in the Blank Default Values
export const FillInTheBlankDefault = {
  type: "fill-in-the-blank",
  question: "",
  correctAnswer: ""
};

// Short Answer Default Values
export const ShortAnswerDefault = {
  type: "short-answer",
  question: "",
  correctAnswer: ""
};

// Long Answer Default Values
export const LongAnswerDefault = {
  type: "long-answer",
  question: "",
  correctAnswer: ""
};

// Matching Default Values
export const MatchingDefault = {
  type: "matching",
  question: "",
  options: [
    { item: "", match: "" },
    { item: "", match: "" }
  ]
};

// Order Default Values
export const OrderDefault = {
  type: "order",
  question: "",
  correctOrder: [""]
};

// Ranking Default Values
export const RankingDefault = {
  type: "ranking",
  question: "",
  items: [""],
  correctRanking: [""]
};

// Picture Choice Default Values
export const PictureChoiceDefault = {
  type: "picture-choice",
  question: "",
  options: [
    { imageUrl: "", label: "" },
    { imageUrl: "", label: "" }
  ],
  correctAnswer: ""
};

// Drag and Drop Default Values
export const DragAndDropDefault = {
  type: "drag-and-drop",
  question: "",
  items: [
    { item: "", correctPosition: 0 }
  ]
};

// Interactive Default Values
export const InteractiveDefault = {
  type: "interactive",
  question: "",
  correctAnswer: ""
  // Additional interactive elements can be added here
};

// Code Default Values
export const CodeDefault = {
  type: "code",
  question: "",
  codeSnippet: "",
  correctAnswer: ""
};
