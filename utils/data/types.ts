export interface UserData {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    language?: string;
}

export interface InvitationData {
    email: string;
    role: string;
}

export interface Datablock {
    _id: string;
    name: string;
    description: string;
    datablock: any;
  }

export type UserRole = "admin" | "manager" | "agent";