import { IbuHamil } from '@app/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IbuHamilDTO } from './dtos/ibuhamil.dto';
import { IbuhamilServiceInterface } from './interfaces/ibuhamil.service.interface';
import { FilterDTO } from './dtos/filter.dto';

@Injectable()
export class IbuHamilService implements IbuhamilServiceInterface {
  constructor(
    @InjectRepository(IbuHamil) protected readonly ibuhamilRepository: Repository<IbuHamil>,
  ) {}

  async findByName(ibuhamilDTO: Readonly<IbuHamilDTO>): Promise<void> {
    const ibuhamil = await this.ibuhamilRepository.findOne({
      where: { nama: ibuhamilDTO.nama },
    });
    if (ibuhamil) {
      throw new NotFoundException('Nama ibu hamil sudah ada');
    }
  }

  async createIbuhamil(newIbuhamil: IbuHamilDTO): Promise<IbuHamil> {
    await this.findByName(newIbuhamil);

    const hphtDate = new Date(newIbuhamil.hpht);
    const taksiranPersalinanDate = new Date(hphtDate.getTime() + (90 * 24 * 60 * 60 * 1000));
  
    newIbuhamil.taksiran_persalinan = taksiranPersalinanDate;
  
    const ibuhamil = this.ibuhamilRepository.create({ ...newIbuhamil });
    return this.ibuhamilRepository.save(ibuhamil);
  }

  async findIbuhamilById(id: string): Promise<IbuHamil> {
    const found = await this.ibuhamilRepository.findOne({ where: { id } });
    if(!found) {
      throw new NotFoundException('Ibu Hamil dengan "${id}" tidak ditemukan');
    }
    return found;
  }

  async findIbuhamil(filter: FilterDTO): Promise<IbuHamil[]> {
    const { search, page = 1, pageSize = 10 } = filter;
    const skip = (page - 1) * pageSize;

    const query = this.ibuhamilRepository
      .createQueryBuilder('ibuhamil')
      .leftJoinAndSelect('ibuhamil.pengukuranIbuHamil', 'pengukuranIbuHamil')
      .leftJoinAndSelect('ibuhamil.imunisasiIbuHamil', 'imunisasiIbuHamil')
      .leftJoinAndSelect('ibuhamil.persalinanIbuHamil', 'persalinanIbuHamil')
      .leftJoinAndSelect('ibuhamil.ibuHamilMeninggal', 'ibuHamilMeninggal')

    if (search) {
      query.andWhere('LOWER(ibuhamil.nama) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const ibuhamil = await query
      .skip(skip)
      .take(pageSize)
      .getMany();

    return ibuhamil;
  }

  async updateIbuhamil(id: string, ibuhamil: Readonly<IbuHamilDTO>): Promise<IbuHamil> {
    const existingIbuhamil = await this.findIbuhamilById(id);
    
    const updatedIbuhamil = await this.ibuhamilRepository.save({
      ...existingIbuhamil,
      ...ibuhamil
    });

    return updatedIbuhamil;
  }

  async deleteIbuhamil(id: string): Promise<void> {
    const ibuhamil = await this.findIbuhamilById(id);
    ibuhamil.deletedAt = new Date();
    await this.ibuhamilRepository.save(ibuhamil);
  }

  async test() {
    return "Coba service ibu hamil"
  }
}
