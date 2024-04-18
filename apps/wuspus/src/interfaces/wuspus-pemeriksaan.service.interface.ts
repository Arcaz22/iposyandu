import { Wuspus, WuspusPemeriksaan } from "@app/shared";
import { WuspusPemeriksaanDTO } from "../dtos/wuspus-pemeriksaan.dto";

export interface WuspusPemeriksaanServiceInterface {
  findByName(wuspusId: string): Promise<Wuspus>;
  findWuspusPemeriksaanById(wuspusId: string): Promise<WuspusPemeriksaan>;
  addWuspusPemeriksaan(wuspusId: string, pemeriksaan: Readonly<WuspusPemeriksaanDTO>): Promise<WuspusPemeriksaan>;
  updateWuspusPemeriksaan(pemeriksaanWusPusId: string, update: Readonly<WuspusPemeriksaanDTO>): Promise<WuspusPemeriksaan>;
}
