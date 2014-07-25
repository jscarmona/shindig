'use strict';

var Shindig = function () {
    this.listeners = {};
};

/**
 * Get property
 *
 * @param  {String} key
 * @return {mixed}
 */
Shindig.prototype.get = function (key) {
    return this[key];
};

/**
 * Set property
 *
 * @param {String} key
 * @param {mixed} value
 * @param {Boolean} silent
 */
Shindig.prototype.set = function(key, value, silent) {
    if (silent !== true) {
        if (! this.hasOwnProperty(key)) {
            this.fire('create:' + key, value);
        }
        else {
            this.fire('mutate:' + key, {
                'old' : this[key],
                'new' : value
            });
        }
    }

    this[key] = value;
};

/**
 * Unset property
 *
 * @param  {String} key
 * @param  {Boolean} silent
 * @return {void}
 */
Shindig.prototype.unset = function(key, silent) {
    if (this.hasOwnProperty(key)) {
        if (silent !== true) {
            this.fire('delete:' + key, this[key]);
        }

        delete this[key];
    }
};

/**
 * Fire event
 *
 * @param  {String} evt
 * @param  {Object|String|Array} data
 * @param  {Object} context
 */
Shindig.prototype.fire = function(evt, data) {
    if (this.listeners.hasOwnProperty(evt) && typeof this.listeners[evt] === 'object') {
        this.listeners[evt].forEach(function (callback) {
            if (typeof callback === 'function') {
                callback(data);
            }
        });
    }
};

/**
 * Listen for an event
 *
 * @param  {String}   evt
 * @param  {Function} callback
 */
Shindig.prototype.on = function(evt, callback, context) {
    if (typeof callback === 'function') {
        if (! this.listeners[evt] || typeof this.listeners[evt] !== 'object') {
            this.listeners[evt] = [];
        }

        this.listeners[evt].push(function() {
            return callback.apply(context, arguments);
        });
    }
};

/**
 * Remove listeners
 *
 * @param  {String} evt
 */
Shindig.prototype.off = function(evt) {
    if (this.listeners.hasOwnProperty(evt)) {
        delete this.listeners[evt];
    }
};

/**
 * Expose the class either via AMD, CommonJS or the global object
 */
if (typeof define === 'function' && define.amd) {
    define(function () {
        return new Shindig();
    });
}
else if (typeof module === 'object' && module.exports){
    module.exports = new Shindig();
}
else {
    window.Shindig = new Shindig();
}