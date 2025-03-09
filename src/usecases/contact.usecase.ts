import { ContactCreate, ContactRepository } from '../interfaces/contact.interface';
import { ContactRepositoryPrisma } from '../repositories/contact.interface';

class ContactUseCase {
    private contactRepository: ContactRepository;

    constructor() {
        this.contactRepository = new ContactRepositoryPrisma();
    }

    async createContact({ name, email, phone, userId }: ContactCreate) {}
}

export { ContactUseCase };
