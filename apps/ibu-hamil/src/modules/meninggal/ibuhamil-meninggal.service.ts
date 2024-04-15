import { Injectable } from "@nestjs/common";
import { IbuhamilMeninggalServiceInterface } from "../../interfaces/ibuhamil-meninggal.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { IbuHamil, IbuHamilMeninggal } from "@app/shared";
import { Repository } from "typeorm";
import { IbuHamilMeninggalDTO } from "../../dtos/ibuhamil-meninggal.dto";

@Injectable()
export class IbuhamilMeninggalService implements IbuhamilMeninggalServiceInterface {
  constructor(
    @InjectRepository(IbuHamil) protected readonly ibuhamilRepository: Repository<IbuHamil>,
    @InjectRepository(IbuHamilMeninggal) protected readonly meninggalIbuhamilRepository: Repository<IbuHamilMeninggal>
  ) {}

  async findIbuhamilById(ibuHamilId: string): Promise<IbuHamil> {
    const ibuhamil = await this.ibuhamilRepository.findOne({ where: { id: ibuHamilId } });
    if (!ibuhamil) {
      throw new Error('Ibu hamil tidak ditemukan');
    }
    return ibuhamil;
  }

  async addMeninggalIbuhamil(ibuHamilId: string, meninggal: IbuHamilMeninggalDTO): Promise<IbuHamilMeninggal> {
    const ibuHamil = await this.findIbuhamilById(ibuHamilId);
    const meninggalIbuhamil = this.meninggalIbuhamilRepository.create({ ...meninggal, ibuHamil });
    return await this.meninggalIbuhamilRepository.save(meninggalIbuhamil);
  }
}
