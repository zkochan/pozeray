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
	var listeners = [],
		messages = [];

	window.Logger = function(settings) {
		if (!settings) {
			settings = {};
		}
		if (!settings.area) {
			settings.area = DEFAULT_AREA_NAME;
		}

		var self = this;

		function post(type, values) {
			if (arguments.length != 2 || typeof type != 'string' || [MessageType.Error, MessageType.Log,
				MessageType.Warning, MessageType.Info, MessageType.Debug].indexOf(type) < 0) return;

			if (typeof type == 'undefined' || typeof values == 'undefined') return;

			if (values.length == 1) {
				values = values[0];
			}

			var message = {
				type: type,
				area: settings.area,
				body: values,
				ts: new Date()
			};
			messages.push(message);
			for (var i = 0; i < listeners.length; i++) {
				listeners[i](message);
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


	window.pozeray = {
		VERSION: '0.0.1',
		listen: function () {
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] == 'function') {
					listeners.push(arguments[i]);
				}
			}
		},
		removeListeners: function () {
			listeners = [];
		},
		getLogs: function(filter) {
			var filteredMessages = [];
			messages.forEach(function (message) {
				if (filter && (filter.area && filter.area != message.area || filter.type && filter.type != message.type)) return;
				filteredMessages.push(message);
			});
			return filteredMessages;
		},
		removeLogs: function () {
			messages = [];
		}
	};
})();