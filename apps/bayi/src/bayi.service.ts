import { Injectable, NotFoundException } from '@nestjs/common';
import { BayiDTO } from './dtos/bayi.dto';
import { BasedExcel, Bayi } from '@app/shared';
import { FilterDTO } from './dtos/filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BayiServiceInterface } from './interfaces/bayi.service.interface';
import { Buffer } from 'buffer';

@Injectable()
export class BayiService implements BayiServiceInterface {
  constructor(
    @InjectRepository(Bayi) protected readonly bayisRepository: Repository<Bayi>,
  ) {}

  async findByName(bayiDTO: Readonly<BayiDTO>): Promise<void> {
    const bayi = await this.bayisRepository.findOne({
      where: { nama: bayiDTO.nama },
    });
    if (bayi) {
      throw new NotFoundException('Nama bayi sudah ada');
    }
  }

  async createBayi(newBayi: Readonly<BayiDTO>): Promise<Bayi> {
    await this.findByName(newBayi);
    const bayi = this.bayisRepository.create({ ...newBayi });
    return this.bayisRepository.save(bayi);
  }

  async findBayiById(id: string): Promise<Bayi> {
    const found = await this.bayisRepository.findOne({ where: { id } });
    if(!found) {
      throw new NotFoundException('Bayi dengan "${id}" tidak ditemukan');
    }
    return found;
  }

  async findBayi(filter: FilterDTO): Promise<Bayi[]> {
    const { search, page = 1, pageSize = 10 } = filter;
    const skip = (page - 1) * pageSize;

    const query = this.bayisRepository
      .createQueryBuilder('bayi')
      .leftJoinAndSelect('bayi.bayiPengukuran', 'bayiPengukuran')
      .leftJoinAndSelect('bayi.bayiImunisasi', 'bayiImunisasi')
      .leftJoinAndSelect('bayi.bayiMeninggal', 'bayiMeninggal')

    if (search) {
      query.andWhere('LOWER(bayi.nama) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const bayi = await query
      .skip(skip)
      .take(pageSize)
      .getMany();

    return bayi;
  }

  async updateBayi(id: string, bayi: Readonly<BayiDTO>): Promise<Bayi> {
    const existingBayi = await this.findBayiById(id);
    
    const updatedBayi = await this.bayisRepository.save({
      ...existingBayi,
      ...bayi
    });

    return updatedBayi;
  }

  async deleteBayi(id: string): Promise<void> {
    const bayi = await this.findBayiById(id);
    bayi.deletedAt = new Date();
    await this.bayisRepository.save(bayi);
  }

  async exportBayi(): Promise<any> {
    try {
      const basedExcel = new BasedExcel('Laporan');
  
      const headerRows = [
        'PEMERINTAH KOTA BANDUNG',
        'DINAS KESEHATAN',
        'UPTD PUSKESMAS XYZ',
      ];
      basedExcel.addHeader(headerRows);
  
      const details = [
        { title: 'Nama Pekerjaan', value: 'Pelayanan Posyandu Kader' },
        { title: 'Kegiatan / Penyedia', value: 'Bantuan Operasional Kesehatan Puskesmas XYZ' },
        { title: 'Tanggal Pelaksanaan', value: '1 Januari 2024' },
        { title: 'Lokasi', value: 'Puskesmas XYZ' },
        { title: 'Hasil Kunjungan', value: '' }
      ];
      basedExcel.addDetails(details);
  
      basedExcel.addSpacing();
  
      const bayiData = await this.findBayi({ page: 1, pageSize: 10 });
      basedExcel.addData(bayiData);
  
      basedExcel.addOfficerDetails();
  
      const buffer = await basedExcel.saveAsBuffer();
  
      return buffer.toJSON();
    } catch (error) {
      console.log('Failed to export data to Excel buffer', BayiService.name);
      throw error;
    }
  }
  
  
}
