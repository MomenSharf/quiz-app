import { sendPlayerJoinedEvent } from "@/lib/actions/pusher";
import { pusherClient } from "@/lib/pusher";
import { nanoid } from "nanoid";
import { PresenceChannel, Members } from "pusher-js";
import { createContext, useContext, useEffect, useReducer } from "react";
type Player = {
  id: string;
  score: number;
};
type QuizRoomState = {
  players: Player[];
};

type QuizRoomActions = {
  type: "SET_PLAYERS";
  payload: Player;
};

type QuizRoomContextType = {
  state: QuizRoomState;
  dispatch: React.Dispatch<QuizRoomActions>;
};

const initialState: QuizRoomState = {
  players: [],
};

const quizRoomReducer = (
  state: QuizRoomState,
  action: QuizRoomActions
): QuizRoomState => {
  switch (action.type) {
    case "SET_PLAYERS":
      return { ...state, players: [...state.players, action.payload] };
    default:
      return state;
  }
};

const QuizRoomContext = createContext<QuizRoomContextType | undefined>(
  undefined
);

export const QuizRoomProvider = ({
  children,
  quizRoomId,
}: {
  children: React.ReactNode;
  quizRoomId: string;
}) => {
  const [state, dispatch] = useReducer(quizRoomReducer, initialState);
  console.log(quizRoomId);

  useEffect(() => {
    const channel = pusherClient.subscribe(
      `quiz-room-${quizRoomId}`
    ) as PresenceChannel;

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      console.log("Subscription succeeded");
      console.log(members)
    });

    channel.bind("pusher:subscription_error", (statusCode: any) => {
      console.error("Subscription error", statusCode);
    });

    channel.bind(
      "pusher:member_added",
      (member: { id: string; info?: any }) => {
        console.log("New member added", member);
        dispatch({
          type: "SET_PLAYERS",
          payload: { id: member.id, score: 0 }, // Modify according to your app logic
        });
      }
    );

    return () => {
      pusherClient.unsubscribe(`quiz-room-${quizRoomId}`);
    };
  }, [quizRoomId]);

  return (
    <QuizRoomContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizRoomContext.Provider>
  );
};

// Custom hook for using the editor context
export const useQuizRoomContext = () => {
  const context = useContext(QuizRoomContext);
  if (context === undefined) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};
