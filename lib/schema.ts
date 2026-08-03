// src/lib/schema.ts
import { z } from 'zod';

export const ItinerarySchema = z.object({
  destination: z.string(),
  budget: z.string(),
  days: z.array(
    z.object({
      dayNumber: z.number(),
      theme: z.string(),
      activities: z.array(
        z.object({
          time: z.string(),
          placeName: z.string(),
          description: z.string(),
          type: z.enum(['attraction', 'restaurant', 'hotel']),
          coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
          }),
        })
      ),
    })
  ),
});

export type Itinerary = z.infer<typeof ItinerarySchema>;