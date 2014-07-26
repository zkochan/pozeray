Pozeray
=======
Pozeray is a tool for logging front-end JavaScript.

# Cons of the standard console object
It is easy to use console to output logging informations like errors, warnings, infos, etc. However
* each browser has different implementation for the console object. Some browsers have more methods, others have less.
* the UI of the console is different in each browser
* there are too many redundant messages in the browsers native console panel
* it is impossible to group somehow the logged messages with the standard console

# Pros of using Pozeray loggers
* Pozeray loggers are the same in all browsers.
* Each logged message has an area attached to it. This allows to group messages nicely and filter them easily.

# How to use it
Currently Pozeray has these methods to log messages: `error, warn, info, log, debug`. All of them have one input parameter - the message.

There is a preinitialized logger for logging messages in the "Default" area. This logger is accessible through the $logger global variable. E.g., logging an error in the default area
```
$logger.error('Oops, something went very wrong!');
```

In order to use a new area, a new Logger has to be created. E.g., creating a Logger in the "Tracking" area and logging a warning
```
var trackingLogger = new Logger({ area: 'Tracking'});
trackingLogger.warn('This a tracking warning.');
```
