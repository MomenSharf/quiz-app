import Quiz from "@/components/Quiz/Quiz";
import { getQuiz } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  // const session = await getCurrentUser();

  // if (!session) {
  //   return redirect("/login");
  // }

  // const quiz = await getQuiz(quizId);

  // if (!quiz) {
  //   return notFound();
  // }

  return <Quiz quiz={{
    "id": "cm3lw7n520002mo91uj9npy4d",
    "title": "Pick Answer",
    "description": "this is the Descrption",
    "image": null,
    "visibility": "PUBLIC",
    "categories": [
        "MATH",
        "GENERAL_KNOWLEDGE",
        "GEOGRAPHY"
    ],
    "createdAt": "2024-11-17T17:50:51.106Z",
    "updatedAt": "2024-11-21T18:44:24.614Z",
    "questions": [
        {
            "id": "cm3rnvxd2001o8r4h8wwi8cew",
            "type": "PICK_ANSWER",
            "question": "what is Your Name",
            "correctAnswer": null,
            "quizId": "cm3lw7n520002mo91uj9npy4d",
            "questionOrder": 0,
            "categories": [],
            "imageId": null,
            "timeLimit": 10000,
            "points": 10,
            "image": null,
            "items": [
                {
                    "id": "cm3rnvxd3001p8r4hpy8jjx1h",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd2001o8r4h8wwi8cew",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd3001q8r4h7nbhht4j",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd2001o8r4h8wwi8cew",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd3001r8r4hrh9xey12",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd2001o8r4h8wwi8cew",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd3001s8r4hc3fzet77",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd2001o8r4h8wwi8cew",
                    "imageId": null
                }
            ]
        },
        {
            "id": "cm3rnvxd3001t8r4hacp709x3",
            "type": "PICK_ANSWER",
            "question": "what is Your Name",
            "correctAnswer": null,
            "quizId": "cm3lw7n520002mo91uj9npy4d",
            "questionOrder": 1,
            "categories": [],
            "imageId": null,
            "timeLimit": 15000,
            "points": 10,
            "image": null,
            "items": [
                {
                    "id": "cm3rnvxd3001u8r4h8r3nqm0p",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001t8r4hacp709x3",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd3001v8r4h46t4s6d2",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001t8r4hacp709x3",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd3001w8r4hwl6uhji7",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001t8r4hacp709x3",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd3001x8r4hl1g0ie4k",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001t8r4hacp709x3",
                    "imageId": null
                }
            ]
        },
        {
            "id": "cm3rnvxd3001y8r4hh06irhim",
            "type": "PICK_ANSWER",
            "question": "what is Your Name",
            "correctAnswer": null,
            "quizId": "cm3lw7n520002mo91uj9npy4d",
            "questionOrder": 2,
            "categories": [],
            "imageId": null,
            "timeLimit": 30000,
            "points": 10,
            "image": null,
            "items": [
                {
                    "id": "cm3rnvxd3001z8r4h19fo85jx",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001y8r4hh06irhim",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd300208r4huiw7s125",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001y8r4hh06irhim",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd300218r4hh9ln94x2",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001y8r4hh06irhim",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd300228r4hgnb5qzz4",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd3001y8r4hh06irhim",
                    "imageId": null
                }
            ]
        },
        {
            "id": "cm3rnvxd300238r4huw9v7wtg",
            "type": "PICK_ANSWER",
            "question": "what is Your Name",
            "correctAnswer": null,
            "quizId": "cm3lw7n520002mo91uj9npy4d",
            "questionOrder": 3,
            "categories": [],
            "imageId": null,
            "timeLimit": 10000,
            "points": 10,
            "image": null,
            "items": [
                {
                    "id": "cm3rnvxd300248r4hv4eq7vrf",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd300238r4huw9v7wtg",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd300258r4hx03c4m76",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd300238r4huw9v7wtg",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd300268r4hwdpfcv6y",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd300238r4huw9v7wtg",
                    "imageId": null
                },
                {
                    "id": "cm3rnvxd300278r4htykdcp59",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rnvxd300238r4huw9v7wtg",
                    "imageId": null
                }
            ]
        }
    ],
    "user": {
        "id": "cm3lw2wo00000mo915ozxqgds",
        "name": "momen",
        "email": "momen@gmail.com",
        "emailVerified": null,
        "image": null,
        "username": "WnY1jlIT65",
        "createdAt": "2024-11-17T17:47:10.177Z",
        "updatedAt": "2024-11-17T17:47:34.886Z",
        "password": "$2b$10$XK0C6Pm8JIdeTlUsXaAz5.PSmuMnpNqFimC3UT8IjVoMx.O5NIk4y"
    }
}} />;
}
