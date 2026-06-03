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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2">
            🏆 Kuwait's Most Trusted Tech Clinic
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet the Team Behind
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"> KCROC's Success</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Founded in 2019, KCROC has grown from a small repair shop to Kuwait's most trusted 
            computer repair service. Our mission is simple: deliver world-class technical 
            solutions with unmatched customer care.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <Card key={index} className="bg-gray-900/40 border border-gray-800/80 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                    <stat.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
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
              <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-8">
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
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Leadership Team</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Meet the experts who make KCROC the most trusted name in computer repair across Kuwait.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Founder & CEO - Imran Natiq */}
            <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4"
                    alt="Imran Natiq - Founder & CEO of KCROC"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=Imran+Natiq&size=300&background=00D9FF&color=0A0A0A&bold=true&format=png";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 to-transparent h-24"></div>
                  <Badge className="absolute top-4 left-4 bg-cyan-500/90 text-white border-0">
                    Founder & CEO
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Imran Natiq</h3>
                  <p className="text-cyan-400 text-sm font-medium mb-4">Founder & Chief Executive Officer</p>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Experienced technician with years in Kuwait's computer repair market. Specializes in honest diagnostics, data safety, and customer education. Committed to transparent service and building long-term trust with every client.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs">Honest Diagnostics</Badge>
                    <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs">Data Safety</Badge>
                    <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs">Customer Trust</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Co-Founder & CTO - Riyaz Kawa */}
            <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Co-Founder-Image_salp7t"
                    alt="Riyaz Kawa - Co-Founder & CTO of KCROC"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=Riyaz+Kawa&size=300&background=00D9FF&color=0A0A0A&bold=true&format=png";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 to-transparent h-24"></div>
                  <Badge className="absolute top-4 left-4 bg-emerald-500/90 text-white border-0">
                    Co-Founder & CTO
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Riyaz Kawa</h3>
                  <p className="text-emerald-400 text-sm font-medium mb-4">Co-Founder & Chief Technology Officer</p>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Technical lead specializing in advanced troubleshooting and performance optimization. Expert in gaming laptops, high-end systems, and complex motherboard repairs. Passionate about delivering cutting-edge solutions.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs">Advanced Troubleshooting</Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs">Gaming Systems</Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs">Performance Optimization</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The principles that guide every decision and interaction at KCROC.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="bg-gray-900/40 border border-gray-800/80 rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={value.image}
                    alt={`${value.title} - KCROC core value`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-cyan-500/20 backdrop-blur-sm p-3 rounded-xl border border-cyan-500/30">
                      <value.icon className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl overflow-hidden">
            <div className="relative">
              <img 
                src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/bf5e121b-f089-4df1-8bbb-61da3dd1e2ac.png"
                alt="Kuwait City skyline at sunset - KCROC serving all of Kuwait"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-cyan-300 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Serving All Kuwait Governorates</span>
                </div>
              </div>
            </div>
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                To provide Kuwait with the most reliable, efficient, and customer-focused computer 
                repair services. We believe technology should enhance your life, not complicate it. 
                That's why we're committed to delivering solutions that are fast, affordable, and 
                built to last.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">5-Star Customer Experience</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Data Security Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Same-Day Service Available</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl"
                  asChild
                >
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +965 5530 1913
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl"
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