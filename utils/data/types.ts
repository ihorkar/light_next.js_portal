export interface UserData {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface InvitationData {
    email: string;
    role: string;
}