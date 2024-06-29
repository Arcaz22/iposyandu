import { Injectable, NotFoundException } from '@nestjs/common';
import { EventServiceInterface } from './interfaces/event.service.interface';
import { Event } from '@app/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PosyanduService implements EventServiceInterface {
  constructor(
    @InjectRepository(Event) protected readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(newEvent: Event): Promise<Event> {
    const event = this.eventRepository.create({ ...newEvent });
    return this.eventRepository.save(event);
  }

  async findEventById(id: string): Promise<Event> {
    const found = await this.eventRepository.findOne({ where: { id } });
    if(!found) {
      throw new NotFoundException('Event dengan "${id}" tidak ditemukan');
    }
    return found;
  }

  async findEvent(filter: any): Promise<Event[]> {
    const { search, page = 1, pageSize = 10 } = filter;
    const skip = (page - 1) * pageSize;

    const query = this.eventRepository
      .createQueryBuilder('event')

    if (search) {
      query.andWhere('LOWER(event.tanggal) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const event = await query
      .skip(skip)
      .take(pageSize)
      .getMany();

    return event;
  }

  async updateEvent(id: string, updateEvent: Event): Promise<Event> {
    const event = await this.findEventById(id);
    const updatedEvent = await this.eventRepository.save({
      ...event,
      ...updateEvent,
    });

    return updatedEvent;
  }
}
