import { Injectable } from "@nestjs/common";
import { IbuhamilImunisasiServiceInterface } from "../../interfaces/ibuhamil-imunisasi.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { IbuHamil, IbuHamilImunisasi } from "@app/shared";
import { Repository } from "typeorm";
import { ImunisasiIbuhamilDTO } from "../../dtos/ibuhamil-imunisasi.dto";

@Injectable()
export class IbuhamilImunisasiService implements IbuhamilImunisasiServiceInterface {
  constructor(
    @InjectRepository(IbuHamil) protected readonly ibuhamilRepository: Repository<IbuHamil>,
    @InjectRepository(IbuHamilImunisasi) protected readonly imunisasiIbuhamilRepository: Repository<IbuHamilImunisasi>
  ) {}

  async findIbuhamilById(ibuHamilId: string): Promise<IbuHamil> {
    const ibuhamil = await this.ibuhamilRepository.findOne({ where: { id: ibuHamilId } });
    if (!ibuhamil) {
      throw new Error('Ibu hamil tidak ditemukan');
    }
    return ibuhamil;
  }

  async addImunisasiIbuhamil(ibuHamilId: string, imunisasi: ImunisasiIbuhamilDTO): Promise<IbuHamilImunisasi> {
    const ibuHamil = await this.findIbuhamilById(ibuHamilId);
    const imunisasiIbuhamil = this.imunisasiIbuhamilRepository.create({ ...imunisasi, ibuHamil });
    return await this.imunisasiIbuhamilRepository.save(imunisasiIbuhamil);
  }

  async findImunisasiIbuhamilById(imunisasiId: string) {
    const imunisasi = await this.imunisasiIbuhamilRepository.findOne({ where: { id: imunisasiId } });
    if (!imunisasi) {
      throw new Error('Imunisasi ibu hamil tidak ditemukan');
    }
    return imunisasi;
  }

  async updateImunisasiIbuhamil(imunisasiId: string, imunisasi: ImunisasiIbuhamilDTO) {
    const ibuHamil = await this.findImunisasiIbuhamilById(imunisasiId);
    const updatedImunisasi = this.imunisasiIbuhamilRepository.merge(ibuHamil, imunisasi);
    return await this.imunisasiIbuhamilRepository.save(updatedImunisasi);
  }
}
