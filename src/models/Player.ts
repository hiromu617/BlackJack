import { Card } from './Card';
import {GameDecision} from "./GameDecision"

type PlayerType = 'ai' | 'house' | 'user';
export class Player {
  public winAmount: number;
  public gameDecision: GameDecision | null;
  constructor(public name: string, public type: PlayerType, public gameType: string, public hand: Card[], public chips?: number) {
    this.winAmount = 0;
    this.gameDecision = null
  }

  promptPlayer(userData?: number): GameDecision {
    if(!userData) return new GameDecision("bet", userData)
    // TODO
    return this.gameDecision = new GameDecision("bet", userData)
  }

  getHandScore(): number {
    let score = 0;
    this.hand.forEach((card) => {
      if(card.rank === "A" && score + 11 > 21){
        score += 1
        return
      }
      score += card.getRankNumber()
    });
    return score;
  }
}