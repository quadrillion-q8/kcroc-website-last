import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, Laptop, PenTool, Phone, User, CheckCircle } from 'lucide-react';

// 1. Define Kuwait-specific validation schema using Zod
const bookingSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  phone: z.string().regex(/^[569]\d{7}$/, { 
    message: 'Must be a valid 8-digit Kuwait phone number starting with 5, 6, or 9' 
  }),
  deviceType: z.enum(['macbook', 'laptop', 'gaming-pc', 'data-recovery', 'other'], {
    errorMap: () => ({ message: 'Please select your device type' }),
  }),
  issueDescription: z.string().min(10, { message: 'Please provide a brief description (min 10 characters)' }),
  appointmentDate: z.string().min(1, { message: 'Please select a preferred date' }),
  timeSlot: z.enum(['morning', 'afternoon', 'evening'], {
    errorMap: () => ({ message: 'Please select a preferred time slot' }),
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    // 2. Format a professional WhatsApp intake manifest
    const whatsappNumber = '965XXXXXXXX'; // Replace with your actual company WhatsApp number
    
    const textManifest = `*NEW REPAIR BOOKING*\n` +
      `---------------------------\n` +
      `👤 *Client:* ${data.fullName}\n` +
      `📞 *Phone:* +965 ${data.phone}\n` +
      `💻 *Device:* ${data.deviceType.toUpperCase().replace('-', ' ')}\n` +
      `🗓️ *Date:* ${data.appointmentDate}\n` +
      `⏰ *Slot:* ${data.timeSlot.toUpperCase()}\n` +
      `---------------------------\n` +
      `📝 *Issue Details:*\n${data.issueDescription}`;

    const encodedText = encodeURIComponent(textManifest);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // 3. Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Book a Repair Service</h2>
        <p className="text-sm text-gray-500 mt-1">Fill out the details below to instantly send us your service request.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              {...register('fullName')}
              type="text"
              placeholder="John Doe"
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kuwait Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium border-r pr-2 border-gray-200">+965</span>
            <input
              {...register('phone')}
              type="tel"
              placeholder="6XXXXXXX"
              className={`w-full pl-24 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Device Type & Appointment Date Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Device Type</label>
            <div className="relative">
              <Laptop className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                {...register('deviceType')}
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 transition-all ${
                  errors.deviceType ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                }`}
              >
                <option value="">Select Device</option>
                <option value="macbook">MacBook Repair</option>
                <option value="laptop">Windows Laptop Repair</option>
                <option value="gaming-pc">Gaming PC Build/Repair</option>
                <option value="data-recovery">Data Recovery</option>
                <option value="other">Other Gadget</option>
              </select>
            </div>
            {errors.deviceType && <p className="text-xs text-red-500 mt-1">{errors.deviceType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                {...register('appointmentDate')}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.appointmentDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                }`}
              />
            </div>
            {errors.appointmentDate && <p className="text-xs text-red-500 mt-1">{errors.appointmentDate.message}</p>}
          </div>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time Window</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              {...register('timeSlot')}
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 transition-all ${
                errors.timeSlot ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
              }`}
            >
              <option value="">Select Time Slot</option>
              <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
              <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
              <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
            </select>
          </div>
          {errors.timeSlot && <p className="text-xs text-red-500 mt-1">{errors.timeSlot.message}</p>}
        </div>

        {/* Issue Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Describe the Issue</label>
          <div className="relative">
            <PenTool className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <textarea
              {...register('issueDescription')}
              rows={3}
              placeholder="Example: My MacBook screen is flickering or my gaming PC turns on but gives no display..."
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.issueDescription ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.issueDescription && <p className="text-xs text-red-500 mt-1">{errors.issueDescription.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
        >
          <CheckCircle className="w-4 h-4" />
          {isSubmitting ? 'Processing...' : 'Confirm Intake via WhatsApp'}
        </button>
      </form>
    </div>
  );
}
