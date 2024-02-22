export class BaseEntity {

    _persistence;

    constructor(persistence) {
        this._persistence = persistence;
    }

    save() {
        const keys = Object.keys(this).filter(key => !key.startsWith('_'));
        let obj = {};
        keys.forEach(key => obj[key] = this[key]);
        return this._persistence.save(this.constructor.name, obj);
    }

    static all(persistence) {
        const instance = new this(persistence);
        return instance._persistence.all(instance.constructor.name);
    }

}
