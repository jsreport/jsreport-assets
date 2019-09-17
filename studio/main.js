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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Studio.libraries['react'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Studio;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fileUploadButton = void 0;

var AssetUploadButton = function (_Component) {
  _inherits(AssetUploadButton, _Component);

  function AssetUploadButton() {
    _classCallCheck(this, AssetUploadButton);

    return _possibleConstructorReturn(this, (AssetUploadButton.__proto__ || Object.getPrototypeOf(AssetUploadButton)).apply(this, arguments));
  }

  _createClass(AssetUploadButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _fileUploadButton = this;
    }
  }, {
    key: 'upload',
    value: function upload(e) {
      var _this2 = this;

      if (!e.target.files.length) {
        return;
      }

      var assetDefaults = e.target.assetDefaults;
      var targetAsset = e.target.targetAsset;
      var uploadCallback = e.target.uploadCallback;

      delete e.target.assetDefaults;
      delete e.target.targetAsset;
      delete e.target.uploadCallback;

      var file = e.target.files[0];
      var reader = new FileReader();

      reader.onloadend = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var asset, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.refs.file.value = '';

                if (!(_this2.type === 'new')) {
                  _context.next = 14;
                  break;
                }

                if (!_jsreportStudio2.default.workspaces) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return _jsreportStudio2.default.workspaces.save();

              case 5:
                asset = {};


                if (assetDefaults != null) {
                  asset = Object.assign(asset, assetDefaults);
                }

                asset = Object.assign(asset, {
                  content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length),
                  name: file.name
                });

                _context.next = 10;
                return _jsreportStudio2.default.api.post('/odata/assets', {
                  data: asset
                });

              case 10:
                response = _context.sent;


                response.__entitySet = 'assets';

                _jsreportStudio2.default.addExistingEntity(response);
                _jsreportStudio2.default.openTab(Object.assign({}, response));

              case 14:
                if (!(_this2.type === 'edit')) {
                  _context.next = 24;
                  break;
                }

                if (!_jsreportStudio2.default.workspaces) {
                  _context.next = 21;
                  break;
                }

                _jsreportStudio2.default.updateEntity({
                  name: targetAsset.name,
                  content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length)
                });

                _context.next = 19;
                return _jsreportStudio2.default.workspaces.save();

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.next = 23;
                return _jsreportStudio2.default.api.patch('/odata/assets(' + targetAsset._id + ')', {
                  data: {
                    content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length),
                    link: null
                  }
                });

              case 23:
                _jsreportStudio2.default.loadEntity(targetAsset._id, true);

              case 24:

                if (uploadCallback) {
                  uploadCallback();
                }

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      reader.onerror = function () {
        var errMsg = 'There was an error reading the file!';

        if (uploadCallback) {
          uploadCallback(new Error(errMsg));
        }

        alert(errMsg);
      };

      reader.readAsDataURL(file);
    }
  }, {
    key: 'openFileDialog',
    value: function openFileDialog(type, defaults) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var targetAssetIdAndName = opts.targetAsset;

      this.type = type;

      if (defaults) {
        this.refs.file.assetDefaults = defaults;
      } else {
        delete this.refs.file.assetDefaults;
      }

      if (targetAssetIdAndName) {
        this.refs.file.targetAsset = targetAssetIdAndName;
      } else if (type !== 'new') {
        this.refs.file.targetAsset = {
          _id: this.props.tab.entity._id,
          name: this.props.tab.entity.name
        };
      }

      if (opts.uploadCallback) {
        this.refs.file.uploadCallback = opts.uploadCallback;
      } else {
        delete this.refs.file.uploadCallback;
      }

      this.refs.file.dispatchEvent(new MouseEvent('click', {
        'view': window,
        'bubbles': false,
        'cancelable': true
      }));
    }
  }, {
    key: 'renderUpload',
    value: function renderUpload() {
      var _this3 = this;

      return _react2.default.createElement('input', { type: 'file', key: 'file', ref: 'file', style: { display: 'none' }, onChange: function onChange(e) {
          return _this3.upload(e);
        } });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderUpload(true);
    }
  }], [{
    key: 'OpenUpload',

    // we need to have global action in main_dev which is triggered when users clicks on + on images
    // this triggers invisible button in the toolbar
    value: function OpenUpload(opts) {
      _fileUploadButton.openFileDialog('edit', undefined, opts);
    }
  }, {
    key: 'OpenUploadNew',
    value: function OpenUploadNew(defaults, opts) {
      _fileUploadButton.openFileDialog('new', defaults, opts);
    }
  }]);

  return AssetUploadButton;
}(_react.Component);

exports.default = AssetUploadButton;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AssetEditor = __webpack_require__(4);

var _AssetEditor2 = _interopRequireDefault(_AssetEditor);

var _AssetUploadButton = __webpack_require__(2);

var _AssetUploadButton2 = _interopRequireDefault(_AssetUploadButton);

var _NewAssetModal = __webpack_require__(13);

var _NewAssetModal2 = _interopRequireDefault(_NewAssetModal);

var _AssetProperties = __webpack_require__(14);

var _AssetProperties2 = _interopRequireDefault(_AssetProperties);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsreportStudio2.default.addEntitySet({
  name: 'assets',
  faIcon: 'fa-file',
  visibleName: 'asset',
  onNew: function onNew(options) {
    return _jsreportStudio2.default.openModal(_NewAssetModal2.default, options);
  },
  referenceAttributes: ['isSharedHelper'],
  entityTreePosition: 700
});

_jsreportStudio2.default.addEditorComponent('assets', _AssetEditor2.default);

_jsreportStudio2.default.addToolbarComponent(_AssetUploadButton2.default);
_jsreportStudio2.default.addPropertiesComponent(_AssetProperties2.default.title, _AssetProperties2.default, function (entity) {
  return entity.__entitySet === 'assets';
});

_jsreportStudio2.default.entityTreeIconResolvers.push(function (entity) {
  if (entity.__entitySet !== 'assets') {
    return;
  }

  var parts = entity.name.split('.');

  if (parts.length === 1) {
    return;
  }

  var extension = parts[parts.length - 1];

  switch (extension) {
    case 'html':
      return 'fa-html5';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return 'fa-camera';
    case 'js':
      return entity.isSharedHelper ? 'fa-cogs' : 'fa-cog';
    case 'css':
      return 'fa-css3';
    default:
      return 'fa-file-o ';
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetUploadButton = __webpack_require__(2);

var _AssetUploadButton2 = _interopRequireDefault(_AssetUploadButton);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

var _superagent = __webpack_require__(5);

var _superagent2 = _interopRequireDefault(_superagent);

var _bluebird = __webpack_require__(6);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _reactCopyToClipboard = __webpack_require__(7);

var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

var _binaryExtensions = __webpack_require__(11);

var _binaryExtensions2 = _interopRequireDefault(_binaryExtensions);

var _AssetEditor = __webpack_require__(12);

var _AssetEditor2 = _interopRequireDefault(_AssetEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_binaryExtensions2.default.push('p12');

// Studio.api currently always open dialogs on failures and that is what we don't want, so arbitrary implementaiton here
var getTextFromApi = function getTextFromApi(path) {
  return new _bluebird2.default(function (resolve, reject) {
    var request = _superagent2.default.get(_jsreportStudio2.default.resolveUrl(path));
    request.end(function (err) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          text = _ref.text;

      return err ? reject(new Error(text || err.toString())) : resolve(text);
    });
  });
};

var AssetEditor = function (_Component) {
  _inherits(AssetEditor, _Component);

  function AssetEditor(props) {
    _classCallCheck(this, AssetEditor);

    var _this = _possibleConstructorReturn(this, (AssetEditor.__proto__ || Object.getPrototypeOf(AssetEditor)).call(this, props));

    _this.state = {
      initialLoading: true,
      previewOpen: false,
      previewLoading: false
    };

    _this.previewLoadFinish = _this.previewLoadFinish.bind(_this);
    return _this;
  }

  _createClass(AssetEditor, [{
    key: 'componentDidMount',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var entity, content, ab, str, fixedStr;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                entity = this.props.entity;
                content = entity.content;

                if (!entity.link) {
                  _context.next = 11;
                  break;
                }

                _context.next = 5;
                return _jsreportStudio2.default.saveEntity(entity._id);

              case 5:
                _context.next = 7;
                return _jsreportStudio2.default.api.get('assets/' + entity._id + '/content', { responseType: 'arraybuffer' });

              case 7:
                ab = _context.sent;
                str = String.fromCharCode.apply(null, new Uint8Array(ab));
                fixedStr = decodeURIComponent(escape(str));

                content = btoa(unescape(encodeURIComponent(fixedStr)));

              case 11:

                this.setState({ content: content, initialLoading: false });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref2.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(prevProps) {
        var entity, link;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                entity = this.props.entity;

                if (!(entity.link && (!this.state.link || prevProps.entity.link !== entity.link))) {
                  _context2.next = 12;
                  break;
                }

                _context2.prev = 2;
                _context2.next = 5;
                return getTextFromApi('assets/link/' + encodeURIComponent(entity.link));

              case 5:
                link = _context2.sent;

                this.setState({ link: link });
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                this.setState({ link: _context2.t0.message });

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function componentDidUpdate(_x2) {
        return _ref3.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'isOfficeFile',
    value: function isOfficeFile(entity) {
      return entity.name.match(/\.(docx|xlsx|pptx)$/) != null;
    }
  }, {
    key: 'isImage',
    value: function isImage(entity) {
      return entity.name.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
    }
  }, {
    key: 'isFont',
    value: function isFont(entity) {
      return entity.name.match(/\.(otf|woff|ttf|eot|woff2)$/) != null;
    }
  }, {
    key: 'isPdf',
    value: function isPdf(entity) {
      return entity.name.match(/\.(pdf)$/) != null;
    }
  }, {
    key: 'getFormat',
    value: function getFormat(extension) {
      switch (extension) {
        case 'ttf':
          return 'truetype';
        case 'woff2':
          return 'woff2';
        case 'eot':
          return 'embedded-opentype';
        default:
          return 'woff';
      }
    }
  }, {
    key: 'getEmbeddingCode',
    value: function getEmbeddingCode(entity) {
      var parts = entity.name.split('.');
      var extension = parts[parts.length - 1];

      if (this.props.embeddingCode != null) {
        return this.props.embeddingCode;
      }

      if (this.isImage(entity)) {
        return '<img src="{#asset ' + _jsreportStudio2.default.resolveEntityPath(entity) + ' @encoding=dataURI}" />';
      }

      if (this.isFont(entity)) {
        return '@font-face {\n  font-family: \'' + parts[0] + '\';\n  src: url({#asset ' + _jsreportStudio2.default.resolveEntityPath(entity) + ' @encoding=dataURI});\n  format(\'' + this.getFormat(extension) + '\');\n}';
      }

      if (this.isOfficeFile(entity)) {
        return '{#asset ' + _jsreportStudio2.default.resolveEntityPath(entity) + ' @encoding=base64}';
      }

      return '{#asset ' + _jsreportStudio2.default.resolveEntityPath(entity) + ' @encoding=utf8}';
    }
  }, {
    key: 'getLazyPreviewStatus',
    value: function getLazyPreviewStatus(entity) {
      if (this.props.lazyPreview != null) {
        return this.props.lazyPreview;
      }

      if (this.isOfficeFile(entity)) {
        return true;
      }

      return false;
    }
  }, {
    key: 'getPreviewEnabledStatus',
    value: function getPreviewEnabledStatus(entity) {
      if (this.props.previewEnabled != null) {
        return this.props.previewEnabled;
      }

      if (this.isOfficeFile(entity)) {
        return _jsreportStudio2.default.extensions.assets.options.officePreview.enabled !== false;
      }

      return true;
    }
  }, {
    key: 'preview',
    value: function preview(entity) {
      var _this2 = this;

      var previewOpen = this.state.previewOpen;
      var onPreview = this.props.onPreview;

      var lazyPreview = this.getLazyPreviewStatus(entity);
      var previewEnabled = this.getPreviewEnabledStatus(entity);

      if (!lazyPreview || !previewEnabled) {
        return;
      }

      if (onPreview) {
        onPreview(entity);
      } else if (this.isOfficeFile(entity)) {
        if (_jsreportStudio2.default.extensions.assets.options.officePreview.showWarning !== false && _jsreportStudio2.default.getSettingValueByKey('office-preview-informed', false) === false) {
          _jsreportStudio2.default.setSetting('office-preview-informed', true);

          _jsreportStudio2.default.openModal(function () {
            return _react2.default.createElement(
              'div',
              null,
              'We need to upload your office asset to our publicly hosted server to be able to use Office Online Service for previewing here in the studio. You can disable it in the configuration, see ',
              _react2.default.createElement(
                'a',
                {
                  href: 'https://jsreport.net/learn/xlsx#preview-in-studio', target: '_blank' },
                'the docs'
              ),
              ' for details.'
            );
          });
        }
      }

      if (previewOpen) {
        this.clearPreview(function () {
          _this2.preview(entity);
        });
      } else {
        _jsreportStudio2.default.startProgress();

        this.setState({
          previewLoading: true,
          previewOpen: true
        });
      }
    }
  }, {
    key: 'previewLoadFinish',
    value: function previewLoadFinish() {
      _jsreportStudio2.default.stopProgress();

      this.setState({
        previewLoading: false
      });
    }
  }, {
    key: 'clearPreview',
    value: function clearPreview(done) {
      this.setState({
        previewOpen: false
      }, function () {
        return done && done();
      });
    }
  }, {
    key: 'renderBinary',
    value: function renderBinary(entity) {
      return _react2.default.createElement(
        'div',
        { className: 'custom-editor' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement('i', { className: 'fa fa-file-o' }),
            ' ',
            entity.name
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'a',
            { className: 'button confirmation', target: '_blank', href: _jsreportStudio2.default.resolveUrl('assets/' + entity._id + '/content?download=true'), title: 'Download' },
            _react2.default.createElement('i', { className: 'fa fa-download' }),
            ' Download'
          ),
          _react2.default.createElement(
            'button',
            { className: 'button confirmation', onClick: function onClick() {
                return _AssetUploadButton2.default.OpenUpload();
              } },
            _react2.default.createElement('i', { className: 'fa fa-upload' }),
            ' Upload'
          )
        )
      );
    }
  }, {
    key: 'renderEditorToolbar',
    value: function renderEditorToolbar() {
      var _this3 = this;

      var _state = this.state,
          link = _state.link,
          previewLoading = _state.previewLoading,
          previewOpen = _state.previewOpen;
      var _props = this.props,
          entity = _props.entity,
          displayName = _props.displayName,
          icon = _props.icon,
          showHelp = _props.showHelp,
          onDownload = _props.onDownload,
          onUpload = _props.onUpload;

      var lazyPreview = this.getLazyPreviewStatus(entity);
      var previewEnabled = this.getPreviewEnabledStatus(entity);
      var embeddingCode = this.getEmbeddingCode(entity);

      var visibleName = displayName;

      if (!visibleName && entity) {
        visibleName = entity.name;
      }

      if (!visibleName) {
        visibleName = '<none>';
      }

      return _react2.default.createElement(
        'div',
        { className: _AssetEditor2.default.toolbarContainer },
        _react2.default.createElement(
          'div',
          { className: _AssetEditor2.default.toolbarRow },
          _react2.default.createElement(
            'h3',
            { className: _AssetEditor2.default.toolbarAssetName },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('i', { className: 'fa ' + icon }),
              '\xA0',
              _react2.default.createElement(
                'a',
                {
                  href: '#',
                  onClick: function onClick(ev) {
                    ev.preventDefault();
                    _jsreportStudio2.default.openTab({ _id: entity._id });
                  }
                },
                visibleName
              )
            )
          ),
          embeddingCode !== '' && _react2.default.createElement(
            _reactCopyToClipboard2.default,
            { text: embeddingCode },
            _react2.default.createElement(
              'a',
              { className: 'button confirmation', title: 'Coppy the embedding code to clipboard' },
              _react2.default.createElement('i', { className: 'fa fa-clipboard' })
            )
          ),
          entity != null && _react2.default.createElement(
            'button',
            {
              className: 'button confirmation',
              title: 'Download',
              onClick: function onClick() {
                if (onDownload) {
                  onDownload(entity);
                } else {
                  var downloadEl = document.createElement('a');
                  downloadEl.target = '_blank';
                  downloadEl.href = _jsreportStudio2.default.resolveUrl('assets/' + entity._id + '/content?download=true');
                  downloadEl.click();
                }
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-download' })
          ),
          entity != null && !entity.link && _react2.default.createElement(
            'button',
            {
              className: 'button confirmation',
              title: 'Upload',
              onClick: function onClick() {
                var cb = function cb() {
                  var wasOpen = false;

                  if (lazyPreview && _this3.state.previewOpen) {
                    wasOpen = true;
                  }

                  _this3.clearPreview(function () {
                    if (wasOpen) {
                      _this3.preview(entity);
                    }
                  });
                };

                if (onUpload) {
                  onUpload(entity, cb);
                } else {
                  _AssetUploadButton2.default.OpenUpload({
                    targetAsset: {
                      _id: entity._id,
                      name: entity.name
                    },
                    uploadCallback: cb
                  });
                }
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-upload' })
          ),
          lazyPreview && entity != null && _react2.default.createElement(
            'button',
            {
              className: 'button confirmation ' + (!previewEnabled || previewLoading ? 'disabled' : ''),
              onClick: function onClick() {
                return _this3.preview(entity);
              },
              title: previewOpen ? 'Refresh' : 'Preview'
            },
            _react2.default.createElement('i', { className: 'fa fa-' + (previewLoading ? '' : previewOpen ? 'retweet' : 'search') }),
            ' ',
            previewLoading ? 'Loading..' : ''
          ),
          lazyPreview && entity != null && previewOpen && !previewLoading && _react2.default.createElement(
            'button',
            {
              className: 'button confirmation ' + (!previewEnabled || previewLoading ? 'disabled' : ''),
              onClick: function onClick() {
                return _this3.clearPreview();
              },
              title: 'Clear'
            },
            _react2.default.createElement('i', { className: 'fa fa-times' })
          ),
          showHelp && _react2.default.createElement(
            'a',
            { className: 'button confirmation', target: '_blank', title: 'Help', href: 'http://jsreport.net/learn/assets' },
            _react2.default.createElement('i', { className: 'fa fa-question' })
          )
        ),
        entity != null && entity.link && _react2.default.createElement(
          'div',
          { className: _AssetEditor2.default.toolbarRow, style: { margin: '0.6rem' } },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'b',
              null,
              _react2.default.createElement('i', { className: 'fa fa-folder-open' }),
              ' linked to file:'
            ),
            ' ',
            link
          )
        )
      );
    }
  }, {
    key: 'renderEditorContent',
    value: function renderEditorContent() {
      var _this4 = this;

      var _props2 = this.props,
          entity = _props2.entity,
          emptyMessage = _props2.emptyMessage,
          getPreviewContent = _props2.getPreviewContent;

      var parts = entity.name.split('.');
      var extension = parts[parts.length - 1];
      var lazyPreview = this.getLazyPreviewStatus(entity);

      if (entity == null) {
        return _react2.default.createElement(
          'div',
          { style: { padding: '2rem' } },
          _react2.default.createElement(
            'i',
            null,
            emptyMessage != null ? emptyMessage : 'Asset is empty'
          )
        );
      }

      var previewOpen = true;

      if (lazyPreview) {
        previewOpen = this.state.previewOpen;
      }

      if (!previewOpen) {
        return null;
      }

      if (getPreviewContent) {
        return getPreviewContent(entity, {
          previewLoadFinish: this.previewLoadFinish
        });
      }

      if (this.isImage(entity)) {
        return _react2.default.createElement(
          'div',
          { style: { overflow: 'auto' } },
          _react2.default.createElement('img', {
            src: _jsreportStudio2.default.resolveUrl('assets/' + entity._id + '/content?v=' + new Date().getTime()),
            style: { display: 'block', margin: '3rem auto' }
          })
        );
      }

      if (this.isFont(entity)) {
        var newStyle = document.createElement('style');

        newStyle.appendChild(document.createTextNode('@font-face {\n         font-family: \'' + parts[0] + '\';\n         src: url(\'' + _jsreportStudio2.default.resolveUrl('/assets/' + entity._id + '/content') + '\');\n         format(\'' + (extension === 'ttf' ? 'truetype' : 'woff') + '\');\n        }'));

        document.head.appendChild(newStyle);

        return _react2.default.createElement(
          'div',
          { style: { overflow: 'auto', fontFamily: parts[0], padding: '2rem' } },
          _react2.default.createElement(
            'h1',
            null,
            ' Hello world font ',
            entity.name
          ),
          _react2.default.createElement(
            'p',
            null,
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
          )
        );
      }

      if (this.isPdf(entity)) {
        return _react2.default.createElement(
          'div',
          { className: 'block', style: { height: '100%' } },
          _react2.default.createElement(
            'object',
            { style: { height: '100%' }, data: _jsreportStudio2.default.resolveUrl('assets/' + entity._id + '/content?v=' + new Date().getTime()), type: 'application/pdf' },
            _react2.default.createElement('embed', { src: _jsreportStudio2.default.resolveUrl('assets/' + entity._id + '/content?v=' + new Date().getTime()), type: 'application/pdf' })
          )
        );
      }

      if (this.isOfficeFile(entity)) {
        return _react2.default.createElement(_jsreportStudio.Preview, {
          onLoad: function onLoad() {
            return _this4.previewLoadFinish();
          },
          initialSrc: _jsreportStudio2.default.resolveUrl('assets/office/' + entity._id + '/content')
        });
      }

      if (entity.name.split('.').length > 1 && _binaryExtensions2.default.includes(entity.name.split('.')[1])) {
        return this.renderBinary(entity);
      }

      var mode = parts[parts.length - 1];

      if (extension === 'js') {
        mode = 'javascript';
      }

      if (extension === 'html') {
        mode = 'handlebars';
      }

      var content = (entity.content || entity.forceUpdate ? entity.content : this.state.content) || '';

      return _react2.default.createElement(_jsreportStudio.TextEditor, {
        name: entity._id,
        mode: mode,
        value: decodeURIComponent(escape(atob(content))),
        onUpdate: function onUpdate(v) {
          return _this4.props.onUpdate(Object.assign({}, entity, { content: btoa(unescape(encodeURIComponent(v))), forceUpdate: true }));
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var initialLoading = this.state.initialLoading;


      if (initialLoading) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { className: 'block' },
        this.renderEditorToolbar(),
        this.renderEditorContent()
      );
    }
  }]);

  return AssetEditor;
}(_react.Component);

AssetEditor.defaultProps = {
  icon: 'fa-file-o',
  showHelp: true
};

exports.default = AssetEditor;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = Studio.libraries['superagent'];

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = Studio.libraries['bluebird'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    CopyToClipboard = _require.CopyToClipboard;

module.exports = CopyToClipboard;
//# sourceMappingURL=index.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToClipboard = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _copyToClipboard = __webpack_require__(9);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CopyToClipboard = _react2.default.createClass({
  displayName: 'CopyToClipboard',

  propTypes: {
    text: _react2.default.PropTypes.string.isRequired,
    children: _react2.default.PropTypes.element.isRequired,
    onCopy: _react2.default.PropTypes.func,
    options: _react2.default.PropTypes.shape({
      debug: _react2.default.PropTypes.bool,
      message: _react2.default.PropTypes.string
    })
  },

  onClick: function onClick(event) {
    var _props = this.props,
        text = _props.text,
        onCopy = _props.onCopy,
        children = _props.children,
        options = _props.options;


    var elem = _react2.default.Children.only(children);

    var result = (0, _copyToClipboard2.default)(text, options);

    if (onCopy) {
      onCopy(text, result);
    }

    // Bypass onClick if it was present
    if (elem && elem.props && typeof elem.props.onClick === 'function') {
      elem.props.onClick(event);
    }
  },
  render: function render() {
    var _props2 = this.props,
        _text = _props2.text,
        _onCopy = _props2.onCopy,
        _options = _props2.options,
        children = _props2.children,
        props = _objectWithoutProperties(_props2, ['text', 'onCopy', 'options', 'children']);

    var elem = _react2.default.Children.only(children);

    return _react2.default.cloneElement(elem, _extends({}, props, { onClick: this.onClick }));
  }
});
exports.CopyToClipboard = CopyToClipboard;
//# sourceMappingURL=Component.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__(10);

var defaultMessage = 'Copy to clipboard: #{key}, Enter';

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C';
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug, message, reselectPrevious, range, selection, mark, success = false;
  if (!options) { options = {}; }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('span');
    mark.textContent = text;
    // reset user styles for span element
    mark.style.all = 'unset';
    // prevents scrolling to the end of the page
    mark.style.position = 'fixed';
    mark.style.top = 0;
    mark.style.clip = 'rect(0, 0, 0, 0)';
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = 'pre';
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = 'text';
    mark.style.MozUserSelect = 'text';
    mark.style.msUserSelect = 'text';
    mark.style.userSelect = 'text';

    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    debug && console.error('unable to copy using execCommand: ', err);
    debug && console.warn('trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
      success = true;
    } catch (err) {
      debug && console.error('unable to copy using clipboardData: ', err);
      debug && console.error('falling back to prompt');
      message = format('message' in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;


/***/ }),
/* 10 */
/***/ (function(module, exports) {


module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};


/***/ }),
/* 11 */
/***/ (function(module) {

module.exports = ["3dm","3ds","3g2","3gp","7z","a","aac","adp","ai","aif","aiff","alz","ape","apk","ar","arj","asf","au","avi","bak","baml","bh","bin","bk","bmp","btif","bz2","bzip2","cab","caf","cgm","class","cmx","cpio","cr2","csv","cur","dat","dcm","deb","dex","djvu","dll","dmg","dng","doc","docm","docx","dot","dotm","dra","DS_Store","dsk","dts","dtshd","dvb","dwg","dxf","ecelp4800","ecelp7470","ecelp9600","egg","eol","eot","epub","exe","f4v","fbs","fh","fla","flac","fli","flv","fpx","fst","fvt","g3","gh","gif","graffle","gz","gzip","h261","h263","h264","icns","ico","ief","img","ipa","iso","jar","jpeg","jpg","jpgv","jpm","jxr","key","ktx","lha","lib","lvp","lz","lzh","lzma","lzo","m3u","m4a","m4v","mar","mdi","mht","mid","midi","mj2","mka","mkv","mmr","mng","mobi","mov","movie","mp3","mp4","mp4a","mpeg","mpg","mpga","mxu","nef","npx","numbers","o","oga","ogg","ogv","otf","pages","pbm","pcx","pdb","pdf","pea","pgm","pic","png","pnm","pot","potm","potx","ppa","ppam","ppm","pps","ppsm","ppsx","ppt","pptm","pptx","psd","pya","pyc","pyo","pyv","qt","rar","ras","raw","resources","rgb","rip","rlc","rmf","rmvb","rtf","rz","s3m","s7z","scpt","sgi","shar","sil","sketch","slk","smv","so","stl","sub","swf","tar","tbz","tbz2","tga","tgz","thmx","tif","tiff","tlz","ttc","ttf","txz","udf","uvh","uvi","uvm","uvp","uvs","uvu","viv","vob","war","wav","wax","wbmp","wdp","weba","webm","webp","whl","wim","wm","wma","wmv","wmx","woff","woff2","wrm","wvx","xbm","xif","xla","xlam","xls","xlsb","xlsm","xlsx","xlt","xltm","xltx","xm","xmind","xpi","xpm","xwd","xz","z","zip","zipx"];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"toolbarContainer":"x-assets-AssetEditor-toolbarContainer","toolbarRow":"x-assets-AssetEditor-toolbarRow","toolbarAssetName":"x-assets-AssetEditor-toolbarAssetName"};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetUploadButton = __webpack_require__(2);

var _AssetUploadButton2 = _interopRequireDefault(_AssetUploadButton);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewAssetModal = function (_Component) {
  _inherits(NewAssetModal, _Component);

  function NewAssetModal() {
    _classCallCheck(this, NewAssetModal);

    var _this = _possibleConstructorReturn(this, (NewAssetModal.__proto__ || Object.getPrototypeOf(NewAssetModal)).call(this));

    _this.state = { isLink: false };
    return _this;
  }

  _createClass(NewAssetModal, [{
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      if (e.key === 'Enter') {
        this.createAsset();
      }
    }

    // the modal component for some reason after open focuses the panel itself

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.refs.name.focus();
      }, 0);
    }
  }, {
    key: 'createAsset',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var entity, fragments, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                entity = {};

                if (!(!this.state.isLink && (!this.refs.name.value || this.refs.name.value.indexOf('.')) < 0)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', this.setState({ error: 'name should include file extension, for example foo.js' }));

              case 3:

                if (this.props.options.defaults != null) {
                  entity = Object.assign(entity, this.props.options.defaults);
                }

                if (this.state.isLink) {
                  entity.link = this.refs.link.value;
                  fragments = entity.link.split('/');

                  entity.name = fragments[fragments.length - 1];
                } else {
                  entity.name = this.refs.name.value;
                }

                _context.prev = 5;

                if (!_jsreportStudio2.default.workspaces) {
                  _context.next = 9;
                  break;
                }

                _context.next = 9;
                return _jsreportStudio2.default.workspaces.save();

              case 9:
                _context.next = 11;
                return _jsreportStudio2.default.api.post('/odata/assets', {
                  data: entity
                });

              case 11:
                response = _context.sent;

                response.__entitySet = 'assets';

                _jsreportStudio2.default.addExistingEntity(response);
                _jsreportStudio2.default.openTab(response);
                this.props.close();
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](5);

                this.setState({ error: _context.t0.message });

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 18]]);
      }));

      function createAsset(_x) {
        return _ref.apply(this, arguments);
      }

      return createAsset;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          isLink = _state.isLink,
          error = _state.error;


      return _react2.default.createElement(
        'div',
        null,
        isLink ? _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            null,
            'Relative or absolute path to existing file'
          ),
          _react2.default.createElement('input', { type: 'text', name: 'link', ref: 'link' })
        ) : _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            null,
            'Name'
          ),
          _react2.default.createElement('input', { type: 'text', name: 'name', ref: 'name', placeholder: 'styles.css', onKeyPress: function onKeyPress(e) {
              return _this3.handleKeyPress(e);
            } })
        ),
        _jsreportStudio2.default.extensions.assets.options.allowAssetsLinkedToFiles !== false ? _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            null,
            'link to existing file'
          ),
          _react2.default.createElement('input', {
            type: 'checkbox', checked: isLink,
            onChange: function onChange() {
              return _this3.setState({ isLink: !isLink });
            } })
        ) : _react2.default.createElement('div', null),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'span',
            {
              style: { color: 'red', display: error ? 'block' : 'none' } },
            error
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group', style: { opacity: 0.8 } },
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'span',
            null,
            'You can use assets to embed any kind of static content into report template.',
            _react2.default.createElement('br', null),
            'This can be for example css style, image, font, html or even javascript shared helpers. ',
            _react2.default.createElement('br', null),
            'See the ',
            _react2.default.createElement(
              'a',
              {
                target: '_blank', title: 'Help', href: 'http://jsreport.net/learn/assets' },
              'documentation'
            ),
            ' for details.'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'button-bar' },
          _react2.default.createElement(
            'button',
            {
              className: 'button confirmation',
              onClick: function onClick() {
                _this3.props.close();_AssetUploadButton2.default.OpenUploadNew(_this3.props.options.defaults);
              } },
            'Upload'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this3.createAsset();
              }, className: 'button confirmation' },
            'Ok'
          )
        )
      );
    }
  }]);

  return NewAssetModal;
}(_react.Component);

exports.default = NewAssetModal;


NewAssetModal.propTypes = {
  close: _react.PropTypes.func.isRequired
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetProperties = function (_Component) {
  _inherits(AssetProperties, _Component);

  function AssetProperties() {
    _classCallCheck(this, AssetProperties);

    return _possibleConstructorReturn(this, (AssetProperties.__proto__ || Object.getPrototypeOf(AssetProperties)).apply(this, arguments));
  }

  _createClass(AssetProperties, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          entity = _props.entity,
          _onChange = _props.onChange;


      return _react2.default.createElement(
        'div',
        null,
        _jsreportStudio2.default.extensions.assets.options.allowAssetsLinkedToFiles !== false ? _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            null,
            'link'
          ),
          _react2.default.createElement('input', {
            type: 'text',
            value: entity.link || '',
            onChange: function onChange(v) {
              return _onChange({ _id: entity._id, link: v.target.value });
            }
          })
        ) : _react2.default.createElement('div', null),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            null,
            'shared helpers attached to each template'
          ),
          _react2.default.createElement('input', {
            type: 'checkbox', checked: entity.isSharedHelper === true,
            onChange: function onChange(v) {
              return _onChange({ _id: entity._id, isSharedHelper: v.target.checked });
            }
          })
        )
      );
    }
  }], [{
    key: 'title',
    value: function title(entity, entities) {
      return 'asset ' + (entity.link ? '(link)' : '');
    }
  }]);

  return AssetProperties;
}(_react.Component);

exports.default = AssetProperties;

/***/ })
/******/ ]);