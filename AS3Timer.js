(function(window) {
    function Timer(delay, repeatCount) {
        var _this = this,
            id, clearFunc, startFunc;
        function internalCallback() {
            _this.currentCount++;
            _this.trigger('timer');
            if (repeatCount > 0 && _this.currentCount >= repeatCount) {
                _this.reset();
                _this.trigger('complete');
            }
        }
        this.currentCount = 0;
        this.running = false;
        this.delay = delay;
        if (repeatCount === 1) {
            clearFunc = clearTimeout;
            startFunc = setTimeout;
        } else {
            clearFunc = clearInterval;
            startFunc = setInterval;
        }
        this.stop = function() {
            this.running = false;
            clearFunc(id);
        };
        this.start = function() {
            if (!this.running) {
                this.running = true;
                id = startFunc(internalCallback, this.delay);
            }
        };
        this.reset = function() {
            this.currentCount = 0;
            this.stop();
        };
    }
    _.extend(Timer.prototype, Backbone.Events);

    if (typeof module !== "undefined") {
        module.exports = Timer;
    } else {
        window.Timer = Timer;

        if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
            define(function() { return Timer; });
        }
    }
}(this));