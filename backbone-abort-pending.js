(function (root, factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.abortPending = factory()
  }
}(this, function () {
  return function abortPending (Backbone) {
    var sync = Backbone.sync

    Backbone.sync = function abortPendingSync (method, model, options) {
      var lastXhr = model._lastXhr && model._lastXhr[method]

      if (lastXhr && lastXhr.readyState !== 4 && options && options.abortPending === true) {
        lastXhr.abort()
      }

      if (!model._lastXhr) { model._lastXhr = {} }

      model._lastXhr[method] = sync.apply(this, arguments)

      return model._lastXhr[method]
    }

    return Backbone
  }
}))
