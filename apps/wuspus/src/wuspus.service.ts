import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wuspus } from "@app/shared";
import { Repository } from "typeorm";
import { WuspusServiceInterface } from "./interfaces/wuspus.service.interface";
import { WuspusDTO } from "./dtos/wuspus.dto";
import { FilterDTO } from "./dtos/filter.dto";

@Injectable()
export class WuspusService implements WuspusServiceInterface {
  constructor(
    @InjectRepository(Wuspus) protected readonly wuspusRepository: Repository<Wuspus>
  ) {}

  async findByName(wuspusDTO: Readonly<WuspusDTO>): Promise<void> {
    const wuspus = await this.wuspusRepository.findOne({
      where: { nama: wuspusDTO.nama }
    })
    if (wuspus) {
      throw new NotFoundException('Nama wuspus sudah ada');
    }
  }

  async createWuspus(newWuspus: Readonly<WuspusDTO>): Promise<Wuspus> {
    await this.findByName(newWuspus);
    const wuspus = this.wuspusRepository.create({ ...newWuspus });
    return this.wuspusRepository.save(wuspus);
  }

  async findWuspusById(id: string): Promise<Wuspus> {
    const found = await this.wuspusRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Wuspus dengan "${id}" tidak ditemukan`);
    }
    return found;
  }

  async findWuspus(filter: Readonly<FilterDTO>): Promise<Wuspus[]> {
    const { search, page = 1, pageSize = 10 } = filter;
    const skip = (page - 1) * pageSize;

    const query = this.wuspusRepository
      .createQueryBuilder('wuspus')
      .leftJoinAndSelect('wuspus.wusPusPemeriksaan', 'wusPusPemeriksaan')
      .leftJoinAndSelect('wuspus.wusPusImunisasi', 'wusPusImunisasi')
      .leftJoinAndSelect('wuspus.wusPusMeninggal', 'wusPusMeninggal');

    if (search) {
      query.andWhere('LOWER(wuspus.nama) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const wuspus = await query
      .skip(skip)
      .take(pageSize)
      .getMany();

    return wuspus;
  }

  async updateWuspus(id: string, wuspusDTO: Readonly<WuspusDTO>): Promise<Wuspus> {
    const exsitingWuspus = await this.findWuspusById(id);
    const updateWuspus = await this.wuspusRepository.save({ ...exsitingWuspus, ...wuspusDTO });
    return updateWuspus;
  }

  async deleteWuspus(id: string): Promise<void> {
    const ibuhamil = await this.findWuspusById(id);
    ibuhamil.deletedAt = new Date();
    await this.wuspusRepository.save(ibuhamil);
  }
}
