webpackHotUpdate("main",{

/***/ "./src/components/Core/Set/SetGroup.jsx":
/*!**********************************************!*\
  !*** ./src/components/Core/Set/SetGroup.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_will_Development_econcircles_econcircles_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _home_will_Development_econcircles_econcircles_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components_Core_DataCache_reducers_datacache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/Core/DataCache/reducers/datacache */ "./src/components/Core/DataCache/reducers/datacache.js");
/* harmony import */ var components_Core_Hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Core/Hooks */ "./src/components/Core/Hooks/index.js");
/* harmony import */ var _Groups__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Groups */ "./src/components/Core/Set/Groups/index.js");
/* harmony import */ var components_Sets_Groups__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Sets/Groups */ "./src/components/Sets/Groups/index.js");
/* harmony import */ var components_Sets_Groups__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(components_Sets_Groups__WEBPACK_IMPORTED_MODULE_6__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(_home_will_Development_econcircles_econcircles_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var SetGroup = function SetGroup(props, ref) {
  var _props = _objectSpread({}, props),
      id = _props.id,
      view = _props.view,
      type = _props.type,
      group = _props.group; // This reference is use to grab information about the parent group render dimensions.


  var setRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(ref);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(function () {
    return Object(components_Core_DataCache_reducers_datacache__WEBPACK_IMPORTED_MODULE_3__["callCache"])({
      id: id,
      target: 'meta',
      type: type,
      action: 'fetch',
      filter: 'attributes'
    });
  }),
      _useState2 = Object(_home_will_Development_econcircles_econcircles_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      attributes = _useState2[0],
      updateAttributes = _useState2[1];

  var _useClickEvents = Object(components_Core_Hooks__WEBPACK_IMPORTED_MODULE_4__["useClickEvents"])(props.onClick, props.onDoubleClick),
      _useClickEvents2 = Object(_home_will_Development_econcircles_econcircles_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useClickEvents, 2),
      handleClick = _useClickEvents2[0],
      handleDoubleClick = _useClickEvents2[1];

  var events = {};

  if (props.onClick || props.onDoubleClick) {
    events.onClick = handleClick;
    events.onDoubleClick = handleDoubleClick;
  }

  if (props.onEnter && props.onExit) {
    events.onPointerEnter = props.onEnter;
    events.onPointerLeave = props.onExit;
  } // Set the viewbox after the render for next load.


  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log(attributes);

    if (setRef.current) {
      if ('parent' === group) {
        getGroupViewBox();
      } else if ('children' === group) {
        getGroupCenter();
      }
    }
  }, [setRef.current]);
  var elementType = Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function () {
    if (setRef.current) {
      if (/svg|g|symbol/i.test(setRef.current.tagName)) {
        return 'svg';
      }

      return 'html';
    }
  }, [setRef.current]);
  var getBoundingBox = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    if (elementType) {
      var bbox = {};

      switch (elementType) {
        case 'svg':
          console.log(setRef.current.getBBox());
          console.log(setRef.current.getBoundingClientRect());
          bbox = setRef.current.getBBox();
          return {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height,
            __typename: 'JSONObject'
          };
          break;

        case 'html':
        default:
          bbox = setRef.current.getBoundingClientRect();
          return {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height,
            __typename: 'JSONObject'
          };
          break;
      }
    }
  }, [setRef.current]);
  var getGroupViewBox = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    if (attributes && attributes.viewbox) {
      return attributes.viewbox;
    }

    var bbox = getBoundingBox();

    if (bbox && bbox.width && bbox.height) {
      var vb = {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        __typename: 'JSONObject'
      };
      var newAttributes = Object(components_Core_DataCache_reducers_datacache__WEBPACK_IMPORTED_MODULE_3__["callCache"])({
        id: id,
        target: 'meta',
        type: type,
        action: 'update',
        filter: 'attributes'
      }, {
        width: bbox.width,
        height: bbox.height,
        viewbox: _objectSpread({}, vb)
      });
      updateAttributes(newAttributes);
      return vb;
    }
  }, [setRef.current]);
  var getGroupCenter = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    if (attributes && attributes.group && attributes.group.center) {
      return attributes.group.center;
    }

    var bbox = getBoundingBox();

    if (bbox && bbox.width && bbox.height) {
      var rx = bbox.width / 2;
      var ry = bbox.height / 2;
      var cx = bbox.x + rx;
      var cy = bbox.y + ry;
      var center = {
        x: cx,
        y: cy,
        __typename: 'Center'
      };
      var newAttributes = Object(components_Core_DataCache_reducers_datacache__WEBPACK_IMPORTED_MODULE_3__["callCache"])({
        id: id,
        target: 'meta',
        type: type,
        action: 'update',
        filter: 'attributes'
      }, {
        group: {
          width: bbox.width,
          height: bbox.height,
          radiusX: rx,
          radiusY: ry,
          center: _objectSpread({}, center),
          __typename: 'JSONObject'
        }
      });
      updateAttributes(newAttributes);
      return center;
    }
  }, [setRef.current]);

  if (props.view) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    var setgroupClassName = props.view.charAt(0).toUpperCase() + props.view.slice(1);

    if (setgroupClassName in components_Sets_Groups__WEBPACK_IMPORTED_MODULE_6__) {
      return components_Sets_Groups__WEBPACK_IMPORTED_MODULE_6__[setgroupClassName](_objectSpread({}, props, {
        events: events
      }), setRef);
    } else if (setgroupClassName in _Groups__WEBPACK_IMPORTED_MODULE_5__) {
      return _Groups__WEBPACK_IMPORTED_MODULE_5__[setgroupClassName](_objectSpread({}, props, {
        events: events
      }), setRef);
    }
  }

  return _Groups__WEBPACK_IMPORTED_MODULE_5__["Default"](_objectSpread({}, props, {
    events: events
  }), setRef);
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(SetGroup));

/***/ })

})
//# sourceMappingURL=main.d9ff81c503695b477abf.hot-update.js.map
