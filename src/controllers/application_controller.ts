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
      // TODO
      table.players.forEach((player) => {
        const score = player.getHandScore();
      });
    } else if (table.gamePhase === 'gameOver') {
      // TODO
    }
    table.turnCounter++;
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
      this.AIsAndUser.forEach(async (player) => {
        await sleep(1000);
        if (player.type === 'ai') {
          await this.table?.actionAI(player);
        } else {
          await this.view.renderOperaion();
        }
      });
    } else if (this.actionPhase === 'dealerAction') {
      // TODO
      alert('dealer action');
    }
  }

  private async assignInitialHands(dealer: Player, playersWithoutDealer: Player[]) {
    if (!this.table) return;

    // playerにカードを配る
    this.table.blackjackAssignPlayerHands();

    this.table.players.forEach((player) => console.log(player.name, player.hand));

    // 配ったカードをレンダリング
    if (!dealer) return;
    await sleep(1000);
    this.view.renderCards(dealer);
    await sleep(1000);
    playersWithoutDealer.forEach((player) => {
      this.view.renderCards(player);
    });

    this.actionPhase = 'userAndAIAction';
    this.handleActingPhase();
  }

  // userのアクションを行う
  public handleUserAction(actionType: ActionType) {
    if (!this.user) return;
    if (!this.table) return;

    if (actionType === 'stand') {
      this.table.actionAndReturnIsBust(this.user, actionType);

      // update view
      this.view.updateStatus(this.user, actionType);
      this.view.updateOperation(this.user);

      // 次に進む
      this.actionPhase = 'dealerAction';
      this.handleActingPhase();
    } else if (actionType === 'hit') {
      const isBust = this.table.actionAndReturnIsBust(this.user, actionType);

      // update view
      this.view.updateStatus(this.user, actionType);
      this.view.renderCards(this.user);

      if (isBust) {
        // update view
        this.view.updateStatus(this.user, 'bust');
        this.view.updateOperation(this.user);
        // 次に進む
        this.actionPhase = 'dealerAction';
        this.handleActingPhase();
      } else {
        this.view.updateOperation(this.user);
      }
    } else if (actionType === 'surrender') {
      this.table.actionAndReturnIsBust(this.user, actionType);
      this.view.updateStatus(this.user, actionType);

      // update view
      this.view.updateChips(this.user);
      this.view.updateBet(this.user);
      this.view.updateOperation(this.user);
      // 次に進む
      this.actionPhase = 'dealerAction';
      this.handleActingPhase();
    } else {
      const isBust = this.table.actionAndReturnIsBust(this.user, actionType);
      this.view.updateStatus(this.user, actionType);

      // update view
      this.view.updateChips(this.user);
      this.view.renderCards(this.user);
      this.view.updateBet(this.user);
      this.view.updateOperation(this.user);
      if (isBust) {
        // update view
        this.view.updateStatus(this.user, 'bust');

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
}
