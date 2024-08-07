import { Bayi, BayiPengukuran } from "@app/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BayiPengukuranServiceInterface } from "../../interfaces/bayi-pengukuran.service.interface";
import { PengukuranBayiDTO } from "../../dtos/bayi-pengukuran.dto";

@Injectable()
export class BayiPengukuranService implements BayiPengukuranServiceInterface{
  constructor(
    @InjectRepository(Bayi) protected readonly bayisRepository: Repository<Bayi>,
    @InjectRepository(BayiPengukuran) protected readonly pengukuranBayiRepository: Repository<BayiPengukuran>
  ) {}

  async findBayiById(bayiId: string): Promise<Bayi> {
     const bayi = await this.bayisRepository.findOne({ where: { id: bayiId } });
     if (!bayi) {
       throw new Error('Bayi tidak ditemukan');
     }
     return bayi;
  }

  async addPengukuranBayi(bayiId: string, pengukuran: PengukuranBayiDTO): Promise<BayiPengukuran> {
    const bayi = await this.findBayiById(bayiId);
    const pengukuranBayi = this.pengukuranBayiRepository.create({ ...pengukuran, bayi });
    return await this.pengukuranBayiRepository.save(pengukuranBayi);
  }

  async findPengukuranBayiById(pengukuranId: string) {
    const pengukuran = await this.pengukuranBayiRepository.findOne({ where: { id: pengukuranId } });
    if (!pengukuran) {
      throw new Error('Pengukuran bayi tidak ditemukan');
    }
    return pengukuran;
  }

  async updatePengukuranBayi(id: string, pengukuran: PengukuranBayiDTO): Promise<BayiPengukuran> {
    const found = await this.findPengukuranBayiById(id);
    const updatedPengukuran = this.pengukuranBayiRepository.merge(found, pengukuran);
    return await this.pengukuranBayiRepository.save(updatedPengukuran);
  }
}
