// File: app/frontend/src/pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Award, Users, Clock, Shield, Zap, Heart, Star,
  MapPin, Phone, MessageCircle, Wrench, Cpu, 
  Microscope, Crosshair, Thermometer, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */
const stats = [
  { icon: Users,  number: '500+', label: 'Happy Customers' },
  { icon: Clock,  number: '10–10', label: 'Open Daily' },
  { icon: Award,  number: '4.9★', label: 'Customer Rating' },
  { icon: Wrench, number: '20+',  label: 'Years Experience' },
];

const values = [
  { icon: Shield, title: 'Data Privacy First',      description: 'Your personal and business data is protected with strict hardware-only security protocols during every repair.' },
  { icon: Zap,    title: 'Lightning Fast Service',   description: 'Same-day hardware repairs with free pickup response available across all Kuwait governorates.' },
  { icon: Microscope, title: 'Technical Mastery',        description: "We diagnose the board itself using micro-soldering and trace repair—not just replace it." },
  { icon: Star,   title: 'Quality Engineering',      description: 'Only genuine parts, precision micro-soldering, and professional-grade lab tools.' },
];

const teamMembers = [
  {
    name: 'Imran Natiq',
    role: 'Founder & Lead Technician',
    bio: "Senior technician with 20+ years of experience in Kuwait's enterprise hardware market. Specializes in advanced hardware testing, strict data safety protocols, and component-level logic board recovery. Committed to transparent service and reclaiming hardware from the 'beyond repair' category.",
    skills: ['Hardware Testing', 'Data Safety', 'Micro-Soldering'],
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4',
    fallback: 'Imran+Natiq'
  },
  {
    name: 'Riyaz Kawa',
    role: 'Co-Founder & CTO',
    bio: 'Lead engineer specializing in advanced troubleshooting and performance optimization. Expert in custom gaming builds, high-end systems, and mitigating Kuwait\'s extreme thermal stress on hardware. Passionate about delivering cutting-edge technical solutions.',
    skills: ['Thermal Optimization', 'Custom PC Tuning', 'Logic Boards'],
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Co-Founder-Image_salp7t',
    fallback: 'Riyaz+Kawa'
  }
];

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function About() {
  const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent('Hi KCROC, I am looking for a professional computer repair service.')}`;

  return (
    <main className="w-full min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30">
      
      {/* 🚀 Dynamic SEO Engine Integration */}
      <SEOEngine entityId="page-about" />
      <Helmet>
        <title>About KCROC | Elite Component-Level Repair Laboratory in Kuwait</title>
        <meta name="description" content="Learn about KCROC's Hawalli laboratory, our lead technicians Imran and Riyaz, and our mission to reclaim hardware from the 'beyond repair' category." />
      </Helmet>

      {/* ─── HERO SECTION (Technical Noir Aesthetic) ─── */}
      <section className="relative pt-8 sm:pt-16 lg:pt-24 pb-8 sm:pb-24 px-4 sm:px-6 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.05),transparent_50%)]" />
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto mb-8 relative z-10 mt-8 sm:mt-0">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><span className="text-slate-600">/</span></li>
            <li aria-current="page" className="text-cyan-400">About</li>
          </ol>
        </nav>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" aria-hidden="true" />
                Kuwait's Trusted Hardware Lab
              </Badge>
              {/* FIXED H1: Scaled to 30px (text-3xl) on mobile, preserving desktop scale */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                We Fix The Board.<br />
                <span className="text-slate-500">We Don't Swap It.</span>
              </h1>
              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Kuwait’s elite component-level laboratory specializing in micro-soldering and logic board repairs that standard retail shops declare impossible.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 sm:px-8 w-full sm:w-auto" asChild>
                  <a href="#our-story">Read Our Story</a>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 w-full sm:w-auto" asChild>
                  <Link to="/gallery">View Lab Gallery</Link>
                </Button>
              </div>
            </div>
            
            {/* Abstract Tech Hero Visual */}
            <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 hidden lg:block">
              <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg')] bg-cover bg-center mix-blend-luminosity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border border-cyan-500/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                  <div className="w-24 h-24 border border-cyan-500/50 rounded-full flex items-center justify-center animate-[spin_5s_linear_infinite_reverse]">
                    <Cpu className="w-8 h-8 text-cyan-400 animate-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section aria-labelledby="stats-heading" className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <h2 id="stats-heading" className="sr-only">KCROC by the Numbers</h2>
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
              <CardContent className="pt-6 sm:pt-8 text-center p-4 sm:p-6">
                <div className="flex justify-center mb-2 sm:mb-4">
                  <div className="bg-slate-950 p-3 sm:p-4 rounded-full border border-slate-800">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" aria-hidden="true" /> 
                  </div>
                </div>
                {/* Scaled down numbers slightly for mobile harmony */}
                <div className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section id="our-story" className="py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800/50 relative z-10">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            {/* FIXED H2: Scaled to 24px (text-2xl) on mobile */}
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-6 sm:mb-8 tracking-tight">Pushing Back Against Disposable Tech</h2>
            <div className="space-y-4 sm:space-y-6 text-slate-300 text-sm sm:text-lg leading-relaxed">
              <p>Standard repair centers operate on a "part swapping" model. If a small component shorts out on your MacBook, authorized dealers will quote you hundreds of dinars to replace the entire logic board—destroying your original data in the process.</p>
              <p>KCROC was founded with a simple mission rooted in technical defiance: we reclaim hardware from the "beyond repair" category. By surgically isolating and replacing the exact failed chips, we save your device, save your money, and keep your data exactly where it belongs: with you.</p>
              <p>What started as a small operation has grown into Kuwait's premier computer repair service—serving customers across Hawalli, Salmiya, Kuwait City, and Farwaniya with same-day service and a 30-day warranty.</p>
            </div>
          </div>
          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-3xl p-2 sm:p-3 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" aria-hidden="true" />
            <img
              src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg"
              alt="KCROC repair workshop – Kuwait Computer Repair On Call, Hawalli"
              loading="lazy"
              className="w-full h-64 sm:h-[400px] object-cover rounded-2xl opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=KCROC&size=400&background=06b6d4&color=fff&bold=true'; }}
            />
          </div>
        </div>
      </section>

      {/* ─── EEAT PROFILE: LEADERSHIP TEAM (.scroll-row on mobile) ─── */}
      <section aria-labelledby="team-heading" className="py-8 sm:py-24 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
              Authorized Expertise
            </Badge>
            {/* FIXED H2: Scaled to 24px (text-2xl) on mobile */}
            <h2 id="team-heading" className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Our Leadership Team
            </h2>
          </div>
          
          <div className="scroll-row gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-8 max-w-5xl mx-auto">
            {/* FIXED Carousel peek width: w-[80%] gives a healthy 20% peek to the next item */}
            {teamMembers.map((member) => (
              <div key={member.name} className="scroll-row-item w-[80%] sm:w-auto group bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300 flex flex-col">
                <div className="relative h-64 sm:h-80 overflow-hidden border-b border-slate-800/50 shrink-0">
                  <img
                    src={member.image}
                    alt={`${member.name} – ${member.role} at KCROC Kuwait`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.fallback}&size=300&background=06b6d4&color=0A0A0A&bold=true&format=png`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" aria-hidden="true" />
                  <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
                    <span className="bg-slate-950/80 backdrop-blur-sm text-cyan-400 border border-cyan-500/30 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                      {member.role}
                    </span>
                    {/* FIXED H3: Scaled to 20px (text-xl) on mobile */}
                    <h3 className="text-xl sm:text-3xl font-black text-white mt-3 sm:mt-4 tracking-tight">{member.name}</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-10 bg-slate-950/50 flex-grow flex flex-col">
                  <p className="text-slate-400 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span key={skill} className="bg-slate-900/80 border border-slate-800 text-slate-300 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
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

      {/* ─── VALUES (.scroll-row on mobile) ─── */}
      <section aria-labelledby="values-heading" className="py-8 sm:py-24 px-4 sm:px-6 relative z-10 border-b border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            {/* FIXED H2: Scaled to 24px (text-2xl) on mobile */}
            <h2 id="values-heading" className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">Our Core Principles</h2>
            <p className="text-slate-400 text-sm sm:text-base">The standards that separate our laboratory from retail repair shops.</p>
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {values.map((v) => (
              <Card key={v.title} className="scroll-row-item w-[85%] sm:w-auto bg-slate-900/30 backdrop-blur-md border border-slate-800 hover:border-cyan-500/30 transition-all text-left">
                <CardHeader className="p-5 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-slate-800 shrink-0">
                    <v.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" aria-hidden="true" />
                  </div>
                  {/* FIXED H3: Scaled to 18px (text-lg) on mobile */}
                  <CardTitle className="text-lg sm:text-xl font-black text-white mb-2">{v.title}</CardTitle>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{v.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section aria-labelledby="cta-heading" className="py-8 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-slate-900/20 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-900/10 blur-[80px] rounded-full pointer-events-none"
            aria-hidden="true" 
          />
          <div className="relative z-10">
            {/* FIXED H2: Scaled to 24px (text-2xl) on mobile */}
            <h2 id="cta-heading" className="text-2xl sm:text-4xl font-black text-white mb-4 sm:mb-6 tracking-tight">
              Ready to Restore Your Device?
            </h2>
            <p className="text-xs sm:text-lg text-slate-400 mb-6 sm:mb-8 max-w-xl mx-auto">
              Book a free pickup anywhere in Kuwait. We will perform a precision diagnostic and provide a fixed quote before we touch a tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto text-sm sm:text-base shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]" asChild>
                <Link to="/book">
                  <Wrench className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> Book Free Pickup
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto text-sm sm:text-base" asChild>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> WhatsApp Us
                </a>
              </Button>
            </div>
            <div className="mt-6 sm:mt-10 pt-6 border-t border-slate-800/50 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide">
              <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-cyan-500/50" /> {business.streetAddress}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-cyan-500/50" /> Open daily 10 AM – 10 PM</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
