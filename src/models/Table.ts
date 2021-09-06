import { ActionType, Player, Status } from './Player';
import { Deck } from './Deck';
import { Card } from './Card';

export class Table {
  public turnCounter: number;
  public gamePhase: 'betting' | 'acting' | 'evaluatingWinner' | 'gameOver';
  public resultLog: string[];
  public userResult: string;
  public deck: Deck;
  public players: Player[];

  constructor(public gameType: 'blackjack', public betDenomination: number[], name: string) {
    this.turnCounter = 0;
    this.gamePhase = 'betting';
    this.resultLog = [];
    this.userResult = '';
    this.deck = new Deck('blackjack');
    this.players = [new Player(name, 'user', 'blackjack', 400), new Player('AI1', 'ai', 'blackjack', 400), new Player('AI2', 'ai', 'blackjack', 400), new Player('Dealer', 'house', 'blackjack')];
  }

  // playerにカードを２枚づつ配る
  blackjackAssignPlayerHands() {
    this.players.forEach((player) => {
      if (player.isGameOver) return;
      const card1 = this.deck.drawOne();
      const card2 = this.deck.drawOne();
      if (card1 && card2) {
        if (player.type === 'house') {
          card2.faceDown();
        }
        player.hand.push(card1, card2);
      }
      if (player.isBlackJack()) player.status = 'blackjack';
    });
  }

  // プレイヤーのハンドとステータスをリセットする
  blackjackClearPlayerHandsAndStatusAndBetAmount() {
    this.players.forEach((player) => {
      player.hand = [];
      player.betAmount = 0
      player.status = null;
    });
  }

  /*
  - delaerがBJ
    - playerがBJ
      += betAmount
    - playerがBJでない
      chipsそのまま(betAmountだけ減る)
  - dealerがbust || playerの勝ち
    - playerがBJ
      += 2.5 * betAmount
    - playerがBJでない
      += 2 * betAmount
  - dealerがbustしてない && dealerの勝ち
    - playerがdouble
    - playerがstand
      chipそのまま
  */
  evaluateWinner(): { userResult: string; resultLog: string[] } {
    const dealer = this.players.find((player) => player.type === 'house');
    const AIsAndUser = this.players.filter((player) => player.type !== 'house');
    if (!dealer) return { userResult: 'error', resultLog: ['error'] };

    const dealerScore = dealer.getHandScore();
    const isDealerBust = dealer.status === 'bust';
    const isDealerBJ = dealer.status === 'blackjack';

    AIsAndUser.forEach((player) => {
      if (player.status === 'surrender') {
        return;
      }
      if (player.chips === undefined || player.chips === null) return;
      const playerScore = player.getHandScore();
      const isPlayerBust = player.status === 'bust';
      const isPlayerBJ = player.status === 'blackjack';

      if (isDealerBJ) {
        if (isPlayerBJ) {
          // dealer, playerともにBJ => 変化なし(betAmountが戻る)
          if (player.type === 'user') this.userResult = `${player.name} push`;
          this.resultLog.push(`${player.name} push`);
          player.chips += player.betAmount;
        } else {
          // dealerがBJ, playerがBJでない => betAmount分減る(chipsそのまま)
          if (player.type === 'user') this.userResult = `${player.name} lose ${player.betAmount}`;
          this.resultLog.push(`${player.name} lose ${player.betAmount}`);
          player.betAmount = 0;
        }
      } else if (isDealerBust || (!isPlayerBust && dealerScore < playerScore)) {
        if (isPlayerBJ) {
          //  1.5 * betAmount勝ち (+= 2.5*betAmount)
          if (player.type === 'user') this.userResult = `${player.name} win ${player.betAmount * 1.5}`;
          this.resultLog.push(`${player.name} win ${player.betAmount * 1.5}`);
          player.chips += 2.5 * player.betAmount;
          player.betAmount = 0;
          return
        } else {
          //  1.5 * betAmount勝ち (+= 2.5*betAmount)
          if (player.type === 'user') this.userResult = `${player.name} win ${player.betAmount}`;
          this.resultLog.push(`${player.name} win ${player.betAmount}`);
          player.chips += 2 * player.betAmount;
          player.betAmount = 0;
          return
        }
      } else if (!isDealerBust && (isPlayerBust || dealerScore > playerScore)) {
        if (player.type === 'user') this.userResult = `${player.name} lose ${player.betAmount}`;
        this.resultLog.push(`${player.name} lose ${player.betAmount}`);
        player.betAmount = 0;
        return
      } else {
        // push
        if (player.type === 'user') this.userResult = `${player.name} push`;
        this.resultLog.push(`${player.name} push`);
        if (player.status === 'double') {
          player.chips += Math.round(player.betAmount / 2);
          player.betAmount = 0;
        }
        player.chips += player.betAmount;
        player.betAmount = 0;
        return
      }
    });

    return { userResult: this.userResult, resultLog: this.resultLog };
  }

  // phaseを進める
  proceedGamePhase(isGameOver?: boolean) {
    if (this.gamePhase === 'betting') this.gamePhase = 'acting';
    else if (this.gamePhase === 'acting') this.gamePhase = 'evaluatingWinner';
    else if (this.gamePhase === 'evaluatingWinner') {
      if (isGameOver) this.gamePhase = 'gameOver';
      else this.gamePhase = 'betting';
    }
  }

  betUser(user: Player, betMoney: number) {
    if (!user.chips) return;

    user.betAmount = betMoney;
    user.chips -= betMoney;
  }

  betAI(ai: Player) {
    // console.log(ai)
    if (!ai.chips) return;
    if (ai.chips <= 0) return;
    // TODO: AIのベット額の決め方
    const BET_MONEY = 100;
    ai.betAmount = BET_MONEY;
    ai.chips -= BET_MONEY;
  }

  // ActionののちBustかどうかを返す。
  actionAndReturnIsBust(player: Player, type: ActionType): boolean {
    if (type === 'stand') {
      player.status = type;
      return false;
    } else if (type === 'hit') {
      player.status = type;
      const newCard = this.deck.drawOne() as Card;

      player.hand.push(newCard);

      if (player.getHandScore() > 21) {
        player.status = 'bust';
        return true;
      } else if (player.getHandScore() === 21) {
        player.status = 'stand';
        return false;
      } else {
        return false;
      }
    } else if (type === 'surrender') {
      player.status = type;
      if (!player.chips) {
        console.log('error in actionAndReturnIsBust');
        return false;
      }
      if (player.type === 'user') this.userResult = `${player.name} lose ${Math.round(player.betAmount / 2)}`;
      this.resultLog.push(`${player.name} lose ${Math.round(player.betAmount / 2)}`);
      player.chips += Math.round(player.betAmount / 2);
      player.betAmount = 0;
      return false;
    } else {
      player.status = type;

      const newCard = this.deck.drawOne() as Card;

      player.hand.push(newCard);
      player.betAmount *= 2;

      if (player.getHandScore() > 21) {
        player.status = 'bust';
        return true;
      } else if (player.getHandScore() === 21) {
        player.status = 'stand';
        return false;
      } else {
        return false;
      }
    }
  }

  // playerのハンドを表向きにする
  public faceUpCards(player: Player) {
    player.hand.forEach((card) => card.isDownCard && card.faceUp());
  }

  // テーブルをリセット
  public resetTable() {
    this.blackjackClearPlayerHandsAndStatusAndBetAmount();
    this.deck.resetDeck();
    this.resultLog = ['-----------'];
  }

  public checkIsGameOver(){
    this.players.forEach(player => {
      if(player.chips === null || player.chips === undefined) return
      if(player.chips <= 0) player.isGameOver = true
    })
  }
}
