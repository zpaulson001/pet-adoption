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

export interface PetFilter {
  species?: string;
  status?: string;
  shelterId?: string;
}

export interface PetRepository {
  findAll(): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
  findByFilter(filter: PetFilter): Promise<Pet[]>;
  create(pet: Pet): Promise<Pet>;
  update(id: string, pet: Pet): Promise<Pet | null>;
  delete(id: string): Promise<boolean>;
}

export interface ShelterRepository extends Repository<Shelter> {
  findByCity(city: string): Promise<Shelter[]>;
}

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}
