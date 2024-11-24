"use client";
import { useScroller } from "@/hooks/useScroller";
import React from "react";
import Quiz from "../Quiz/Quiz";
import QuizCard from "../Quiz/QuizCard";
import QuizzesScrollerCard from "./QuizScollerCard";
import { EditorQuiz, PlayQuizType } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function QuizzesScroller() {
  const { isLeftVisible, isRightVisible, sliderRef, goLeft, goRight } =
    useScroller(300);
  const quizzes: EditorQuiz[] = [
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    }, {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
    {
      id: "cm3u8xk0v000h14e49hc87x8z",
      title: "My new Quiz",
      description: "",
      image: null,
      visibility: "PUBLIC",
      categories: [],
      createdAt: new Date("2024-11-23T14:09:04.921Z"),
      updatedAt: new Date("2024-11-23T14:09:04.921Z"),
      questions: [
        {
          id: "cm3u8xk0w000i14e494q3gzt8",
          type: "UNSELECTED",
          question: null,
          correctAnswer: null,
          quizId: "cm3u8xk0v000h14e49hc87x8z",
          questionOrder: 0,
          categories: [],
          imageId: null,
          timeLimit: 5000,
          points: 10,
          image: null,
          items: [],
        },
      ],
      user: {
        id: "cm3u63z9l0000iadx5mjub1sg",
        name: "momen",
        email: "momen@gmail.com",
        emailVerified: null,
        image: null,
        username: "cD7AMZnpU3",
        createdAt: new Date("2024-11-23T12:50:05.769Z"),
        updatedAt: new Date("2024-11-23T12:50:16.310Z"),
        password:
          "$2b$10$ormKgOcdVTkC90Wg8Ca81.3gEEU9/u3h6JB40uKah0R.ltO/I6vMa",
      },
      rates: [],
    },
  ];

  return (
    <div className="flex flex-col">
      <h3>CATEGORIES</h3>
      <div className="relative w-full p-1 overflow-hidden">
        {isLeftVisible && (
          <div
            className="cursor-pointer group absolute z-[2] top-1/2 left-1 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full flex justify-center items-center"
            onClick={goLeft}
          >
            <ChevronLeft
              className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary"
              onClick={goLeft}
            />
          </div>
        )}
        <div
          ref={sliderRef}
          className="flex gap-3 py-1 transition-transform overflow-x-scroll no-scrollbar "
        >
          {quizzes.map((quiz, i) => {
            return <QuizzesScrollerCard key={quiz.id} quiz={quiz} index={i} />;
          })}
        </div>
        {isRightVisible && (
          <div
            className="cursor-pointer group absolute z-[2] top-1/2 right-1 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full flex justify-center items-center"
            onClick={goRight}
          >
            <ChevronRight className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}