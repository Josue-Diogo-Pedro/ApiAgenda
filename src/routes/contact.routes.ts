import { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contact.usecase';
import { ContactCreate } from '../interfaces/contact.interface';

export async function contactRoutes(fastify: FastifyInstance) {
    const contactUseCase = new ContactUseCase();

    fastify.post<{ Body: ContactCreate }>('/', async (request, reply) => {
        const { name, email, phone } = request.body;

        try {
            const result = await contactUseCase.createContact({ name, email, phone });
            reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    });
}
