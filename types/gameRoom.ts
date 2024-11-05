export type Player = {
  id: string;
  name: string;
  score: number;
};

export type GameRoomState = {
  players: Player[];
  gameRoomId: string;
};

export type GameRoomAction =
  | { type: "SET_PLAYERS"; payload: Player[] }
  | { type: "ADD_PLAYER"; payload: Player };