/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _AssetEditor = __webpack_require__(1);
	
	var _AssetEditor2 = _interopRequireDefault(_AssetEditor);
	
	var _AssetUploadButton = __webpack_require__(3);
	
	var _AssetUploadButton2 = _interopRequireDefault(_AssetUploadButton);
	
	var _NewAssetModal = __webpack_require__(11);
	
	var _NewAssetModal2 = _interopRequireDefault(_NewAssetModal);
	
	var _AssetProperties = __webpack_require__(12);
	
	var _AssetProperties2 = _interopRequireDefault(_AssetProperties);
	
	var _jsreportStudio = __webpack_require__(4);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_jsreportStudio2.default.addEntitySet({
	  name: 'assets',
	  faIcon: 'fa-file',
	  visibleName: 'asset',
	  onNew: function onNew() {
	    return _jsreportStudio2.default.openModal(_NewAssetModal2.default);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _AssetUploadButton = __webpack_require__(3);
	
	var _AssetUploadButton2 = _interopRequireDefault(_AssetUploadButton);
	
	var _jsreportStudio = __webpack_require__(4);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	var _superagent = __webpack_require__(5);
	
	var _superagent2 = _interopRequireDefault(_superagent);
	
	var _bluebird = __webpack_require__(6);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _reactCopyToClipboard = __webpack_require__(7);
	
	var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	var FileEditor = function (_Component) {
	  _inherits(FileEditor, _Component);
	
	  function FileEditor() {
	    _classCallCheck(this, FileEditor);
	
	    var _this = _possibleConstructorReturn(this, (FileEditor.__proto__ || Object.getPrototypeOf(FileEditor)).call(this));
	
	    _this.state = {};
	    return _this;
	  }
	
	  _createClass(FileEditor, [{
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
	                  _context.next = 18;
	                  break;
	                }
	
	                _context.prev = 3;
	                _context.next = 6;
	                return _jsreportStudio2.default.saveEntity(entity._id);
	
	              case 6:
	                _context.next = 8;
	                return _jsreportStudio2.default.api.get('assets/content/' + entity.name, { responseType: 'arraybuffer' });
	
	              case 8:
	                ab = _context.sent;
	                str = String.fromCharCode.apply(null, new Uint8Array(ab));
	                fixedStr = decodeURIComponent(escape(str));
	
	                content = btoa(unescape(encodeURIComponent(fixedStr)));
	                _context.next = 18;
	                break;
	
	              case 14:
	                _context.prev = 14;
	                _context.t0 = _context['catch'](3);
	
	                this.setState({ loadError: _context.t0 });
	                throw _context.t0;
	
	              case 18:
	
	                this.setState({ content: content });
	
	              case 19:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[3, 14]]);
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
	
	                if (!(entity.link && (!this.state.link || prevProps.entity.link !== entity.link) && !this.state.loadFailed)) {
	                  _context2.next = 12;
	                  break;
	                }
	
	                _context2.prev = 2;
	                _context2.next = 5;
	                return getTextFromApi('assets/link/' + entity.link);
	
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
	
	      if (this.isImage(entity)) {
	        return '<img src="{#asset ' + entity.name + ' @encoding=dataURI}" />';
	      }
	
	      if (this.isFont(entity)) {
	        return '@font-face {\n  font-family: \'' + parts[0] + '\';\n  src: url({#asset ' + entity.name + ' @encoding=dataURI});\n  format(\'' + this.getFormat(extension) + '\');\n}';
	      }
	
	      return '{#asset ' + entity.name + ' @encoding=utf8}';
	    }
	  }, {
	    key: 'renderEditor',
	    value: function renderEditor(entity) {
	      var _this2 = this;
	
	      var parts = entity.name.split('.');
	      var extension = parts[parts.length - 1];
	
	      if (this.isImage(entity)) {
	        return _react2.default.createElement(
	          'div',
	          { style: { overflow: 'auto' } },
	          _react2.default.createElement('img', { src: _jsreportStudio2.default.resolveUrl('assets/content/' + entity.name + '?v=' + new Date().getTime()),
	            style: { display: 'block', margin: '3rem auto' } })
	        );
	      }
	
	      if (this.isFont(entity)) {
	        var newStyle = document.createElement('style');
	        newStyle.appendChild(document.createTextNode('@font-face {\n         font-family: \'' + parts[0] + '\';\n         src: url(\'' + _jsreportStudio2.default.resolveUrl('/assets/content/' + entity.name) + '\');\n         format(\'' + (extension === 'ttf' ? 'truetype' : 'woff') + '\');\n        }'));
	
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
	          return _this2.props.onUpdate(Object.assign({}, entity, { content: btoa(unescape(encodeURIComponent(v))), forceUpdate: true }));
	        } });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var entity = this.props.entity;
	      var link = this.state.link;
	
	      var downloadUrl = _jsreportStudio2.default.resolveUrl('assets/content/' + entity.name + '?download=true');
	
	      var toolbarButtonStyle = {
	        color: '#007ACC',
	        fontSize: '1.2rem'
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'block' },
	        _react2.default.createElement(
	          'div',
	          { style: { padding: '0.6rem 0 0.4rem 0', backgroundColor: '#F6F6F6' } },
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              _reactCopyToClipboard2.default,
	              { text: this.getEmbeddingCode(entity) },
	              _react2.default.createElement(
	                'a',
	                { className: 'button', style: toolbarButtonStyle, title: 'Coppy the embedding code to clipboard' },
	                _react2.default.createElement('i', { className: 'fa fa-clipboard' })
	              )
	            ),
	            _react2.default.createElement(
	              'a',
	              { className: 'button', style: toolbarButtonStyle, target: '_blank', href: downloadUrl, title: 'Download asset' },
	              _react2.default.createElement('i', { className: 'fa fa-download' })
	            ),
	            entity.link ? _react2.default.createElement(
	              'span',
	              { style: { margin: '0.6rem' } },
	              link
	            ) : _react2.default.createElement(
	              'a',
	              { className: 'button', style: toolbarButtonStyle, title: 'Upload asset',
	                onClick: function onClick() {
	                  return _AssetUploadButton2.default.OpenUpload();
	                } },
	              _react2.default.createElement('i', {
	                className: 'fa fa-upload' })
	            ),
	            _react2.default.createElement(
	              'a',
	              { className: 'button', style: _extends({}, toolbarButtonStyle, { marginRight: 'auto' }), target: '_blank', title: 'Help',
	                href: 'http://jsreport.net/learn/assets' },
	              _react2.default.createElement('i', { className: 'fa fa-question' })
	            )
	          )
	        ),
	        this.renderEditor(entity)
	      );
	    }
	  }]);
	
	  return FileEditor;
	}(_react.Component);
	
	exports.default = FileEditor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(4);
	
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
	
	      var file = e.target.files[0];
	      var reader = new FileReader();
	
	      reader.onloadend = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	        var response;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _this2.refs.file.value = '';
	
	                if (!(_this2.type === 'new')) {
	                  _context.next = 11;
	                  break;
	                }
	
	                if (!_jsreportStudio2.default.workspaces) {
	                  _context.next = 5;
	                  break;
	                }
	
	                _context.next = 5;
	                return _jsreportStudio2.default.workspaces.save();
	
	              case 5:
	                _context.next = 7;
	                return _jsreportStudio2.default.api.post('/odata/assets', {
	                  data: {
	                    content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length),
	                    name: file.name
	                  }
	                });
	
	              case 7:
	                response = _context.sent;
	
	                response.__entitySet = 'assets';
	
	                _jsreportStudio2.default.addExistingEntity(response);
	                _jsreportStudio2.default.openTab(Object.assign({}, response));
	
	              case 11:
	                if (!(_this2.type === 'edit')) {
	                  _context.next = 21;
	                  break;
	                }
	
	                if (!_jsreportStudio2.default.workspaces) {
	                  _context.next = 18;
	                  break;
	                }
	
	                _jsreportStudio2.default.updateEntity({
	                  name: _this2.props.tab.entity.name,
	                  content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length)
	                });
	
	                _context.next = 16;
	                return _jsreportStudio2.default.workspaces.save();
	
	              case 16:
	                _context.next = 21;
	                break;
	
	              case 18:
	                _context.next = 20;
	                return _jsreportStudio2.default.api.patch('/odata/assets(' + _this2.props.tab.entity._id + ')', {
	                  data: {
	                    content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length),
	                    link: null
	                  }
	                });
	
	              case 20:
	                _jsreportStudio2.default.loadEntity(_this2.props.tab.entity._id, true);
	
	              case 21:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, _this2);
	      }));
	
	      reader.onerror = function () {
	        alert('There was an error reading the file!');
	      };
	
	      reader.readAsDataURL(file);
	    }
	  }, {
	    key: 'openFileDialog',
	    value: function openFileDialog(type) {
	      this.type = type;
	
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
	    value: function OpenUpload() {
	      _fileUploadButton.openFileDialog('edit');
	    }
	  }, {
	    key: 'OpenUploadNew',
	    value: function OpenUploadNew() {
	      _fileUploadButton.openFileDialog('new');
	    }
	  }]);
	
	  return AssetUploadButton;
	}(_react.Component);
	
	exports.default = AssetUploadButton;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['superagent'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['bluebird'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(8),
	    CopyToClipboard = _require.CopyToClipboard;
	
	module.exports = CopyToClipboard;
	//# sourceMappingURL=index.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CopyToClipboard = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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


/***/ },
/* 10 */
/***/ function(module, exports) {

	
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


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _AssetUploadButton = __webpack_require__(3);
	
	var _AssetUploadButton2 = _interopRequireDefault(_AssetUploadButton);
	
	var _jsreportStudio = __webpack_require__(4);
	
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
	        var entity, response;
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
	
	                if (this.state.isLink) {
	                  entity.link = this.refs.link.value;
	                } else {
	                  entity.name = this.refs.name.value;
	                }
	
	                _context.prev = 4;
	
	                if (!_jsreportStudio2.default.workspaces) {
	                  _context.next = 8;
	                  break;
	                }
	
	                _context.next = 8;
	                return _jsreportStudio2.default.workspaces.save();
	
	              case 8:
	                _context.next = 10;
	                return _jsreportStudio2.default.api.post('/odata/assets', {
	                  data: entity
	                });
	
	              case 10:
	                response = _context.sent;
	
	                response.__entitySet = 'assets';
	
	                _jsreportStudio2.default.addExistingEntity(response);
	                _jsreportStudio2.default.openTab(response);
	                this.props.close();
	                _context.next = 20;
	                break;
	
	              case 17:
	                _context.prev = 17;
	                _context.t0 = _context['catch'](4);
	
	                this.setState({ error: _context.t0.message });
	
	              case 20:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[4, 17]]);
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
	                _this3.props.close();_AssetUploadButton2.default.OpenUploadNew();
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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(4);
	
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
	          _react2.default.createElement('input', { type: 'text', value: entity.link || '',
	            onChange: function onChange(v) {
	              return _onChange({ _id: entity._id, link: v.target.value });
	            } })
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
	            } })
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

/***/ }
/******/ ]);