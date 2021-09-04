import { View } from '../views/application_view';
export class Controller {
  private view: View;
  constructor() {
    this.view = new View(this);
    this.view.renderStartPage();
  }

  public startGame(name: string, gameType: string){
    if(gameType === "porker"){
      alert("近日公開！！（多分）")
      return
    }
    if(name === "") name = "User"

    this.view.renderMainPage()
  }
}
