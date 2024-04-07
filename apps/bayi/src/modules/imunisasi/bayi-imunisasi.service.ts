import { Bayi, ImunisasiBayi, PengukuranBayi } from "@app/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BayiImunisasiServiceInterface } from "../../interfaces/bayi-imunisasi.service.interface";
import { ImunisasiBayiDTO } from "../../dtos/bayi-imunisasi.dto";

@Injectable()
export class BayiImunisasiService implements BayiImunisasiServiceInterface {
  constructor(
    @InjectRepository(Bayi) protected readonly bayisRepository: Repository<Bayi>,
    @InjectRepository(ImunisasiBayi) protected readonly imunisasiBayiRepository: Repository<ImunisasiBayi>
  ) {}

  async findBayiById(bayiId: string): Promise<Bayi>{
     const bayi = await this.bayisRepository.findOne({ where: { id: bayiId } });
     if (!bayi) {
       throw new Error('Bayi tidak ditemukan');
     }
     return bayi;
  }

  async addImunisasiBayi(bayiId: string, imunisasi: ImunisasiBayiDTO): Promise<ImunisasiBayi> {
    const bayi = await this.findBayiById(bayiId);
    const newImunisasi = this.imunisasiBayiRepository.create({ ...imunisasi, bayi });
    return await this.imunisasiBayiRepository.save(newImunisasi);
  }

  async findImunisasiBayiById(imunisasiId: string): Promise<ImunisasiBayi>{
    const imunisasi = await this.imunisasiBayiRepository.findOne({ where: { id: imunisasiId } });
    if (!imunisasi) {
      throw new Error('Imunisasi bayi tidak ditemukan');
    }
    return imunisasi;
  }

  async updateImunisasiBayi(id: string, imunisasi: ImunisasiBayiDTO): Promise<ImunisasiBayi> {
    const found = await this.findImunisasiBayiById(id);
    const updatedImunisasi = this.imunisasiBayiRepository.merge(found, imunisasi);
    return await this.imunisasiBayiRepository.save(updatedImunisasi);
  }
}
