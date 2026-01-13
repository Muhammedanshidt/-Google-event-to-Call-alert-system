export interface UserAttributes {
    email: string;
    phoneNumber?: string;
    refreshToken: string;
    lastAlertedEventId?: string;
    createdAt: Date;
    updatedAt: Date;
}