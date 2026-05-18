import { Award, Users, Clock, Shield, Zap, Heart, Star, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
      description: "Your personal and business data is protected with military-grade security protocols.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/9f8c9e79-77c9-4959-8f2e-d9a6bec17b1b.png"
    },
    {
      icon: Zap,
      title: "Lightning Fast Service",
      description: "Same-day repairs with emergency response available across Kuwait.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/3ddd029d-1ed9-44d7-845e-911732d5888d.png"
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description: "We don't just fix computers - we build lasting relationships with our clients.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/40780580-7370-475d-b516-fa2d41e142ba.png"
    },
    {
      icon: Star,
      title: "Quality Service",
      description: "Only genuine parts and professional-grade tools for every repair.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/fe0f254d-ca91-4dbb-a283-49603f110dab.png"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <Badge variant="secondary" className="hero-badge">
              🏆 Kuwait's Most Trusted Tech Clinic
            </Badge>
            
            <h1 className="about-hero-title">
              Meet the Team Behind
              <span className="gradient-text"> KCROC's Success</span>
            </h1>
            
            <p className="about-hero-description">
              Founded in 2019, KCROC has grown from a small repair shop to Kuwait's most trusted 
              computer repair service. Our mission is simple: deliver world-class technical 
              solutions with unmatched customer care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {achievements.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>
                  KCROC (Kuwait Computer Repair On Call) was founded with a simple mission: to provide Kuwait with reliable, professional computer repair services that customers can trust.
                </p>
                <p>
                  What started as a small operation has grown into Kuwait's most trusted computer repair service, serving customers across all governorates with same-day service and a 90-day warranty on all repairs.
                </p>
                <p>
                  Our commitment to excellence and customer satisfaction has made us the go-to choice for individuals and businesses throughout Kuwait.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm border border-emerald-500/20">
                <img 
                  src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/Whats-App-Image-2026-01-29-at-3-1" 
                  alt="KCROC workspace and team" 
                  className="w-full h-64 object-cover rounded-lg"
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
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Leadership Team</h2>
            <p className="section-description">
              Meet the experts who make KCROC the most trusted name in computer repair across Kuwait.
            </p>
          </div>

          <div className="team-grid">
            {/* Founder & CEO - Imran Natiq */}
            <Card className="team-card">
              <CardContent className="team-card-content">
                <div className="team-image-container">
                  <img 
                    src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4"
                    alt="Imran Natiq - Founder & CEO of KCROC"
                    className="team-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=Imran+Natiq&size=300&background=00D9FF&color=0A0A0A&bold=true&format=png";
                    }}
                  />
                  <div className="team-badge">Founder & CEO</div>
                </div>
                
                <div className="team-info">
                  <h3 className="team-name">Imran Natiq</h3>
                  <p className="team-role">Founder & Chief Executive Officer</p>
                  
                  <p className="team-bio">
                    Experienced technician with years in Kuwait's computer repair market. Specializes in honest diagnostics, data safety, and customer education. Committed to transparent service and building long-term trust with every client.
                  </p>
                  
                  <div className="team-specialties">
                    <span className="specialty-tag">Honest Diagnostics</span>
                    <span className="specialty-tag">Data Safety</span>
                    <span className="specialty-tag">Customer Trust</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Co-Founder & CTO - Riyaz Kawa */}
            <Card className="team-card">
              <CardContent className="team-card-content">
                <div className="team-image-container">
                  <img 
                    src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Co-Founder-Image_salp7t"
                    alt="Riyaz Kawa - Co-Founder & CTO of KCROC"
                    className="team-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=Riyaz+Kawa&size=300&background=00D9FF&color=0A0A0A&bold=true&format=png";
                    }}
                  />
                  <div className="team-badge">Co-Founder & CTO</div>
                </div>
                
                <div className="team-info">
                  <h3 className="team-name">Riyaz Kawa</h3>
                  <p className="team-role">Co-Founder & Chief Technology Officer</p>
                  
                  <p className="team-bio">
                    Technical lead specializing in advanced troubleshooting and performance optimization. Expert in gaming laptops, high-end systems, and complex motherboard repairs. Passionate about delivering cutting-edge solutions.
                  </p>
                  
                  <div className="team-specialties">
                    <span className="specialty-tag">Advanced Troubleshooting</span>
                    <span className="specialty-tag">Gaming Systems</span>
                    <span className="specialty-tag">Performance Optimization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section - Updated with Images */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-description">
              The principles that guide every decision and interaction at KCROC.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={value.image}
                    alt={`${value.title} - KCROC core value`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-cyan-500/20 backdrop-blur-sm p-3 rounded-xl border border-cyan-500/30">
                      <value.icon className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Updated with Kuwait Skyline Image */}
      <section className="mission-section">
        <div className="container">
          <Card className="mission-card overflow-hidden">
            <div className="relative">
              <img 
                src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/bf5e121b-f089-4df1-8bbb-61da3dd1e2ac.png"
                alt="Kuwait City skyline at sunset - KCROC serving all of Kuwait"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-cyan-300 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Serving All Kuwait Governorates</span>
                </div>
              </div>
            </div>
            <CardContent className="mission-content">
              <div className="mission-header">
                <h2 className="mission-title">Our Mission</h2>
              </div>
              
              <p className="mission-text">
                To provide Kuwait with the most reliable, efficient, and customer-focused computer 
                repair services. We believe technology should enhance your life, not complicate it. 
                That's why we're committed to delivering solutions that are fast, affordable, and 
                built to last.
              </p>
              
              <div className="mission-highlights">
                <div className="highlight-item">
                  <Star className="w-5 h-5" />
                  <span>5-Star Customer Experience</span>
                </div>
                <div className="highlight-item">
                  <Shield className="w-5 h-5" />
                  <span>Data Security Guaranteed</span>
                </div>
                <div className="highlight-item">
                  <Zap className="w-5 h-5" />
                  <span>Same-Day Service Available</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30"
                  asChild
                >
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +965 5530 1913
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  asChild
                >
                  <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}