import { prisma } from '../database/prisma-client';
import { Contact, ContactCreateData, ContactRepository } from '../interfaces/contact.interface';

class ContactRepositoryPrisma implements ContactRepository {
    async findAllContacts(userId: string): Promise<Contact[]> {
        const results = await prisma.contacts.findMany({
            where: {
                userId,
            },
        });

        return results;
    }
    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
        const result = await prisma.contacts.findFirst({
            where: {
                OR: [{ email }, { phone }],
            },
        });

        return result || null;
    }

    async createContact(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId,
            },
        });

        return result;
    }

    async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {
        //console.log(`\n\n${id} ${name} ${email} ${phone}\n\n`);
        const result = await prisma.contacts.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                phone,
            },
        });

        return result;
    }

    async deleteContact(id: string): Promise<boolean> {
        const result = await prisma.contacts.delete({
            where: { id },
        });

        return result ? true : false;
    }
}

export { ContactRepositoryPrisma };
