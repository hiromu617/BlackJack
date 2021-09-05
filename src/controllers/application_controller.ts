import { View } from '../views/application_view';
import { Table } from '../models/Table';
import { Player } from '../models/Player';

// tableを操作してゲームを進める
export class Controller {
  private view: View;
  private table: Table | null;
  constructor() {
    this.view = new View(this);
    this.view.renderStartPage();
    this.table = null;
  }

  public startGame(name: string, gameType: string) {
    if (gameType === 'porker') {
      alert('近日公開！！（多分）');
      return;
    }
    if (name === '') name = 'User';

    this.table = new Table('blackjack', [5, 10, 50, 100], name);

    this.view.renderTableMock(this.table);
    this.haveTurn();
  }

  // 各ターンごとにテーブルの状態を更新する
  haveTurn(userData?: number) {
    if (!this.table) return;
    const table = this.table;

    if (table.gamePhase === 'betting') {
      this.view.renderTable(table);
    } else if (table.gamePhase === 'acting') {
      // table.players.forEach((player) => {
      //   player.promptPlayer();
      //   table.evaluateMove(player);
      // });
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

    this.table.gamePhase = 'acting';
    this.haveTurn();
  }

  private handleActingPhase() {
    /* STEP1: カードを配る
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
    if(!this.table) return
    const dealer = this.table.players.find(player => player.type === "house")
    const playersWithoutDealer = this.table.players.filter(player => player.type !== "house")

    // playerにカードを配る
    this.table.blackjackAssignPlayerHands()

    this.table.players.forEach(player => console.log(player.name, player.hand))

    // 配ったカードをレンダリング
    if(!dealer) return
    this.view.renderInitialCards(dealer)
    playersWithoutDealer.forEach(player => {
      this.view.renderInitialCards(player)
    })

  }
}
