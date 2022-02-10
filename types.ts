type GameState = {
  state: GameStateRows;
  initial: boolean;
};

type GameStateRow = Array<GameStateRowItem>;
type GameStateRowItem = {
  score: "good" | "bad" | "off";
  letter: string;
};
type GameStateRows = Array<GameStateRow>;

type ServerErrorResponse = {
  error: string;
}

type ServerSuccessResponse = {
  match: GameStateRow
}

type ServerResponse = ServerErrorResponse & ServerSuccessResponse;

export type { GameState, GameStateRow, GameStateRows, GameStateRowItem, ServerResponse, ServerErrorResponse };
