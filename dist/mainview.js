/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@mediapipe/selfie_segmentation":
/*!*************************************************!*\
  !*** external "@mediapipe/selfie_segmentation" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@mediapipe/selfie_segmentation");

/***/ }),

/***/ "@tensorflow-models/body-segmentation":
/*!*******************************************************!*\
  !*** external "@tensorflow-models/body-segmentation" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("@tensorflow-models/body-segmentation");

/***/ }),

/***/ "@tensorflow/tfjs-backend-webgl":
/*!*************************************************!*\
  !*** external "@tensorflow/tfjs-backend-webgl" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@tensorflow/tfjs-backend-webgl");

/***/ }),

/***/ "@tensorflow/tfjs-core":
/*!****************************************!*\
  !*** external "@tensorflow/tfjs-core" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@tensorflow/tfjs-core");

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
/*!**********************************!*\
  !*** ./src/Renderer/MainView.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tensorflow_models_body_segmentation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tensorflow-models/body-segmentation */ "@tensorflow-models/body-segmentation");
/* harmony import */ var _tensorflow_models_body_segmentation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tensorflow_models_body_segmentation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tensorflow_tfjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tensorflow/tfjs-core */ "@tensorflow/tfjs-core");
/* harmony import */ var _tensorflow_tfjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tensorflow_tfjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tensorflow_tfjs_backend_webgl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tensorflow/tfjs-backend-webgl */ "@tensorflow/tfjs-backend-webgl");
/* harmony import */ var _tensorflow_tfjs_backend_webgl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tensorflow_tfjs_backend_webgl__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mediapipe_selfie_segmentation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediapipe/selfie_segmentation */ "@mediapipe/selfie_segmentation");
/* harmony import */ var _mediapipe_selfie_segmentation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mediapipe_selfie_segmentation__WEBPACK_IMPORTED_MODULE_3__);

 // Register WebGL backend.




(async () => {
  // const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
  // const segmenterConfig = {
  //     runtime: 'mediapipe',
  //     solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation'
  //     // or 'base/node_modules/@mediapipe/selfie_segmentation' in npm.
  // };
  // segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
  const model = _tensorflow_models_body_segmentation__WEBPACK_IMPORTED_MODULE_0__.SupportedModels.BodyPix;
  const segmenterConfig = {
    architecture: 'ResNet50',
    outputStride: 32,
    quantBytes: 2,
    runtime: 'mediapipe'
  };
  let segmenter = await _tensorflow_models_body_segmentation__WEBPACK_IMPORTED_MODULE_0__.createSegmenter(model, segmenterConfig);
  const screen = document.getElementById('screen');
  const segmentationConfig = {
    flipHorizontal: false
  };
  const people = await segmenter.segmentPeople(screen, segmentationConfig);
  console.log(people);
})();
})();

/******/ })()
;
//# sourceMappingURL=mainview.js.map