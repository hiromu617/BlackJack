import { Controller } from '../controllers/application_controller';
import { Player } from '../models/Player';
import { Table } from '../models/Table';
export class View {
  private root: HTMLElement;
  constructor(public controller: Controller) {
    this.root = document.getElementById('root') as HTMLElement;
  }
  renderStartPage() {
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
    `;

    const nameInput = document.getElementById('name-input') as HTMLInputElement;
    const gameTypeSelect = document.getElementById('game-type-select') as HTMLSelectElement;
    const startBtn = document.getElementById('start-button') as HTMLElement;

    startBtn.addEventListener('click', () => {
      this.controller.startGame(nameInput.value, gameTypeSelect.value);
    });
  }

  public renderTable(table: Table) {
    const players = table.players;
    const betDenomination = table.betDenomination;

    const ai_names = players.filter((player) => player.type === 'ai').map((player) => player.name);

    this.root.innerHTML = `
    <section class="w-full h-full flex justify-center align-center">
        <div class="container m-auto text-center h-4/5">
          <div class="h-2/6 w-full flex justify-center">
            <div id="house-container" class="h-full w-1/3">
            </div>
          </div>
          <div class="h-2/6 w-full flex justify-around">
            <div id="${ai_names[0]}-container" class="h-full w-1/3">
            </div>
            <div id="bet-space" class="h-full w-1/3 flex justify-center items-center gap-0">
            </div>
            <div id="${ai_names[1]}-container" class="h-full w-1/3">
            </div>
          </div>
          <div class="h-2/6 w-full flex justify-center">
            <div id="user-container" class="bg-green-700 h-full w-2/5">
            </div>
          </div>
        </div>
        <div id="operation-space" class="z-10 fixed pb-2 w-full bottom-0 flex justify-center gap-5 align-center">
        </div>
        <div id="bet-operation-space" class="z-20 fixed w-1/3 h-2/3 top-36 bg-white rounded-2xl flex justify-center items-center flex-col gap-10 shadow-2xl">
        </div>
        <div id="log" class="z-5 fixed pb-2 w-1/3 h-52 bottom-0 right-0 text-center">
        </div>
      </section>
    `;

    players.forEach((player) => {
      if (player.type === 'house') this.renderHouse(player);
      else if (player.type === 'ai') this.renderAI(player);
      else this.renderUser(player);
    });

    if(table.gamePhase === "betting"){
      this.renderBetOperationModal(400, betDenomination);
    }else if(table.gamePhase === "acting"){
      // TODO
      this.renderOperaion();
    }else if(table.gamePhase === "evaluatingWinner"){
      // TODO
    }else if (table.gamePhase === "gameOver"){
      // TODO
    }
  }

  private renderOperaion() {
    const operaionSpace = document.getElementById('operation-space');
    if (!operaionSpace) {
      console.log('error renderOperaion');
      return;
    }
    operaionSpace.innerHTML = `
    <button id="surrender" class="rounded-full h-24 w-24 flex items-center justify-center bg-red-500 hover:bg-red-600 shadow-lg text-white text-sm">SURRENDER</button>
    <button id="stand" class="rounded-full h-24 w-24 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 shadow-lg text-white">STAND</button>
    <button id="hit" class="rounded-full h-24 w-24 flex items-center justify-center bg-blue-500 hover:bg-blue-600 shadow-lg text-white">HIT</button>
    <button id="double" class="rounded-full h-24 w-24 flex items-center justify-center bg-purple-500 hover:bg-purple-600 shadow-lg text-white">DOUBLE</button>
    `;

    const surrenderBtn = document.getElementById('surrender');
    const standBtn = document.getElementById('stand');
    const hitBtn = document.getElementById('hit');
    const doubleBtn = document.getElementById('double');

    if (!surrenderBtn || !standBtn || !hitBtn || !doubleBtn) {
      console.log('error 130');
      return;
    }

    surrenderBtn.addEventListener('click', () => {
      // TODO
    });
    standBtn.addEventListener('click', () => {
      // TODO
    });
    hitBtn.addEventListener('click', () => {
      // TODO
    });
    doubleBtn.addEventListener('click', () => {
      // TODO
    });
  }

  private renderBetOperationModal(chip: number, betDenomination: number[]) {
    const betOperationSpace = document.getElementById('bet-operation-space');
    if (!betOperationSpace) {
      console.log('error renderOprtionModal');
      return;
    }
    const ID = { CURRENT_CHIP: 'current-chip', BET_MONEY: 'bet-money', BET_BTNS: 'bet-btns', RESET_BTN: 'reset-btn', BET_DECISION_BTN: 'bet-decision-btn' } as const;

    betOperationSpace.innerHTML = `
          <div>
            <p class="text-2xl text-gray-800 font-bold">You Bet <span id=${ID.BET_MONEY}>0</span> </p>
          </div>
          <div class="h-auto flex justify-center items-center gap-2">
            <span class="rounded-full h-8 w-8 flex items-center justify-center bg-yellow-600 shadow-lg text-white text-sm">c</span>
            <span id=${ID.CURRENT_CHIP} class="text-gray-700 font-semibold">${chip}</span>
          </div>
          <div id=${ID.BET_BTNS} class="h-auto flex justify-center items-center gap-2">
          </div>
          <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button id=${ID.RESET_BTN} class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Reset
            </button>
            <button id=${ID.BET_DECISION_BTN} class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Bet</button>
          </div>
    `;

    const currentChip = document.getElementById(ID.CURRENT_CHIP);
    const betMoney = document.getElementById(ID.BET_MONEY);
    const betBtns = document.getElementById(ID.BET_BTNS);
    const resetBtn = document.getElementById(ID.RESET_BTN);
    const betDecisionBtn = document.getElementById(ID.BET_DECISION_BTN);

    if (!currentChip || !betMoney || !betBtns || !resetBtn || !betDecisionBtn) {
      console.log('error in renderBetOperationModal');
      return;
    }

    betDenomination.forEach((val) => {
      const btn = document.createElement('button');
      btn.classList.add('rounded-full', 'h-12', 'w-12', 'flex', 'items-center', 'justify-center', 'bg-yellow-500', 'hover:bg-yellow-600', 'shadow-lg', 'text-white', 'text-sm');
      btn.textContent = String(val);
      btn.addEventListener('click', () => {
        const betMoneyVal = betMoney.textContent;
        const currentChipVal = currentChip.textContent;

        if (!betMoneyVal || !currentChipVal) return;
        const betMoneyNum = parseInt(betMoneyVal);
        const currentChipNum = parseInt(currentChipVal);

        if (currentChipNum - val < 0) return;
        betMoney.textContent = String(betMoneyNum + val);
        currentChip.textContent = String(currentChipNum - val);
      });
      betBtns.appendChild(btn);
    });

    resetBtn.addEventListener('click', () => {
      const betMoneyVal = betMoney.textContent;
      const currentChipVal = currentChip.textContent;

      if (!betMoneyVal || !currentChipVal) return;
      const betMoneyNum = parseInt(betMoneyVal);
      const currentChipNum = parseInt(currentChipVal);

      betMoney.textContent = '0';
      currentChip.textContent = String(chip);
    });
    betDecisionBtn.addEventListener('click', () => {
      const betMoneyVal = betMoney.textContent;
      if (!betMoneyVal) return;
      const betMoneyNum = parseInt(betMoneyVal);
      if(betMoneyNum === 0) return
      
      this.controller.handleUserBet(betMoneyNum)
      // close modal
      betOperationSpace.classList.add('hidden');
      // TODO
    });
  }

  public renderHouse(player: Player) {
    if (player.type !== 'house') return;
    const houseContainer = document.getElementById('house-container');
    if (!houseContainer) {
      console.log('error in renderHouse');
      return;
    }
    houseContainer.innerHTML = `
    <div class="mb-2">
      <span class="shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800">${player.name}</span>
    </div>
    <div id="host-status" class="h-4 flex justify-center items-center gap-2">
    </div>
    <div class="flex gap-2 align-center justify-center mt-3">
    </div>
    `;
  }
  public renderUser(player: Player) {
    if (player.type !== 'user') return;
    const userContainer = document.getElementById('user-container');
    if (!userContainer) {
      console.log('error in renderUser');
      return;
    }
    userContainer.innerHTML = `
    <div class="mb-2">
      <span id="user-name" class="shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800">${player.name}</span>
    </div>
    <div class="h-4 flex justify-center items-center gap-2">
      <span class="rounded-full h-4 w-4 flex items-center justify-center bg-yellow-600 shadow-lg text-white text-sm">c</span>
      <span id="user-money" class="text-white">${player.chips}</span>
      <div id="user-status">
      </div>
    </div>
    <div id="user-cards" class="flex gap-2 align-center justify-center mt-3">
    </div>
    `;
  }

  public renderAI(player: Player) {
    if (player.type !== 'ai') return;
    const aiContainer = document.getElementById(player.name + '-container');
    if (!aiContainer) {
      console.log('error in renderAi');
      return;
    }
    aiContainer.innerHTML = `
    <div class="mb-2">
      <span class="shadow text-2xl inline-block bg-gray-700 rounded-full px-4 py-1 text-xl font-semibold text-white">${player.name}</span>
    </div>
      <div class="h-4 flex justify-center items-center gap-2">
        <span class="rounded-full h-4 w-4 flex items-center justify-center bg-yellow-600 shadow-lg text-white text-sm">c</span>
        <span id="ai1-money" class="text-white">${player.chips}</span>
        <div id="ai1-status">
        </div>
      </div>
    <div id="ai1-cards" class="flex gap-2 align-center justify-center mt-3">
    </div>
    `;
  }
}
