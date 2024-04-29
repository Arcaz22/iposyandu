import { Event } from "@app/shared";
import { FilterDTO } from "../dtos/filter.dto";

export interface EventServiceInterface {
  createEvent(newEvent: Readonly<Event>): Promise<Event>;
  findEventById(id: string): Promise<Event>;
  findEvent(filter: Readonly<FilterDTO>): Promise<Event[]>;
  updateEvent(id: string, updateEvent: Readonly<Event>): Promise<Event>;
}
