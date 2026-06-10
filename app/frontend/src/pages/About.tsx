import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Award, Users, Clock, Shield, Zap, Heart, Star,
  MapPin, Phone, MessageCircle, Wrench, Cpu,
} from 'lucide-react';

// ─── Schema ──────────────────────────────────────────────────────────────────
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.computerrepairkuwait.com/#business',
      name: 'Kuwait Computer Repair On Call',
      alternateName: 'KCROC',
      url: 'https://www.computerrepairkuwait.com',
      telephone: '+96555301913',
      email: 'quadrillion1980@gmail.com',
      image: 'https://www.computerrepairkuwait.com/logo.png',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
        addressLocality: 'Hawalli',
        addressCountry: 'KW',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.3356,
        longitude: 48.025,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
      },
      sameAs: ['https://www.computerrepairkuwait.com'],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.computerrepairkuwait.com/about#webpage',
      name: 'About KCROC – Kuwait Computer Repair On Call',
      url: 'https://www.computerrepairkuwait.com/about',
      isPartOf: { '@id': 'https://www.computerrepairkuwait.com/#website' },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const WA_LINK =
  'https://wa.me/96555301913?text=Hi%2C+I+have+a+repair+enquiry.+Please+help.';

const stats = [
  { icon: Users,  number: '500+',  label: 'Happy Customers' },
  { icon: Clock,  number: '10–10', label: 'Open Daily' },
  { icon: Award,  number: '4.9★',  label: 'Customer Rating' },
  { icon: Wrench, number: '20+',   label: 'Years Experience' },
];

const values = [
  {
    icon: Shield,
    title: 'Data Privacy First',
    description:
      'Your personal and business data is protected with strict security protocols during every repair.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Service',
    description:
      'Same-day hardware repairs with free pickup response available across all Kuwait governorates.',
  },
  {
    icon: Heart,
    title: 'Customer Focused',
    description:
      'We don't just fix computers — we build lasting trust and long-term relationships with every client.',
  },
  {
    icon: Star,
    title: 'Quality Engineering',
    description:
      'Only genuine parts, precision micro-soldering, and professional-grade tools for every job.',
  },
];

const teamMembers = [
  {
    name: 'Imran Natiq',
    role: 'Founder & CEO',
    bio: 'Senior technician with 20+ years of experience in Kuwait's enterprise hardware market. Specialises in advanced hardware testing, strict data safety protocols, and customer education. Committed to transparent service and building long-term trust with every client.',
    skills: ['Hardware Testing', 'Data Safety', 'Enterprise Support'],
    image:
      'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4',
    fallback: 'Imran+Natiq',
    accent: 'emerald',
  },
  {
    name: 'Riyaz Kawa',
    role: 'Co-Founder & CTO',
    bio: 'Lead engineer specialising in advanced troubleshooting and performance optimisation. Expert in custom gaming builds, high-end systems, and complex logic board micro-soldering. Passionate about delivering cutting-edge technical solutions.',
    skills: ['Micro-Soldering', 'Custom PC Tuning', 'Logic Boards'],
    image:
      'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Co-Founder-Image_salp7t',
    fallback: 'Riyaz+Kawa',
    accent: 'cyan',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>About KCROC | Expert Computer Repair Team in Kuwait</title>
        <meta
          name="description"
          content="Meet the expert technicians behind Kuwait Computer Repair On Call (KCROC). 20+ years experience, 4.9-star rating, free pickup across all Kuwait. Hawalli, Kuwait."
        />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/about" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About KCROC | Expert Computer Repair Team in Kuwait" />
        <meta
          property="og:description"
          content="Meet the expert technicians behind Kuwait Computer Repair On Call. 20+ years experience, 4.9-star rating, free pickup across all Kuwait."
        />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/about" />
        <meta property="og:image" content="https://www.computerrepairkuwait.com/og-about.jpg" />
        <meta property="og:site_name" content="Kuwait Computer Repair On Call" />

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Kuwait's Trusted Hardware Lab
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Meet the Team Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              KCROC's Success
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Kuwait Computer Repair On Call (KCROC) is Hawalli's most trusted computer and MacBook
            repair lab. With 20+ years of technician experience, we deliver fast, transparent, and
            guaranteed repairs across all Kuwait.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card key={i} className="bg-gray-900/40 border-gray-800">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
                      <Icon className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-6 border-t border-gray-800 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  KCROC was founded with a simple mission: provide Kuwait with reliable, professional
                  hardware repair that customers can actually trust. We were tired of seeing clients
                  overcharged for straightforward fixes.
                </p>
                <p>
                  What started as a small operation has grown into Kuwait's premier computer repair
                  service — serving customers across Hawalli, Salmiya, Kuwait City, Farwaniya, and
                  beyond with same-day service and a 30-day warranty on all repairs.
                </p>
                <p>
                  Our commitment to engineering excellence, absolute data privacy, and free pickup
                  across all Kuwait has made KCROC the go-to choice for individuals and businesses
                  throughout the country.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-3 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/Whats-App-Image-2026-01-29-at-3-1"
                  alt="KCROC repair workspace — Kuwait Computer Repair On Call"
                  className="w-full h-[400px] object-cover rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://ui-avatars.com/api/?name=KCROC&size=400&background=10b981&color=fff&bold=true';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Our Leadership Team
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Meet the expert engineers who make KCROC the most trusted name in hardware repair
              across Kuwait.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden shadow-xl hover:border-emerald-500/30 transition-colors"
              >
                <div className="relative h-72 overflow-hidden border-b border-gray-800">
                  <img
                    src={member.image}
                    alt={`${member.name} – ${member.role} at KCROC Kuwait`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.fallback}&size=300&background=10b981&color=0A0A0A&bold=true&format=png`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                      {member.role}
                    </span>
                    <h3 className="text-3xl font-black text-white mt-3">{member.name}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-900 border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
                      >
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

      {/* Values */}
      <section className="py-20 px-6 border-t border-gray-800 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Our Core Values</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide every repair and client interaction at KCROC.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card
                  key={i}
                  className="bg-gray-950 border-gray-800 hover:border-emerald-500/30 transition-all"
                >
                  <CardContent className="pt-8 p-8">
                    <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-14 text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-6">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">
                  Serving All Kuwait Governorates
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                To provide Kuwait with the most reliable, efficient, and secure hardware repair
                services. Technology should enhance your life, not halt it. That's why every repair
                at KCROC is fast, transparent, and backed by a 30-day warranty — with free pickup
                across all Kuwait.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-10">
                <span className="flex items-center gap-2 text-emerald-400 bg-gray-900 border border-gray-800 px-4 py-2 rounded-full text-sm font-bold">
                  <Star className="w-4 h-4" /> 4.9-Star Rating
                </span>
                <span className="flex items-center gap-2 text-emerald-400 bg-gray-900 border border-gray-800 px-4 py-2 rounded-full text-sm font-bold">
                  <Shield className="w-4 h-4" /> 30-Day Warranty
                </span>
                <span className="flex items-center gap-2 text-emerald-400 bg-gray-900 border border-gray-800 px-4 py-2 rounded-full text-sm font-bold">
                  <Zap className="w-4 h-4" /> Same-Day Service
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-8">
                Kuwait Computer Repair On Call — Hawalli, Ibn Khaldoun St, Al Mullah Complex,
                Basement Shop 19. Open daily 10 AM – 10 PM.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6"
                  asChild
                >
                  <a href="tel:+96555301913">
                    <Phone className="mr-2" /> Call 55301913
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
                  asChild
                >
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" /> WhatsApp 55301913
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
