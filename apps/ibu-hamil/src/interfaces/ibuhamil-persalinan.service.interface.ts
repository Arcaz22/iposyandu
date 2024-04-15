import { IbuHamil, IbuHamilPersalinan } from "@app/shared";
import { IbuhamilPersalinanDTO } from "../dtos/ibuhamil-persalinan.dto";

export interface IbuhamilPersalinanServiceInterface {
  findIbuhamilById(ibuHamilId: string): Promise<IbuHamil>;
  findPersalinanIbuhamilById(persalinanId: string): Promise<IbuHamilPersalinan>;
  addPersalinanIbuhamil(ibuHamilId: string, imunisasi: IbuhamilPersalinanDTO): Promise<IbuHamilPersalinan>;
  updatePersalinanIbuhamil(persalinanId: string, imunisasi: IbuhamilPersalinanDTO): Promise<IbuHamilPersalinan>;
}
