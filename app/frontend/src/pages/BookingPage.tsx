import { useState } from 'react';
import { createClient } from '@metagptx/web-sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Laptop, Phone, Mail, User, MessageSquare, CheckCircle, Loader2, MessageCircle, Truck, Shield } from 'lucide-react';

const client = createClient();

const DEVICE_TYPES = [
  'Laptop',
  'Desktop PC',
  'MacBook / iMac',
  'Gaming PC',
  'Printer / Scanner',
  'Other',
];

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning (10:00 AM – 1:00 PM)' },
  { value: 'afternoon', label: 'Afternoon (1:00 PM – 5:00 PM)' },
  { value: 'evening', label: 'Evening (5:00 PM – 10:00 PM)' },
];

interface BookingForm {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  device_type: string;
  issue_description: string;
  pickup_date: string;
  pickup_time_slot: string;
}

const initialForm: BookingForm = {
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  device_type: '',
  issue_description: '',
  pickup_date: '',
  pickup_time_slot: '',
};

export default function BookingPage() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !form.customer_name ||
      !form.customer_phone ||
      !form.device_type ||
      !form.issue_description ||
      !form.pickup_date ||
      !form.pickup_time_slot
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await client.entities.service_bookings.create({
        data: {
          customer_name: form.customer_name,
          customer_phone: form.customer_phone,
          customer_email: form.customer_email || '',
          device_type: form.device_type,
          issue_description: form.issue_description,
          pickup_date: form.pickup_date,
          pickup_time_slot: form.pickup_time_slot,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      });

      if (response?.data) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or call us directly.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setError('Failed to submit booking. Please try again or contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
        <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl max-w-lg w-full">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Thank you, <strong className="text-white">{form.customer_name}</strong>! Your repair booking has been submitted. 
              We'll contact you on <strong className="text-cyan-400">{form.customer_phone}</strong> to confirm pickup details.
            </p>
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6 text-left">
              <p className="text-gray-400 text-sm mb-1">Pickup Date:</p>
              <p className="text-white font-medium">{form.pickup_date}</p>
              <p className="text-gray-400 text-sm mt-2 mb-1">Time Slot:</p>
              <p className="text-white font-medium">
                {TIME_SLOTS.find(t => t.value === form.pickup_time_slot)?.label}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex-1">
                <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button 
                onClick={() => { setSubmitted(false); setForm(initialForm); }}
                className="border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl bg-transparent flex-1"
              >
                Book Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2">
            📅 Book a Repair
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Free Pickup</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fill in the form below and we'll arrange a free pickup from your location. Same-day diagnostics available.
          </p>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-900/40 border border-gray-800/80 rounded-xl p-4">
              <Truck className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-white font-semibold text-sm">Free Pickup</p>
                <p className="text-gray-400 text-xs">All Kuwait areas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-900/40 border border-gray-800/80 rounded-xl p-4">
              <Clock className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-white font-semibold text-sm">Same-Day Diagnostics</p>
                <p className="text-gray-400 text-xs">Fast turnaround</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-900/40 border border-gray-800/80 rounded-xl p-4">
              <Shield className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-white font-semibold text-sm">90-Day Warranty</p>
                <p className="text-gray-400 text-xs">On all repairs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Booking Details</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="customer_name"
                      autoComplete="name"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="customer_phone"
                      autoComplete="tel"
                      value={form.customer_phone}
                      onChange={handleChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                      placeholder="+965 XXXX XXXX"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    name="customer_email"
                    autoComplete="email"
                    value={form.customer_email}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Device Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    Device Type *
                  </label>
                  <select
                    name="device_type"
                    value={form.device_type}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="" className="bg-gray-900">Select device type...</option>
                    {DEVICE_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-gray-900">{type}</option>
                    ))}
                  </select>
                </div>

                {/* Issue Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    Describe the Issue *
                  </label>
                  <Textarea
                    name="issue_description"
                    value={form.issue_description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                    placeholder="Describe the problem you're experiencing (e.g., laptop won't turn on, screen flickering, slow performance...)"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      Preferred Pickup Date *
                    </label>
                    <Input
                      type="date"
                      name="pickup_date"
                      value={form.pickup_date}
                      onChange={handleChange}
                      min={getTodayDate()}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white rounded-xl [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      Preferred Time Slot *
                    </label>
                    <select
                      name="pickup_time_slot"
                      value={form.pickup_time_slot}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="" className="bg-gray-900">Select time slot...</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value} className="bg-gray-900">{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={submitting}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-6 text-lg disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Book Free Pickup
                    </>
                  )}
                </Button>

                {/* Alternative Contact */}
                <div className="text-center pt-4 border-t border-gray-800">
                  <p className="text-gray-400 text-sm mb-3">Prefer to book directly?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="sm" className="border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl bg-transparent">
                      <a href="tel:+96555301913">
                        <Phone className="w-4 h-4 mr-2" />
                        Call: +965 5530 1913
                      </a>
                    </Button>
                    <Button asChild size="sm" className="border border-green-500/50 text-green-400 hover:bg-green-500/10 rounded-xl bg-transparent">
                      <a href="https://wa.me/96555301913?text=Hi! I'd like to book a repair pickup." target="_blank" rel="noopener">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}