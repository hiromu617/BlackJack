import { Player } from './Player';
import { Deck } from './Deck';

export class Table {
  public turnCounter: number;
  public gamePhase: 'betting' | 'acting' | 'evaluatingWinner' | 'gameOver';
  public resultLog: string[];
  public deck: Deck;
  public players: Player[];

  constructor(public gameType: 'blackjack', public betDenomination: number[], name: string) {
    this.turnCounter = 0;
    this.gamePhase = 'betting';
    this.resultLog = [];
    this.deck = new Deck('blackjack');
    this.players = [new Player(name, 'user', 'blackjack', 400), new Player('AI1', 'ai', 'blackjack', 400), new Player('AI2', 'ai', 'blackjack', 400), new Player('Dealer', 'house', 'blackjack')];
  }

  // playerにカードを２枚づつ配る
  blackjackAssignPlayerHands() {
    this.players.forEach((player) => {
      const card1 = this.deck.drawOne();
      const card2 = this.deck.drawOne();
      if (card1 && card2) {
        if (player.type === 'house') {
          card2.faceDown();
        }
        player.hand.push(card1, card2);
      }
    });
  }

  // プレイヤーのハンドをリセットする
  blackjackClearPlayerHands() {
    this.players.forEach((player) => {
      player.hand = [];
    });
  }

  // プレイヤーのベット、ハンド、GameStatus、チップの状態などを更新する。
  evaluateMove(player: Player) {
    const gameDecision = player.promptPlayer();
    if (gameDecision.action === 'bet') {
      // TODO
    } else if (gameDecision.action === 'hit') {
      const card = this.deck.drawOne();
      if (!card) return;
      player.hand.push(card);
    } else if (gameDecision.action === 'stand') {
      return;
    } else if (gameDecision.action === 'surrender') {
      // TODO
    }
  }

  // 現在のターンのプレイヤーを返す
  getTurnPlayer(): Player {
    return this.players[this.turnCounter];
  }

  // ラウンドが終了する前の各プレイヤーの状態を返す
  blackjackEvaluateAndGetRoundResults(): string {
    return '';
  }

  // 最後のプレイヤーかどうか
  onLastPlayer(): boolean {
    return this.turnCounter === this.players.length - 1;
  }

  // 最初のプレイヤーかどうか
  onFirstPlayer(): boolean {
    return this.turnCounter === 0;
  }

  // 全てのプレイヤーのアクションが終了したかどうか
  allPlayerActionsResolved(): boolean {
    this.players.forEach((player) => {
      if (!player.gameDecision) return false;
    });
    return true;
  }
}
