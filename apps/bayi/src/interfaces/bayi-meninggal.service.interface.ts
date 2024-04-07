import { Bayi, BayiMeninggal } from "@app/shared";
import { BayiMeninggalDTO } from "../dtos/bayi-meninggal.dto";

export interface BayiMeninggalServiceInterface {
  findBayiById(bayiId: string): Promise<Bayi>;
  addMeninggalBayi(bayiId: string, meninggal: BayiMeninggalDTO): Promise<BayiMeninggal>;
}
