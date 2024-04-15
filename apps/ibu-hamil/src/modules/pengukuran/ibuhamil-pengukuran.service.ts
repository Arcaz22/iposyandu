import { IbuHamil, IbuHamilPengukuran } from "@app/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IbuhamilPengukuranServiceInterface } from "../../interfaces/ibuhamil-pengukuran.service.interface";
import { PengukuranIbuhamilDTO } from "../../dtos/ibuhamil-pengukuran.dto";

@Injectable()
export class IbuhamilPengukuranService implements IbuhamilPengukuranServiceInterface {
  constructor(
    @InjectRepository(IbuHamil) protected readonly ibuhamilRepository: Repository<IbuHamil>,
    @InjectRepository(IbuHamilPengukuran) protected readonly pengukuranIbuhamilRepository: Repository<IbuHamilPengukuran>
  ) {}

  async findIbuhamilById(ibuHamilId: string): Promise<IbuHamil> {
     const ibuhamil = await this.ibuhamilRepository.findOne({ where: { id: ibuHamilId } });
     if (!ibuhamil) {
       throw new Error('Ibu hamil tidak ditemukan');
     }
     return ibuhamil;
  }

  async addPengukuranIbuhamil(ibuHamilId: string, pengukuran: PengukuranIbuhamilDTO): Promise<IbuHamilPengukuran> {
    const ibuHamil = await this.findIbuhamilById(ibuHamilId);
    const pengukuranIbuhamil = this.pengukuranIbuhamilRepository.create({ ...(pengukuran as Partial<IbuHamilPengukuran>), ibuHamil });
    return await this.pengukuranIbuhamilRepository.save(pengukuranIbuhamil);
  }
  

  async findPengukuranIbuhamilById(pengukuranId: string) {
    const pengukuran = await this.pengukuranIbuhamilRepository.findOne({ where: { id: pengukuranId } });
    if (!pengukuran) {
      throw new Error('Pengukuran ibu hamil tidak ditemukan');
    }
    return pengukuran;
  }

  async updatePengukuranIbuhamil(id: string, pengukuran: PengukuranIbuhamilDTO): Promise<IbuHamilPengukuran> {
    const found = await this.findPengukuranIbuhamilById(id);
    const updatedPengukuran = this.pengukuranIbuhamilRepository.merge(found, pengukuran);
    return await this.pengukuranIbuhamilRepository.save(updatedPengukuran);
  }
}
