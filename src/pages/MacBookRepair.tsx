import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MacBookRepair = () => {
  useEffect(() => {
    document.title = 'MacBook Repair Kuwait | Apple MacBook Fix – Free Pickup – KCROC';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Professional MacBook repair in Kuwait. Screen replacement, battery, keyboard, liquid damage & logic board repair. Free pickup. تصليح ماك بوك الكويت.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/macbook-repair');
    return () => {
      document.title = 'Computer Repair Kuwait | MacBook & Laptop Repair – Free Pickup – KCROC';
      if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/');
    };
  }, []);

  return (
    <div className="service-page">
      {/* Hero */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '80px 20px', textAlign: 'center', color: 'white' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💻</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>
            MacBook Repair Kuwait
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '8px' }}>
            تصليح ماك بوك في الكويت – Expert Apple MacBook repair with free pickup across Kuwait
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: '32px' }}>
            MacBook Air, MacBook Pro (all models) – Screen, Battery, Keyboard, Liquid Damage, Logic Board
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+96555301913" style={{ background: '#3b82f6', color: 'white', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>Call +965 5530 1913</a>
            <a href="https://wa.me/96555301913?text=I%20need%20MacBook%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer" style={{ background: '#22c55e', color: 'white', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '12px', color: '#1e293b' }}>MacBook Repair Services in Kuwait</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>تصليح ماك بوك – All Apple MacBook models covered</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🖥️', title: 'MacBook Screen Replacement', desc: 'Cracked or damaged MacBook screen? We replace all MacBook Air and Pro screens with genuine panels. Starting 45 KD.' },
              { icon: '🔋', title: 'MacBook Battery Replacement', desc: 'Battery not holding charge? We replace MacBook batteries for all models. Genuine Apple batteries available. Starting 25 KD.' },
              { icon: '⌨️', title: 'MacBook Keyboard Repair', desc: 'Stuck or broken keys, butterfly keyboard issues. Complete keyboard replacement for all MacBook models. Starting 30 KD.' },
              { icon: '💧', title: 'Liquid Damage Repair', desc: 'Water or liquid spilled on MacBook? Expert liquid damage assessment and component-level repair. Call for pricing.' },
              { icon: '🧠', title: 'Logic Board Repair', desc: 'MacBook not turning on? GPU issues? Component-level logic board diagnostics and repair. Call for assessment.' },
              { icon: '📦', title: 'SSD Upgrade & Data Recovery', desc: 'Upgrade your MacBook storage or recover lost data. Fast NVMe SSD upgrades. Starting 20 KD for upgrade.' },
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

      {/* Why KCROC */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', color: '#1e293b' }}>Why Choose KCROC for MacBook Repair?</h2>
          <p style={{ color: '#64748b', marginBottom: '40px' }}>Kuwait's trusted MacBook specialist – تصليح ماك بوك بالكويت</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            {[
              { icon: '🚚', text: 'Free Pickup & Delivery across all Kuwait' },
              { icon: '✅', text: 'Genuine Apple & high-grade compatible parts' },
              { icon: '🛡️', text: '90-Day Warranty on all MacBook repairs' },
              { icon: '⚡', text: 'Same/Next-Day service available' },
              { icon: '📊', text: '500+ MacBook repairs completed' },
              { icon: '📞', text: 'Free diagnosis before any repair' },
            ].map((w, i) => (
              <div key={i} style={{ padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{w.icon}</div>
                <p style={{ color: '#475569', fontWeight: 500, fontSize: '0.9rem' }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)', textAlign: 'center', color: 'white' }}>
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>Need MacBook Repair in Kuwait?</h2>
          <p style={{ opacity: 0.85, marginBottom: '32px', fontSize: '1.1rem' }}>تواصل معنا الآن – Free pickup from anywhere in Kuwait. Call or WhatsApp for a free quote.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+96555301913" style={{ background: 'white', color: '#1e3a8a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Call +965 5530 1913</a>
            <a href="https://wa.me/96555301913?text=I%20need%20MacBook%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer" style={{ background: '#22c55e', color: 'white', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← Back to Home</Link>
        {' | '}
        <Link to="/services" style={{ color: '#3b82f6', textDecoration: 'none' }}>All Services</Link>
      </div>
    </div>
  );
};

export default MacBookRepair;