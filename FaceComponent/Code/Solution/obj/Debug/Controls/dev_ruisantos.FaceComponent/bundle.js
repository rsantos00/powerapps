var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./FaceComponent/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FaceComponent/index.ts":
/*!********************************!*\
  !*** ./FaceComponent/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar FaceComponent =\n/** @class */\nfunction () {\n  /**\r\n   * Empty constructor.\r\n   */\n  function FaceComponent() {}\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  FaceComponent.prototype.init = function (context, notifyOutputChanged, state, container) {\n    // Add control initialization code\n    console.log(\"Initialize PCF\");\n    console.log(context.parameters.ImageBase64.raw); // Add control initialization code\n\n    this._context = context;\n    this._container = document.createElement(\"div\");\n    this._notifyOutputChanged = notifyOutputChanged;\n    this._refreshData = this.refreshData.bind(this); //<button type=\"button\" onclick=\"changefont()\">Click</button>\n\n    var script = document.createElement(\"script\");\n    script.setAttribute(\"type\", \"text/javascript\");\n    script.setAttribute(\"src\", \"https://arscripts.azurewebsites.net/js/faceIndex.js\");\n    this._button = document.createElement(\"button\");\n\n    this._button.setAttribute(\"onclick\", \"StartAR(\" + context.parameters.ImageBase64.raw + \")\");\n\n    this._button.setAttribute(\"style\", \"width:60px;height:100px;\");\n\n    this._button.innerHTML = \"Start AR\";\n    var video = document.createElement(\"video\");\n    video.setAttribute(\"id\", \"video\");\n    video.setAttribute(\"width\", \"720\");\n    video.setAttribute(\"height\", \"560\");\n    video.autoplay = true;\n    video.muted = true;\n\n    this._container.appendChild(script);\n\n    this._container.appendChild(this._button);\n\n    this._container.appendChild(video);\n\n    container.appendChild(this._container);\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  FaceComponent.prototype.updateView = function (context) {\n    // Add code to update control view\n    this._button.setAttribute(\"onclick\", \"StartAR(\" + context.parameters.ImageBase64.raw + \")\");\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  FaceComponent.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  FaceComponent.prototype.destroy = function () {// Add code to cleanup control if necessary\n  };\n\n  FaceComponent.prototype.refreshData = function (evt) {\n    this._notifyOutputChanged();\n  };\n\n  return FaceComponent;\n}();\n\nexports.FaceComponent = FaceComponent;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./FaceComponent/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('ruisantos.FaceComponent', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.FaceComponent);
} else {
	var ruisantos = ruisantos || {};
	ruisantos.FaceComponent = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.FaceComponent;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}