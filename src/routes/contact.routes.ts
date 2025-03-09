import { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contact.usecase';
import { Contact, ContactCreate } from '../interfaces/contact.interface';
import { authMiddleware } from '../middleware/auth.middleware';

export async function contactRoutes(fastify: FastifyInstance) {
    const contactUseCase = new ContactUseCase();
    fastify.addHook('preHandler', authMiddleware);

    fastify.get('/', async (request, reply) => {
        const userEmail = request.headers['email'];
        try {
            const contacts = await contactUseCase.listAllContacts(userEmail);
            return reply.send(contacts);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.post<{ Body: ContactCreate }>('/', async (request, reply) => {
        const { name, email, phone } = request.body;
        const userEmail = request.headers['email'];
        console.log('\n\nUser email do header: ', userEmail);
        try {
            const result = await contactUseCase.createContact({ name, email, phone, userId: userEmail });
            reply.send(result);
        } catch (error) {
            reply.send({ message: `\n\n${error}` });
        }
    });

    fastify.put<{ Body: Contact; Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params;
        const { name, email, phone } = request.body;
        try {
            const data = await contactUseCase.updateContact({
                id,
                name,
                email,
                phone,
            });

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const result = await contactUseCase.deleteContact(id);
            return reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    });
}
