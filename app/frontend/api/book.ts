// File: app/frontend/api/book.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@metagptx/web-sdk';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

// Initialize Upstash Redis & Rate Limiter for Booking Abuse Protection
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// Restrict bookings to 5 attempts per IP per day to prevent spam
const ratelimit = redis ? new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 d'),
  analytics: false,
}) : null;

// Server-side strict schema validation
const bookingSchema = z.object({
  customer_name: z.string().min(3),
  customer_phone: z.string().regex(/^(965)?[569]\d{7}$/),
  customer_email: z.union([z.literal(''), z.string().email()]).optional(),
  device_type: z.string().min(1),
  issue_description: z.string().min(10),
  pickup_date: z.string().min(1),
  pickup_time_slot: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Bot & Spam Protection (Fail Closed Architecture)
    if (!ratelimit) {
      console.error('SECURITY ALERT: Rate Limiter unconfigured for Booking Endpoint.');
      return res.status(503).json({ error: 'Online booking is temporarily unavailable. Please book via WhatsApp.' });
    }

    const ip = (req.headers['x-forwarded-for'] as string) ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      console.warn(`Booking rate limit exceeded for IP: ${ip}`);
      return res.status(429).json({ error: 'You have made too many booking attempts. Please contact us directly on WhatsApp.' });
    }

    // 2. Strict Input Validation
    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid booking data provided.' });
    }
    const data = parsed.data;

    // Initialize Server-Side Database Client (relies on METAGPTX_API_KEY env var)
    const client = createClient();

    // 3. Idempotency Check (Prevent Accidental Double-Bookings)
    // We check if this phone number already booked this exact slot for this device
    const existingBookings = await client.entities.service_bookings.query({
      query: { customer_phone: data.customer_phone }
    });

    if (existingBookings?.data) {
      const isDuplicate = existingBookings.data.some(b => 
        b.pickup_date === data.pickup_date && 
        b.pickup_time_slot === data.pickup_time_slot &&
        b.device_type === data.device_type
      );
      
      if (isDuplicate) {
        return res.status(409).json({ error: 'A booking for this exact device and time slot already exists.' });
      }
    }

    // 4. Secure Database Insertion
    const response = await client.entities.service_bookings.create({
      data: {
        ...data,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    });

    if (!response?.data) {
      throw new Error('Database insertion failed to return data.');
    }

    return res.status(200).json({ success: true, bookingId: response.data.id });

  } catch (error: any) {
    console.error('Booking API Error:', error.message || error);
    return res.status(500).json({ error: 'Internal server error. Please book your repair via WhatsApp.' });
  }
}
