import { User, UserCreate, UserRepository } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.interface';

class UserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({ name, email }: UserCreate): Promise<User> {
        const result = await this.userRepository.createUser({ name, email });
        return result;
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.userRepository.findByEmail(email);
        return result;
    }
}

export { UserUseCase };
