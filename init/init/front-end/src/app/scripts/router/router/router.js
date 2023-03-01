// TODO #export-router: remove this IIFE
(function () {
  /**
   * Append an html template to the document, at the given outlet.
   * @param HTMLElement outlet the location on the document to add the template
   * @param HTMLElement template the template to append
   */
  function renderTemplate(outlet, template) {
    while (outlet.lastChild) {
      outlet.removeChild(outlet.lastChild);
    }
    outlet.appendChild(template);
    // TODO #spa: use the DOM api to remove all childNodes of the outlet element
    // TODO #spa: use the DOM api to append the 'template' element as a child of the 'outlet' element
  }

  /**
   * Create a new router. This router will load components into the given outlet.
   * @param {HTMLElement} outlet The element to put components into.
   */
  // TODO #export-router: export this function
  function Router(outlet) {
    this._components = {};
    this._templates = {};
    this._outlet = outlet;

    window.addEventListener("beforeunload", (event) =>
      this._onLocationChanged()
    );
    window.addEventListener("hashchange", (event) =>
      this._onLocationChanged(event.newURL)
    );
  }
  // TODO #export-router: remove this assignation
  window.Router = Router;

  /**
   * Bind a component ot be displayed when the registered URL is reached.
   * @param hash
   * @param componentEntry
   * @returns {Router}
   */
  Router.prototype.register = function (hash, componentEntry) {
    var path = `#${hash}`;
    if (!componentEntry) {
      throw new TypeError(
        `provided arg should be a Component. Got: ${componentEntry}`
      );
    }

    if (typeof hash !== "string") {
      throw new TypeError(
        `provided route url should be a string. Got: ${hash}`
      );
    } else {
      this._components[path] = componentEntry;
    }

    if (componentEntry.templateUrl) {
      if (!this._templates[componentEntry.templateUrl]) {
        this._templates[componentEntry.templateUrl] = true;
        var _this = this;
        _fetchTemplate(componentEntry.templateUrl, function (template) {
          componentEntry.template = template;
          if (_getRouteHash(window.location.href) === path) {
            _this._renderComponent(_this._components[path]);
          }
        });
      } else if (_getRouteHash(window.location.href) === path) {
        _this._renderComponent(_this._components[path]);
      }
    } else {
      if (_getRouteHash(window.location.href) === path) {
        this._renderComponent(this._components[path]);
      }
    }

    return this;
  };

  Router.prototype._renderComponent = function (componentEntry) {
    var component = new componentEntry.component();

    var outlet = this._outlet;

    var element = document.createElement("template");
    element.innerHTML =
      componentEntry.template ||
      component.template ||
      (component.getTemplate && component.getTemplate());

    renderTemplate(outlet, element.content.cloneNode(true));
    if (typeof component.init === "function") {
      component.init();
    }
  };

  Router.prototype._onLocationChanged = function (loc) {
    if (!loc) {
      return;
    }

    var path = _getRouteHash(loc);
    var componentEntry = this._components[path];

    if (componentEntry) {
      this._renderComponent(componentEntry);
    } else if (loc.startsWith(window.location.origin)) {
      console.warn(
        `navigated to "${loc}, but no component was registered at this address"`
      );
    }
  };

  function _getRouteHash(url) {
    return new URL(url).hash.split("?")[0] || "#";
  }

  function _fetchTemplate(templateUrl, cb) {
    var xhr =
      typeof XMLHttpRequest != "undefined"
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xhr.open("get", templateUrl, true);

    xhr.onreadystatechange = function () {
      var status;
      var data;
      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) {
        // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = xhr.responseText;
          cb(data);
        } else {
          throw new Error(status);
        }
      }
    };
    xhr.send();
  }
})();
