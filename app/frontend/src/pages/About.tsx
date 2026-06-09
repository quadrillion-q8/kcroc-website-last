import { Helmet } from 'react-helmet-async';
import { Award, Users, Clock, Shield, Zap, Heart, Star, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function About() {
  const achievements = [
    { icon: Users, number: "500+", label: "Happy Customers" },
    { icon: Clock, number: "24/7", label: "Support Available" },
    { icon: Award, number: "98%", label: "Success Rate" },
    { icon: Shield, number: "5+", label: "Years Experience" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Data Privacy First",
      description: "Your personal and business data is protected with enterprise-grade security protocols during every repair.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/9f8c9e79-77c9-4959-8f2e-d9a6bec17b1b.png"
    },
    {
      icon: Zap,
      title: "Lightning Fast Service",
      description: "Same-day hardware repairs with emergency response available across all Kuwait governorates.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/3ddd029d-1ed9-44d7-845e-911732d5888d.png"
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description: "We don't just fix computers - we build lasting trust and relationships with our clients.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/40780580-7370-475d-b516-fa2d41e142ba.png"
    },
    {
      icon: Star,
      title: "Quality Engineering",
      description: "Only genuine parts, precision micro-soldering, and professional-grade tools for every job.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/fe0f254d-ca91-4dbb-a283-49603f110dab.png"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Helmet>
        <title>About KCROC | Expert Computer Repair Team in Kuwait</title>
        <meta name="description" content="Meet the expert technicians behind Kuwait Computer Repair On Call (KCROC). Imran Natiq and Riyaz Kawa lead Kuwait's most trusted computer and MacBook repair lab." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Award size={14} />
            <span>Kuwait's Trusted Hardware Lab</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Meet the Team Behind
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"> KCROC's Success</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Founded in 2019, Kuwait Computer Repair On Call (KCROC) has grown from a small shop to Kuwait's most trusted engineering lab. Our mission is simple: deliver world-class technical solutions with unmatched transparency.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <div key={index} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 text-center shadow-lg">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
                  <stat.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 px-6 border-t border-slate-800 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  KCROC was founded with a simple mission: to provide Kuwait with reliable, professional hardware repair services that customers can actually trust. We were tired of seeing customers overcharged for simple fixes.
                </p>
                <p>
                  What started as a small operation has grown into Kuwait's premier computer repair service, serving customers across Hawalli, Salmiya, Kuwait City, and beyond with same-day service and an iron-clad 30-day warranty on all repairs.
                </p>
                <p>
                  Our commitment to engineering excellence and absolute data privacy has made us the go-to choice for individuals and enterprise businesses throughout Kuwait.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/Whats-App-Image-2026-01-29-at-3-1" 
                  alt="KCROC workspace and team" 
                  className="w-full h-[400px] object-cover rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/fe0f254d-ca91-4dbb-a283-49603f110dab.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Our Leadership Team</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Meet the expert engineers who make KCROC the most trusted name in hardware repair across Kuwait.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Founder & CEO - Imran Natiq */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-cyan-500/30 transition-colors">
              <div className="relative h-72 overflow-hidden border-b border-slate-800">
                <img 
                  src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4"
                  alt="Imran Natiq - Founder & CEO of KCROC"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=Imran+Natiq&size=300&background=00D9FF&color=0A0A0A&bold=true&format=png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                    Founder & CEO
                  </span>
                  <h3 className="text-3xl font-black text-white mt-3">Imran Natiq</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Senior technician with years of experience in Kuwait's enterprise hardware market. Specializes in advanced hardware testing, strict data safety protocols, and customer education. Committed to transparent service and building long-term trust with every client.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">Hardware Testing</span>
                  <span className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">Data Safety</span>
                  <span className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">Enterprise Support</span>
                </div>
              </div>
            </div>

            {/* Co-Founder & CTO - Riyaz Kawa */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-emerald-500/30 transition-colors">
              <div className="relative h-72 overflow-hidden border-b border-slate-800">
                <img 
                  src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Co-Founder-Image_salp7t"
                  alt="Riyaz Kawa - Co-Founder & CTO of KCROC"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=Riyaz+Kawa&size=300&background=00D9FF&color=0A0A0A&bold=true&format=png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                    Co-Founder & CTO
                  </span>
                  <h3 className="text-3xl font-black text-white mt-3">Riyaz Kawa</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Lead engineer specializing in advanced troubleshooting and performance optimization. Expert in custom gaming loops, high-end systems, and complex logic board micro-soldering. Passionate about delivering cutting-edge technical solutions.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">Micro-Soldering</span>
                  <span className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">Custom PC Tuning</span>
                  <span className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">Logic Boards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 border-t border-slate-800 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Our Core Values</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The principles that dictate every repair and client interaction at KCROC.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-lg group hover:border-cyan-500/30 transition-all">
                <div className="relative h-56 overflow-hidden border-b border-slate-800">
                  <img 
                    src={value.image}
                    alt={`${value.title} - KCROC core value`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 shadow-xl">
                      <value.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA Section */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-[300px]">
              <img 
                src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/bf5e121b-f089-4df1-8bbb-61da3dd1e2ac.png"
                alt="Kuwait City skyline - KCROC serving all of Kuwait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-950/20"></div>
              <div className="absolute bottom-6 left-8 flex items-center gap-2 text-cyan-300">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Serving All Kuwait Governorates</span>
              </div>
            </div>
            
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Our Mission</h2>
              
              <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                To provide Kuwait with the most reliable, efficient, and secure hardware repair services. We believe technology should enhance your life, not halt it. That's why we're committed to delivering engineering solutions that are fast, transparent, and built to last.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center mb-10">
                <div className="flex items-center gap-2 text-emerald-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm">
                  <Star className="w-4 h-4" />
                  <span className="font-bold">5-Star Experience</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm">
                  <Shield className="w-4 h-4" />
                  <span className="font-bold">Data Security</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold">Same-Day Service</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+96555301913" 
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full px-8 py-4 text-lg border border-slate-700 transition-all"
                >
                  <Phone className="w-5 h-5" /> +965 5530 1913
                </a>
                <a 
                  href="https://wa.me/96555301913" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-8 py-4 text-lg transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
