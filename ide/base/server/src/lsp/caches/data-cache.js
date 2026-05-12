"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCache = void 0;
class DataCache {
    _data;
    _maxdiff;
    constructor(max_timespan = DataCache.defaultTimespan) {
        this._data = new Map();
        this._maxdiff = max_timespan;
    }
    get(key) {
        const out = this._data.get(key);
        if (out) {
            //To old, then delete
            if (this.toOld(out.time)) {
                this._data.delete(key);
            }
            else {
                return out.data;
            }
        }
        return undefined;
    }
    getOrAdd(key, generate) {
        let out = this.get(key);
        if (out) {
            return out;
        }
        out = generate(key);
        this.set(key, out);
        return out;
    }
    set(key, value) {
        const tvalue = {
            data: value,
            time: Date.now(),
        };
        this._data.set(key, tvalue);
        return this;
    }
    clear() {
        this._data.clear();
    }
    toOld(time) {
        if (Date.now() - time > this._maxdiff)
            return true;
        return false;
    }
}
exports.DataCache = DataCache;
(function (DataCache) {
    //Every 5 minutes
    DataCache.defaultTimespan = timespan(0, 30, 0);
    function timespan(ms, seconds = 0, minutes = 0, hours = 0) {
        minutes += hours * 60;
        seconds += minutes * 60;
        ms = seconds * 100;
        return ms;
    }
    DataCache.timespan = timespan;
})(DataCache || (exports.DataCache = DataCache = {}));
//# sourceMappingURL=data-cache.js.map