import { Bayi, PengukuranBayi } from "@app/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BayiPengukuranServiceInterface } from "../../interfaces/bayi-pengukuran.service.interface";
import { PengukuranBayiDTO } from "../../dtos/bayi-pengukuran.dto";

@Injectable()
export class BayiPengukuranService implements BayiPengukuranServiceInterface{
  constructor(
    @InjectRepository(Bayi) protected readonly bayisRepository: Repository<Bayi>,
    @InjectRepository(PengukuranBayi) protected readonly pengukuranRepository: Repository<PengukuranBayi>
  ) {}

  async findBayiById(bayiId: string): Promise<Bayi> {
     const bayi = await this.bayisRepository.findOne({ where: { id: bayiId } });
     if (!bayi) {
       throw new Error('Bayi tidak ditemukan');
     }
     return bayi;
  }

  async addPengukuranBayi(bayiId: string, pengukuran: PengukuranBayiDTO): Promise<PengukuranBayi> {
    const bayi = await this.findBayiById(bayiId);
    const pengukuranBayi = this.pengukuranRepository.create({ ...pengukuran, bayi });
    return await this.pengukuranRepository.save(pengukuranBayi);
  }

  async findPengukuranBayiById(pengukuranId: string) {
    const pengukuran = await this.pengukuranRepository.findOne({ where: { id: pengukuranId } });
    if (!pengukuran) {
      throw new Error('Pengukuran bayi tidak ditemukan');
    }
    return pengukuran;
  }

  async updatePengukuranBayi(id: string, pengukuran: PengukuranBayiDTO): Promise<PengukuranBayi> {
    const found = await this.findPengukuranBayiById(id);
    const updatedPengukuran = this.pengukuranRepository.merge(found, pengukuran);
    return await this.pengukuranRepository.save(updatedPengukuran);
  }
}
