import { FastifyRequest, FastifyReply } from 'fastify';

export function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const apiEmail = request.headers['email'];

    if (!apiEmail) {
        return reply.send({
            message: 'Email is required',
        });
    }
}
