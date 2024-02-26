export class BaseEntity {

    _persistence;

    constructor(persistence) {
        this._persistence = persistence;
    }

    async save() {
        const keys = Object.keys(this).filter(key => !key.startsWith('_'));
        let obj = {};
        keys.forEach(key => obj[key] = this[key]);
        return await this._persistence.save(this.constructor.name, obj);
    }

    static async all(persistence) {
        const instance = new this(persistence);
        return await instance._persistence.all(instance.constructor.name);
    }

}
