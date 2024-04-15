import { IbuHamil, IbuHamilPengukuran } from "@app/shared";
import { PengukuranIbuhamilDTO } from "../dtos/ibuhamil-pengukuran.dto";

export interface IbuhamilPengukuranServiceInterface {
  findIbuhamilById(ibuHamilId: string): Promise<IbuHamil>;
  findPengukuranIbuhamilById(pengukuranId: string): Promise<IbuHamilPengukuran>;
  addPengukuranIbuhamil(ibuHamilId: string, pengukuran: PengukuranIbuhamilDTO): Promise<IbuHamilPengukuran>;
  updatePengukuranIbuhamil(pengukuranId: string, pengukuran: PengukuranIbuhamilDTO): Promise<IbuHamilPengukuran>;
}
