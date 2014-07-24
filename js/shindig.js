/* global define, module */
(function () {
    'use strict';

    var Shindig = function () {
        this.listeners = {};

        if (Shindig.prototype.instance) {
            return Shindig.prototype.instance;
        }

        Shindig.prototype.instance = this;
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

    Shindig.prototype.emit = alias('fire');

    /**
     * Listen for an event
     *
     * @param  {String}   evt
     * @param  {Function} callback
     */
    Shindig.prototype.listen = function(evt, callback, context) {
        if (typeof callback === 'function') {
            if (! this.listeners[evt] || typeof this.listeners[evt] !== 'object') {
                this.listeners[evt] = [];
            }

            this.listeners[evt].push(function() {
                return callback.apply(context, arguments);
            });
        }
    };

    Shindig.prototype.on = alias('listen');

    /**
     * Remove listeners
     *
     * @param  {String} evt
     */
    Shindig.prototype.remove = function(evt) {
        if (this.listeners.hasOwnProperty(evt)) {
            delete this.listeners[evt];
        }
    };

    Shindig.prototype.off = alias('remove');

    /**
     * Alias helper method
     *
     * @param  {String} name
     * @return {Function}
     */
    function alias(name) {
        return function () {
            if (typeof this[name] === 'function') {
                return this[name].apply(this, arguments);
            }
        };
    }

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
        this.Shindig = new Shindig();
    }

}).call(this);
