import { Card } from './Card';
import {GameDecision} from "./GameDecision"

type PlayerType = 'ai' | 'house' | 'user';

class Player {
  winAmount: number;

  constructor(public name: string, public type: PlayerType, public gameType: string, public hand: Card[], public chips?: number) {
    this.winAmount = 0;
  }

  promptPlayer(userData?: number): GameDecision {
    if(!userData) return new GameDecision("bet", userData)
    // TODO
    return new GameDecision("bet", userData)
  }

  getHandScore(): number {
    let score = 0;
    this.hand.forEach((card) => (score += card.getRankNumber()));
    return score;
  }
}
