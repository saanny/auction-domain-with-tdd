export default class Bid {
    private _amount: number;
    private _biderId: number;

    get amount() {
        return this._amount;
    }
    get biderId() {
        return this._biderId;
    }
    constructor(amount: number, biderId: number) {
        this._amount = amount;
        this._biderId = biderId;
    }
}