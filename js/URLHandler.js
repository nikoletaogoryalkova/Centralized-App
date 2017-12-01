const CONTROLLER_KEY = "__CONTROLLER__";
class URLHandler {

    toHash(obj, append = true) {
        let currentObj = this.fromHash();
        for (let key in obj) {
            if (key === CONTROLLER_KEY) {
                currentObj[key] = obj[key];
                continue;
            }
            if (key in currentObj) {
                if (append) {
                    if (!Array.isArray(currentObj[key])) {
                        currentObj[key] = [currentObj[key]];
                    }
                    currentObj[key].push(obj[key])
                } else {
                    currentObj[key] = obj[key]
                }
            } else {
                currentObj[key] = obj[key];
            }
        }

        let hash = "";
        if (CONTROLLER_KEY in currentObj) {
            hash += currentObj[CONTROLLER_KEY] + "/";
        }
        for (let key in currentObj) {
            if (key === CONTROLLER_KEY) {
                continue;
            }
            if (Array.isArray(currentObj[key])) {
                hash += key + "=";
                hash += encodeURIComponent(currentObj[key].join(","));
            } else {
                hash += key + "=" + encodeURIComponent(currentObj[key]);
            }
            hash += "/";
        }

        if (hash[hash.length - 1] === '/') {
            hash = hash.substr(0, hash.length-1);
        }

        //history.replaceState(undefined, undefined, hash)
        window.location.hash = hash;

        return hash;
    }

    fromHash() {
        let pairs = window.location.hash.split("/");
        let obj = {};

        for (let i in pairs.filter(x => x)) {
            let pairString = pairs[i];
            if (i == 0) {
                obj[CONTROLLER_KEY] = pairString;
            } else {
                let pair = pairString.split("=");
                if (pair[1].indexOf(',') > -1) {
                    obj[pair[0]] = pair[1].split(',')
                } else {
                    obj[pair[0]] = pair[1];
                }
            }
        }
        return obj;
    }

    getController(hashInfo) {
        return hashInfo ? hashInfo[CONTROLLER_KEY] : this.fromHash()[CONTROLLER_KEY];
    }

    setController(hashInfo, controller) {
        hashInfo[CONTROLLER_KEY] = controller;
    }

    hasComponent(key) {
        return key in this.fromHash();
    }

    getComponent(key) {
        return this.fromHash()[key];
    }

}