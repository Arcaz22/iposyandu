import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wuspus, WuspusPemeriksaan } from "@app/shared";
import { Repository } from "typeorm";
import { WuspusPemeriksaanServiceInterface } from "../../interfaces/wuspus-pemeriksaan.service.interface";
import { WuspusPemeriksaanDTO } from "../../dtos/wuspus-pemeriksaan.dto";

@Injectable()
export class WuspusPemeriksaanService implements WuspusPemeriksaanServiceInterface {
  constructor(
    @InjectRepository(Wuspus) protected readonly wuspusRepository: Repository<Wuspus>,
    @InjectRepository(WuspusPemeriksaan) protected readonly pemeriksaanWuspusRepository: Repository<WuspusPemeriksaan>
  ) {}

  async findByName(wuspusId: string): Promise<Wuspus> {
    const wuspus = await this.wuspusRepository.findOne({ where: { id: wuspusId } });
    if (!wuspus) {
      throw new Error('Wuspus tidak ditemukan');
    }
    return wuspus;
  }

  async addWuspusPemeriksaan(wuspusId: string, pemeriksaan: WuspusPemeriksaanDTO): Promise<WuspusPemeriksaan> {
    const wuspus = await this.findByName(wuspusId);
    const pemeriksaanWuspus = this.pemeriksaanWuspusRepository.create({ ...pemeriksaan, wuspus });
    return await this.pemeriksaanWuspusRepository.save(pemeriksaanWuspus);
  }

  async findWuspusPemeriksaanById(wuspusId: string): Promise<WuspusPemeriksaan> {
    const pemeriksaan = await this.pemeriksaanWuspusRepository.findOne({ where: { id: wuspusId } });
    if (!pemeriksaan) {
      throw new Error('Pemeriksaan wuspus tidak ditemukan');
    }
    return pemeriksaan;
  }

  async updateWuspusPemeriksaan(id: string, pemeriksaan: WuspusPemeriksaanDTO): Promise<WuspusPemeriksaan> {
    const found = await this.findWuspusPemeriksaanById(id);
    await this.pemeriksaanWuspusRepository.merge(found, pemeriksaan);
    return await this.pemeriksaanWuspusRepository.save(found);
  }

}
