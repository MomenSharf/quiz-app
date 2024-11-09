"use server";

import { pusherServer } from "@/lib/pusher";

// Function to send custom event (example: player joined)
export const sendPlayerJoinedEvent = (
  quizRoomId: string,
  playerData: { user_id: string; user_info: {name: string} }
) => {
  console.log(playerData);
  
  pusherServer.trigger(`quiz-room-${quizRoomId}`, "player_joined", {
    user_id: playerData.user_id,
    user_info: {name: playerData.user_info.name},
  });
};
