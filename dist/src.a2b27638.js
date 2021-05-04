// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/css/fonts.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\assets\\fonts\\Poppins-Black.ttf":[["Poppins-Black.e2cc9c55.ttf","src/assets/fonts/Poppins-Black.ttf"],"src/assets/fonts/Poppins-Black.ttf"],"./..\\..\\assets\\fonts\\Poppins-Regular.ttf":[["Poppins-Regular.fa5d5803.ttf","src/assets/fonts/Poppins-Regular.ttf"],"src/assets/fonts/Poppins-Regular.ttf"],"./..\\..\\assets\\fonts\\Poppins-SemiBold.ttf":[["Poppins-SemiBold.41267d25.ttf","src/assets/fonts/Poppins-SemiBold.ttf"],"src/assets/fonts/Poppins-SemiBold.ttf"],"./..\\..\\assets\\fonts\\icons.eot":[["icons.eaea7fbd.eot","src/assets/fonts/icons.eot"],"src/assets/fonts/icons.eot"],"./..\\..\\assets\\fonts\\icons.ttf":[["icons.8926590f.ttf","src/assets/fonts/icons.ttf"],"src/assets/fonts/icons.ttf"],"./..\\..\\assets\\fonts\\icons.woff":[["icons.d9b727ee.woff","src/assets/fonts/icons.woff"],"src/assets/fonts/icons.woff"],"./..\\..\\assets\\fonts\\icons.svg":[["icons.1c888169.svg","src/assets/fonts/icons.svg"],"src/assets/fonts/icons.svg"],"_css_loader":"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/styles/css/reset.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/styles/scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/js/createDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var date = new Date();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return "".concat(date.getDate(), " ").concat(months[date.getMonth()], " ").concat(date.getFullYear());
}
},{}],"src/js/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToDo = exports.template = void 0;

var _createDate = _interopRequireDefault(require("./createDate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = function template(task) {
  return "\n  <li class=\"list__item item ".concat(task.edit ? 'focus' : '', "\" data-id=\"").concat(task.id, "\">\n    <div class=\"item__top\">\n      <div class=\"item__items\">\n        <label>\n          <input data-item=\"checkbox\" class=\"check\" type=\"checkbox\" ").concat(task.checked ? 'checked' : '', ">\n          <span class=\"checkbox icon-checkbox\"></span>\n        </label>\n        <span data-item=\"date\" class=\"item__date\">").concat(task.date, "</span>\n      </div>\n      <div class=\"item__icons\">\n        <span class=\"").concat(task.edit ? 'icon-check' : 'icon-edit', "\" data-item=\"edit\"></span>\n        <span class=\"icon-cart\" data-item=\"delete\"></span>\n      </div>\n    </div>\n    <textarea rows=\"1\" class=\"item__text ").concat(task.checked ? 'done' : '', "\" placeholder=\"Please enter task description\" ").concat(task.edit ? '' : 'disabled', ">").concat(task.text, "</textarea>\n  </li>\n");
};

exports.template = template;

var createToDo = function createToDo() {
  var itemTask = {
    text: '',
    checked: false,
    edit: false,
    id: Date.now(),
    date: (0, _createDate.default)()
  };
  return itemTask;
};

exports.createToDo = createToDo;
},{"./createDate":"src/js/createDate.js"}],"src/js/showInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(list) {
  var scope = document.querySelector('.info__item_scope span');
  var active = document.querySelector('.info__item_active span');
  var successfull = document.querySelector('.info__item_successful span');
  var successItems = list.filter(function (item) {
    return item.checked;
  });
  scope.textContent = list.length;
  active.textContent = list.length - successItems.length;
  successfull.textContent = successItems.length;
}
},{}],"src/js/autoHeight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  var textarea = document.querySelectorAll('textarea');
  textarea.forEach(function (el) {
    el.style.height = el.setAttribute('style', "height: ".concat(el.scrollHeight, "px"));
    el.addEventListener('input', function () {
      el.style.height = 'auto';
      el.style.height = "".concat(el.scrollHeight, "px");
    });
  });
};

exports.default = _default;
},{}],"src/js/main.js":[function(require,module,exports) {
"use strict";

var _template = require("./template");

var _showInfo = _interopRequireDefault(require("./showInfo"));

var _autoHeight = _interopRequireDefault(require("./autoHeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var btnCreateTask = document.querySelectorAll('[data-add-task]');
var list = document.querySelector('.list');
var toDoList = [];

if (localStorage.toDoItem) {
  toDoList = _toConsumableArray(JSON.parse(localStorage.toDoItem));
  isEmptyList();
} // show info about tasks


(0, _showInfo.default)(toDoList); // render to do list on page

function render() {
  var html = toDoList.map(_template.template).join(''); // task => template(task)

  list.innerHTML = html;
}

render();
list.addEventListener('click', function (e) {
  var elementType = e.target.dataset.item;

  if (elementType) {
    var id = +e.target.closest('.list__item').dataset.id;
    var el = e.target.closest('.list__item');
    var task = toDoList.find(function (item) {
      return item.id === id;
    });
    var idx = toDoList.findIndex(function (item) {
      return item.id === id;
    });

    if (elementType === 'checkbox') {
      task.checked = !task.checked;
      var currentTextarea = el.querySelector('textarea');
      task.checked ? currentTextarea.classList.add('done') : currentTextarea.classList.remove('done');
    } else if (elementType === 'delete') {
      el.classList.add('leave');
      setTimeout(function () {
        toDoList.splice(idx, 1);
        el.remove();
        (0, _showInfo.default)(toDoList);
        updateLocalStorage();
        isEmptyList();
      }, 600);
    } else if (elementType === 'edit') {
      var _currentTextarea = el.querySelector('textarea');

      var value = _currentTextarea.value;

      if (!task.edit) {
        task.edit = true;

        _currentTextarea.removeAttribute('disabled');

        e.target.classList.remove('icon-edit');
        e.target.classList.add('icon-check');
        el.classList.add('edit');

        _currentTextarea.focus();
      } else if (task.edit && !value) {
        el.classList.add('error');
        !el.querySelector('.err') ? el.insertAdjacentHTML('beforeend', "<span class=\"err\">The field cannot be empty</span>") : '';
        changeField(_currentTextarea, el);
      } else {
        _currentTextarea.setAttribute('disabled', '');

        e.target.classList.remove('icon-check');
        e.target.classList.add('icon-edit');
        el.classList.remove('edit');
        task.text = value;
        task.edit = false;
      }
    }

    (0, _showInfo.default)(toDoList);
    updateLocalStorage();
  }
}); // create new task

var createTask = function createTask(el) {
  toDoList.push(el);
  var task = [el].map(_template.template).join();
  list.insertAdjacentHTML('beforeend', task);
  task = [];
}; // click on button


btnCreateTask.forEach(function (item) {
  item.addEventListener('click', function () {
    createTask((0, _template.createToDo)());
    isEmptyList();
    (0, _showInfo.default)(toDoList);
    updateLocalStorage();
    (0, _autoHeight.default)();
  });
}); // Update Local Storage

var updateLocalStorage = function updateLocalStorage() {
  localStorage.setItem('toDoItem', JSON.stringify(toDoList));
}; // if empty list


function isEmptyList() {
  if (!toDoList.length) {
    list.insertAdjacentHTML('beforebegin', '<div class="empty-list">No tasks. Please add the first task</div>');
  } else {
    var emptyList = document.querySelector('.empty-list');

    if (emptyList) {
      emptyList.remove();
    }
  }
} // remove an error when typing in a field


var changeField = function changeField(field, el) {
  field.addEventListener('input', function () {
    if (el.classList.contains('error') && el.querySelector('.err')) {
      el.classList.remove('error');
      el.querySelector('.err').remove();
    }
  });
}; // Auto height for textarea


(0, _autoHeight.default)();
},{"./template":"src/js/template.js","./showInfo":"src/js/showInfo.js","./autoHeight":"src/js/autoHeight.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles/css/fonts.css");

require("./styles/css/reset.css");

require("./styles/scss/main.scss");

require("./js/main");
},{"./styles/css/fonts.css":"src/styles/css/fonts.css","./styles/css/reset.css":"src/styles/css/reset.css","./styles/scss/main.scss":"src/styles/scss/main.scss","./js/main":"src/js/main.js"}],"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51352" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map