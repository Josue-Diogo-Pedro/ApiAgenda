export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    userId: string;
}

export interface ContactCreate {
    name: string;
    email: string;
    phone: string;
    userId: string;
}

export interface ContactRepository {
    createContact(contactCreate: ContactCreate): Promise<Contact>;
}
