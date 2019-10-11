import { Photo } from "./Photo";

export interface User {
    id: number;
    username: string;
    gender: string;
    Age: number;
    knownas: string;
    createdon: Date;
    lastactive: Date;
    city: string;
    country: string;
    introduction?: string;
    lookingfor?: string;
    interestes?: string;
    photos?: Photo[];

}
