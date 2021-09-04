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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Deck_1 = __webpack_require__(/*! ./models/Deck */ \"./src/models/Deck.ts\");\nnew Deck_1.Deck(\"brackjack\");\nnew Deck_1.Deck(\"brackjack\");\n\n\n//# sourceURL=webpack://brackjack/./src/index.ts?");

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