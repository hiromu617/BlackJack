import { Card } from './Card';

type PlayerType = 'ai' | 'house' | 'user';

class Player {
  winAmount: number;

  constructor(public name: string, public type: PlayerType, public gameType: string, public hand: Card[], public chips?: number) {
    this.winAmount = 0;
  }

  promptPlayer() {}

  getHandScore(): number {
    let score = 0;
    this.hand.forEach((card) => (score += card.getRankNumber()));
    return score;
  }
}
