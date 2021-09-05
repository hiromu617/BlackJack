import { View } from '../views/application_view';
import { Table } from '../models/Table';

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
    this.haveTurn()
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
      this.view.renderTable(table)
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

  public handleBetPhase(userBetMoney: number){
    if(!this.table) return

    this.table.players.forEach(player => {
      if(player.type === "house") return
      else if(player.type === "ai") this.table?.betAI(player)
      else if(player.type === "user") this.table?.betUser(player, userBetMoney)
    })

    this.table.gamePhase = "acting"
    this.haveTurn()
  }
}
