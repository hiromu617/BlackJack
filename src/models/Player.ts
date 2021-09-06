import { Card } from './Card';
export type ActionType = 'surrender' | 'stand' | 'hit' | 'double';
export type Status = ActionType | 'bust' | 'blackjack' | null;

type PlayerType = 'ai' | 'house' | 'user';
export class Player {
  public betAmount: number;
  public status: Status;
  public hand: Card[];
  public isGameOver: boolean;
  constructor(public name: string, public type: PlayerType, public gameType: string, public chips?: number) {
    this.betAmount = 0;
    this.hand = [];
    this.status = null;
    this.isGameOver = false;
  }

  isBlackJack(): boolean {
    return this.getHandScore() === 21 && this.hand.length === 2;
  }

  getHandScore(): number {
    let score = 0;
    this.hand.forEach((card) => {
      score += card.getRankNumber();
    });
    if (score > 21) {
      const numOfA = this.hand.filter((card) => card.rank === 'A').length;
      for (let i = 1; i <= numOfA; i++) {
        if (score <= 21) return score;
        score -= 10;
      }
    }
    return score;
  }
}
