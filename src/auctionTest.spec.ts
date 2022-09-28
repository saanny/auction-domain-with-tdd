import Auction from './Auction';
import Bid from './Bid';
import { AuctionTestBuilder } from './TestDataBuilder/AuctionTestBuilder';
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

        const auctionTestBuilder = new AuctionTestBuilder();
        auctionTestBuilder.WithStartingPrice(1100)
        const auction = auctionTestBuilder.Build();

        expect(auction.winningBid).toBe(undefined)
    });

    test("bid places as current winner bid when bid is greater than starting price on first bid", () => {


        const auctionTestBuilder = new AuctionTestBuilder();
        auctionTestBuilder.WithStartingPrice(1000)
        const auction = auctionTestBuilder.Build();
        const bid = new Bid(1100, 2);
        auction.placedBid(bid);

        expect(auction.winningBid).toBe(bid);
    });

    test.each([
        [1000, 1000],
        [999, 1000]
    ])("bid not placed when  bid is not greater than  starting price on first bid", (bidAmount: number, startingPrice: number) => {

        // parameterize anonymous method
        const auctionTestBuilder = new AuctionTestBuilder();
        auctionTestBuilder.WithStartingPrice(startingPrice)
        const auction = auctionTestBuilder.Build();

        const bid = new Bid(bidAmount, 2);

        expect(() => auction.placedBid(bid)).toThrow(`Invalid Bid Amount Exception`);

    });

    test("seller cant place bid on himself auction", () => {
        const auctionTestBuilder = new AuctionTestBuilder();
        auctionTestBuilder.WithSeller(1);
        const auction = auctionTestBuilder.Build();

        const bid = new Bid(1100, 1);

        expect(() => auction.placedBid(bid)).toThrow("Invalid Bidder");
    });

});


