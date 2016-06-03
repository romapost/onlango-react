(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserinfo = exports.uploadUserinfo = exports.uploadImage = exports.login = exports.logout = undefined;

var _reduxActions = require('redux-actions');

var _constants = require('../constants');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var logout = exports.logout = function logout() {
  return function (dispatch) {
    dispatch((0, _reduxActions.createAction)(_constants.LOGOUT)());
  };
};

var login = exports.login = function login(_ref) {
  var email = _ref.email;
  var password = _ref.password;
  var register = _ref.register;
  return function (dispatch) {
    console.log(_constants.LOGIN, { email: email, password: password, register: register });
    var action = (0, _reduxActions.createAction)(_constants.LOGIN);
    var url = register ? '/api/register' : '/api/login';

    return _superagent2.default.post(url).send({ email: email, password: password }).end(function (err, res) {
      if (err) dispatch(action(err));else dispatch(action(res.body));
    });
  };
};

var uploadImage = exports.uploadImage = function uploadImage(file, token) {
  return function (dispatch) {
    var action = (0, _reduxActions.createAction)(_constants.UPLOAD_IMAGE);
    _superagent2.default.post('/api/setuserpic').set('Authorization', 'Bearer ' + token).attach('image', file).end(function (err, res) {
      if (err) dispatch(action(err));else dispatch(action(res.headers.location));
    });
  };
};
var uploadUserinfo = exports.uploadUserinfo = function uploadUserinfo(data, token) {
  return function (dispatch) {
    var action = (0, _reduxActions.createAction)(_constants.UPLOAD_USERINFO);
    _superagent2.default.post('/api/userinfo').set('Authorization', 'Bearer ' + token).send(data).end(function (err, res) {
      if (err) dispatch(action(err));else dispatch(action(res.body));
    });
  };
};
var getUserinfo = exports.getUserinfo = function getUserinfo(token) {
  return function (dispatch) {
    var action = (0, _reduxActions.createAction)(_constants.GET_USERINFO);
    _superagent2.default.get('/api/userinfo').set('Authorization', 'Bearer ' + token).end(function (err, res) {
      if (err) dispatch(action(err));else dispatch(action(res.body));
    });
  };
};

},{"../constants":9,"redux-actions":"redux-actions","superagent":"superagent"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (props) {
  return _react2.default.createElement('h1', null, '404 Error Page');
};

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterBootstrap = require('react-router-bootstrap');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var styles = {
  userpic: {
    width: '48px'
  }
};

var Header = function Header(props, context) {
  return _react2.default.createElement(_reactBootstrap.Navbar, null, _react2.default.createElement(_reactBootstrap.Navbar.Header, null, _react2.default.createElement(_reactBootstrap.Navbar.Brand, null, 'Onlango-react')), _react2.default.createElement(_reactBootstrap.Nav, { pullRight: true }, _react2.default.createElement(_reactBootstrap.NavDropdown, { eventKey: 1, id: 'nav-dropdown-profile', title: _react2.default.createElement(_reactBootstrap.Image, { src: context.userinfo.image, circle: true, style: styles.userpic }) }, _react2.default.createElement(_reactRouterBootstrap.LinkContainer, { to: '/profile' }, _react2.default.createElement(_reactBootstrap.MenuItem, null, 'Профиль')), _react2.default.createElement(_reactBootstrap.MenuItem, { onClick: context.logout }, 'Выход'))));
};

Header.contextTypes = {
  userinfo: _react2.default.PropTypes.object,
  logout: _react2.default.PropTypes.func
};
exports.default = Header;

},{"react":"react","react-bootstrap":"react-bootstrap","react-router-bootstrap":"react-router-bootstrap"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var func = _react.PropTypes.func;
var object = _react.PropTypes.object;

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Login)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { login: null }, _this.ref = function (c) {
      if (c) {
        var e = (0, _reactDom.findDOMNode)(c);
        _this[e.name] = e;
      }
    }, _this.submit = function (e) {
      e.preventDefault();

      var _map = ['email', 'password'].map(function (e) {
        return _this[e].value;
      });

      var _map2 = _slicedToArray(_map, 2);

      var email = _map2[0];
      var password = _map2[1];

      _this.context.login({ email: email, password: password });
    }, _this.change = function () {
      if (_this.state.login) _this.setState({ login: null });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (nextContext.error) this.setState({ login: 'error' });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null, _react2.default.createElement('p', { className: 'msg' }, 'Sign in to start your session'), _react2.default.createElement(_reactBootstrap.Form, { className: 'login', onSubmit: this.submit, onChange: this.change }, _react2.default.createElement(_reactBootstrap.FormGroup, { controlId: 'email', validationState: '' + this.state.login }, _react2.default.createElement(_reactBootstrap.FormControl, { type: 'email', name: 'email', placeholder: 'Email', ref: this.ref })), _react2.default.createElement(_reactBootstrap.FormGroup, { controlId: 'password', validationState: '' + this.state.login }, _react2.default.createElement(_reactBootstrap.FormControl, { type: 'password', name: 'password', placeholder: 'Password', ref: this.ref })), _react2.default.createElement(_reactBootstrap.FormGroup, null, _react2.default.createElement(_reactBootstrap.Col, null, _react2.default.createElement(_reactBootstrap.Button, { type: 'submit', block: true }, 'Sign in')))), _react2.default.createElement(_reactRouter.Link, { to: '/register', className: 'text-center' }, 'Register a new membership'));
    }
  }]);

  return Login;
}(_react.Component);

Login.contextTypes = { login: func, error: object };
exports.default = Login;

},{"react":"react","react-bootstrap":"react-bootstrap","react-dom":"react-dom","react-router":"react-router"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactBootstrap = require('react-bootstrap');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DateSelector = function (_React$Component) {
  _inherits(DateSelector, _React$Component);

  function DateSelector() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DateSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateSelector)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      days: Array.apply(null, Array(31)).map(function (e, i) {
        return i + 1;
      }),
      months: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Ноябрь,Декабрь'.split(','),
      years: Array.apply(null, Array(100)).map(function (e, i) {
        return i + 1930;
      }),
      selected: _this.props.date ? {
        day: _this.props.date.getDate(),
        month: _this.props.date.getMonth(),
        year: _this.props.date.getFullYear()
      } : { day: -1, month: -1, year: -1 },
      date: _this.props.date
    }, _this.composeDays = function (month, year) {
      var amount = new Date(year, month + 1, 0).getDate();
      _this.setState({ days: Array.apply(null, Array(amount)).map(function (e, i) {
          return i + 1;
        }) });
    }, _this.change = function (e) {
      var _ref = +_this.day.value;

      var day = _ref === undefined ? 1 : _ref;

      var _ref2 = +_this.month.value;

      var month = _ref2 === undefined ? 0 : _ref2;

      var _ref3 = +_this.year.value;

      var year = _ref3 === undefined ? 2000 : _ref3;

      var selected = { day: day, month: month, year: year };
      _this.composeDays(month, year);
      _this.setState({ selected: selected, date: new Date(year, month, day) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateSelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var d = _react2.default.createElement('option', { disabled: true, value: '-1' }, '-');
      return _react2.default.createElement(_reactBootstrap.Col, { sm: 6 }, _react2.default.createElement(_reactBootstrap.FormGroup, { onChange: this.change }, _react2.default.createElement(_reactBootstrap.ControlLabel, null, 'Дата рождения'), _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(_reactBootstrap.Col, { sm: 3 }, _react2.default.createElement(_reactBootstrap.FormControl, { id: 'day', componentClass: 'select', ref: function ref(c) {
          return _this2.day = (0, _reactDom.findDOMNode)(c);
        }, defaultValue: this.state.selected.day || -1 }, d, this.state.days.map(function (e, i) {
        return _react2.default.createElement('option', { key: i, value: e }, e);
      }))), _react2.default.createElement(_reactBootstrap.Col, { sm: 5 }, _react2.default.createElement(_reactBootstrap.FormControl, { id: 'mounth', componentClass: 'select', ref: function ref(c) {
          return _this2.month = (0, _reactDom.findDOMNode)(c);
        }, defaultValue: this.state.selected.month || -1 }, d, this.state.months.map(function (e, i) {
        return _react2.default.createElement('option', { key: i, value: i }, e);
      }))), _react2.default.createElement(_reactBootstrap.Col, { sm: 4 }, _react2.default.createElement(_reactBootstrap.FormControl, { id: 'year', componentClass: 'select', ref: function ref(c) {
          return _this2.year = (0, _reactDom.findDOMNode)(c);
        }, defaultValue: this.state.selected.year || -1 }, d, this.state.years.map(function (e, i) {
        return _react2.default.createElement('option', { key: i, value: e }, e);
      }))))), _react2.default.createElement('input', { type: 'text', name: 'date', value: this.state.date || '', hidden: true, readOnly: true }));
    }
  }]);

  return DateSelector;
}(_react2.default.Component);

var makeInput = function makeInput(_ref4) {
  var id = _ref4.id;
  var type = _ref4.type;
  var label = _ref4.label;
  var placeholder = _ref4.placeholder;
  var s = _ref4.s;
  return function (props) {
    return _react2.default.createElement(_reactBootstrap.Col, { sm: s || 6 }, _react2.default.createElement(_reactBootstrap.FormGroup, { controlId: id }, _react2.default.createElement(_reactBootstrap.ControlLabel, null, label), _react2.default.createElement(_reactBootstrap.FormControl, { type: type || 'text', name: id, placeholder: placeholder || label, defaultValue: props.val })));
  };
};

var inputs = {
  name: makeInput({ id: 'name', label: 'Имя' }),
  surname: makeInput({ id: 'surname', label: 'Фамилия' }),
  email: makeInput({ id: 'email', type: 'email', label: 'Email' }),
  phone: makeInput({ id: 'phone', type: 'tel', label: 'Телефон' }),
  country: makeInput({ id: 'country', label: 'Страна' }),
  city: makeInput({ id: 'city', label: 'Город' }),
  interests: makeInput({ id: 'interests', label: 'Интересы', s: 12 }),
  gender: function gender(props) {
    return _react2.default.createElement(_reactBootstrap.Col, { sm: 6 }, _react2.default.createElement(_reactBootstrap.FormGroup, { controlId: 'gender' }, _react2.default.createElement(_reactBootstrap.ControlLabel, null, 'Пол'), _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'select', name: 'gender', defaultValue: 'none' }, _react2.default.createElement('option', { disabled: true, value: 'none' }, '-'), _react2.default.createElement('option', { value: 'male' }, 'Мужской'), _react2.default.createElement('option', { value: 'female' }, 'Женский'))));
  },
  save: function save(props) {
    return _react2.default.createElement(_reactBootstrap.Col, { sm: 3 }, _react2.default.createElement(_reactBootstrap.Button, { bsStyle: 'primary', type: 'submit', form: props.form, block: true, className: 'save' }, 'Сохранить'));
  },
  birthdate: DateSelector
};

var ProfileEdit = function (_React$Component2) {
  _inherits(ProfileEdit, _React$Component2);

  function ProfileEdit() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, ProfileEdit);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(ProfileEdit)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.drop = function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1);

      var file = _ref6[0];
      _this3.context.uploadImage(file, _this3.context.accessToken);
    }, _this3.open = function (e) {
      _this3.refs.dropzone.open();
    }, _this3.submit = function (e) {
      e.preventDefault();
      var data = Array.from(new FormData(_this3.form)).filter(function (e) {
        return e[1];
      }).reduce(function (s, e) {
        return _extends({}, s, _defineProperty({}, e[0], e[1]));
      }, {});
      _this3.context.uploadUserinfo(data, _this3.context.accessToken);
    }, _this3.change = function (e) {}, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(ProfileEdit, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      var formId = 'userinfoEdit';
      var style = {
        userpic: { margin: '2rem' }
      };
      var _context$userinfo = this.context.userinfo;
      var image = _context$userinfo.image;
      var name = _context$userinfo.name;
      var surname = _context$userinfo.surname;
      var country = _context$userinfo.country;
      var city = _context$userinfo.city;
      var birthdate = _context$userinfo.birthdate;
      var email = _context$userinfo.email;
      var phone = _context$userinfo.phone;
      var gender = _context$userinfo.gender;
      var interests = _context$userinfo.interests;

      return _react2.default.createElement(_reactDropzone2.default, {
        ref: 'dropzone',
        onDrop: this.drop,
        multiple: false,
        disableClick: true,
        className: 'profile edit navbar-default dropzone container',
        activeClassName: 'drop-hovered'
      }, _react2.default.createElement('div', { className: 'overlay' }), _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(_reactBootstrap.Col, { md: 10, mdOffset: 1 }, _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(_reactBootstrap.Image, { src: image, style: style.userpic, circle: true }), _react2.default.createElement(_reactBootstrap.Button, { bsStyle: 'primary', onClick: this.open }, 'Загрузить фото')), _react2.default.createElement(_reactBootstrap.Form, { onChange: this.change, onSubmit: this.submit, id: formId, ref: function ref(form) {
          return _this4.form = (0, _reactDom.findDOMNode)(form);
        } }, _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(inputs.name, { val: name }), _react2.default.createElement(inputs.email, { val: email })), _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(inputs.surname, { val: surname }), _react2.default.createElement(inputs.phone, { val: phone })), _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(inputs.gender, { val: gender }), _react2.default.createElement(inputs.country, { val: country })), _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(inputs.birthdate, { val: birthdate }), _react2.default.createElement(inputs.city, { val: city })), _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(inputs.interests, { val: (interests || []).join(', ') })), _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(inputs.save, { form: formId }))))));
    }
  }]);

  return ProfileEdit;
}(_react2.default.Component);

ProfileEdit.contextTypes = {
  userinfo: _react2.default.PropTypes.object,
  uploadImage: _react2.default.PropTypes.func,
  uploadUserinfo: _react2.default.PropTypes.func,
  accessToken: _react2.default.PropTypes.string
};
exports.default = ProfileEdit;

},{"react":"react","react-bootstrap":"react-bootstrap","react-dom":"react-dom","react-dropzone":"react-dropzone"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterBootstrap = require('react-router-bootstrap');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var styles = {
  editButton: {
    marginTop: '2rem'
  }
};

var ProfileView = function ProfileView(props, context) {
  var _context$userinfo = context.userinfo;
  var image = _context$userinfo.image;
  var name = _context$userinfo.name;
  var surname = _context$userinfo.surname;
  var country = _context$userinfo.country;
  var city = _context$userinfo.city;
  var birthdate = _context$userinfo.birthdate;

  return _react2.default.createElement(_reactBootstrap.Grid, { className: 'profile' }, _react2.default.createElement(_reactBootstrap.Row, null, _react2.default.createElement(_reactBootstrap.Col, { xs: 3, className: 'text-center' }, _react2.default.createElement(_reactBootstrap.Image, { src: image, circle: true, className: 'center-block' }), _react2.default.createElement(_reactRouterBootstrap.LinkContainer, { to: '/profile/edit' }, _react2.default.createElement(_reactBootstrap.Button, { bsStyle: 'info', bsSize: 'sm', style: styles.editButton }, 'Редактировать'))), _react2.default.createElement(_reactBootstrap.Col, null, _react2.default.createElement('h2', null, [name, surname].join(' ')), _react2.default.createElement('p', null, [country, city, birthdate].join(' ')))));
};

ProfileView.contextTypes = {
  userinfo: _react2.default.PropTypes.object
};

exports.default = ProfileView;

},{"react":"react","react-bootstrap":"react-bootstrap","react-router-bootstrap":"react-router-bootstrap"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var func = _react.PropTypes.func;
var object = _react.PropTypes.object;

var Register = function (_Component) {
  _inherits(Register, _Component);

  function Register() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Register);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Register)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { login: null, retype: null }, _this.ref = function (c) {
      if (c) {
        var e = (0, _reactDom.findDOMNode)(c);
        _this[e.name] = e;
      }
    }, _this.submit = function (e) {
      e.preventDefault();

      var _map = ['email', 'password', 'retype'].map(function (e) {
        return _this[e].value;
      });

      var _map2 = _slicedToArray(_map, 2);

      var email = _map2[0];
      var password = _map2[1];

      _this.context.login({ email: email, password: password, register: true });
    }, _this.change = function (e) {
      if (_this.state.login) _this.setState({ login: null });
      if (_this.retype.value != _this.password.value) _this.setState({ retype: 'error' });else _this.setState({ retype: null });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Register, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (nextContext.error) this.setState({ login: 'error' });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null, _react2.default.createElement('p', { className: 'msg' }, 'Register a new membership'), _react2.default.createElement(_reactBootstrap.Form, { className: 'login', onSubmit: this.submit, onChange: this.change }, _react2.default.createElement(_reactBootstrap.FormGroup, { controlId: 'email', validationState: this.state.login }, _react2.default.createElement(_reactBootstrap.FormControl, { type: 'email', name: 'email', placeholder: 'Email', ref: this.ref }), _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)), _react2.default.createElement(_reactBootstrap.FormGroup, { controlId: 'password', validationState: this.state.login }, _react2.default.createElement(_reactBootstrap.FormControl, { type: 'password', name: 'password', placeholder: 'Password', ref: this.ref }), _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)), _react2.default.createElement(_reactBootstrap.FormGroup, { controlId: 'password', validationState: this.state.retype }, _react2.default.createElement(_reactBootstrap.FormControl, { type: 'password', name: 'retype', placeholder: 'Retype password', ref: this.ref }), _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)), _react2.default.createElement(_reactBootstrap.FormGroup, null, _react2.default.createElement(_reactBootstrap.Checkbox, null, 'I agree to the ', _react2.default.createElement('a', { href: '#' }, 'terms'))), _react2.default.createElement(_reactBootstrap.FormGroup, null, _react2.default.createElement(_reactBootstrap.Col, null, _react2.default.createElement(_reactBootstrap.Button, { type: 'submit', block: true }, 'Sign in')))), _react2.default.createElement(_reactRouter.Link, { to: 'login', className: 'text-center' }, 'I already have a membership'));
    }
  }]);

  return Register;
}(_react.Component);

Register.contextTypes = { login: func, error: object };
exports.default = Register;

},{"react":"react","react-bootstrap":"react-bootstrap","react-dom":"react-dom","react-router":"react-router"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (props) {
  return _react2.default.createElement('h1', null, 'Welcome');
};

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = 'LOGIN';
var LOGOUT = 'LOGOUT';
exports.LOGIN = LOGIN;
exports.LOGOUT = LOGOUT;
var UPLOAD_IMAGE = 'UPLOAD_IMAGE';
var UPLOAD_USERINFO = 'UPLOAD_USERINFO';
exports.UPLOAD_IMAGE = UPLOAD_IMAGE;
exports.UPLOAD_USERINFO = UPLOAD_USERINFO;
var GET_USERINFO = 'GET_USERINFO';
exports.GET_USERINFO = GET_USERINFO;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null, this.props.children);
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

},{"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _header = require('../components/header.jsx');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard() {
    _classCallCheck(this, Dashboard);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).apply(this, arguments));
  }

  _createClass(Dashboard, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props$user = this.props.user;
      var userinfo = _props$user.userinfo;
      var accessToken = _props$user.accessToken;
      var refreshToken = _props$user.refreshToken;

      return {
        userinfo: userinfo,
        accessToken: accessToken,
        refreshToken: refreshToken,
        logout: this.props.logout,
        uploadImage: this.props.uploadImage,
        uploadUserinfo: this.props.uploadUserinfo,
        getUserinfo: this.props.getUserinfo
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getUserinfo(this.props.user.accessToken);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null, _react2.default.createElement(_header2.default, null), this.props.children);
    }
  }]);

  return Dashboard;
}(_react2.default.Component);

Dashboard.childContextTypes = {
  accessToken: _react2.default.PropTypes.string,
  refreshToken: _react2.default.PropTypes.string,
  userinfo: _react2.default.PropTypes.object,
  logout: _react2.default.PropTypes.func,
  uploadImage: _react2.default.PropTypes.func,
  uploadUserinfo: _react2.default.PropTypes.func,
  getUserinfo: _react2.default.PropTypes.func
};

var mapStateToProps = function mapStateToProps(state) {
  return { user: state.user };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ logout: _actions.logout, uploadImage: _actions.uploadImage, uploadUserinfo: _actions.uploadUserinfo, getUserinfo: _actions.getUserinfo }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Dashboard);

},{"../actions":1,"../components/header.jsx":3,"react":"react","react-redux":"react-redux","redux":"redux"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../actions');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var func = _react.PropTypes.func;
var object = _react.PropTypes.object;

var Entrance = function (_Component) {
  _inherits(Entrance, _Component);

  function Entrance() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Entrance);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Entrance)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getChildContext = function () {
      return { login: _this.props.login, error: _this.props.user.error };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Entrance, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactBootstrap.Grid, { className: 'vertical-center entrance' }, _react2.default.createElement(_reactBootstrap.Col, { md: 4, mdOffset: 4, sm: 6, smOffset: 3, xs: 10, xsOffset: 1, className: 'box' }, _react2.default.createElement('div', { className: 'logo text-center' }, 'Login to Onlango'), this.props.children, _react2.default.createElement('div', { className: 'social-auth-links text-center' }, _react2.default.createElement('p', null, '- OR -'), _react2.default.createElement('a', { href: '##' }, 'Sign in using Google+'))));
    }
  }]);

  return Entrance;
}(_react.Component);

Entrance.childContextTypes = {
  login: func,
  error: object
};
exports.default = (0, _reactRedux.connect)(function (state) {
  return { user: state.user };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({ login: _actions.login }, dispatch);
})(Entrance);

},{"../actions":1,"react":"react","react-bootstrap":"react-bootstrap","react-redux":"react-redux","redux":"redux"}],13:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _reactDom.render)(_react2.default.createElement(_reactRedux.Provider, { store: _store2.default }, _react2.default.createElement(_reactRouter.Router, { routes: (0, _routes2.default)(_store2.default), history: _reactRouter.browserHistory })), document.querySelector('#app'));

},{"./routes":15,"./store":16,"react":"react","react-dom":"react-dom","react-redux":"react-redux","react-router":"react-router"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleActions;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _redux = require('redux');

var _reduxActions = require('redux-actions');

var _reactRouter = require('react-router');

var _constants = require('../constants');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var saveUsertoStorage = function saveUsertoStorage(_ref) {
  var userinfo = _ref.userinfo;
  var accessToken = _ref.accessToken;
  var refreshToken = _ref.refreshToken;

  localStorage.setItem('userinfo', JSON.stringify(userinfo));
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
var removeUserFromStorage = function removeUserFromStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userinfo');
};

var user = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _constants.LOGIN, {
  next: function next() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    console.log(action);
    saveUsertoStorage(action.payload);
    setTimeout(function () {
      _reactRouter.browserHistory.push('/');
    }, 100);
    return _extends({}, state, action.payload);
  },
  throw: function _throw() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    console.log(action);
    removeUserFromStorage();
    return { error: action.payload };
  }
}), _defineProperty(_handleActions, _constants.LOGOUT, function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  console.log('do logout', action);
  removeUserFromStorage();
  _reactRouter.browserHistory.push('/login');
  return {};
}), _defineProperty(_handleActions, _constants.UPLOAD_IMAGE, {
  next: function next() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    var userinfo = _extends({}, state.userinfo, { image: action.payload });
    localStorage.setItem('userinfo', JSON.stringify(userinfo));
    return _extends({}, state, { userinfo: userinfo });
  },
  fail: function fail() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
    console.log(action);return state;
  }
}), _defineProperty(_handleActions, _constants.UPLOAD_USERINFO, {
  next: function next() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    console.log(action);
    return _extends({}, state, { userinfo: _extends({}, state.userinfo, action.payload) });
  },
  fail: function fail() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
    console.log(action);return state;
  }
}), _defineProperty(_handleActions, _constants.GET_USERINFO, {
  next: function next() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    console.log(action);
    return _extends({}, state, { userinfo: _extends({}, state.userinfo, action.payload) });
  },
  fail: function fail() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
    console.log(action);return state;
  }
}), _handleActions), {});

exports.default = (0, _redux.combineReducers)({
  user: user
});

},{"../constants":9,"react-router":"react-router","redux":"redux","redux-actions":"redux-actions"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('./containers/app.jsx');

var _app2 = _interopRequireDefault(_app);

var _entrance = require('./containers/entrance.jsx');

var _entrance2 = _interopRequireDefault(_entrance);

var _login = require('./components/login.jsx');

var _login2 = _interopRequireDefault(_login);

var _register = require('./components/register.jsx');

var _register2 = _interopRequireDefault(_register);

var _dashboard = require('./containers/dashboard.jsx');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _welcome = require('./components/welcome.jsx');

var _welcome2 = _interopRequireDefault(_welcome);

var _profileView = require('./components/profileView.jsx');

var _profileView2 = _interopRequireDefault(_profileView);

var _profileEdit = require('./components/profileEdit.jsx');

var _profileEdit2 = _interopRequireDefault(_profileEdit);

var _ = require('./components/404.jsx');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var connectRequireAuth = function connectRequireAuth(store) {
  return store ? function (nextState, replace) {
    console.log(nextState);
    var state = store.getState();
    if (!state.user || !state.user.accessToken) replace('/login');
  } : function () {};
}; //import React from 'react';

exports.default = function (store) {
  var requireAuth = connectRequireAuth(store);
  return [{
    path: '/',
    component: _app2.default,
    indexRoute: { component: _dashboard2.default },
    childRoutes: [{ path: 'login', component: _entrance2.default, indexRoute: { component: _login2.default } }, { component: _entrance2.default, childRoutes: [{ path: 'register', component: _register2.default }] }, {
      component: _dashboard2.default,
      onEnter: requireAuth,
      indexRoute: _welcome2.default,
      childRoutes: [{ path: 'profile', component: _profileView2.default }, { path: 'profile/edit', component: _profileEdit2.default }]
    }]
  }, {
    path: '*',
    statusCode: 404,
    component: _2.default
  }];
};

},{"./components/404.jsx":2,"./components/login.jsx":4,"./components/profileEdit.jsx":5,"./components/profileView.jsx":6,"./components/register.jsx":7,"./components/welcome.jsx":8,"./containers/app.jsx":10,"./containers/dashboard.jsx":11,"./containers/entrance.jsx":12}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var state = {
  user: typeof localStorage == 'undefined' ? {} : {
    userinfo: JSON.parse(localStorage.getItem('userinfo')),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
};
exports.default = (0, _redux.createStore)(_reducers2.default, state, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), typeof window != 'undefined' && window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
}));

},{"./reducers":14,"redux":"redux","redux-thunk":"redux-thunk"}]},{},[13])


//# sourceMappingURL=bundle.js.map
