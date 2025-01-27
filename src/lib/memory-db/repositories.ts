import { Pet, Shelter, User } from '../../types/models.js';
import {
  PetRepository,
  ShelterRepository,
  UserRepository,
  PetFilter,
} from '../../types/repositories.js';
import { MemoryRepository } from './base-repository.js';

export class MemoryPetRepository
  extends MemoryRepository<Pet>
  implements PetRepository
{
  constructor() {
    super('pets');
  }

  async findByFilter(filter: PetFilter): Promise<Pet[]> {
    const pets = await this.findAll();

    return pets.filter((pet) => {
      const matchesSpecies =
        !filter.species ||
        pet.species.toLowerCase() === filter.species.toLowerCase();

      const matchesStatus =
        !filter.status ||
        pet.status.toLowerCase() === filter.status.toLowerCase();

      const matchesShelterId =
        !filter.shelterId || pet.shelterId === filter.shelterId;

      return matchesSpecies && matchesStatus && matchesShelterId;
    });
  }
}

export class MemoryShelterRepository
  extends MemoryRepository<Shelter>
  implements ShelterRepository
{
  constructor() {
    super('shelters');
  }

  async findByCity(city: string): Promise<Shelter[]> {
    const shelters = this.getData();
    return shelters.filter(
      (shelter) => shelter.city.toLowerCase() === city.toLowerCase()
    );
  }
}

export class MemoryUserRepository
  extends MemoryRepository<User>
  implements UserRepository
{
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = this.getData();
    return users.find((user) => user.email === email) || null;
  }
}
