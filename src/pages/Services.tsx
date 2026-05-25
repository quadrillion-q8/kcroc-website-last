import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Laptop, Monitor, HardDrive, Wrench, Network, Printer, Apple, Clock, DollarSign, CheckCircle, Phone, MessageCircle } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'laptop-repair',
      title: 'Laptop Repair',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
      description: 'Complete laptop repair services for all brands including Dell, HP, Lenovo, Acer, ASUS, and more.',
      commonIssues: [
        'No power or won\'t turn on',
        'Random shutdowns and restarts',
        'Fan noise and overheating',
        'Windows not booting or blue screen',
        'Slow performance and freezing',
        'Display artifacts or flickering',
        'Liquid damage and corrosion',
        'Broken hinges and casing'
      ],
      approach: 'We start with comprehensive diagnostics to identify the root cause. Our technicians use genuine or high-grade compatible parts and explain all issues before proceeding with repairs. Data safety is our priority throughout the process.',
      turnaround: 'Most laptop diagnostics same-day, common repairs within 24-48 hours',
      startingPrice: '15',
      features: [
        'Screen replacement (LCD/LED)',
        'Keyboard and touchpad repair',
        'Battery replacement',
        'Charging port repair',
        'Motherboard diagnostics',
        'Hinge and casing repair'
      ]
    },
    {
      id: 'desktop-gaming',
      title: 'Desktop & Gaming PC Repair',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=600',
      description: 'Expert desktop and gaming PC repair, custom builds, and performance optimization for home and office users.',
      commonIssues: [
        'Random shutdowns and blue screens',
        'Overheating from Kuwait heat',
        'Power supply failures',
        'Noisy or failing fans',
        'Graphics card issues',
        'Slow boot and performance',
        'Storage drive failures',
        'RAM and memory errors'
      ],
      approach: 'We perform detailed hardware diagnostics, thermal testing, and component analysis. Services include cleaning, thermal paste replacement, component upgrades, and complete system optimization with driver updates.',
      turnaround: 'Desktop diagnostics typically same-day, repairs 1-3 days depending on parts availability',
      startingPrice: '20',
      features: [
        'Custom PC builds',
        'Gaming PC optimization',
        'Hardware upgrades',
        'System diagnostics',
        'Cable management',
        'Performance tuning'
      ]
    },
    {
      id: 'macbook-apple',
      title: 'MacBook & Apple Device Repair',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
      description: 'Specialized MacBook repair services including screen replacement, battery replacement, and logic board diagnostics.',
      commonIssues: [
        'Cracked or broken Retina display',
        'Battery swelling or not charging',
        'Keyboard issues (butterfly/scissor)',
        'Trackpad not clicking properly',
        'Liquid damage repair',
        'macOS not booting or crashing',
        'Overheating and thermal throttling',
        'USB-C port failures'
      ],
      approach: 'Our Apple-certified technicians use specialized tools and genuine Apple parts where possible. We handle all MacBook models including Air, Pro, and newer M1/M2 chip models with expertise in logic board micro-soldering.',
      turnaround: 'MacBook diagnostics 1-2 days, repairs 2-5 days depending on parts availability',
      startingPrice: '30',
      features: [
        'Retina display replacement',
        'Battery replacement',
        'Keyboard repair',
        'Logic board diagnostics',
        'SSD upgrade',
        'macOS installation'
      ]
    },
    {
      id: 'data-recovery',
      title: 'Data Recovery',
      icon: HardDrive,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
      description: 'Professional data recovery services for damaged hard drives, corrupted files, and accidental deletions.',
      commonIssues: [
        'Hard drive clicking or not detected',
        'SSD failure or corruption',
        'Accidentally deleted files',
        'Formatted drives',
        'Corrupted operating system',
        'Ransomware encrypted files',
        'Physical drive damage',
        'RAID array failures'
      ],
      approach: 'We use advanced data recovery tools and clean room facilities for physical drive repairs. Our process includes drive imaging, file system analysis, and secure data extraction with complete confidentiality.',
      turnaround: 'Initial assessment 1-2 days, recovery time varies based on damage severity (2-7 days typical)',
      startingPrice: '50',
      features: [
        'Hard drive recovery',
        'SSD data recovery',
        'Deleted file recovery',
        'Corrupted data repair',
        'Backup solutions',
        'Cloud migration'
      ]
    },
    {
      id: 'onsite-support',
      title: 'On-Site Business IT Support',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
      description: 'On-site computer repair and IT support for businesses across Kuwait. We come to your office.',
      commonIssues: [
        'Network connectivity problems',
        'Server downtime and crashes',
        'Email and communication issues',
        'Printer and peripheral setup',
        'Workstation performance issues',
        'Software installation and updates',
        'Security and antivirus setup',
        'Backup system configuration'
      ],
      approach: 'Our technicians visit your business location in Hawalli, Salmiya, Kuwait City, or anywhere in Kuwait. We provide rapid response for critical business systems with minimal downtime and professional service.',
      turnaround: 'Emergency on-site service available same-day, scheduled visits within 24 hours',
      startingPrice: '40',
      features: [
        'Network troubleshooting',
        'Server maintenance',
        'Workstation setup',
        'Printer configuration',
        'Software deployment',
        'Security audits'
      ]
    },
    {
      id: 'printer-setup',
      title: 'Printer Setup & Repair',
      icon: Printer,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
      description: 'Complete printer repair, setup, and configuration services for all printer brands and models.',
      commonIssues: [
        'Printer not connecting to network',
        'Print quality issues and streaks',
        'Paper jam errors',
        'Driver installation problems',
        'Wireless printing setup',
        'Scanner not working',
        'Cartridge recognition errors',
        'Slow printing speed'
      ],
      approach: 'We handle all printer brands including HP, Canon, Epson, Brother, and Samsung. Services include network configuration, driver installation, print quality optimization, and maintenance.',
      turnaround: 'Printer setup typically same-day, repairs 1-2 days',
      startingPrice: '15',
      features: [
        'Printer repair and maintenance',
        'Network printer configuration',
        'Driver installation',
        'Cartridge replacement',
        'Scanner setup',
        'Wireless printing setup'
      ]
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-gradient-to-br from-slate-900 via-blue-900/20 to-emerald-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              🔧 Our Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="gradient-text">Computer Repair</span> Services
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive laptop, desktop, and MacBook repair services in Kuwait with free pickup and delivery across all governorates
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={service.id} id={service.id} className="scroll-mt-20">
                  <Card className="glass-card overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-64 lg:h-auto">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>
                        <div className="absolute top-6 left-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center neon-glow-blue">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-8">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="text-3xl font-black text-white mb-3">
                            {service.title}
                          </CardTitle>
                          <p className="text-slate-300 text-lg">{service.description}</p>
                        </CardHeader>

                        {/* Common Issues */}
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            Common Issues We Fix:
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {service.commonIssues.map((issue, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Approach */}
                        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                          <h4 className="text-lg font-bold text-white mb-2">Our Approach:</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{service.approach}</p>
                        </div>

                        {/* Turnaround & Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                            <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                              <h5 className="text-white font-semibold text-sm mb-1">Turnaround Time:</h5>
                              <p className="text-slate-300 text-xs">{service.turnaround}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                            <DollarSign className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <div>
                              <h5 className="text-white font-semibold text-sm mb-1">Starting Price:</h5>
                              <p className="text-emerald-400 font-bold text-lg">{service.startingPrice} KD</p>
                              <Link to="/pricing" className="text-cyan-400 text-xs hover:text-cyan-300">
                                View full pricing →
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 flex-1">
                            <a href="tel:+96555301913">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </a>
                          </Button>
                          <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex-1">
                            <a href={`https://wa.me/96555301913?text=I need ${service.title.toLowerCase()} service. Please arrange free pickup.`} target="_blank" rel="noopener noreferrer">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links to Services */}
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Jump to <span className="gradient-text">Specific Service</span>
            </h2>
            <p className="text-slate-300">Quick navigation to find exactly what you need</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="glass-card hover-lift p-4 rounded-xl text-center transition-all duration-300 hover:border-cyan-400"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">{service.title}</h4>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="container mx-auto px-4">
          <Card className="glass-card max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Need Professional Computer Repair?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Contact KCROC today for expert repair services with free pickup and delivery across Kuwait. Same-day diagnostics available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-6 text-lg">
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +965 5530 1913
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-6 text-lg">
                  <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            See Our Work in Action
          </h3>
          <p className="text-slate-300 mb-6">
            Browse our gallery to see real repair work and customer results
          </p>
          <Button asChild variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
            <Link to="/gallery">
              View Our Work Gallery
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}