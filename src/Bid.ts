export default class Bid {
    private _amount: number;

    get amount() {
        return this._amount;
    }

    constructor(amount: number) {
        this._amount = amount;
    }
}