(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/components/CreateRecipe.js":
/*!*************************************************!*\
  !*** ./resources/js/components/CreateRecipe.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CreateRecipe; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Recipe_Ingredient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Recipe/Ingredient */ "./resources/js/components/Recipe/Ingredient.js");
/* harmony import */ var _Recipe_Step__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Recipe/Step */ "./resources/js/components/Recipe/Step.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js")["default"];




/**
 * Component rendering the form for recipe creation.
 * Will handle front end validation and pass to server on passing.
 *
 * @export
 * @param {*} {props, editRecipe, setEditRecipe}
 * @returns
 */

function CreateRecipe(_ref) {
  var props = _ref.props,
      editRecipe = _ref.editRecipe,
      setEditRecipe = _ref.setEditRecipe;

  // If true, form will change from POST to PUT
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(editRecipe),
      _useState2 = _slicedToArray(_useState, 2),
      edit = _useState2[0],
      setEdit = _useState2[1]; // Toggle error message


  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      err = _useState4[0],
      setErr = _useState4[1]; // Default Form state. Will replace with edit object (recipe object).


  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(edit !== null && edit !== void 0 ? edit : {
    'title': null,
    'estimated_time': null,
    'description': null,
    'image': null,
    'ingredients': [],
    'steps': []
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      formData = _useState6[0],
      setFormData = _useState6[1]; // Modal toggles


  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState8 = _slicedToArray(_useState7, 2),
      ingredientModal = _useState8[0],
      setIngredientModal = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState10 = _slicedToArray(_useState9, 2),
      stepModal = _useState10[0],
      setStepModal = _useState10[1]; // Object to be edited. Set to null when not in use.


  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      _useState12 = _slicedToArray(_useState11, 2),
      editIngredient = _useState12[0],
      setEditIngredient = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      _useState14 = _slicedToArray(_useState13, 2),
      editStep = _useState14[0],
      setEditStep = _useState14[1];
  /**
   * Update formData state by overwriting the value of the passed key.
   *
   * @param {*} key Targeted key.
   * @param {*} update Add to current value if exists, else overwrite.
   */


  function updateForm(key, update, del) {
    var val = update !== null && update !== void 0 ? update : document.getElementsByName("new-recipe__".concat(key))[0].value;

    if (key == "image") {
      val = document.getElementsByName("new-recipe__".concat(key))[0].files[0];
    } // Generate new form & overwrite value.


    var newForm = formData;

    if (del && update) {
      newForm[key].splice(update.idx, 1);
    } else if (update) {
      newForm[key].push(update);
    } else {
      newForm[key] = val;
    } // Update state w/ new form.


    setFormData(newForm);
    resetEdits();
  }
  /**
   * Erase objects stored in state.
   */


  function resetEdits() {
    // Reset edit objects.
    setEditIngredient(null);
    setEditStep(null);
  }
  /**
   * Target ingredient that has been updated and replace 
   * form state with a new form including the new ingredient.
   *
   * @param {*} data = Ingredient object
   */


  function updateIngredient(data) {
    var keys = ["name", "quantity", "measurement"];
    var newForm = formData;
    console.log(data);
    keys.forEach(function (key) {
      newForm.ingredients[data["idx"]][key] = data[key];
    }); // Update state w/ new form.

    setFormData(newForm);
    resetEdits();
  }
  /**
   * Target step that has been updated and replace 
   * form state with a new form including the new step.
   *
   * @param {*} data = Step object
   */


  function updateStep(data) {
    var newForm = formData;
    newForm.steps[data.order].content = data.content; // Update state w/ new form.

    setFormData(newForm);
    resetEdits();
  }
  /**
   * Validates form and sends via POST/PUT request to save to server.
   *
   * @returns false if form is invalid
   */


  function postRecipe() {
    axios.defaults.headers.common = {
      'Authorization': "bearer ".concat(localStorage.auth_token)
    };
    var valid = true;
    var ignore = ["description", "image"]; // Validate data (check empty inputs)

    for (var _i2 = 0, _Object$keys = Object.keys(formData); _i2 < _Object$keys.length; _i2++) {
      var key = _Object$keys[_i2];

      if (!formData[key]) {
        valid = !ignore.includes(key) ? false : valid;
        console.log("".concat(key, " is null and valid is ").concat(valid));
      } else if (formData[key].length < 1) {
        valid = false;
        console.log("".concat(key, " isnt null and valid is ").concat(valid));
      }
    } // FormData must be used to pass image to server.


    var formSend = new FormData();

    for (var _i3 = 0, _Object$entries = Object.entries(formData); _i3 < _Object$entries.length; _i3++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
          _key = _Object$entries$_i[0],
          val = _Object$entries$_i[1];

      if (_key == "image") {
        if (val) formSend.append(_key, val, val.filename);
      } else {
        formSend.append(_key, typeof val !== "string" ? JSON.stringify(val) : val);
      }
    }

    if (!valid) {
      setErr(true);
      setTimeout(function () {
        return setErr(false);
      }, 6000);
      return false;
    } else {
      if (edit) {
        axios.put("/api/recipes/".concat(formData.id), formData).then(function (res) {
          return props.history.push('/');
        })["catch"](function (err) {
          return console.error(res);
        });
      } else {
        axios.post('/api/recipes', formSend).then(function (res) {
          props.history.push('/');
        })["catch"](function (err) {
          return console.error(res);
        });
      }
    }
  }
  /**
   * Clears recipe from state and returns the user to the home page.
   *
   * @param {*} del = If truthy, sends DELETE request to delete existing recipe.
   */


  function abortRecipe(del) {
    if (del) {
      axios["delete"]("/api/recipes/".concat(formData.id), formData).then(function (res) {
        return console.log(res);
      })["catch"](function (err) {
        return console.error(res);
      });
    }

    setEditRecipe(null);
    props.history.push('/');
  }
  /**
   * Run on component mount and update.
   */


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var _formData$title, _formData$estimated_t, _formData$description;

    setEdit(editRecipe); // Fill default values of inputs with formData

    document.getElementsByName("new-recipe__title")[0].value = (_formData$title = formData.title) !== null && _formData$title !== void 0 ? _formData$title : null;
    document.getElementsByName("new-recipe__estimated_time")[0].value = (_formData$estimated_t = formData.estimated_time) !== null && _formData$estimated_t !== void 0 ? _formData$estimated_t : null;
    document.getElementsByName("new-recipe__description")[0].value = (_formData$description = formData.description) !== null && _formData$description !== void 0 ? _formData$description : null;
  }, [editRecipe]); // Elements to represent objects in arrays of Recipe object.

  var ingredientEls = [];
  var stepEls = []; // Fill ingredientEls with found items.

  var _loop = function _loop() {
    var ingredient = _Object$entries2[_i4];
    var idx = formData["ingredients"].indexOf(ingredient[1]);
    ingredient[1].idx = idx;
    ingredientEls.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: idx,
      onClick: function onClick() {
        setEditIngredient(ingredient[1]);
        setIngredientModal(true);
      }
    }, ingredient[1].name, " ", ingredient[1].quantity || ingredient[1].measurement ? "-" : null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, ingredient[1].quantity, " ", ingredient[1].measurement)));
  };

  for (var _i4 = 0, _Object$entries2 = Object.entries(formData["ingredients"]); _i4 < _Object$entries2.length; _i4++) {
    _loop();
  } // Fill stepEls with found items.


  var _loop2 = function _loop2() {
    var step = _Object$entries3[_i5];
    var idx = formData["steps"].indexOf(step[1]);
    step[1].idx = idx;
    stepEls.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: idx,
      onClick: function onClick() {
        setStepModal(true);
        setEditStep(step[1]);
      }
    }, "Step ", idx + 1, " - ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, step[1].content)));
  };

  for (var _i5 = 0, _Object$entries3 = Object.entries(formData["steps"]); _i5 < _Object$entries3.length; _i5++) {
    _loop2();
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cr-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "create-recipe"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: "create-recipe__head"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "create-recipe__head-title"
  }, edit ? "Update Existing" : "Create New", " Recipe"), edit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/assets/icons/x.svg",
    onClick: function onClick() {
      return abortRecipe();
    }
  }) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    className: "create-recipe__form "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-recipe__image",
    className: "create-recipe__label"
  }, "Image"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "file",
    accept: ".jpg",
    name: "new-recipe__image",
    className: "input create-recipe__input",
    onChange: function onChange() {
      return updateForm("image");
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-recipe__title",
    className: "create-recipe__label"
  }, "Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "new-recipe__title",
    className: "input create-recipe__input",
    onChange: function onChange() {
      return updateForm("title");
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-recipe__description",
    className: "create-recipe__label"
  }, "Description ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "create-recipe__label--emph"
  }, "(Optional)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "new-recipe__description",
    className: "input create-recipe__input",
    onChange: function onChange() {
      return updateForm("description");
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-recipe__estimated_time",
    className: "create-recipe__label"
  }, "Estimated Time (in minutes)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    step: "1",
    name: "new-recipe__estimated_time",
    className: "input create-recipe__input",
    onChange: function onChange() {
      return updateForm("estimated_time");
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "create-recipe__label"
  }, "Ingredients List"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, ingredientEls), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-secondary",
    name: "create-recipe__ingredients-btn",
    onClick: function onClick() {
      return setIngredientModal(true);
    }
  }, "Add Ingredient"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "create-recipe__label"
  }, "Steps"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, stepEls), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-secondary",
    name: "create-recipe__steps-btn",
    onClick: function onClick() {
      return setStepModal(true);
    }
  }, "Add Step"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "create-recipe__footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "create-recipe__err-message".concat(err ? "--active" : "")
  }, "Please fill in the required content before submitting (Recipes must include a Title, Ingredient, and a Step)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-primary",
    name: "create-recipe__submit",
    onClick: function onClick() {
      return postRecipe();
    }
  }, edit ? "Update" : "Create", " Recipe"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-secondary",
    onClick: function onClick() {
      abortRecipe(edit);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/assets/icons/bin.svg"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Recipe_Ingredient__WEBPACK_IMPORTED_MODULE_1__["default"], {
    updateForm: updateForm,
    modal: ingredientModal,
    setModal: setIngredientModal,
    idx: formData["ingredients"].indexOf(editIngredient),
    editIngredient: editIngredient,
    updateIngredient: updateIngredient,
    resetEdits: resetEdits
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Recipe_Step__WEBPACK_IMPORTED_MODULE_2__["default"], {
    updateForm: updateForm,
    modal: stepModal,
    setModal: setStepModal,
    steps: formData["steps"].length,
    editStep: editStep,
    updateStep: updateStep,
    resetEdits: resetEdits
  }));
}

/***/ }),

/***/ "./resources/js/components/Recipe/Ingredient.js":
/*!******************************************************!*\
  !*** ./resources/js/components/Recipe/Ingredient.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ingredient; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function Ingredient(_ref) {
  var updateForm = _ref.updateForm,
      modal = _ref.modal,
      setModal = _ref.setModal,
      idx = _ref.idx,
      editIngredient = _ref.editIngredient,
      updateIngredient = _ref.updateIngredient,
      resetEdits = _ref.resetEdits;

  // Boolean value of if an Ingredient is to be edited.
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(editIngredient !== null),
      _useState2 = _slicedToArray(_useState, 2),
      edit = _useState2[0],
      setEdit = _useState2[1]; // Toggle error message


  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      err = _useState4[0],
      setErr = _useState4[1];
  /**
   * Clear changes to ingredients.
   * If del exists then delete changes, rather than forgetting them.
   *
   * @param {*} del If exists, delete item.
   */


  function abortIngredient(del) {
    var keys = ["name", "quantity", "measurement"];
    keys.forEach(function (key) {
      document.getElementsByName("new-ingredient__".concat(key))[0].value = null;
    });

    if (del) {
      updateForm("ingredients", editIngredient, true);
    }

    setModal(false);
    resetEdits();
  }
  /**
   * Create new ingredient.
   *
   * @returns false if form is invalid.
   */


  function createIngredient() {
    var keys = ["name", ["quantity", "nullable"], ["measurement", "nullable"]];
    var newIngredient = {};
    var valid = true;
    keys.forEach(function (key) {
      // Nullable field will not need checking.
      if (_typeof(key) === 'object') {
        newIngredient[key[0]] = document.getElementsByName("new-ingredient__".concat(key[0]))[0].value.length > 0 ? document.getElementsByName("new-ingredient__".concat(key[0]))[0].value : null;
      } else {
        var val = document.getElementsByName("new-ingredient__".concat(key))[0].value;
        if (val.length < 1) valid = false;
        newIngredient[key] = val;
      }
    });

    if (!valid) {
      setErr(true);
      setTimeout(function () {
        return setErr(false);
      }, 6000);
      return false;
    }

    newIngredient['idx'] = idx;

    if (edit) {
      updateIngredient(newIngredient);
    } else {
      updateForm('ingredients', newIngredient);
    }

    abortIngredient();
  } // Run on component mount and on update of editIngredient.


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setEdit(editIngredient !== null);

    if (editIngredient) {
      var keys = ["name", "quantity", "measurement"];
      keys.forEach(function (key) {
        document.getElementsByName("new-ingredient__".concat(key))[0].value = editIngredient[key];
      });
    }
  }, [editIngredient]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cr-wrapper popout".concat(!modal ? "--hidden" : "")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "create-recipe"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: "create-recipe__head"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "create-recipe__head-title"
  }, edit ? "Edit" : "Add", " Ingredient")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    className: "create-recipe__form "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-ingredient__name",
    className: "create-recipe__label"
  }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "new-ingredient__name",
    className: "input create-recipe__input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-ingredient__quantity",
    className: "create-recipe__label"
  }, "Quantity ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "create-recipe__label--emph"
  }, "(Optional)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    step: "0.01",
    name: "new-ingredient__quantity",
    className: "input create-recipe__input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-ingredient__measurement",
    className: "create-recipe__label"
  }, "Measurement  ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "create-recipe__label--emph"
  }, "(Optional)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "new-ingredient__measurement",
    className: "input create-recipe__input"
  }), edit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-primary",
    onClick: function onClick() {
      return abortIngredient();
    }
  }, "Cancel") : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "create-recipe__footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "create-recipe__err-message".concat(err ? "--active" : "")
  }, "Please fill in the required content before submitting (Ingredients must include a Name and Quantity)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-primary",
    name: "new-ingredient__submit",
    onClick: function onClick() {
      return createIngredient();
    }
  }, edit ? "Edit" : "Add", " Ingredient"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-secondary",
    onClick: function onClick() {
      abortIngredient(edit);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/assets/icons/bin.svg"
  })))));
}

/***/ }),

/***/ "./resources/js/components/Recipe/Step.js":
/*!************************************************!*\
  !*** ./resources/js/components/Recipe/Step.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Step; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function Step(_ref) {
  var updateForm = _ref.updateForm,
      modal = _ref.modal,
      setModal = _ref.setModal,
      steps = _ref.steps,
      editStep = _ref.editStep,
      updateStep = _ref.updateStep,
      resetEdits = _ref.resetEdits;

  // Boolean value of if an Step is to be edited.
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(editStep !== null),
      _useState2 = _slicedToArray(_useState, 2),
      edit = _useState2[0],
      setEdit = _useState2[1]; // Toggle error message


  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      err = _useState4[0],
      setErr = _useState4[1];
  /**
   * Exit modal.
   *
   * @param {Boolean} del should the edit object be deleted or just forgotten.
   */


  function abortStep(del) {
    var keys = ["content"];
    keys.forEach(function (key) {
      document.getElementsByName("new-step__".concat(key))[0].value = null;
    });

    if (del) {
      updateForm("steps", editStep, true);
    }

    setModal(false);
    resetEdits();
  }
  /**
   * Create new step.
   *
   * @returns false if form is invalid.
   */


  function createStep() {
    var keys = edit ? ["content", "order"] : ["content"];
    var newStep = {};
    var valid = true;
    keys.forEach(function (key) {
      var val = document.getElementsByName("new-step__".concat(key))[0].value;
      if (val.length < 1) valid = false;
      newStep[key] = val;
    });

    if (!valid) {
      setErr(true);
      setTimeout(function () {
        return setErr(false);
      }, 6000);
      return false;
    }

    if (edit) {
      updateStep(newStep);
    } else {
      newStep["order"] = steps;
      updateForm('steps', newStep);
    }

    abortStep();
    setEdit(false);
  } // Run on component mount and on update of editStep and steps.


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setEdit(editStep !== null);

    if (editStep) {
      var keys = ["content", "order"];
      keys.forEach(function (key) {
        document.getElementsByName("new-step__".concat(key))[0].value = editStep[key];
      });
    }
  }, [editStep, steps]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cr-wrapper popout".concat(!modal ? "--hidden" : "")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "create-recipe"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: "create-recipe__head"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "create-recipe__head-title"
  }, edit ? "Edit" : "Add", " Step")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    className: "create-recipe__form "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "new-step__content",
    className: "create-recipe__label"
  }, "Content"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "new-step__content",
    className: "input create-recipe__input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "hidden",
    name: "new-step__order"
  }), edit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-primary",
    onClick: function onClick() {
      return abortStep();
    }
  }, "Cancel") : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "create-recipe__footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "create-recipe__err-message".concat(err ? "--active" : "")
  }, "Please fill in the required content before submitting (Step must include content)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-primary",
    name: "new-step__submit",
    onClick: function onClick() {
      return createStep();
    }
  }, edit ? "Update" : "Add", " Step"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "button-secondary",
    onClick: function onClick() {
      return abortStep(edit);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/assets/icons/bin.svg"
  })))));
}

/***/ })

}]);