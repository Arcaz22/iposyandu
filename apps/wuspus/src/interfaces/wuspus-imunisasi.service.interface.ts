import { Wuspus, WuspusImunisasi } from "@app/shared";
import { WuspusImunisasiDTO } from "../dtos/wuspus-imunisasi.dto";

export interface WuspusImunisasiServiceInterface {
  findByName(wuspusId: string): Promise<Wuspus>;
  findWuspusImunisasiById(wuspusId: string): Promise<WuspusImunisasi>;
  addWuspusImunisasi(wuspusId: string, imunisasi: WuspusImunisasiDTO): Promise<WuspusImunisasi>;
  updateWuspusImunisasi(imunisasiWuspusId: string, update: WuspusImunisasiDTO): Promise<WuspusImunisasi>;
}
