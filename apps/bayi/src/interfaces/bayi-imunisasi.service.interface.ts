import { Bayi, BayiImunisasi } from "@app/shared";
import { ImunisasiBayiDTO } from "../dtos/bayi-imunisasi.dto";

export interface BayiImunisasiServiceInterface {
  findBayiById(bayiId: string): Promise<Bayi>;
  findImunisasiBayiById(imunisasiId: string): Promise<BayiImunisasi>;
  addImunisasiBayi(bayiId: string, imunisasi: ImunisasiBayiDTO): Promise<BayiImunisasi>;
  updateImunisasiBayi(imunisasiId: string, imunisasi: ImunisasiBayiDTO): Promise<BayiImunisasi>;
}
