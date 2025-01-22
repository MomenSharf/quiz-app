import { QuestionType, Visibility } from "@prisma/client";
import { z } from "zod";
// Define schemas for different question types
const visibilityEnum = z.enum(
  Object.values(Visibility) as [Visibility, ...Visibility[]]
);

// this only when the user add new question and no type is selected yet do't save it in database
export const unselectedSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.UNSELECTED),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
});
/* 
example :
{
  "id": "uuid-1",
  "type": "PICK_ANSWER",
  "questionOrder": 0,
  "timeLimit": 10000,
  "points": 10,
  items: [
  {
  id: "uuid-1",
  text: "Option 1",
  isCorrect: false,
  },
  {
  id: "uuid-2",
  text: "Option 2",
  isCorrect: true,
  },  
  {
  id: "uuid-3",
  text: "Option 3",
  isCorrect: false,
  },  
  ]  
}
*/
export const pickAnswerSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.PICK_ANSWER),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Option is required"),
        isCorrect: z.boolean(),
      })
    )
    .min(2, "At least two options are required")
    .refine((items) => items.find((item) => item.isCorrect), {
      message: "At least one item must be marked as correct",
      path: ["oneCorrectAnswer"],
    }),
});

/*
 example :
{
  "id": "uuid-1",
  "type": "TRUE_FALSE",
  "questionOrder": 0,
  "timeLimit": 10000,
  "points": 10,
  imageUrl: "thumbnail-image-url",
  question: "Is this a correct sentence?",
  correctAnswer: "true"
}
 */
export const trueFalseSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.TRUE_FALSE),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.union([z.literal("true"), z.literal("false")]),
});

/*
 I need u here to make question items cames from the question word and any items whit isBlank but make it realistic and egnore those [" ", "\t", "\r", "\f", "?", "!", "/", "@", "$", ">", "<", "*", "+", "-", "(", ")", "[", "]", "{", "}", ":", ";", "'", "\"", "`", "|", "&", "^", "%", ",", ".", "\\"]
 example :
{
  "id": "uuid-1",
  "type": "FILL_IN_THE_BLANK",
  "questionOrder": 0,
  "timeLimit": 10000,
  "points": 10,
  imageUrl: "thumbnail-image-url",
  question: "I eat pizza and drenk orange",
  items: [
  {
    id: "uuid-1",
    text: "I",
    isBlank: false,
  },
  {
    id: "uuid-2",
    text: "eat",
    isBlank: false,
  },
  {
    id: "uuid-3",
    text: "pizza",
    isBlank: true,
  }, 
  {
   id: "uuid-4",
    text: "and",
    isBlank: false,
  },
  {
   id: "uuid-4",
    text: "drunk",
    isBlank: false,
  },
  {
   id: "uuid-5",
    text: "orange",
    isBlank: true,
  },  
  ]  
}
*/
export const fillInTheBlankSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.FILL_IN_THE_BLANK),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        isBlank: z.boolean(),
      })
    )
    .min(3, "At least three items are required")
    .refine((items) => items.filter((item) => item.isBlank).length > 1, {
      message: "At least tow blank items",
      path: ["towBlanks"],
    }),
});

/*
 example :
{
  "id": "uuid-1",
  "type": "MULTIPLE_CHOICE",
  "questionOrder": 0,
  "timeLimit": 10000,
  "points": 10,
  imageUrl: "thumbnail-image-url",
  question: "What does a cat eat?",
  correctAnswer : fish
}
*/
export const shortAnswerSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.SHORT_ANSWER),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

/*
 example :
 {
  "id": "uuid-1",
  "type": "MATCHING_PAIRS",
  "questionOrder": 0,
  "timeLimit": 10000,
  "points": 10,
  imageUrl: "thumbnail-image-url",
  question: "Which animal is this?",
  items: [
  {
   id: "uuid-1",
    text: "Elephant",
    match: "tusk",
  },
  {
   id: "uuid-2",
    text: "Lion",
    match: "paw",
  },
  {
   id: "uuid-3",
    text: "Tiger",
    match: "fur",
  },
  {
   id: "uuid-4",
    text: "Giraffe",
    match: "neck",
  },
  ]
}
*/
export const matchingPairsSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.MATCHING_PAIRS),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Prompt is required"),
        match: z.string().min(1, "Answer is required"),
      })
    )
    .min(2, "At least two options are required"),
});

/*
 example :
 {
  "id": "uuid-1",
  "type": "ORDER",
  "questionOrder": 0,
  "timeLimit": 10000,
  "points": 10,
  imageUrl: "thumbnail-image-url",
  question: "Sort these items by size",
  items: [
  {
   id: "uuid-1",
    text: "Small",
    order: 1,
  },
  {
   id: "uuid-2",
    text: "Medium",
    order: 2,
  },
  {
   id: "uuid-3",
    text: "Large",
    order: 3,
  },
  ]
})
*/
export const questionOrderSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.ORDER),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, "Prompt is required"),
      order: z.number(),
    })
  ),
});

export const quizSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  imageUrl: z.string().min(5, "Thumbnail image is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"), // form this array ["SCIENCE", "MATH", "HISTORY", "GEOGRAPHY", "LITERATURE", "TECHNOLOGY", "SPORTS", "ART", "LANGUAGE", "GENERAL_KNOWLEDGE", "POLITICS", "ECONOMICS", "PHILOSOPHY", "PSYCHOLOGY", "BIOLOGY", "CHEMISTRY", "PHYSICS", "COMPUTER_SCIENCE", "RELIGION", "NATURE", "EDUCATION"]
  visibility: visibilityEnum, // 'PUBLIC', 'PRIVATE'
  questions: z
    .array(
      z.union([
        unselectedSchema,
        pickAnswerSchema,
        trueFalseSchema,
        fillInTheBlankSchema,
        shortAnswerSchema,
        matchingPairsSchema,
        questionOrderSchema,
      ])
    )
    .min(1, "At least one question is required"),
});
export const previewPlayQuizSchema = quizSchema.omit({
  description: true,
  imageUrl: true,
  categories: true,
});
export const folderSchema = quizSchema.pick({ title: true });

export type folderSchemaType = z.infer<typeof folderSchema>;
export type quizSchemaType = z.infer<typeof quizSchema>;
export type questionsSchemaType = quizSchemaType["questions"];
export type questionSchemaType = quizSchemaType["questions"][number];
export type ItemSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"][number]
  | z.infer<typeof matchingPairsSchema>["items"][number]
  | z.infer<typeof questionOrderSchema>["items"][number];
export type ItemsSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"]
  | z.infer<typeof matchingPairsSchema>["items"]
  | z.infer<typeof questionOrderSchema>["items"];
