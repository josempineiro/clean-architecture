import { Event } from '@/core/domain/entities/event';

export interface NavigationEventPayload {
  path: string;
}

export type NavigationEvent = Event<NavigationEventPayload>;