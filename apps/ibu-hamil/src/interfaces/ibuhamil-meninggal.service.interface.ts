import { IbuHamil, IbuHamilMeninggal } from "@app/shared";
import { IbuHamilMeninggalDTO } from "../dtos/ibuhamil-meninggal.dto";

export interface IbuhamilMeninggalServiceInterface {
  findIbuhamilById(ibuHamilId: string): Promise<IbuHamil>;
  addMeninggalIbuhamil(ibuHamilId: string, meninggal: IbuHamilMeninggalDTO): Promise<IbuHamilMeninggal>;
}
