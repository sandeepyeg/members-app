export interface Member {
    id: number;
    name: string;
    email: string;
    membershipType: 'Basic' | 'Premium';
    expiryDate: string;
}