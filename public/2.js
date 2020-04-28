(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./resources/js/components/Auth/Register.js":
/*!**************************************************!*\
  !*** ./resources/js/components/Auth/Register.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Register; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js")["default"];



/**
 * Register Component
 *
 * @export
 * @param {*} {setToken, props}
 * @returns
 */

function Register(_ref) {
  var _err$password;

  var setToken = _ref.setToken,
      props = _ref.props;

  // Holds all error feedback messages.
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState2 = _slicedToArray(_useState, 2),
      err = _useState2[0],
      setErr = _useState2[1];
  /**
   * Override form submission.
   * 
   * @param {*} e Submit form event.
   */


  var handleSubmit = function handleSubmit(e) {
    // Stop default form handling.
    e.preventDefault();
    var creds = {
      "name": String(document.getElementsByName("reg_name")[0].value),
      "email": String(document.getElementsByName("reg_email")[0].value),
      "password": String(document.getElementsByName("reg_password")[0].value),
      "password_confirmation": String(document.getElementsByName("reg_password_confirmation")[0].value)
    }; // Quick method of validation (works in conjunction with standard HTML form validation). Actual validation takes place on server.

    for (var key in creds) {
      if (creds[key].length < 1) {
        return false;
      }
    }

    axios.post('/api/auth/register', creds) // Handle Register Error
    .then(function (resp) {
      if (resp.data.success === false) {
        var errors = resp.data.error; // Restructure error object

        errors = {
          "name": errors.name ? errors.name[0] : null,
          "email": errors.email ? errors.email[0] : null,
          "password": errors.password ? errors.password[0] : null,
          "password_confirmation": errors.password_confirmation ? errors.password_confirmation[0] : null
        }; //  Overwrite Error state.

        setErr(errors); // Loop through fields and erase values to show error message (if necessary).

        for (var err_field in errors) {
          document.getElementsByName("reg_".concat(String(err_field)))[0].value = errors[err_field] ? "" : document.getElementsByName("reg_".concat(String(err_field)))[0].value;
        }
      } else if (resp.data.token) {
        setToken(resp.data.token, props);
      }
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
    className: "register"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: "register__head"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/assets/images/webcipe-text-w.svg",
    className: "register__logo"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleSubmit(e);
    },
    className: "register__form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    placeholder: "Name",
    name: "reg_name",
    className: "input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "email",
    placeholder: "E-Mail Address",
    name: "reg_email",
    className: "input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "password",
    placeholder: (_err$password = err.password) !== null && _err$password !== void 0 ? _err$password : "Password",
    name: "reg_password",
    className: "input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "password",
    placeholder: "Password Confirmation",
    name: "reg_password_confirmation",
    className: "input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "button-primary--light"
  }, "Sign Up"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    onClick: function onClick() {
      return props.history.goBack();
    },
    className: "button-secondary--light"
  }, "Go Back")));
}

/***/ })

}]);