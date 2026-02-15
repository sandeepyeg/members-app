export interface Member {
    id: number;
    name: string;
    email: string;
    membershipType: string;
    expiryDate: string;
    createdAt?: string;
    updatedAt?: string;
}