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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Controller = void 0;\nvar application_view_1 = __webpack_require__(/*! ../views/application_view */ \"./src/views/application_view.ts\");\nvar Controller = /** @class */ (function () {\n    function Controller() {\n        this.view = new application_view_1.View(this);\n        this.view.renderStartPage();\n    }\n    Controller.prototype.startGame = function (name, gameType) {\n        if (gameType === \"porker\") {\n            alert(\"近日公開！！（多分）\");\n            return;\n        }\n        if (name === \"\")\n            name = \"User\";\n        this.view.renderMainPage();\n    };\n    return Controller;\n}());\nexports.Controller = Controller;\n\n\n//# sourceURL=webpack://brackjack/./src/controllers/application_controller.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar application_controller_1 = __webpack_require__(/*! ./controllers/application_controller */ \"./src/controllers/application_controller.ts\");\nnew application_controller_1.Controller();\n\n\n//# sourceURL=webpack://brackjack/./src/index.ts?");

/***/ }),

/***/ "./src/views/application_view.ts":
/*!***************************************!*\
  !*** ./src/views/application_view.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.View = void 0;\nvar View = /** @class */ (function () {\n    function View(controller) {\n        this.controller = controller;\n        this.root = document.getElementById(\"root\");\n    }\n    View.prototype.renderStartPage = function () {\n        var _this = this;\n        this.root.innerHTML = \"\\n    <section id=\\\"start-page\\\" class=\\\"w-full h-full flex justify-center align-ce\\\">\\n        <div class=\\\"container m-auto text-center p-5\\\">\\n          <h1 class=\\\"mb-5 font-semibold text-3xl text-gray-100 tracking-tight\\\">Welcome to Card Game!</h1>\\n          <input type=\\\"text\\\" name=\\\"name\\\" id=\\\"name-input\\\" placeholder=\\\"username\\\" class=\\\"shadow mb-5 w-72 border bg-gray-100 text-gray-700 border-gray-300 py-2 pl-3 rounded-md outline-none focus:outline-none focus:bg-white focus:border-gray-500\\\" />\\n          <div class=\\\"relative w-72 m-auto mb-5\\\">\\n            <select id=\\\"game-type-select\\\" class=\\\"shadow block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500\\\">\\n              <option>brackjack</option>\\n              <option>porker</option>\\n            </select>\\n            <div class=\\\"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700\\\">\\n              <svg class=\\\"fill-current h-4 w-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\"><path d=\\\"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z\\\" /></svg>\\n            </div>\\n          </div>\\n          <div>\\n            <button id=\\\"start-button\\\" class=\\\"shadow py-3 w-72 text-xl text-white bg-green-500 hover:bg-green-400 rounded-xl\\\">Start Game</button>\\n          </div>\\n        </div>\\n      </section>\\n    \";\n        var nameInput = document.getElementById(\"name-input\");\n        var gameTypeSelect = document.getElementById(\"game-type-select\");\n        var startBtn = document.getElementById(\"start-button\");\n        startBtn.addEventListener(\"click\", function () {\n            _this.controller.startGame(nameInput.value, gameTypeSelect.value);\n        });\n    };\n    View.prototype.renderMainPage = function () {\n        this.root.innerHTML = \"\\n    <section id=\\\"start-page\\\" class=\\\"w-full h-full flex justify-center align-center\\\">\\n        <div class=\\\"container m-auto text-center h-4/5\\\">\\n          <div class=\\\"h-2/6 w-full flex justify-center\\\">\\n            <div id=\\\"dealer-cards\\\" class=\\\"bg-green-700 h-full w-1/3\\\">\\n              <div>\\n                <span class=\\\"shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800\\\">Dealer</span>\\n              </div>\\n              <div class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n                <div id=\\\"card\\\" class=\\\"relative flex justify-center align-ceter w-20 h-32 bg-white rounded shadow text-center\\\">\\n                  <img src=\\\"/img/club.png\\\" class=\\\"h-10 m-auto\\\" />\\n                  <span class=\\\"absolute top-0 left-1 text-2xl mt-2\\\">A</span>\\n                </div>\\n                <div id=\\\"card-turnover\\\" class=\\\"relative flex justify-center align-ceter w-20 h-32 bg-gray-900 rounded shadow text-center\\\">\\n                  <p class=\\\"text-white text-3xl m-auto\\\">?</p>\\n                </div>\\n              </div>\\n            </div>\\n          </div>\\n          <div class=\\\"h-2/6 w-full flex justify-around\\\">\\n            <div id=\\\"ai1-cards\\\" class=\\\"h-full w-1/3\\\">\\n              <div>\\n                <span class=\\\"shadow text-2xl inline-block bg-gray-700 rounded-full px-4 py-1 text-xl font-semibold text-white\\\">AI1</span>\\n              </div>\\n              <div class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n                <div id=\\\"ai-card\\\" class=\\\"relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center\\\">\\n                  <img src=\\\"/img/club.png\\\" class=\\\"h-8 m-auto\\\" />\\n                  <span class=\\\"absolute top-0 left-1 text-xl mt-2\\\">10</span>\\n                </div>\\n                <div id=\\\"ai-card\\\" class=\\\"relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center\\\">\\n                  <img src=\\\"/img/club.png\\\" class=\\\"h-8 m-auto\\\" />\\n                  <span class=\\\"absolute top-0 left-1 text-xl mt-2\\\">10</span>\\n                </div>\\n              </div>\\n            </div>\\n            <div id=\\\"ai2-cards\\\" class=\\\"h-full w-1/3\\\">\\n              <div>\\n                <span class=\\\"shadow text-2xl inline-block bg-gray-700 rounded-full px-4 py-1 text-xl font-semibold text-white\\\">AI2</span>\\n              </div>\\n              <div class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n                <div id=\\\"ai-card\\\" class=\\\"relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center\\\">\\n                  <img src=\\\"/img/club.png\\\" class=\\\"h-8 m-auto\\\" />\\n                  <span class=\\\"absolute top-0 left-1 text-xl mt-2\\\">10</span>\\n                </div>\\n                <div id=\\\"ai-card\\\" class=\\\"relative flex justify-center align-ceter w-16 h-24 bg-white rounded shadow text-center\\\">\\n                  <img src=\\\"/img/club.png\\\" class=\\\"h-8 m-auto\\\" />\\n                  <span class=\\\"absolute top-0 left-1 text-xl mt-2\\\">10</span>\\n                </div>\\n              </div>\\n            </div>\\n          </div>\\n          <div class=\\\"h-2/6 w-full flex justify-center\\\">\\n            <div id=\\\"player-cards\\\" class=\\\"bg-green-700 h-full w-2/5\\\">\\n              <div>\\n                <span class=\\\"shadow text-2xl inline-block bg-white rounded-full px-4 py-1 text-xl font-semibold text-gray-800\\\">User</span>\\n              </div>\\n              <div class=\\\"flex gap-2 align-center justify-center mt-3\\\">\\n                <div id=\\\"card\\\" class=\\\"relative flex justify-center align-ceter w-20 h-32 bg-white rounded shadow text-center\\\">\\n                  <img src=\\\"/img/club.png\\\" class=\\\"h-10 m-auto\\\" />\\n                  <span class=\\\"absolute top-0 left-1 text-2xl mt-2\\\">10</span>\\n                </div>\\n                <div id=\\\"card\\\" class=\\\"relative flex justify-center align-ceter w-20 h-32 bg-white rounded shadow text-center\\\">\\n                  <img src=\\\"/img/club.png\\\" class=\\\"h-10 m-auto\\\" />\\n                  <span class=\\\"absolute top-0 left-1 text-2xl mt-2\\\">10</span>\\n                </div>\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n        <div id=\\\"operation-space\\\" class=\\\"z-10 fixed pb-2 w-full bottom-0 flex justify-center gap-5 align-center\\\">\\n          <button class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-red-500 hover:bg-red-600 shadow-lg text-white text-sm\\\">SURRENDER</button>\\n          <button class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 shadow-lg text-white\\\">STAND</button>\\n          <button class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-blue-500 hover:bg-blue-600 shadow-lg text-white\\\">HIT</button>\\n          <button class=\\\"rounded-full h-24 w-24 flex items-center justify-center bg-purple-500 hover:bg-purple-600 shadow-lg text-white\\\">DOUBLE</button>\\n        </div>\\n        <div id=\\\"log\\\" class=\\\"z-5 fixed pb-2 w-1/3 h-52 bottom-0 right-0 text-center\\\">\\n          <p class=\\\"text-white text-sm md:text-lg\\\">Dealer has a card </p>\\n          <p class=\\\"text-white text-sm md:text-lg\\\">Dealer has a card </p>\\n          <p class=\\\"text-white text-sm md:text-lg\\\">Dealer has a card </p>\\n          <p class=\\\"text-white text-sm md:text-lg\\\">Dealer has a card </p>\\n          <p class=\\\"text-white text-sm md:text-lg\\\">Dealer has a card </p>\\n        </div>\\n      </section>\\n    \";\n    };\n    return View;\n}());\nexports.View = View;\n\n\n//# sourceURL=webpack://brackjack/./src/views/application_view.ts?");

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