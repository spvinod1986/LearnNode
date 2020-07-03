const { EventEmitter } = require("events");

var url = "http://abc.com";

class EventLogger extends EventEmitter {
    log(message) {
        console.log(message);

        // raise an event
        this.emit('messageLogged', { id: 1, message: 'Message logged from Event Logger' });
    }
}

module.exports = EventLogger;