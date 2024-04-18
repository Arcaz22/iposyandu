import { Wuspus } from "@app/shared";
import { WuspusDTO } from "../dtos/wuspus.dto";
import { FilterDTO } from "../dtos/filter.dto";

export interface WuspusServiceInterface {
  findByName(wuspusDTO: Readonly<WuspusDTO>): Promise<void>;
  createWuspus(newWuspus: Readonly<WuspusDTO>): Promise<Wuspus>;
  findWuspusById(wuspusId: string): Promise<Wuspus>;
  findWuspus(filter: Readonly<FilterDTO>): Promise<Wuspus[]>;
  updateWuspus(wuspusId: string, updateWuspus: Readonly<WuspusDTO>): Promise<Wuspus>;
  deleteWuspus(wuspusId: string): Promise<void>;
}
