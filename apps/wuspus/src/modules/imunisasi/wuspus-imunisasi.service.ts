import { Injectable } from "@nestjs/common";
import { WuspusImunisasiServiceInterface } from "../../interfaces/wuspus-imunisasi.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Wuspus, WuspusImunisasi } from "@app/shared";
import { Repository } from "typeorm";
import { WuspusImunisasiDTO } from "../../dtos/wuspus-imunisasi.dto";

@Injectable()
export class WuspusImunisasiService implements WuspusImunisasiServiceInterface {
  constructor(
    @InjectRepository(Wuspus) protected readonly wuspusRepository: Repository<Wuspus>,
    @InjectRepository(WuspusImunisasi) protected readonly imunisasiWuspusRepository: Repository<WuspusImunisasi>
  ) {}

  async findByName(wuspusId: string): Promise<Wuspus> {
    const wuspus = await this.wuspusRepository.findOne({ where: { id: wuspusId } });
    if (!wuspus) {
      throw new Error('Wuspus tidak ditemukan');
    }
    return wuspus;
  }

  async addWuspusImunisasi(wuspusId: string, imunisasi: WuspusImunisasiDTO): Promise<WuspusImunisasi> {
    const wuspus = await this.findByName(wuspusId);
    const imunisasiWuspus = this.imunisasiWuspusRepository.create({ ...imunisasi, wuspus });
    return await this.imunisasiWuspusRepository.save(imunisasiWuspus);
  }

  async findWuspusImunisasiById(wuspusId: string): Promise<WuspusImunisasi> {
    const imunisasi = await this.imunisasiWuspusRepository.findOne({ where: { id: wuspusId } });
    if (!imunisasi) {
      throw new Error('Imunisasi wuspus tidak ditemukan');
    }
    return imunisasi;
  }

  async updateWuspusImunisasi(id: string, imunisasi: WuspusImunisasiDTO): Promise<WuspusImunisasi> {
    const found = await this.findWuspusImunisasiById(id);
    await this.imunisasiWuspusRepository.merge(found, imunisasi);
    return await this.imunisasiWuspusRepository.save(found);
  }

}
