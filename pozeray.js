/*!
 * Pozeray v0.0.1
 * https://github.com/z-core/pozeray
 *
 * Copyright 2014 Zoltan Kochan
 * Released under the MIT license
 */
;(function () {
	// Constants
	var DEFAULT_AREA_NAME = 'Default';

	// Enums
	var MessageType = {
		Log: 'log',
		Error: 'error',
		Warning: 'warn',
		Info: 'info',
		Debug: 'debug'
	};

	// Local variables
	var listeners = [];

	window.pozeray = {};

	pozeray.VERSION = '0.0.1';

	window.Logger = function(settings) {
		settings = $.extend({
			area: DEFAULT_AREA_NAME
		}, settings);

		var self = this;

		function post(type, values) {
			if (arguments.length != 2 || typeof type != 'string' || [MessageType.Error, MessageType.Log,
				MessageType.Warning, MessageType.Info, MessageType.Debug].indexOf(type) < 0) return;

			if (typeof type == 'undefined' || typeof values == 'undefined') return;

			if (values.length == 1) {
				values = values[0];
			}

			for (var i = 0; i < listeners.length; i++) {
				listeners[i]({
					type: type,
					area: settings.area,
					body: values
				});
			}
		}
		
		self.log = function () {
			post(MessageType.Log, arguments);
		}

		self.error = function () {
			post(MessageType.Error, arguments);
		}

		self.warn = function () {
			post(MessageType.Warning, arguments);
		}

		self.info = function () {
			post(MessageType.Info, arguments);
		}

		self.debug = function () {
			post(MessageType.Debug, arguments);
		}
	}

	window.$logger = new Logger();

	pozeray.listen = function () {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == 'function') {
				listeners.push(arguments[i]);
			}
		}
	};
})();