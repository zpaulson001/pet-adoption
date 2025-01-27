import { Repository } from '../../types/repositories.js';
import { mockData } from './data-store.js';

export abstract class MemoryRepository<T extends { id: string }>
  implements Repository<T>
{
  constructor(protected collection: keyof typeof mockData) {}

  protected getData(): T[] {
    return mockData[this.collection] as unknown as T[];
  }
  protected setData(items: T[]): void {
    mockData[this.collection] = items as any;
  }

  async findAll(): Promise<T[]> {
    return this.getData();
  }

  async findById(id: string): Promise<T | null> {
    const items = this.getData();
    return items.find((item) => item.id === id) || null;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const items = this.getData();
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    } as T;

    items.push(newItem);
    this.setData(items);
    return newItem;
  }

  async update(id: string, updateData: Partial<T>): Promise<T | null> {
    const items = this.getData();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const updatedItem = { ...items[index], ...updateData };
    items[index] = updatedItem;
    this.setData(items);
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const items = this.getData();
    const initialLength = items.length;
    const filteredItems = items.filter((item) => item.id !== id);

    if (filteredItems.length === initialLength) return false;

    this.setData(filteredItems);
    return true;
  }
}
