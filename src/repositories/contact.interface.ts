import { Contact, ContactCreate, ContactRepository } from '../interfaces/contact.interface';

class ContactRepositoryPrisma implements ContactRepository {
    createContact(contactCreate: ContactCreate): Promise<Contact> {
        throw new Error('Method not implemented.');
    }
}

export { ContactRepositoryPrisma };
