import { Helmet } from 'react-helmet-async';
import { Award, Users, Clock, Shield, Zap, Heart, Star, MapPin, Phone, MessageCircle, Wrench } from 'lucide-react';

// ─── Schema Module Scope ────────────────────────────────────────────────────
const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://computerrepairkuwait.com/#business",
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "url": "https://computerrepairkuwait.com",
      "telephone": "+96555301913",
      // Removed the unbranded Gmail address for E-E-A-T compliance
      "address": { 
        "@type": "PostalAddress", 
        "streetAddress": "Al Mullah Complex, Ibn Khaldoun St, Shop 19", 
        "addressLocality": "Hawalli", 
        "addressCountry": "KW" 
      }
    },
    {
      "@type": "AboutPage",
      "@id": "https://computerrepairkuwait.com/about#webpage",
      "name": "About KCROC – Kuwait Computer Repair On Call",
      "url": "https://computerrepairkuwait.com/about",
      "isPartOf": { "@id": "https://computerrepairkuwait.com/#business" }
    }
  ]
};

const stats = [
  { icon: Users, number: '500+', label: 'Happy Customers' },
  { icon: Clock, number: '10–10', label: 'Open Daily' },
  { icon: Award, number: '4.9★', label: 'Customer Rating' },
  { icon: Wrench, number: '20+', label: 'Years Experience' },
];

const values = [
  { icon: Shield, title: 'Data Privacy First', description: 'Your personal and business data is protected with strict security protocols during every repair.' },
  { icon: Zap, title: 'Lightning Fast Service', description: 'Same-day hardware repairs with free pickup response available across all Kuwait.' },
  { icon: Heart, title: 'Customer Focused', description: 'We don\'t just fix computers — we build lasting trust and long-term relationships.' },
  { icon: Star, title: 'Quality Engineering', description: 'Only genuine parts, precision micro-soldering, and professional-grade tools.' },
];

const teamMembers = [
  {
    name: 'Imran Natiq',
    role: 'Founder & CEO',
    bio: 'Senior technician with 20+ years of experience in Kuwait\'s enterprise hardware market. Specialises in advanced hardware testing, strict data safety protocols, and customer education. Committed to transparent service and building long-term trust with every client.',
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

export default function About() {
  const waLink = 'https://wa.me/96555301913?text=Hi!+I+have+a+repair+enquiry.+Please+help.';

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <Helmet>
        <title>About KCROC | Expert Computer Repair Team in Kuwait</title>
        <meta name="description" content="Meet the expert technicians behind KCROC. 20+ years experience, 4.9-star rating, free pickup across all Kuwait. Hawalli, Ibn Khaldoun St." />
        <link rel="canonical" href="https://computerrepairkuwait.com/about" />
        {/* Added Open Graph Tags for Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About KCROC | Expert Computer Repair Team in Kuwait" />
        <meta property="og:description" content="Meet the expert technicians behind KCROC. 20+ years experience, 4.9-star rating, free pickup across all Kuwait." />
        <meta property="og:url" content="https://computerrepairkuwait.com/about" />
        <meta property="og:image" content="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/logo_btpfls.png" />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Award size={14} className="mr-2" /> Kuwait's Trusted Hardware Lab
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Meet the Team Behind <span className="text-cyan-400">KCROC</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Hawalli's premier computer and MacBook repair lab. With 20+ years of technician experience, we deliver fast, transparent, and guaranteed repairs across all Kuwait.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-800">
                <stat.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-20 px-6 border-t border-slate-800 bg-slate-900/20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Our Story</h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>KCROC was founded with a simple mission: provide Kuwait with reliable, professional hardware repair that customers can actually trust.</p>
              <p>What started as a small operation has grown into Kuwait's premier computer repair service — serving customers across Hawalli, Salmiya, Kuwait City, Farwaniya, and beyond with same-day service and a 30-day warranty.</p>
              <p>Our commitment to engineering excellence and absolute data privacy has made KCROC the go-to choice for individuals and businesses.</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-2xl">
            <img 
              src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/Whats-App-Image-2026-01-29-at-3-1" 
              alt="KCROC repair workspace" 
              loading="lazy" /* Added for mobile speed optimization */
              className="w-full h-[400px] object-cover rounded-2xl"
              onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=KCROC&size=400&background=10b981&color=fff&bold=true'; }}
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all">
                <div className="relative h-72 overflow-hidden border-b border-slate-800">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role} at KCROC Kuwait`}
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.fallback}&size=300&background=10b981&color=0A0A0A&bold=true&format=png`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {member.role}
                    </span>
                    <h3 className="text-3xl font-black text-white mt-3">{member.name}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => <span key={skill} className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">{skill}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center bg-slate-900/40 border border-slate-800 rounded-3xl p-12">
            <h2 className="text-3xl font-black text-white mb-8">Need Expert Repairs?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+96555301913" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center">
                    <Phone className="mr-2" size={20} /> Call 55301913
                </a>
                <a href={waLink} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center">
                    <MessageCircle className="mr-2" size={20} /> WhatsApp
                </a>
            </div>
            <p className="text-slate-500 text-sm mt-8">Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. Open daily 10 AM – 10 PM.</p>
        </div>
      </section>
    </main>
  );
}
