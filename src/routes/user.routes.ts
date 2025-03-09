import { FastifyInstance } from 'fastify';
import { UserCreate } from '../interfaces/user.interface';
import { UserUseCase } from '../usecases/user.usecase';

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase();

    fastify.get('/', (request, reply) => {
        reply.send({ hello: 'world' });
    });

    fastify.post<{ Body: UserCreate }>('/', async (request, reply) => {
        const { name, email } = request.body;
        try {
            const verifyIfExists = await userUseCase.findByEmail(email);
            if (verifyIfExists) {
                throw new Error('User alredy exists');
            }
            const data = await userUseCase.create({
                name,
                email,
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
}
