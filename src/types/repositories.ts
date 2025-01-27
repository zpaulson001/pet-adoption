import { User } from './models.js';
import { Shelter } from './models.js';
import { Pet } from './models.js';

export interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export interface PetRepository extends Repository<Pet> {
  findByShelterId(shelterId: string): Promise<Pet[]>;
  findByStatus(status: string): Promise<Pet[]>;
  findBySpecies(species: string): Promise<Pet[]>;
}

export interface ShelterRepository extends Repository<Shelter> {
  findByCity(city: string): Promise<Shelter[]>;
}

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}
