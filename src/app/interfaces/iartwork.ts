import { IInvestor } from 'src/app/interfaces/IInvestor';

export interface IArtwork {
    artworkAddress: string;
    title: string;
    creator: string;
    estimatedInterval: string;
    location: string;
    kind: string;
    materials: string;
    tokenQuantity: number;
    originalTokenQuantity: number;
    price: number;
    tokenPrice: number;
    auctioneer: string;
    investor: IInvestor;
    tokenSellers: IInvestor[];
    countOfTokenSellers: number;
    ethBalance: string;
}