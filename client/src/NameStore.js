//loccalstorage as singleton
class NameStore {
    constructor() {
        this.storage = window.localStorage;
    }

    addName(name) {
        this.storage.setItem(name, ttl)
        names.add(name);
    }

    removeName(name) {
        this.storage.clear();
        names
    }

    ttlCountDown()
}