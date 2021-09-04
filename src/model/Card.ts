type Suit = 'H' | 'D' | 'C' | 'S';
type Rank = 'A' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K';

export class Card {
  constructor(readonly suit: Suit, private readonly rank: Rank) {}

  // カードのランクを数値で返す
  getRankNumber(): number {
    // Aはとりあえず11を返す
    if (this.rank === 'A') return 11;
    else if (this.rank === 'J' || this.rank === 'Q' || this.rank === 'K') {
      return 10;
    }
    return this.rank;
  }
}
