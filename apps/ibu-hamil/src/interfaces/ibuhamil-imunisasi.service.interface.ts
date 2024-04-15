import { IbuHamil, IbuHamilImunisasi } from "@app/shared";
import { ImunisasiIbuhamilDTO } from "../dtos/ibuhamil-imunisasi.dto";

export interface IbuhamilImunisasiServiceInterface {
  findIbuhamilById(ibuHamilId: string): Promise<IbuHamil>;
  findImunisasiIbuhamilById(imunisasiId: string): Promise<IbuHamilImunisasi>;
  addImunisasiIbuhamil(ibuHamilId: string, imunisasi: ImunisasiIbuhamilDTO): Promise<IbuHamilImunisasi>;
  updateImunisasiIbuhamil(imunisasiId: string, imunisasi: ImunisasiIbuhamilDTO): Promise<IbuHamilImunisasi>;
}
