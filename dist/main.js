/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/Electron/Main.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


var win;
electron__WEBPACK_IMPORTED_MODULE_0__.app.commandLine.appendSwitch('disable-features', 'IOSurfaceCapturer,DesktopCaptureMacV2');

function createWindow() {
  let primaryDisplay = electron__WEBPACK_IMPORTED_MODULE_0__.screen.getPrimaryDisplay();
  console.log(electron__WEBPACK_IMPORTED_MODULE_0__.screen.getAllDisplays());
  win = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
    width: primaryDisplay.size.width,
    height: primaryDisplay.size.width,
    // width: 200,
    // height:200,
    // skipTaskbar: true,
    // transparent: true,
    // fullscreen: true,
    show: false,
    // contentProtection: true,
    alwaysOnTop: true,
    frame: false,
    // opacity: 0.5,
    focusable: true,
    acceptFirstMouse: true,
    webPreferences: {
      preload: path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, 'preload.js')
    }
  });
  win.loadFile(path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, 'index.html')); // win.setBackgroundColor('#aaa');
  // win.setFullScreen(true);
  // win.setKiosk(true);

  win.setIgnoreMouseEvents(true, {
    forward: false
  });
  win.setContentProtection(true); // var monitorWidth = screen.width;
  // var monitorHeight = screen.height;
  // win.openDevTools();

  electron__WEBPACK_IMPORTED_MODULE_0__.desktopCapturer.getSources({
    types: ['window', 'screen']
  }).then(async sources => {
    for (const source of sources) {
      console.log(source);

      if (source.name === 'Entire screen') {
        win.webContents.send('SET_SOURCE', source.id);
        return;
      }
    }
  });
  win.show(true);
}

electron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(() => {
  createWindow(); // setTimeout(() => {
  //   desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  //     for (const source of sources) {
  //       console.log(source)
  //       if (source.name === 'Entire screen') {
  //         win.webContents.send('SET_SOURCE', source.id)
  //         return
  //       }
  //     }
  //   })  
  // }, 2000)

  electron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', () => {
    if (electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map