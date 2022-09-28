import Bid from "./Bid";

export default class Auction {
    private _sellerId: number;
    private _endDateTime: Date;
    private _product: string;
    private _startingPrice: number;
    private _winningBid: Bid | undefined;

    public get sellerId() {
        return this._sellerId;
    }
    public get endDateTime() {
        return this._endDateTime;
    }
    public get product() {
        return this._product;
    }
    public get startingPrice() {
        return this._startingPrice;
    }
    public get winningBid() {
        return this._winningBid;
    }

    constructor(sellerId: number, endDateTime: Date, product: string, startingPrice: number) {

        if (endDateTime.getTime() < new Date().getTime()) {
            throw new Error("Invalid End Date");
        }

        this._sellerId = sellerId;
        this._endDateTime = endDateTime;
        this._product = product;
        this._startingPrice = startingPrice;


    }
    public placedBid(bid: Bid) {
        if (bid.amount <= this._startingPrice) {
            throw new Error("Invalid Bid Amount Exception")
        }
        this._winningBid = bid;
    }

}