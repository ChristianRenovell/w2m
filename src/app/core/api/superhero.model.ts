export interface SuperHeroModel {
  id: number;
  name: string;
  fullName: string;
  height: string;
  weight: string;
  power: number;
  strength: number;
  speed: number;
  images: string;
}

export interface ReqSuperHeroModel {
  name: string;
  fullName: string;
  height: string;
  weight: string;
  power: number;
  strength: number;
  speed: number;
  images: File | string;
}
