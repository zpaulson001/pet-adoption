import {
  PetRepository,
  ShelterRepository,
  UserRepository,
} from '../types/repositories.js';
import {
  MemoryPetRepository,
  MemoryShelterRepository,
  MemoryUserRepository,
} from './memory-db/repositories.js';

export class RepositoryFactory {
  private static petRepository: PetRepository;
  private static shelterRepository: ShelterRepository;
  private static userRepository: UserRepository;

  static getPetRepository(): PetRepository {
    if (!this.petRepository) {
      this.petRepository = new MemoryPetRepository();
    }
    return this.petRepository;
  }

  static getShelterRepository(): ShelterRepository {
    if (!this.shelterRepository) {
      this.shelterRepository = new MemoryShelterRepository();
    }
    return this.shelterRepository;
  }

  static getUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new MemoryUserRepository();
    }
    return this.userRepository;
  }
}
