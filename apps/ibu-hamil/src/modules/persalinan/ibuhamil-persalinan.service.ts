import { Injectable } from "@nestjs/common";
import { IbuhamilPersalinanServiceInterface } from "../../interfaces/ibuhamil-persalinan.service.interface";
import { IbuHamil, IbuHamilPersalinan } from "@app/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IbuhamilPersalinanDTO } from "../../dtos/ibuhamil-persalinan.dto";

@Injectable()
export class IbuhamilPersalinanService implements IbuhamilPersalinanServiceInterface {
  constructor(
    @InjectRepository(IbuHamil) protected readonly ibuhamilRepository: Repository<IbuHamil>,
    @InjectRepository(IbuHamilPersalinan) protected readonly persalinanIbuhamilRepository: Repository<IbuHamilPersalinan>
  ) {}

  async findIbuhamilById(ibuHamilId: string): Promise<IbuHamil> {
    const ibuhamil = await this.ibuhamilRepository.findOne({ where: { id: ibuHamilId } });
    if (!ibuhamil) {
      throw new Error('Ibu hamil tidak ditemukan');
    }
    return ibuhamil;
  }

  async addPersalinanIbuhamil(ibuHamilId: string, persalinan: IbuhamilPersalinanDTO): Promise<IbuHamilPersalinan> {
    const ibuHamil = await this.findIbuhamilById(ibuHamilId);
    const persalinanIbuhamil = this.persalinanIbuhamilRepository.create({ ...persalinan, ibuHamil });
    return await this.persalinanIbuhamilRepository.save(persalinanIbuhamil);
  }

  async findPersalinanIbuhamilById(persalinanId: string) {
    const persalinan = await this.persalinanIbuhamilRepository.findOne({ where: { id: persalinanId } });
    if (!persalinan) {
      throw new Error('Persalinan ibu hamil tidak ditemukan');
    }
    return persalinan;
  }

  async updatePersalinanIbuhamil(id: string, persalinan: IbuhamilPersalinanDTO): Promise<IbuHamilPersalinan> {
    const found = await this.findPersalinanIbuhamilById(id);
    const updatedPersalinan = this.persalinanIbuhamilRepository.merge(found, persalinan);
    return await this.persalinanIbuhamilRepository.save(updatedPersalinan);
  }
}
