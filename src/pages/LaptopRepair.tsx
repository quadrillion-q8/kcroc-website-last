import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LaptopRepair = () => {
  useEffect(() => {
    document.title = 'Laptop Repair Kuwait | All Brands Fixed – Free Pickup – KCROC';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Expert laptop repair in Kuwait for all brands. Screen, battery, keyboard, Windows reinstall & more. Free pickup across Kuwait. تصليح لاب توب الكويت.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/laptop-repair');
    return () => {
      document.title = 'Computer Repair Kuwait | MacBook & Laptop Repair – Free Pickup – KCROC';
      if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/');
    };
  }, []);

  return (
    <div className="service-page">
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '80px 20px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💻</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>
            Laptop Repair Kuwait
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '8px' }}>
            تصليح لاب توب في الكويت – All brands repaired with free pickup across Kuwait
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: '32px' }}>
            HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware, Samsung, Toshiba & more
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+96555301913" style={{ background: '#3b82f6', color: 'white', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Call +965 5530 1913</a>
            <a href="https://wa.me/96555301913?text=I%20need%20laptop%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer" style={{ background: '#22c55e', color: 'white', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '12px', color: '#1e293b' }}>Laptop Repair Services in Kuwait</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>تصليح لاب توب – Professional repairs for all laptop brands</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🖥️', title: 'Screen Replacement', desc: 'Cracked or damaged laptop screen? We replace screens for all brands and sizes. Starting 20 KD.' },
              { icon: '🔋', title: 'Battery Replacement', desc: 'Laptop not holding charge? Fast battery replacement for all laptop brands. Starting 15 KD.' },
              { icon: '⌨️', title: 'Keyboard Repair', desc: 'Broken or unresponsive keys? Keyboard repair or full replacement. Starting 12 KD.' },
              { icon: '💾', title: 'Windows Reinstall', desc: 'Laptop running slow or crashing? Fresh Windows installation with all drivers. Starting 15 KD.' },
              { icon: '⚡', title: 'Performance Upgrade', desc: 'SSD and RAM upgrades to make your laptop fast again. Starting 20 KD for SSD upgrade.' },
              { icon: '💧', title: 'Liquid Damage Repair', desc: 'Liquid spilled on your laptop? Expert assessment and component repair. Call for pricing.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section style={{ padding: '40px 20px', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '12px', color: '#1e293b' }}>Laptop Brands We Repair</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>All major brands serviced in Kuwait</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Alienware', 'Samsung', 'Toshiba', 'Huawei', 'LG', 'Razer', 'Apple MacBook'].map((b, i) => (
              <span key={i} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '8px 18px', color: '#475569', fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>Book Your Laptop Repair in Kuwait</h2>
          <p style={{ opacity: 0.85, marginBottom: '32px', fontSize: '1.1rem' }}>تواصل معنا – Free pickup from anywhere. Call or WhatsApp for a free quote.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+96555301913" style={{ background: 'white', color: '#1e3a8a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Call +965 5530 1913</a>
            <a href="https://wa.me/96555301913?text=I%20need%20laptop%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer" style={{ background: '#22c55e', color: 'white', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← Back to Home</Link>
        {' | '}
        <Link to="/services" style={{ color: '#3b82f6', textDecoration: 'none' }}>All Services</Link>
      </div>
    </div>
  );
};

export default LaptopRepair;