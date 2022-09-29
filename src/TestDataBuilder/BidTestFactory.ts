import Bid from "../Bid";
import { Bidders } from "../TestConsttant";

export class BidTestFactory {

    public static createWithAmount(amount: number) {
        return new Bid(amount, Bidders.SARAH);
    }
    public static createWithBidder(bidderId: number) {
        return new Bid(9999, bidderId);
    }

}
