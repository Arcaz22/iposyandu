import { Bayi, BayiMeninggal } from "@app/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BayiMeninggalServiceInterface } from "../../interfaces/bayi-meninggal.service.interface";
import { BayiMeninggalDTO } from "../../dtos/bayi-meninggal.dto";

@Injectable()
export class BayiMeninggalService implements BayiMeninggalServiceInterface {
  constructor(
    @InjectRepository(Bayi) protected readonly bayisRepository: Repository<Bayi>,
    @InjectRepository(BayiMeninggal) protected readonly meninggalBayiRepository: Repository<BayiMeninggal>
  ) {}

  async findBayiById(bayiId: string): Promise<Bayi>{
     const bayi = await this.bayisRepository.findOne({ where: { id: bayiId } });
     if (!bayi) {
       throw new Error('Bayi tidak ditemukan');
     }
     return bayi;
  }

  async addMeninggalBayi(bayiId: string, meninggal: BayiMeninggalDTO): Promise<BayiMeninggal> {
    const bayi = await this.findBayiById(bayiId)
    const bayiMeninggal = this.meninggalBayiRepository.create({ ...meninggal, bayi });
    return await this.meninggalBayiRepository.save(bayiMeninggal);
  }
}
