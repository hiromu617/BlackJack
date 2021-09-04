/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/application_controller.ts":
/*!***************************************************!*\
  !*** ./src/controllers/application_controller.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Controller = void 0;\nvar application_view_1 = __webpack_require__(/*! ../views/application_view */ \"./src/views/application_view.ts\");\nvar Table_1 = __webpack_require__(/*! ../models/Table */ \"./src/models/Table.ts\");\nvar Controller = /** @class */ (function () {\n    function Controller() {\n        this.view = new application_view_1.View(this);\n        this.view.renderStartPage();\n        this.table = null;\n    }\n    Controller.prototype.startGame = function (name, gameType) {\n        if (gameType === \"porker\") {\n            alert(\"近日公開！！（多分）\");\n            return;\n        }\n        if (name === \"\")\n            name = \"User\";\n        this.table = new Table_1.Table(\"blackjack\", [5, 10, 50, 100], name);\n        this.view.renderMainPage(name, this.table.betDenomination);\n    };\n    return Controller;\n}());\nexports.Controller = Controller;\n\n\n//# sourceURL=webpack://brackjack/./src/controllers/application_controller.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar application_controller_1 = __webpack_require__(/*! ./controllers/application_controller */ \"./src/controllers/application_controller.ts\");\nnew application_controller_1.Controller();\n\n\n//# sourceURL=webpack://brackjack/./src/index.ts?");

/***/ }),

/***/ "./src/models/Card.ts":
/*!****************************!*\
  !*** ./src/models/Card.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Card = void 0;\nvar Card = /** @class */ (function () {\n    function Card(suit, rank) {\n        this.suit = suit;\n        this.rank = rank;\n        this.isDownCard = false;\n    }\n    // カードのランクを数値で返す\n    Card.prototype.getRankNumber = function () {\n        // Aはとりあえず11を返す\n        if (this.rank === 'A')\n            return 11;\n        else if (this.rank === 'J' || this.rank === 'Q' || this.rank === 'K') {\n            return 10;\n        }\n        return this.rank;\n    };\n    // カードを裏向きにする\n    Card.prototype.faceDown = function () {\n        this.isDownCard = true;\n    };\n    // カードを表向きにする\n    Card.prototype.faceUp = function () {\n        this.isDownCard = false;\n    };\n    return Card;\n}());\nexports.Card = Card;\n\n\n//# sourceURL=webpack://brackjack/./src/models/Card.ts?");

/***/ }),

/***/ "./src/models/Deck.ts":
/*!****************************!*\
  !*** ./src/models/Deck.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Deck = void 0;\nvar Card_1 = __webpack_require__(/*! ./Card */ \"./src/models/Card.ts\");\nvar Deck = /** @class */ (function () {\n    function Deck(gameType) {\n        this.gameType = gameType;\n        this.cards = [];\n        this.resetDeck();\n    }\n    // デッキをリセットしてシャッフルする\n    Deck.prototype.resetDeck = function () {\n        var _this = this;\n        this.cards.length = 0;\n        var suits = ['H', 'S', 'C', 'D'];\n        suits.forEach(function (suit) {\n            var _a;\n            (_a = _this.cards).push.apply(_a, [new Card_1.Card(suit, 'A'), new Card_1.Card(suit, 1), new Card_1.Card(suit, 2), new Card_1.Card(suit, 3), new Card_1.Card(suit, 4), new Card_1.Card(suit, 5), new Card_1.Card(suit, 6), new Card_1.Card(suit, 7), new Card_1.Card(suit, 8), new Card_1.Card(suit, 9), new Card_1.Card(suit, 10), new Card_1.Card(suit, 'J'), new Card_1.Card(suit, 'Q'), new Card_1.Card(suit, 'K')]);\n        });\n        this.shuffle();\n        console.log(this.cards);\n    };\n    // TODO: バグあるかも、シャッフルできてない？\n    Deck.prototype.shuffle = function () {\n        var _a;\n        for (var i = this.cards.length; 1 < i; i--) {\n            var k = Math.floor(Math.random() * i);\n            _a = [this.cards[i - 1], this.cards[k]], this.cards[k] = _a[0], this.cards[i - 1] = _a[1];\n        }\n        console.log(this.cards);\n    };\n    // 先頭のカードを返す\n    Deck.prototype.drawOne = function () {\n        return this.cards.pop();\n    };\n    return Deck;\n}());\nexports.Deck = Deck;\n\n\n//# sourceURL=webpack://brackjack/./src/models/Deck.ts?");

/***/ }),

/***/ "./src/models/GameDecision.ts":
/*!************************************!*\
  !*** ./src/models/GameDecision.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameDecision = void 0;\nvar GameDecision = /** @class */ (function () {\n    function GameDecision(action, amount) {\n        this.action = action;\n        this.amount = amount;\n    }\n    return GameDecision;\n}());\nexports.GameDecision = GameDecision;\n\n\n//# sourceURL=webpack://brackjack/./src/models/GameDecision.ts?");

/***/ }),

/***/ "./src/models/Player.ts":
/*!******************************!*\
  !*** ./src/models/Player.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Player = void 0;\nvar GameDecision_1 = __webpack_require__(/*! ./GameDecision */ \"./src/models/GameDecision.ts\");\nvar Player = /** @class */ (function () {\n    function Player(name, type, gameType, chips) {\n        this.name = name;\n        this.type = type;\n        this.gameType = gameType;\n        this.chips = chips;\n        this.winAmount = 0;\n        this.gameDecision = null;\n        this.hand = [];\n    }\n    Player.prototype.promptPlayer = function (userData) {\n        if (!userData)\n            return new GameDecision_1.GameDecision(\"bet\", userData);\n        // TODO\n        return this.gameDecision = new GameDecision_1.GameDecision(\"bet\", userData);\n    };\n    Player.prototype.getHandScore = function () {\n        var score = 0;\n        this.hand.forEach(function (card) {\n            if (card.rank === \"A\" && score + 11 > 21) {\n                score += 1;\n                return;\n            }\n            score += card.getRankNumber();\n        });\n        return score;\n    };\n    return Player;\n}());\nexports.Player = Player;\n\n\n//# sourceURL=webpack://brackjack/./src/models/Player.ts?");

/***/ }),

/***/ "./src/models/Table.ts":
/*!*****************************!*\
  !*** ./src/models/Table.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Table = void 0;\nvar Player_1 = __webpack_require__(/*! ./Player */ \"./src/models/Player.ts\");\nvar Deck_1 = __webpack_require__(/*! ./Deck */ \"./src/models/Deck.ts\");\nvar Table = /** @class */ (function () {\n    function Table(gameType, betDenomination, name) {\n        this.gameType = gameType;\n        this.betDenomination = betDenomination;\n        this.turnCounter = 0;\n        this.gamePhase = 'betting';\n        this.resultLog = [];\n        this.deck = new Deck_1.Deck('blackjack');\n        this.players = [new Player_1.Player(name, 'user', 'blackjack', 400), new Player_1.Player('AI1', 'ai', 'blackjack', 400), new Player_1.Player('AI2', 'ai', 'blackjack', 400), new Player_1.Player('Dealer', 'house', 'blackjack')];\n    }\n    // playerにカードを２枚づつ配る\n    Table.prototype.blackjackAssignPlayerHands = function () {\n        var _this = this;\n        this.players.forEach(function (player) {\n            var card1 = _this.deck.drawOne();\n            var card2 = _this.deck.drawOne();\n            if (card1 && card2) {\n                if (player.type === 'house') {\n                    card2.faceDown();\n                }\n                player.hand.push(card1, card2);\n            }\n        });\n    };\n    // プレイヤーのハンドをリセットする\n    Table.prototype.blackjackClearPlayerHands = function () {\n        this.players.forEach(function (player) {\n            player.hand = [];\n        });\n    };\n    // プレイヤーのベット、ハンド、GameStatus、チップの状態などを更新する。\n    Table.prototype.evaluateMove = function (player) {\n        var gameDecision = player.promptPlayer();\n        if (gameDecision.action === 'bet') {\n            // TODO\n        }\n        else if (gameDecision.action === 'hit') {\n            var card = this.deck.drawOne();\n            if (!card)\n                return;\n            player.hand.push(card);\n        }\n        else if (gameDecision.action === 'stand') {\n            return;\n        }\n        else if (gameDecision.action === 'surrender') {\n            // TODO\n        }\n    };\n    // 現在のターンのプレイヤーを返す\n    Table.prototype.getTurnPlayer = function () {\n        return this.players[this.turnCounter];\n    };\n    // 各ターンごとにテーブルの状態を更新する\n    Table.prototype.haveTurn = function (userData) {\n        var _this = this;\n        if (this.gamePhase === 'betting') {\n            // TODO\n        }\n        else if (this.gamePhase === 'acting') {\n            this.players.forEach(function (player) {\n                player.promptPlayer();\n                _this.evaluateMove(player);\n            });\n        }\n        else if (this.gamePhase === 'evaluatingWinner') {\n            // TODO\n            this.players.forEach(function (player) {\n                var score = player.getHandScore();\n            });\n        }\n        else if (this.gamePhase === 'gameOver') {\n            // TODO\n        }\n        this.turnCounter++;\n    };\n    // ラウンドが終了する前の各プレイヤーの状態を返す\n    Table.prototype.blackjackEvaluateAndGetRoundResults = function () {\n        return '';\n    };\n    // 最後のプレイヤーかどうか\n    Table.prototype.onLastPlayer = function () {\n        return this.turnCounter === this.players.length - 1;\n    };\n    // 最初のプレイヤーかどうか\n    Table.prototype.onFirstPlayer = function () {\n        return this.turnCounter === 0;\n    };\n    // 全てのプレイヤーのアクションが終了したかどうか\n    Table.prototype.allPlayerActionsResolved = function () {\n        this.players.forEach(function (player) {\n            if (!player.gameDecision)\n                return false;\n        });\n        return true;\n    };\n    return Table;\n}());\nexports.Table = Table;\n\n\n//# sourceURL=webpack://brackjack/./src/models/Table.ts?");

/***/ }),

/***/ "./src/views/application_view.ts":
/*!***************************************!*\
  !*** ./src/views/application_view.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.View = void 0;\nvar View = /** @class */ (function () {\n    function View(controller) {\n        this.controller = controller;\n        this.root = document.getElementById('root');\n    }\n    View.prototype.renderStartPage = function () {\n        var _this = this;\n        this.root.innerHTML = \"\\n    <section id=\\\"start-page\\\" class=\\\"w-full h-full flex justify-center align-ce\\\">\\n        <div class=\\\"container m-auto text-center p-5\\\">\\n          <h1 class=\\\"mb-5 font-semibold text-3xl text-gray-100 tracking-tight\\\">Welcome to Card Game!</h1>\\n          <input type=\\\"text\\\" name=\\\"name\\\" id=\\\"name-input\\\" placeholder=\\\"username\\\" class=\\\"shadow mb-5 w-72 border bg-gray-100 text-gray-700 border-gray-300 py-2 pl-3 rounded-md outline-none focus:outline-none focus:bg-white focus:border-gray-500\\\" />\\n          <div class=\\\"relative w-72 m-auto mb-5\\\">\\n            <select id=\\\"game-type-select\\\" class=\\\"shadow block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500\\\">\\n              <option>brackjack</option>\\n              <option>porker</option>\\n            </select>\\n            <div class=\\\"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700\\\">\\n              <svg class=\\\"fill-current h-4 w-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\"><path d=\\\"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z\\\" /></svg>\\n            </div>\\n          </div>\\n          <div>\\n            <button id=\\\"start-button\\\" class=\\\"shadow py-3 w-72 text-xl text-white bg-green-500 hover:bg-green-400 rounded-xl\\\">Start Game</button>\\n          </div>\\n        </div>\\n      </section>\\n    \";\n        var nameInput = document.getElementById('name-input');\n        var gameTypeSelect = document.getElementById('game-type-select');\n        var startBtn = document.getElementById('start-button');\n        startBtn.addEventListener('click', function () {\n            _this.controller.startGame(nameInput.value, gameTypeSelect.value);\n        });\n    };\n    View.prototype.renderMainPage = function (name, betDenomination) {\n        this.root.innerHTML = \"\\n    <section class=\\\"w-full h-full flex justify-center align-center\\\">\\n        <div class=\\\"container m-auto text-center h-4/5\\\">\\n          <div class=\\\"h-2/6 w-full flex justify-center\\\">\\n            <div id=\\\"dealer-cards\\\" class=\\\"bg-green-700 h-full w-1/3\\\">\\n              <div class=\\\"mb-2\\\">\\n                <span class=\\\"shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800\\\">Dealer</span>\\n              </div>\\n              <div class=\\\"h-4 flex justify-center items-center gap-2\\\">\\n                <span id=\\\"host-status\\\" class=\\\"hidden rounded-full px-2 bg-pink-600 uppercase shadow-lg text-white text-sm\\\">BUST</span>\\n              </div>\\n              <div class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n              </div>\\n            </div>\\n          </div>\\n          <div class=\\\"h-2/6 w-full flex justify-around\\\">\\n            <div id=\\\"ai1-container\\\" class=\\\"h-full w-1/3\\\">\\n              <div class=\\\"mb-2\\\">\\n                <span class=\\\"shadow text-2xl inline-block bg-gray-700 rounded-full px-4 py-1 text-xl font-semibold text-white\\\">AI1</span>\\n              </div>\\n              <div class=\\\"h-4 flex justify-center items-center gap-2\\\">\\n                <span class=\\\"rounded-full h-4 w-4 flex items-center justify-center bg-yellow-600 shadow-lg text-white text-sm\\\">c</span>\\n                <span id=\\\"ai1-money\\\" class=\\\"text-white\\\">400</span>\\n                <span id=\\\"ai1-status\\\" class=\\\"hidden rounded-full px-2 bg-blue-500 shadow-lg text-white text-sm uppercase\\\">hit</span>\\n              </div>\\n              <div id=\\\"ai1-cards\\\" class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n              </div>\\n            </div>\\n            <div id=\\\"bet-space\\\" class=\\\"h-full w-1/3 flex justify-center items-center gap-0\\\">\\n            </div>\\n            <div id=\\\"ai2-container\\\" class=\\\"h-full w-1/3\\\">\\n              <div class=\\\"mb-2\\\">\\n                <span class=\\\"shadow text-2xl inline-block bg-gray-700 rounded-full px-4 py-1 text-xl font-semibold text-white\\\">AI2</span>\\n              </div>\\n              <div class=\\\"h-4 flex justify-center items-center gap-2\\\">\\n                <span class=\\\"rounded-full h-4 w-4 flex items-center justify-center bg-yellow-600 shadow-lg text-white text-sm\\\">c</span>\\n                <span id=\\\"ai2-money\\\" class=\\\"text-white\\\">400</span>\\n                <span id=\\\"ai2-status\\\" class=\\\"hidden rounded-full px-2 bg-purple-500 shadow-lg text-white text-sm uppercase\\\">double</span>\\n              </div>\\n              <div id=\\\"ai2-cards\\\" class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n              </div>\\n            </div>\\n          </div>\\n          <div class=\\\"h-2/6 w-full flex justify-center\\\">\\n            <div id=\\\"player-container\\\" class=\\\"bg-green-700 h-full w-2/5\\\">\\n              <div class=\\\"mb-2\\\">\\n                <span id=\\\"player-name\\\" class=\\\"shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800\\\">\" + name + \"</span>\\n              </div>\\n              <div class=\\\"h-4 flex justify-center items-center gap-2\\\">\\n                <span class=\\\"rounded-full h-4 w-4 flex items-center justify-center bg-yellow-600 shadow-lg text-white text-sm\\\">c</span>\\n                <span id=\\\"player-money\\\" class=\\\"text-white\\\">400</span>\\n                <span id=\\\"player-status\\\" class=\\\"hidden rounded-full px-2 bg-yellow-500 shadow-lg text-white text-sm\\\">stand</span>\\n              </div>\\n              <div id=\\\"player-cards\\\" class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n        <div id=\\\"operation-space\\\" class=\\\"z-10 fixed pb-2 w-full bottom-0 flex justify-center gap-5 align-center\\\">\\n        </div>\\n        <div id=\\\"bet-operation-space\\\" class=\\\"z-20 fixed w-1/3 h-2/3 top-36 bg-white rounded-2xl flex justify-center items-center flex-col gap-10 shadow-2xl\\\">\\n        </div>\\n        <div id=\\\"log\\\" class=\\\"z-5 fixed pb-2 w-1/3 h-52 bottom-0 right-0 text-center\\\">\\n        </div>\\n      </section>\\n    \";\n        this.renderOperaion();\n        // 400 start\n        this.renderBetOperationModal(400, betDenomination);\n    };\n    View.prototype.renderOperaion = function () {\n        var operaionSpace = document.getElementById('operation-space');\n        if (!operaionSpace) {\n            console.log('error renderOperaion');\n            return;\n        }\n        operaionSpace.innerHTML = \"\\n    <button id=\\\"surrender\\\" class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-red-500 hover:bg-red-600 shadow-lg text-white text-sm\\\">SURRENDER</button>\\n    <button id=\\\"stand\\\" class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 shadow-lg text-white\\\">STAND</button>\\n    <button id=\\\"hit\\\" class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-blue-500 hover:bg-blue-600 shadow-lg text-white\\\">HIT</button>\\n    <button id=\\\"double\\\" class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-purple-500 hover:bg-purple-600 shadow-lg text-white\\\">DOUBLE</button>\\n    \";\n        var surrenderBtn = document.getElementById('surrender');\n        var standBtn = document.getElementById('stand');\n        var hitBtn = document.getElementById('hit');\n        var doubleBtn = document.getElementById('double');\n        if (!surrenderBtn || !standBtn || !hitBtn || !doubleBtn) {\n            console.log('error 130');\n            return;\n        }\n        surrenderBtn.addEventListener('click', function () {\n            // TODO\n        });\n        standBtn.addEventListener('click', function () {\n            // TODO\n        });\n        hitBtn.addEventListener('click', function () {\n            // TODO\n        });\n        doubleBtn.addEventListener('click', function () {\n            // TODO\n        });\n    };\n    View.prototype.renderBetOperationModal = function (chip, betDenomination) {\n        var betOperationSpace = document.getElementById('bet-operation-space');\n        if (!betOperationSpace) {\n            console.log('error renderOprtionModal');\n            return;\n        }\n        var ID = { CURRENT_CHIP: 'current-chip', BET_MONEY: 'bet-money', BET_BTNS: 'bet-btns', RESET_BTN: 'reset-btn', BET_DECISION_BTN: 'bet-decision-btn' };\n        betOperationSpace.innerHTML = \"\\n          <div>\\n            <p class=\\\"text-2xl text-gray-800 font-bold\\\">You Bet <span id=\" + ID.BET_MONEY + \">0</span> </p>\\n          </div>\\n          <div class=\\\"h-auto flex justify-center items-center gap-2\\\">\\n            <span class=\\\"rounded-full h-8 w-8 flex items-center justify-center bg-yellow-600 shadow-lg text-white text-sm\\\">c</span>\\n            <span id=\" + ID.CURRENT_CHIP + \" class=\\\"text-gray-700 font-semibold\\\">\" + chip + \"</span>\\n          </div>\\n          <div id=\" + ID.BET_BTNS + \" class=\\\"h-auto flex justify-center items-center gap-2\\\">\\n          </div>\\n          <div class=\\\"p-3  mt-2 text-center space-x-4 md:block\\\">\\n            <button id=\" + ID.RESET_BTN + \" class=\\\"mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100\\\">\\n                Reset\\n            </button>\\n            <button id=\" + ID.BET_DECISION_BTN + \" class=\\\"mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600\\\">Bet</button>\\n          </div>\\n    \";\n        var currentChip = document.getElementById(ID.CURRENT_CHIP);\n        var betMoney = document.getElementById(ID.BET_MONEY);\n        var betBtns = document.getElementById(ID.BET_BTNS);\n        var resetBtn = document.getElementById(ID.RESET_BTN);\n        var betDecisionBtn = document.getElementById(ID.BET_DECISION_BTN);\n        if (!currentChip || !betMoney || !betBtns || !resetBtn || !betDecisionBtn) {\n            console.log('error in renderBetOperationModal');\n            return;\n        }\n        betDenomination.forEach(function (val) {\n            var btn = document.createElement('button');\n            btn.classList.add('rounded-full', 'h-12', 'w-12', 'flex', 'items-center', 'justify-center', 'bg-yellow-500', 'hover:bg-yellow-600', 'shadow-lg', 'text-white', 'text-sm');\n            btn.textContent = String(val);\n            btn.addEventListener('click', function () {\n                var betMoneyVal = betMoney.textContent;\n                var currentChipVal = currentChip.textContent;\n                if (!betMoneyVal || !currentChipVal)\n                    return;\n                var betMoneyNum = parseInt(betMoneyVal);\n                var currentChipNum = parseInt(currentChipVal);\n                if (currentChipNum - val < 0)\n                    return;\n                betMoney.textContent = String(betMoneyNum + val);\n                currentChip.textContent = String(currentChipNum - val);\n            });\n            betBtns.appendChild(btn);\n        });\n        resetBtn.addEventListener('click', function () {\n            var betMoneyVal = betMoney.textContent;\n            var currentChipVal = currentChip.textContent;\n            if (!betMoneyVal || !currentChipVal)\n                return;\n            var betMoneyNum = parseInt(betMoneyVal);\n            var currentChipNum = parseInt(currentChipVal);\n            betMoney.textContent = '0';\n            currentChip.textContent = String(chip);\n        });\n        betDecisionBtn.addEventListener('click', function () {\n            var betMoneyVal = betMoney.textContent;\n            if (!betMoneyVal)\n                return;\n            var betMoneyNum = parseInt(betMoneyVal);\n            alert(\"you bet \" + betMoneyNum);\n            // close modal\n            betOperationSpace.classList.add('hidden');\n            // TODO\n        });\n    };\n    return View;\n}());\nexports.View = View;\n\n\n//# sourceURL=webpack://brackjack/./src/views/application_view.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;