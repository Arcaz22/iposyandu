import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wuspus, WuspusMeninggal } from "@app/shared";
import { Repository } from "typeorm";
import { WuspusMeninggalServiceInterface } from "../../interfaces/wuspus-meninggal.service.interface";

@Injectable()
export class WuspusMeninggalService implements WuspusMeninggalServiceInterface {
  constructor(
    @InjectRepository(Wuspus) protected readonly wuspusRepository: Repository<Wuspus>,
    @InjectRepository(WuspusMeninggal) protected readonly meninggalIbuhamilRepository: Repository<WuspusMeninggal>
  ) {}

  async findWuspusMeninggalById(wuspusId: string): Promise<Wuspus> {
    const meninggal = await this.wuspusRepository.findOne({ where: { id: wuspusId } });
    if (!meninggal) {
      throw new Error('Meninggal wuspus tidak ditemukan');
    }
    return meninggal;
  }

  async addWuspusMeninggal(wuspusId: string, meninggal: WuspusMeninggal): Promise<WuspusMeninggal> {
    const wuspus = await this.findWuspusMeninggalById(wuspusId);
    const meninggalWuspus = this.meninggalIbuhamilRepository.create({ ...meninggal, wuspus });
    return await this.meninggalIbuhamilRepository.save(meninggalWuspus);
  }
}
