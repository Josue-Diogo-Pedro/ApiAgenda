import { Contact, ContactCreate, ContactCreateData, ContactRepository } from '../interfaces/contact.interface';
import { UserRepository } from '../interfaces/user.interface';
import { ContactRepositoryPrisma } from '../repositories/contact.interface';
import { UserRepositoryPrisma } from '../repositories/user.interface';

class ContactUseCase {
    private contactRepository: ContactRepository;
    private userRepository: UserRepository;

    constructor() {
        this.contactRepository = new ContactRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async listAllContacts(userEmail: string): Promise<Contact[]> {
        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error('User not found');
        }

        const contacts = await this.contactRepository.findAllContacts(user.id);

        return contacts;
    }

    async createContact({ name, email, phone, userId }: ContactCreateData) {
        const user = await this.userRepository.findByEmail(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const verifyIfExistsContact = await this.contactRepository.findByEmailOrPhone(email, phone);

        if (verifyIfExistsContact) {
            throw new Error('Contact alredy exists');
        }

        const result = await this.contactRepository.createContact({
            name,
            email,
            phone,
            userId: user.id,
        });

        return result;
    }

    async updateContact({ id, name, email, phone }: Contact) {
        const result = await this.contactRepository.updateContact({
            id,
            name,
            email,
            phone,
        });

        return result;
    }

    async deleteContact(id: string) {
        const result = await this.contactRepository.deleteContact(id);
        return result;
    }
}

export { ContactUseCase };
