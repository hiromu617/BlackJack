import { View } from '../views/application_view';
import { Table } from '../models/Table';
export class Controller {
  private view: View;
  private table: Table | null;
  constructor() {
    this.view = new View(this);
    this.view.renderStartPage();
    this.table = null;
  }

  public startGame(name: string, gameType: string){
    if(gameType === "porker"){
      alert("近日公開！！（多分）")
      return
    }
    if(name === "") name = "User"

    this.table = new Table("blackjack", [5, 10, 50, 100], name)
    this.view.renderMainPage(this.table.betDenomination, this.table.players)
  }
}
