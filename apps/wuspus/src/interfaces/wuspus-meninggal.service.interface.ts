import { Wuspus, WuspusMeninggal } from "@app/shared";
import { WuspusMeninggalDTO } from "../dtos/wuspus-meninggal.dto";

export interface WuspusMeninggalServiceInterface {
  findWuspusMeninggalById(wuspusId: string): Promise<Wuspus>;
  addWuspusMeninggal(wuspusId: string, meninggal: Readonly<WuspusMeninggalDTO>): Promise<WuspusMeninggal>;
}
