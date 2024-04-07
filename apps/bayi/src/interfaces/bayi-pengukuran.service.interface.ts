import { Bayi, PengukuranBayi } from "@app/shared";
import { PengukuranBayiDTO } from "../dtos/bayi-pengukuran.dto";

export interface BayiPengukuranServiceInterface {
  findBayiById(bayiId: string): Promise<Bayi>;
  findPengukuranBayiById(pengukuranId: string): Promise<PengukuranBayi>;
  addPengukuranBayi(bayiId: string, pengukuran: PengukuranBayiDTO): Promise<PengukuranBayi>;
  updatePengukuranBayi(pengukuranId: string, pengukuran: PengukuranBayiDTO): Promise<PengukuranBayi>;
}
