export class InMemory {
    data = {};

    save(entity, obj) {
        if(this.data[entity] === undefined) {
            this.data[entity] = [];
        }
        this.data[entity].push(obj);
        return obj;
    }

    all(entity) {
        if(this.data[entity] === undefined) {
            this.data[entity] = [];
        }
        return this.data[entity];
    }

    _reset() {
        this.data = {};
    }
}
