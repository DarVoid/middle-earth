export class InMemory {
    data = {};

    ensureEntity(entity) {
        if(this.data[entity] === undefined) {
            this.data[entity] = [];
        }
    }

    save(entity, obj) {
        this.ensureEntity(entity);
        this.data[entity].push(obj);
        return obj;
    }

    all(entity) {
        this.ensureEntity(entity);
        return this.data[entity];
    }

    _reset() {
        this.data = {};
    }
}
