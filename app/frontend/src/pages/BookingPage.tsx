import { useState, useEffect } from 'react';
import { createClient } from '@metagptx/web-sdk';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Laptop, Phone, Mail, User, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

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

  const handleWhatsAppConfirm = () => {
    const timeSlotLabel = TIME_SLOTS.find((t) => t.value === form.pickup_time_slot)?.label || form.pickup_time_slot;
    const message = encodeURIComponent(
      `Hi KCROC! I just booked a service:\n` +
      `📱 Device: ${form.device_type}\n` +
      `🔧 Issue: ${form.issue_description}\n` +
      `📅 Pickup: ${form.pickup_date} (${timeSlotLabel})\n` +
      `👤 Name: ${form.customer_name}\n` +
      `📞 Phone: ${form.customer_phone}\n` +
      `Please confirm my booking. Thank you!`
    );
    window.open(`https://wa.me/96555301913?text=${message}`, '_blank');
  };

  const handleEmailConfirm = () => {
    const timeSlotLabel = TIME_SLOTS.find((t) => t.value === form.pickup_time_slot)?.label || form.pickup_time_slot;
    const subject = encodeURIComponent('KCROC Service Booking Confirmation');
    const body = encodeURIComponent(
      `Dear ${form.customer_name},\n\n` +
      `Thank you for booking a service with KCROC Kuwait Computer Repair On Call!\n\n` +
      `Here are your booking details:\n\n` +
      `📱 Device: ${form.device_type}\n` +
      `🔧 Issue: ${form.issue_description}\n` +
      `📅 Pickup Date: ${form.pickup_date}\n` +
      `⏰ Time Slot: ${timeSlotLabel}\n` +
      `👤 Name: ${form.customer_name}\n` +
      `📞 Phone: ${form.customer_phone}\n\n` +
      `We will contact you shortly to confirm your appointment.\n\n` +
      `For any questions, contact us:\n` +
      `📞 Phone: +965 5530 1913\n` +
      `💬 WhatsApp: https://wa.me/96555301913\n\n` +
      `Best regards,\n` +
      `KCROC Team\n` +
      `Kuwait Computer Repair On Call`
    );
    window.open(`mailto:${form.customer_email}?subject=${subject}&body=${body}`, '_self');
  };

  const handleNewBooking = () => {
    setForm(initialForm);
    setSubmitted(false);
    setError('');
  };

  useEffect(() => {
    if (submitted) {
      document.title = 'Booking Confirmed - KCROC Kuwait Computer Repair';
    } else {
      document.title = 'Book a Service - KCROC Kuwait Computer Repair On Call';
    }
  }, [submitted]);

  if (submitted) {
    return (
      <>
        <div className="hero" style={{ minHeight: 'auto', padding: '120px 2rem 4rem' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #059669, #10b981)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle size={40} color="white" />
            </div>
            <h1 style={{ fontSize: '2rem', color: '#065f46', marginBottom: '1rem' }}>
              Booking Submitted! ✅
            </h1>
            <p style={{ color: '#4b5563', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              Thank you, <strong>{form.customer_name}</strong>! Your service booking has been received.
              We'll contact you shortly to confirm your appointment.
            </p>

            <div
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'left',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ color: '#065f46', marginBottom: '1rem', fontSize: '1.1rem' }}>
                📋 Booking Summary
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280', fontWeight: 500 }}>Device</span>
                  <span style={{ color: '#1f2937', fontWeight: 600 }}>{form.device_type}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280', fontWeight: 500 }}>Issue</span>
                  <span style={{ color: '#1f2937', fontWeight: 600, maxWidth: '60%', textAlign: 'right' }}>{form.issue_description}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280', fontWeight: 500 }}>Pickup Date</span>
                  <span style={{ color: '#1f2937', fontWeight: 600 }}>{form.pickup_date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontWeight: 500 }}>Time Slot</span>
                  <span style={{ color: '#1f2937', fontWeight: 600 }}>
                    {TIME_SLOTS.find((t) => t.value === form.pickup_time_slot)?.label || form.pickup_time_slot}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={handleWhatsAppConfirm}
                className="btn btn-success"
                style={{ width: '100%', maxWidth: '400px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Confirm via WhatsApp
              </button>
              {form.customer_email && (
                <button
                  onClick={handleEmailConfirm}
                  className="btn"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Mail size={20} />
                  Email Booking Confirmation
                </button>
              )}
              <button
                onClick={handleNewBooking}
                className="btn btn-emerald"
                style={{ width: '100%', maxWidth: '400px' }}
              >
                Book Another Service
              </button>
              <a href="/" className="btn btn-primary" style={{ width: '100%', maxWidth: '400px', textDecoration: 'none' }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="hero" style={{ minHeight: 'auto', padding: '120px 2rem 3rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="urgency-badge">🔧 Book Your Repair Service</div>
          <h1 style={{ fontSize: '2.5rem', color: '#065f46', marginBottom: '0.75rem' }}>
            Schedule a Service
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Fill out the form below and we'll arrange a convenient pickup time.
            Same-day service available for urgent repairs!
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <section style={{ background: '#f9fafb', padding: '3rem 0 5rem' }}>
        <div className="container">
          <form
            onSubmit={handleSubmit}
            className="quote-form"
            style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          >
            <h3 style={{ textAlign: 'center', color: '#065f46', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
              📋 Service Booking Form
            </h3>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Fields marked with <span style={{ color: '#dc2626' }}>*</span> are required
            </p>

            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Customer Name */}
            <div className="form-group">
              <label htmlFor="customer_name">
                <User size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Full Name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="customer_name"
                name="customer_name"
                type="text"
                placeholder="e.g. Ahmed Al-Sabah"
                value={form.customer_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="customer_phone">
                <Phone size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Phone Number <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="customer_phone"
                name="customer_phone"
                type="tel"
                placeholder="e.g. +965 5530 1913"
                value={form.customer_phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="customer_email">
                <Mail size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Email Address <span style={{ color: '#6b7280', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                id="customer_email"
                name="customer_email"
                type="email"
                placeholder="e.g. ahmed@example.com"
                value={form.customer_email}
                onChange={handleChange}
              />
            </div>

            {/* Device Type */}
            <div className="form-group">
              <label htmlFor="device_type">
                <Laptop size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Device Type <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                id="device_type"
                name="device_type"
                value={form.device_type}
                onChange={handleChange}
                required
              >
                <option value="">Select your device…</option>
                {DEVICE_TYPES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Description */}
            <div className="form-group">
              <label htmlFor="issue_description">
                <MessageSquare size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Describe the Issue <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <textarea
                id="issue_description"
                name="issue_description"
                placeholder="e.g. Laptop won't turn on, screen is cracked, overheating…"
                value={form.issue_description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {/* Pickup Date */}
            <div className="form-group">
              <label htmlFor="pickup_date">
                <Calendar size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Preferred Pickup Date <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="pickup_date"
                name="pickup_date"
                type="date"
                min={getTodayDate()}
                value={form.pickup_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time Slot */}
            <div className="form-group">
              <label htmlFor="pickup_time_slot">
                <Clock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Preferred Time Slot <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                id="pickup_time_slot"
                name="pickup_time_slot"
                value={form.pickup_time_slot}
                onChange={handleChange}
                required
              >
                <option value="">Select a time slot…</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-base"
              style={{ marginTop: '1rem', minHeight: '50px' }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Booking Request
                </>
              )}
            </Button>

            {/* Info note */}
            <p
              style={{
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.8rem',
                marginTop: '1rem',
                lineHeight: 1.5,
              }}
            >
              After submitting, you'll have the option to confirm via WhatsApp.
              <br />
              Or call us directly at{' '}
              <a href="tel:+96555301913" style={{ color: '#059669', fontWeight: 600 }}>
                +965 5530 1913
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}