import { Photo } from './Photo';

export interface User {
    id: number;
    userName: string;
    gender: string;
    age: number;
    knownAs: string;
    createdOn: Date;
    lastActive: Date;
    city: string;
    country: string;
    mainPhotoUrl: string;
    introduction?: string;
    lookingFor?: string;
    interestes?: string;
    photos?: Photo[];

}
