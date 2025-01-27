export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  size: string;
  description: string;
  status: string;
  shelterId: string;
}

export interface Shelter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferences: {
    species: string[];
    size: string[];
  };
}
