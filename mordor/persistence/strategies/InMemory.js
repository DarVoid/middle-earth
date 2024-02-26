export class InMemory {
    data = {};

    async ensureEntity(entity) {
        if(this.data[entity] === undefined) {
            this.data[entity] = [];
        }
    }

    async save(entity, obj) {
        await this.ensureEntity(entity);
        this.data[entity].push(obj);
        return obj;
    }

    async all(entity) {
        await this.ensureEntity(entity);
        return this.data[entity];
    }

    async _reset() {
        this.data = {};
    }
}
