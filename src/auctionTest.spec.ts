import Auction from './Auction';
import Bid from './Bid';
import { Bidders, Sellers } from './TestConsttant';
import { AuctionTestBuilder } from './TestDataBuilder/AuctionTestBuilder';
import { BidTestFactory } from './TestDataBuilder/BidTestFactory';
describe('Auction Management Tests', () => {


    test('auction opens with valid data', () => {
        const sellerId = 1;
        const endDateTime: Date = new Date();
        endDateTime.setDate(endDateTime.getDate() + 1);
        const product = "IPhone 13 pro max";
        const startingPrice = 1000;
        const auction = new Auction(sellerId, endDateTime, product, startingPrice)

        expect(auction.sellerId).toBe(sellerId);
        expect(auction.endDateTime).toBe(endDateTime);
        expect(auction.product).toBe(product);
        expect(auction.startingPrice).toBe(startingPrice);

    });

    test.skip("auction cant be open when ending is past", () => {

        const sellerId = 1;
        const endDateTime: Date = new Date();
        endDateTime.setDate(endDateTime.getDate() - 1);
        const product = "IPhone 13 pro max";
        const startingPrice = 1000;
        const openingAuction = new Auction(sellerId, endDateTime, product, startingPrice)

        expect(openingAuction.sellerId).toBe(sellerId);
        expect(openingAuction.endDateTime).toBe(endDateTime);
        expect(openingAuction.product).toBe(product);
        expect(openingAuction.startingPrice).toBe(startingPrice);

        expect(() => { openingAuction }).rejects.toMatch("Invalid End Date");

    })

    test("auction opens with no winner at the beginning", () => {

        const auction = new AuctionTestBuilder()
            .WithStartingPrice(1100)
            .Build();

        expect(auction.winningBid).toBe(undefined)
    });

    test("bid places as current winner bid when bid is greater than starting price on first bid", () => {


        const auction = new AuctionTestBuilder()
            .WithStartingPrice(1000)
            .Build();
        const bid = BidTestFactory.createWithAmount(1100);
        auction.placedBid(bid);

        expect(auction.winningBid).toBe(bid);
    });

    test.each([
        [1000, 1000],
        [999, 1000]
    ])("bid not placed when  bid is not greater than  starting price on first bid", (bidAmount: number, startingPrice: number) => {

        // parameterize anonymous method

        const auction = new AuctionTestBuilder()
            .WithStartingPrice(startingPrice)
            .Build();

        const bid = BidTestFactory.createWithAmount(bidAmount);

        expect(() => auction.placedBid(bid)).toThrow(`Invalid Bid Amount Exception`);

    });

    test("seller cant place bid on himself auction", () => {

        const auction = new AuctionTestBuilder()
            .WithSeller(Sellers.JACK)
            .Build();

        const bid = BidTestFactory.createWithBidder(Sellers.JACK);

        expect(() => auction.placedBid(bid)).toThrow("Invalid Bidder");
    });

});


