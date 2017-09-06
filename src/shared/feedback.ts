export interface Feedback {
    firstname: string;
    lastname: string;
    telnum: string;
    email: string;
    agree: boolean;
    contacttyype: string;
    message: string;
}

export const ContactType = ['None', "Tel", "Email"]