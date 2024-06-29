import { Bayi, BayiPengukuran } from "@app/shared";
import { PengukuranBayiDTO } from "../dtos/bayi-pengukuran.dto";

export interface BayiPengukuranServiceInterface {
  findBayiById(bayiId: string): Promise<Bayi>;
  findPengukuranBayiById(pengukuranId: string): Promise<BayiPengukuran>;
  addPengukuranBayi(bayiId: string, pengukuran: PengukuranBayiDTO): Promise<BayiPengukuran>;
  updatePengukuranBayi(pengukuranId: string, pengukuran: PengukuranBayiDTO): Promise<BayiPengukuran>;
}
