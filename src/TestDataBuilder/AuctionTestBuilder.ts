import Auction from "../Auction";
import Bid from "../Bid";

export class AuctionTestBuilder {

    private _sellerId: number;
    private _endDateTime: Date;
    private _product: string;
    private _startingPrice: number;
    private _winningBid: Bid | undefined;

    constructor() {
        this._sellerId = 1;
        this._endDateTime = new Date();
        this._endDateTime.setDate(this._endDateTime.getDate() + 1);
        this._product = "IPhone 13 pro max";
        this._startingPrice = 1000;
    }

    public WithSeller(sellerId: number) {
        this._sellerId = sellerId;
        return this;
    }
    public WithStartingPrice(price: number) {
        this._startingPrice = price;
        return this;
    }
    public Build(): Auction {
        return new Auction(this._sellerId, this._endDateTime, this._product, this._startingPrice)

    }
}