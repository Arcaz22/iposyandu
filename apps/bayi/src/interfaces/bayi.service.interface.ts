import { Bayi } from "@app/shared";
import { BayiDTO } from "../dtos/bayi.dto";
import { FilterDTO } from "../dtos/filter.dto";

export interface BayiServiceInterface {
  findByName(name: Readonly<BayiDTO>): Promise<void>;
  createBayi(newBayi: Readonly<BayiDTO & { userId: string }>): Promise<Bayi>;
  findBayiById(id: string): Promise<Bayi>;
  findBayi(filter: Readonly<FilterDTO>): Promise<Bayi[]>;
  updateBayi(id: string, updateBayi: Readonly<BayiDTO>): Promise<Bayi>;
  deleteBayi(id: string): Promise<void>;
}
