import { Bayi, IbuHamil } from "@app/shared";
import { IbuHamilDTO } from "../dtos/ibuhamil.dto";
import { FilterDTO } from "../dtos/filter.dto";

export interface IbuhamilServiceInterface {
  findByName(name: Readonly<IbuHamilDTO>): Promise<void>;
  createIbuhamil(newIbuhamil: Readonly<IbuHamilDTO>): Promise<IbuHamil>;
  findIbuhamilById(id: string): Promise<IbuHamil>;
  findIbuhamil(filter: Readonly<FilterDTO>): Promise<IbuHamil[]>;
  updateIbuhamil(id: string, updateIbuhamil: Readonly<IbuHamilDTO>): Promise<IbuHamil>;
  deleteIbuhamil(id: string): Promise<void>;
}
