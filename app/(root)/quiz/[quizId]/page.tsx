import Quiz from "@/components/Quiz/Quiz";
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
        "GENERAL_KNOWLEDGE",
        "POLITICS",
        "ECONOMICS",
        "SPORTS",
        "LANGUAGE"
    ],
    "createdAt": new Date("2024-11-17T17:50:51.106Z"),
    "updatedAt": new Date("2024-11-21T19:23:56.662Z"),
    "questions": [
        {
            "id": "cm3rparna004g8r4hnounxm2c",
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
                    "id": "cm3rparnb004h8r4h4pgl8dnx",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparna004g8r4hnounxm2c",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004i8r4hp7jxw306",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparna004g8r4hnounxm2c",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004j8r4hsguxcpw8",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparna004g8r4hnounxm2c",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004k8r4hzd8r0iq1",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparna004g8r4hnounxm2c",
                    "imageId": null
                }
            ]
        },
        {
            "id": "cm3rparnb004l8r4hwe5r8bfv",
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
                    "id": "cm3rparnb004m8r4hslg7yr1y",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004l8r4hwe5r8bfv",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004n8r4hr23z97bd",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004l8r4hwe5r8bfv",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004o8r4h8smfu7rj",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004l8r4hwe5r8bfv",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004p8r4hjn69ssea",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004l8r4hwe5r8bfv",
                    "imageId": null
                }
            ]
        },
        {
            "id": "cm3rparnb004q8r4hgapyb2x2",
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
                    "id": "cm3rparnb004r8r4hfv104i7p",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004q8r4hgapyb2x2",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004s8r4hiajzk5xq",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004q8r4hgapyb2x2",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004t8r4hihznytd7",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004q8r4hgapyb2x2",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004u8r4hnvkvyuuz",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004q8r4hgapyb2x2",
                    "imageId": null
                }
            ]
        },
        {
            "id": "cm3rparnb004v8r4h75a54f1n",
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
                    "id": "cm3rparnb004w8r4hjcu5g9ft",
                    "text": "Momen",
                    "match": null,
                    "isCorrect": true,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004v8r4h75a54f1n",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004x8r4h5mkhvc7j",
                    "text": "khalid ",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004v8r4h75a54f1n",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004y8r4hu7yu80k9",
                    "text": "mohammed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004v8r4h75a54f1n",
                    "imageId": null
                },
                {
                    "id": "cm3rparnb004z8r4h6rpd3qu2",
                    "text": "ahmed",
                    "match": null,
                    "isCorrect": false,
                    "order": null,
                    "isBlank": null,
                    "questionId": "cm3rparnb004v8r4h75a54f1n",
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
        "createdAt": new Date('2024-11-17T17:47:10.177Z'),
        "updatedAt": new Date("2024-11-17T17:47:34.886Z"),
        "password": "$2b$10$XK0C6Pm8JIdeTlUsXaAz5.PSmuMnpNqFimC3UT8IjVoMx.O5NIk4y"
    },
    'rates': []
}} />;
}
