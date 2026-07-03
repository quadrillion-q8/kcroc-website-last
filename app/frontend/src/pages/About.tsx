// File: app/frontend/src/pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Users, Clock, Shield, Zap, Heart, Star,
  MapPin, Phone, MessageCircle, Wrench
} from 'lucide-react';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA (Custom UI constants preserved)
───────────────────────────────────────────────────────────────────────────── */
const stats = [
  { icon: Users,  number: '500+', label: 'Happy Customers' },
  { icon: Clock,  number: '10–10', label: 'Open Daily' },
  { icon: Award,  number: '4.9★', label: 'Customer Rating' },
  { icon: Wrench, number: '20+',  label: 'Years Experience' },
];

const values = [
  { icon: Shield, title: 'Data Privacy First',      description: 'Your personal and business data is protected with strict security protocols during every repair.' },
  { icon: Zap,    title: 'Lightning Fast Service',   description: 'Same-day hardware repairs with free pickup response available across all Kuwait.' },
  { icon: Heart,  title: 'Customer Focused',         description: "We don't just fix computers — we build lasting trust and long-term relationships." },
  { icon: Star,   title: 'Quality Engineering',      description: 'Only genuine parts, precision micro-soldering, and professional-grade tools.' },
];

const teamMembers = [
  {
    name: 'Imran Natiq',
    role: 'Founder & CEO',
    bio: "Senior technician with 20+ years of experience in Kuwait's enterprise hardware market. Specialises in advanced hardware testing, strict data safety protocols, and customer education. Committed to transparent service and building long-term trust with every client.",
    skills: ['Hardware Testing', 'Data Safety', 'Enterprise Support'],
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4',
    fallback: 'Imran+Natiq'
  },
  {
    name: 'Riyaz Kawa',
    role: 'Co-Founder & CTO',
    bio: 'Lead engineer specialising in advanced troubleshooting and performance optimisation. Expert in custom gaming builds, high-end systems, and complex logic board micro-soldering. Passionate about delivering cutting-edge technical solutions.',
    skills: ['Micro-Soldering', 'Custom PC Tuning', 'Logic Boards'],
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Co-Founder-Image_salp7t',
    fallback: 'Riyaz+Kawa'
  }
];

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function About() {
  const waLink = `https://wa.me/96555301913?text=${encodeURIComponent('Hi! I have a repair enquiry. Please help.')}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30 pt-32">
      
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION: Using the Hawalli Location Entity */}
      <SEOEngine entityId="loc-hawalli" />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">About</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pb-16 px-6 text-center overflow-hidden z-10">
        <div
          className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true" 
        />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Award size={14} aria-hidden="true" /> Kuwait's Trusted Hardware Lab 
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Meet the Team Behind{' '}
            <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">KCROC</span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Hawalli's premier computer and MacBook repair lab. With 20+ years of technician experience, we deliver fast, transparent, and guaranteed repairs across all Kuwait.
          </p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section aria-labelledby="stats-heading" className="py-16 px-6 border-t border-slate-800/50 bg-slate-900/10 backdrop-blur-sm relative z-10">
        <h2 id="stats-heading" className="sr-only">KCROC by the Numbers</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 p-6 rounded-3xl text-center hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-800">
                <stat.icon className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-hidden="true" /> 
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
              <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section aria-labelledby="story-heading" className="py-20 md:py-24 px-6 border-t border-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="story-heading" className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight">Our Story</h2>
            <div className="space-y-6 text-slate-400 text-base md:text-lg leading-relaxed">
              <p>KCROC was founded with a simple mission: provide Kuwait with reliable, professional hardware repair that customers can actually trust.</p>
              <p>What started as a small operation has grown into Kuwait's premier computer repair service — serving customers across Hawalli, Salmiya, Kuwait City, Farwaniya, and beyond with same-day service and a 30-day warranty.</p>
              <p>Our commitment to engineering excellence and absolute data privacy has made KCROC the go-to choice for individuals and businesses.</p>
            </div>
          </div>
          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-3xl p-3 shadow-2xl relative group">
            <div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
              aria-hidden="true" 
            />
            <img
              src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg"
              alt="KCROC repair workshop – Kuwait Computer Repair On Call, Hawalli"
              loading="lazy"
              className="w-full h-[400px] object-cover rounded-2xl opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=KCROC&size=400&background=06b6d4&color=fff&bold=true'; }}
            />
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section aria-labelledby="values-heading" className="py-20 px-6 border-t border-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 id="values-heading" className="text-3xl md:text-4xl font-black text-white mb-12 text-center tracking-tight">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800">
                  <v.icon className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-black text-white mb-3">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc || v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section aria-labelledby="team-heading" className="py-24 px-6 border-t border-slate-800/50 bg-slate-900/10 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 id="team-heading" className="text-3xl md:text-4xl font-black text-white mb-16 text-center tracking-tight">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="group bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300">
                <div className="relative h-80 overflow-hidden border-b border-slate-800/50">
                  <img
                    src={member.image}
                    alt={`${member.name} – ${member.role} at KCROC Kuwait`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.fallback}&size=300&background=06b6d4&color=0A0A0A&bold=true&format=png`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" aria-hidden="true" />
                  <div className="absolute bottom-8 left-8">
                    <span className="bg-slate-950/80 backdrop-blur-sm text-cyan-400 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                      {member.role}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-white mt-4 tracking-tight">{member.name}</h3>
                  </div>
                </div>
                <div className="p-8 md:p-10 bg-slate-950/50">
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span key={skill} className="bg-slate-900/80 border border-slate-800 text-slate-300 px-4 py-1.5 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section aria-labelledby="cta-heading" className="py-24 px-6 border-t border-slate-800/50 relative z-10">
        <div className="max-w-3xl mx-auto text-center bg-slate-900/20 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-900/10 blur-[80px] rounded-full pointer-events-none"
            aria-hidden="true" 
          />
          <div className="relative z-10">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight">
              Need Expert Repairs?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <a
                href="tel:+96555301913"
                className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-base transition-all flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5 text-cyan-400" aria-hidden="true" /> Call 55301913 
              </a>
              
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp 
              </a>
              
            </div>
            <p className="text-slate-500 text-xs font-medium tracking-wide mt-10">
              Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. Open daily 10 AM – 10 PM.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
