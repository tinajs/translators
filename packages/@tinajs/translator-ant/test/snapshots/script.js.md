# Snapshot report for `test/script.js`

The actual snapshot is saved in `script.js.snap`.

Generated by [AVA](https://ava.li).

## app - /basic/app.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(4);␊
    ␊
    ␊
    /***/ }),␊
    /* 4 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    ;__webpack_require__(5);␊
    ␊
    module.exports = {␊
      onLaunch() {␊
        console.log('Hi App');␊
      }␊
    ␊
    };␊
    __webpack_require__(6).config.globals.App = App;␊
    ␊
    __webpack_require__(6).App.define(module.exports);␊
    ␊
    /***/ }),␊
    /* 5 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ })␊
    ],[[3,0]]]);`

## component - /basic/component.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */,␊
    /* 4 */,␊
    /* 5 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(6);␊
    ␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    ;__webpack_require__(7);␊
    ␊
    let foo = 'foo';␊
    foo.bar = 'bar';␊
    module.exports = {␊
      ready() {␊
        this.setData({␊
          msg: 'Hi Component'␊
        });␊
      }␊
    ␊
    };␊
    __webpack_require__(8).config.globals.Component = Component;␊
    ␊
    __webpack_require__(8).Component.define(module.exports);␊
    ␊
    /***/ }),␊
    /* 7 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ }),␊
    /* 8 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ })␊
    ],[[5,0]]]);`

## export-double-times - /basic/export-double-times.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */,␊
    /* 4 */,␊
    /* 5 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(6);␊
    ␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, __webpack_exports__, __webpack_require__) {␊
    ␊
    "use strict";␊
    __webpack_require__.r(__webpack_exports__);␊
    /* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);␊
    /* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common__WEBPACK_IMPORTED_MODULE_0__);␊
    /* harmony import */ var _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);␊
    /* harmony import */ var _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1__);␊
    ;␊
    let foo = 'foo';␊
    foo.bar = 'bar';␊
    const options = {␊
      onLoad() {␊
        this.setData({␊
          msg: 'Hi Page'␊
        });␊
      }␊
    ␊
    };␊
    ␊
    const _tina_default_export = options;␊
    _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default.a.config.globals.Page = Page;␊
    ␊
    _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default.a.Page.define(_tina_default_export);␊
    ␊
    exports.default = _tina_default_export;␊
    module.exports = options;␊
    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))␊
    ␊
    /***/ }),␊
    /* 7 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = function(originalModule) {␊
    	if (!originalModule.webpackPolyfill) {␊
    		var module = Object.create(originalModule);␊
    		// module.parent = undefined by default␊
    		if (!module.children) module.children = [];␊
    		Object.defineProperty(module, "loaded", {␊
    			enumerable: true,␊
    			get: function() {␊
    				return module.l;␊
    			}␊
    		});␊
    		Object.defineProperty(module, "id", {␊
    			enumerable: true,␊
    			get: function() {␊
    				return module.i;␊
    			}␊
    		});␊
    		Object.defineProperty(module, "exports", {␊
    			enumerable: true␊
    		});␊
    		module.webpackPolyfill = 1;␊
    	}␊
    	return module;␊
    };␊
    ␊
    ␊
    /***/ }),␊
    /* 8 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ }),␊
    /* 9 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ })␊
    ],[[5,0]]]);`

## export-identifier - /basic/export-identifier.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */,␊
    /* 4 */,␊
    /* 5 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(6);␊
    ␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, __webpack_exports__, __webpack_require__) {␊
    ␊
    "use strict";␊
    __webpack_require__.r(__webpack_exports__);␊
    /* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);␊
    /* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common__WEBPACK_IMPORTED_MODULE_0__);␊
    /* harmony import */ var _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);␊
    /* harmony import */ var _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1__);␊
    ;␊
    let foo = 'foo';␊
    foo.bar = 'bar';␊
    const options = {␊
      onLoad() {␊
        this.setData({␊
          msg: 'Hi Page'␊
        });␊
      }␊
    ␊
    };␊
    ␊
    const _tina_default_export = options;␊
    _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default.a.config.globals.Page = Page;␊
    ␊
    _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default.a.Page.define(_tina_default_export);␊
    ␊
    exports.default = _tina_default_export;␊
    ␊
    /***/ }),␊
    /* 7 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ }),␊
    /* 8 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ })␊
    ],[[5,0]]]);`

## export-object - /basic/export-object.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */,␊
    /* 4 */,␊
    /* 5 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(6);␊
    ␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, __webpack_exports__, __webpack_require__) {␊
    ␊
    "use strict";␊
    __webpack_require__.r(__webpack_exports__);␊
    /* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);␊
    /* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common__WEBPACK_IMPORTED_MODULE_0__);␊
    /* harmony import */ var _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);␊
    /* harmony import */ var _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1__);␊
    ;␊
    let foo = 'foo';␊
    foo.bar = 'bar';␊
    ␊
    const _tina_default_export = {␊
      onLoad() {␊
        this.setData({␊
          msg: 'Hi Page'␊
        });␊
      }␊
    ␊
    };␊
    _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default.a.config.globals.Page = Page;␊
    ␊
    _tinajs_tina_lib_ant_tina__WEBPACK_IMPORTED_MODULE_1___default.a.Page.define(_tina_default_export);␊
    ␊
    exports.default = _tina_default_export;␊
    ␊
    /***/ }),␊
    /* 7 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ }),␊
    /* 8 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ })␊
    ],[[5,0]]]);`

## manual - /basic/manual.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */,␊
    /* 4 */,␊
    /* 5 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(6);␊
    ␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    ;const {␊
      Page␊
    } = __webpack_require__(7);␊
    ␊
    __webpack_require__(8);␊
    ␊
    let foo = 'foo';␊
    foo.bar = 'bar';␊
    Page.define({␊
      onLoad() {␊
        this.setData({␊
          msg: 'Hi Page'␊
        });␊
      }␊
    ␊
    });␊
    ␊
    /***/ }),␊
    /* 7 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ }),␊
    /* 8 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ })␊
    ],[[5,0]]]);`

## page - /basic/page.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */,␊
    /* 4 */,␊
    /* 5 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(6);␊
    ␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    ;__webpack_require__(7);␊
    ␊
    let foo = 'foo';␊
    foo.bar = 'bar';␊
    module.exports = {␊
      onLoad() {␊
        this.setData({␊
          msg: 'Hi Page'␊
        });␊
      }␊
    ␊
    };␊
    __webpack_require__(8).config.globals.Page = Page;␊
    ␊
    __webpack_require__(8).Page.define(module.exports);␊
    ␊
    /***/ }),␊
    /* 7 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ }),␊
    /* 8 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ })␊
    ],[[5,0]]]);`

## without-config - /basic/without-config.js

    `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[␊
    /* 0 */,␊
    /* 1 */,␊
    /* 2 */,␊
    /* 3 */,␊
    /* 4 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    module.exports = __webpack_require__(5);␊
    ␊
    ␊
    /***/ }),␊
    /* 5 */␊
    /***/ (function(module, exports, __webpack_require__) {␊
    ␊
    ;__webpack_require__(6);␊
    ␊
    let foo = 'foo';␊
    foo.bar = 'bar';␊
    module.exports = {␊
      onLoad() {␊
        this.setData({␊
          msg: 'Hi Page'␊
        });␊
      }␊
    ␊
    };␊
    __webpack_require__(7).config.globals.Page = Page;␊
    ␊
    __webpack_require__(7).Page.define(module.exports);␊
    ␊
    /***/ }),␊
    /* 6 */␊
    /***/ (function(module, exports) {␊
    ␊
    console.log('\\ud83d\\udc95')␊
    ␊
    ␊
    /***/ }),␊
    /* 7 */␊
    /***/ (function(module, exports) {␊
    ␊
    module.exports = Tina;␊
    ␊
    /***/ })␊
    ],[[4,0]]]);`
