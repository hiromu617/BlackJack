import { View } from '../views/application_view';
import { Table } from '../models/Table';
import { Player, ActionType } from '../models/Player';
import { sleep } from '../utils/sleep';
// tableを操作してゲームを進める
export class Controller {
  private view: View;
  private table: Table | null;
  private user: Player | null = null;
  private dealer: Player | null = null;
  private AIsAndUser: Player[] = [];
  private actionPhase: 'assginCards' | 'userAndAIAction' | 'dealerAction';

  constructor() {
    this.view = new View(this);
    this.view.renderStartPage();
    this.table = null;
    this.actionPhase = 'assginCards';
  }

  public startGame(name: string, gameType: string) {
    if (gameType === 'porker') {
      alert('近日公開！！（多分）');
      return;
    }
    if (name === '') name = 'User';

    this.table = new Table('blackjack', [5, 10, 50, 100], name);
    const dealer = this.table.players.find((player) => player.type === 'house');
    const AIsAndUser = this.table.players.filter((player) => player.type !== 'house');
    const user = this.table.players.find((player) => player.type === 'user');

    if (!dealer || !user || !AIsAndUser) {
      console.log('error in startGame');
      return;
    }

    this.dealer = dealer;
    this.AIsAndUser = AIsAndUser;
    this.user = user;

    this.view.renderTableMock(this.table);
    this.haveTurn();
  }

  // gamePhaseによって処理を分けて行う
  haveTurn() {
    if (!this.table) return;
    const table = this.table;

    if (table.gamePhase === 'betting') {
      this.view.renderTable(table);
    } else if (table.gamePhase === 'acting') {
      this.view.renderTable(table);
      this.handleActingPhase();
    } else if (table.gamePhase === 'evaluatingWinner') {
      const { userResult, resultLog } = this.table.evaluateWinner();

      this.table.resetTable();
      this.table.checkIsGameOver();

      // ユーザーがgameover
      if (this.user?.isGameOver) {
        this.table.proceedGamePhase(true);
        this.actionPhase = 'assginCards';
        this.haveTurn();
        return;
      }

      this.view.renderLogs(resultLog);
      this.view.renderUserResultModal(userResult);

      // 次のゲーム
      this.table.proceedGamePhase();
      this.actionPhase = 'assginCards';
    } else if (table.gamePhase === 'gameOver') {
      this.view.renderUserResultModal('GAME OVER');
    }
  }

  // 次のゲームに進む、ゲームオーバーの時は,新しくゲームをスタート
  public nextGame() {
    if (this.user?.isGameOver) {
      this.startGame(this.user.name, 'blackjack');
      return;
    }
    this.haveTurn();
  }

  // userがbetを決定すると呼ばれる
  // AI, Userのベット額を決定
  public handleBetPhase(userBetMoney: number) {
    if (!this.table) return;

    this.table.players.forEach((player) => {
      if (player.type === 'house') return;
      else if (player.type === 'ai') this.table?.betAI(player);
      else if (player.type === 'user') this.table?.betUser(player, userBetMoney);
    });

    this.table.proceedGamePhase();
    this.haveTurn();
  }

  private async handleActingPhase() {
    if (!this.table || !this.dealer) {
      console.log('error in handleActionPhase');
      return;
    }
    /*"asignCards" => "userAndAIAction" => "dealerAction"
      STEP1: カードを配る
        (Dealer => AI, User)
        ・2枚づつ, Dealerは一枚裏向き
      STEP2: Action(surrender, stand, hit, double)
        (AI1 => user => AI2)
        surrender => 負けを認める、betの1/2が返ってくる
        stand =>　現在のカードで勝負
        hit =>  カードを一枚追加, bustチェック
        double =>　ベットを２倍にしてカードを一枚ひく、２枚配られた後のみ可能、bustチェック
      STEP3: Dealerのaction
        ・裏向きのカードを公開する
        ・17以上になるまでカードを引く, bustチェック
     */
    if (this.actionPhase === 'assginCards') {
      this.assignInitialHands(this.dealer, this.AIsAndUser);
    } else if (this.actionPhase === 'userAndAIAction') {
      const AIs = this.AIsAndUser.filter((player) => player.type === 'ai');
      const user = this.AIsAndUser.find((player) => player.type === 'user');

      if (!AIs || !user) return;
      if (!AIs[0].isGameOver) {
        await this.decideAIAction(AIs[0]);
      }
      if (!AIs[1].isGameOver) {
        await this.decideAIAction(AIs[1]);
      }
      await sleep(1000);
      await this.view.renderOperaion();

      if (user.isBlackJack()) {
        await this.view.updateOperation(user);
        this.actionPhase = 'dealerAction';
        this.handleActingPhase();
      }
    } else if (this.actionPhase === 'dealerAction') {
      await sleep(1000);
      await this.table.faceUpCards(this.dealer);
      await this.view.renderCards(this.dealer);
      await sleep(1000);
      await this.decideDealerAction(this.dealer);
      await sleep(1000);
      await this.table.proceedGamePhase();
      this.haveTurn();
    }
  }

  private async assignInitialHands(dealer: Player, AIsAndUser: Player[]) {
    if (!this.table) return;

    // playerにカードを配る
    await this.table.blackjackAssignPlayerHands();

    // 配ったカードをレンダリング
    if (!dealer) return;
    await sleep(1000);
    await this.view.renderCards(dealer);
    await sleep(1000);
    await AIsAndUser.forEach((player) => {
      this.view.renderCards(player);
    });

    await AIsAndUser.forEach((player) => {
      if (player.isBlackJack()) {
        this.view.updateStatus(player, 'blackjack');
      }
    });

    this.actionPhase = 'userAndAIAction';
    this.handleActingPhase();
  }

  private async decideAIAction(AI: Player) {
    // TODO: AIのアクションの決定, double, surrender
    // 初手が16以上ならstand
    await sleep(1000);
    if (AI.getHandScore() >= 16) {
      this.handleAiAndDealerAction('stand', AI);
      return;
    }

    // bustするまでloop
    while (!this.handleAiAndDealerAction('hit', AI)) {
      const score = AI.getHandScore();
      await sleep(1000);
      // 16以上になるまで引く
      if (score > 16) {
        this.handleAiAndDealerAction('stand', AI);
        await sleep(1000);
        break;
      }
    }
  }

  private async decideDealerAction(Dealer: Player) {
    // Dealerは17以上までhit
    await sleep(1000);
    if (Dealer.getHandScore() >= 17) {
      this.handleAiAndDealerAction('stand', Dealer);
      return;
    }

    // bustするまでloop
    while (!this.handleAiAndDealerAction('hit', Dealer)) {
      const score = Dealer.getHandScore();
      await sleep(2000);
      // 16以上になるまで引く
      if (score >= 17) {
        this.handleAiAndDealerAction('stand', Dealer);
        await sleep(2000);
        break;
      }
    }
  }

  // Userのアクションを行う
  public handleUserAction(actionType: ActionType) {
    if (!this.user) return;
    if (!this.table) return;
    const player = this.user;

    if (actionType === 'stand') {
      this.table.actionAndReturnIsBust(player, actionType);

      // update view
      this.view.updateStatus(player, actionType);

      // 次に進む
      this.view.updateOperation(player);
      this.actionPhase = 'dealerAction';
      this.handleActingPhase();
    } else if (actionType === 'hit') {
      const isBust = this.table.actionAndReturnIsBust(player, actionType);

      // update view
      this.view.updateStatus(player, actionType);
      this.view.renderCards(player);

      if (isBust) {
        // update view
        this.view.updateStatus(player, 'bust');
        // 次に進む
        this.view.updateOperation(player);
        this.actionPhase = 'dealerAction';
        this.handleActingPhase();
      } else {
        this.view.updateOperation(player);
        // scoreが21の時はstandして次のフェーズに
        if (this.user.getHandScore() === 21) {
          this.view.updateStatus(player, 'stand');
          this.actionPhase = 'dealerAction';
          this.handleActingPhase();
        }
      }
    } else if (actionType === 'surrender') {
      this.table.actionAndReturnIsBust(player, actionType);
      this.view.updateStatus(player, actionType);

      // update view
      this.view.updateChips(player);
      this.view.updateBet(player);
      // 次に進む
      this.view.updateOperation(player);
      this.actionPhase = 'dealerAction';
      this.handleActingPhase();
    } else {
      const isBust = this.table.actionAndReturnIsBust(player, actionType);
      this.view.updateStatus(player, actionType);

      // update view
      this.view.updateChips(player);
      this.view.renderCards(player);
      this.view.updateBet(player);
      this.view.updateOperation(player);
      if (isBust) {
        // update view
        this.view.updateStatus(player, 'bust');

        // 次に進む
        this.actionPhase = 'dealerAction';
        this.handleActingPhase();
      } else {
        // 次に進む
        this.actionPhase = 'dealerAction';
        this.handleActingPhase();
      }
    }
  }
  // AIとDealerのアクションを行う, bustしたかどうかを返す
  public handleAiAndDealerAction(actionType: ActionType, AI: Player): boolean {
    if (!this.table) return false;

    if (actionType === 'stand') {
      this.table.actionAndReturnIsBust(AI, actionType);

      this.view.updateStatus(AI, actionType);

      return false;
    } else if (actionType === 'hit') {
      const isBust = this.table.actionAndReturnIsBust(AI, actionType);

      this.view.updateStatus(AI, actionType);
      this.view.renderCards(AI);

      if (isBust) {
        this.view.updateStatus(AI, 'bust');
      }

      return isBust;
    } else if (actionType === 'surrender') {
      this.table.actionAndReturnIsBust(AI, actionType);

      this.view.updateStatus(AI, actionType);
      this.view.updateChips(AI);
      this.view.updateBet(AI);

      return false;
    } else {
      const isBust = this.table.actionAndReturnIsBust(AI, actionType);

      this.view.updateStatus(AI, actionType);
      this.view.updateChips(AI);
      this.view.renderCards(AI);
      this.view.updateBet(AI);

      if (isBust) {
        this.view.updateStatus(AI, 'bust');
      }
      return isBust;
    }
  }
}
