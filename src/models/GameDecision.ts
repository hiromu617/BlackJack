export type ActionType = "bet" | "surrender" | "stand" | "hit"

export class GameDecision{
  constructor(public action: ActionType, public amount?: number){}
}
