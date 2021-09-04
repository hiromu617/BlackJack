import { Controller } from "../controllers/application_controller";

export class View{
  private root: HTMLElement;
  constructor(public controller: Controller){
    this.root = document.getElementById("root") as HTMLElement
  }
  renderStartPage(){
    this.root.innerHTML = `
    <section id="start-page" class="w-full h-full flex justify-center align-ce">
        <div class="container m-auto text-center p-5">
          <h1 class="mb-5 font-semibold text-3xl text-gray-100 tracking-tight">Welcome to Card Game!</h1>
          <input type="text" name="name" id="name-input" placeholder="username" class="shadow mb-5 w-72 border bg-gray-100 text-gray-700 border-gray-300 py-2 pl-3 rounded-md outline-none focus:outline-none focus:bg-white focus:border-gray-500" />
          <div class="relative w-72 m-auto mb-5">
            <select id="game-type-select" class="shadow block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>brackjack</option>
              <option>porker</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          <div>
            <button id="start-button" class="shadow py-3 w-72 text-xl text-white bg-green-500 hover:bg-green-400 rounded-xl">Start Game</button>
          </div>
        </div>
      </section>
    `

    const nameInput = document.getElementById("name-input") as HTMLInputElement
    const gameTypeSelect = document.getElementById("game-type-select") as HTMLSelectElement
    const startBtn = document.getElementById("start-button") as HTMLElement

    startBtn.addEventListener("click", () => {
      this.controller.startGame(nameInput.value, gameTypeSelect.value)
    })
  }

  public renderMainPage(){
    this.root.innerHTML = `
    <section id="start-page" class="w-full h-full flex justify-center align-center">
        <div class="container m-auto text-center h-4/5">
          <div class="h-2/6 w-full flex justify-center">
            <div id="dealer-cards" class="bg-green-700 h-full w-1/3">
              <div>
                <span class="shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800">Dealer</span>
              </div>
              <div class="flex gap-2 align-center justify-center mt-3">
                <div id="card" class="relative flex justify-center align-ceter w-20 h-32 bg-white rounded shadow text-center">
                  <img src="/img/club.png" class="h-10 m-auto" />
                  <span class="absolute top-0 left-1 text-2xl mt-2">A</span>
                </div>
                <div id="card-turnover" class="relative flex justify-center align-ceter w-20 h-32 bg-gray-900 rounded shadow text-center">
                  <p class="text-white text-3xl m-auto">?</p>
                </div>
              </div>
            </div>
          </div>
          <div class="h-2/6 w-full flex justify-around">
            <div id="ai1-cards" class="h-full w-1/3">
              <div>
                <span class="shadow text-2xl inline-block bg-gray-700 rounded-full px-4 py-1 text-xl font-semibold text-white">AI1</span>
              </div>
              <div class="flex gap-2 align-center justify-center mt-3">
                <div id="ai-card" class="relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center">
                  <img src="/img/club.png" class="h-8 m-auto" />
                  <span class="absolute top-0 left-1 text-xl mt-2">10</span>
                </div>
                <div id="ai-card" class="relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center">
                  <img src="/img/club.png" class="h-8 m-auto" />
                  <span class="absolute top-0 left-1 text-xl mt-2">10</span>
                </div>
              </div>
            </div>
            <div id="ai2-cards" class="h-full w-1/3">
              <div>
                <span class="shadow text-2xl inline-block bg-gray-700 rounded-full px-4 py-1 text-xl font-semibold text-white">AI2</span>
              </div>
              <div class="flex gap-2 align-center justify-center mt-3">
                <div id="ai-card" class="relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center">
                  <img src="/img/club.png" class="h-8 m-auto" />
                  <span class="absolute top-0 left-1 text-xl mt-2">10</span>
                </div>
                <div id="ai-card" class="relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center">
                  <img src="/img/club.png" class="h-8 m-auto" />
                  <span class="absolute top-0 left-1 text-xl mt-2">10</span>
                </div>
              </div>
            </div>
          </div>
          <div class="h-2/6 w-full flex justify-center">
            <div id="player-cards" class="bg-green-700 h-full w-2/5">
              <div>
                <span class="shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800">User</span>
              </div>
              <div class="flex gap-2 align-center justify-center mt-3">
                <div id="card" class="relative flex justify-center align-ceter w-20 h-32 bg-white rounded shadow text-center">
                  <img src="/img/club.png" class="h-10 m-auto" />
                  <span class="absolute top-0 left-1 text-2xl mt-2">10</span>
                </div>
                <div id="card" class="relative flex justify-center align-ceter w-20 h-32 bg-white rounded shadow text-center">
                  <img src="/img/club.png" class="h-10 m-auto" />
                  <span class="absolute top-0 left-1 text-2xl mt-2">10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="operation-space" class="z-10 fixed pb-2 w-full bottom-0 flex justify-center gap-5 align-center">
          <button class="rounded-full h-24 w-24 flex items-center justify-center bg-red-500 hover:bg-red-600 shadow-lg text-white text-sm">SURRENDER</button>
          <button class="rounded-full h-24 w-24 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 shadow-lg text-white">STAND</button>
          <button class="rounded-full h-24 w-24 flex items-center justify-center bg-blue-500 hover:bg-blue-600 shadow-lg text-white">HIT</button>
          <button class="rounded-full h-24 w-24 flex items-center justify-center bg-purple-500 hover:bg-purple-600 shadow-lg text-white">DOUBLE</button>
        </div>
        <div id="log" class="z-5 fixed pb-2 w-1/3 h-52 bottom-0 right-0 text-center">
          <p class="text-white text-sm md:text-lg">Dealer has a card </p>
          <p class="text-white text-sm md:text-lg">Dealer has a card </p>
          <p class="text-white text-sm md:text-lg">Dealer has a card </p>
          <p class="text-white text-sm md:text-lg">Dealer has a card </p>
          <p class="text-white text-sm md:text-lg">Dealer has a card </p>
        </div>
      </section>
    `
  }
}
