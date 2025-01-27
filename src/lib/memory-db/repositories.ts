import { Pet, Shelter, User } from '../../types/models.js';
import {
  PetRepository,
  ShelterRepository,
  UserRepository,
} from '../../types/repositories.js';
import { MemoryRepository } from './base-repository.js';

export class MemoryPetRepository
  extends MemoryRepository<Pet>
  implements PetRepository
{
  constructor() {
    super('pets');
  }

  async findByShelterId(shelterId: string): Promise<Pet[]> {
    const pets = this.getData();
    return pets.filter((pet) => pet.shelterId === shelterId);
  }

  async findByStatus(status: string): Promise<Pet[]> {
    const pets = this.getData();
    return pets.filter((pet) => pet.status === status);
  }

  async findBySpecies(species: string): Promise<Pet[]> {
    const allPets = await this.findAll();
    return allPets.filter(
      (pet) => pet.species.toLowerCase() === species.toLowerCase()
    );
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
