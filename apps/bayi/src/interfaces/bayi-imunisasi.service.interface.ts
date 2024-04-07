import { Bayi, ImunisasiBayi } from "@app/shared";
import { ImunisasiBayiDTO } from "../dtos/bayi-imunisasi.dto";

export interface BayiImunisasiServiceInterface {
  findBayiById(bayiId: string): Promise<Bayi>;
  findImunisasiBayiById(imunisasiId: string): Promise<ImunisasiBayi>;
  addImunisasiBayi(bayiId: string, imunisasi: ImunisasiBayiDTO): Promise<ImunisasiBayi>;
  updateImunisasiBayi(imunisasiId: string, imunisasi: ImunisasiBayiDTO): Promise<ImunisasiBayi>;
}
