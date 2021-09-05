import { Card } from './Card';
export type ActionType = 'surrender' | 'stand' | 'hit' | 'double';
export type Status = ActionType | 'bust' | null;

type PlayerType = 'ai' | 'house' | 'user';
export class Player {
  public betAmount: number;
  public status: Status;
  public hand: Card[];
  constructor(public name: string, public type: PlayerType, public gameType: string, public chips?: number) {
    this.betAmount = 0;
    this.hand = [];
    this.status = null;
  }

  promptPlayer() {
    // TODO
    // return this.gameDecision = new GameDecision("stand", userData)
  }

  getHandScore(): number {
    let score = 0;
    this.hand.forEach((card) => {
      if (card.rank === 'A' && score + 11 > 21) {
        score += 1;
        return;
      }
      score += card.getRankNumber();
    });
    return score;
  }
}
