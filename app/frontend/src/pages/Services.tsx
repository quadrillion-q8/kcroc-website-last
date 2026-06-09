import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Laptop, Monitor, HardDrive, Wrench, Network, Printer, 
  Apple, Clock, DollarSign, CheckCircle, Phone, MessageCircle 
} from 'lucide-react';

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
      approach: 'We start with comprehensive hardware testing to identify the root cause. Our technicians use genuine or high-grade compatible parts and explain all issues before proceeding with repairs. Data safety is our priority throughout the process.',
      turnaround: 'Most initial assessments same-day, common repairs within 24-48 hours',
      startingPrice: '15',
      features: [
        'Screen replacement (LCD/LED)',
        'Keyboard and touchpad repair',
        'Battery replacement',
        'Charging port repair',
        'Motherboard assessment',
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
      approach: 'We perform detailed hardware testing, thermal analysis, and component inspection. Services include cleaning, thermal paste replacement, component upgrades, and complete system optimization with driver updates.',
      turnaround: 'Desktop inspection typically same-day, repairs 1-3 days depending on parts',
      startingPrice: '20',
      features: [
        'Custom PC builds',
        'Gaming PC optimization',
        'Hardware upgrades',
        'System assessment',
        'Cable management',
        'Performance tuning'
      ]
    },
    {
      id: 'macbook-apple',
      title: 'MacBook & Apple Device Repair',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
      description: 'Specialized MacBook repair services including screen replacement, battery replacement, and logic board repair.',
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
      approach: 'Our technicians use specialized tools and genuine Apple parts where possible. We handle all MacBook models including Air, Pro, and newer M-series models with expertise in logic board micro-soldering.',
      turnaround: 'MacBook inspection 1-2 days, repairs 2-5 days depending on parts',
      startingPrice: '30',
      features: [
        'Retina display replacement',
        'Battery replacement',
        'Keyboard repair',
        'Logic board assessment',
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
      approach: 'We use advanced data recovery tools and clean facilities for physical drive repairs. Our process includes drive imaging, file system analysis, and secure data extraction with complete confidentiality.',
      turnaround: 'Initial assessment 1-2 days, recovery time varies based on damage (2-7 days typical)',
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
        'Security and firewall setup',
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
    <div className="w-full bg-slate-950 text-white font-sans">
      <Helmet>
        <title>All Computer Repair Services | KCROC Kuwait</title>
        <meta name="description" content="View all computer, laptop, and MacBook repair services offered by KCROC in Kuwait. We fix motherboards, screens, batteries, and recover data." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Wrench size={14} />
            <span>Our Complete Service Catalog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Hardware Solutions</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive laptop, desktop, and MacBook engineering services in Kuwait with free pickup and delivery across all governorates.
          </p>
        </div>
      </section>

      {/* Services Master Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} id={service.id} className="scroll-mt-32">
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    
                    {/* Image Half */}
                    <div className="relative h-64 lg:h-auto border-b lg:border-b-0 lg:border-r border-slate-800">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                          <Icon className="w-8 h-8 text-cyan-400" />
                        </div>
                      </div>
                    </div>

                    {/* Content Half */}
                    <div className="p-8 lg:p-10 flex flex-col h-full">
                      <div className="mb-8">
                        <h2 className="text-3xl font-black text-white mb-4">{service.title}</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">{service.description}</p>
                      </div>

                      {/* Common Issues */}
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          Common Issues We Resolve:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.commonIssues.map((issue, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                              <span className="text-emerald-400 mt-1">•</span>
                              <span>{issue}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Approach Panel */}
                      <div className="mb-8 p-6 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                        <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest mb-2">Our Engineering Approach</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{service.approach}</p>
                      </div>

                      {/* Turnaround & Price Footer */}
                      <div className="mt-auto pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-start gap-3">
                          <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                          <div>
                            <h5 className="text-white font-bold mb-1">Turnaround Time</h5>
                            <p className="text-slate-400 text-sm">{service.turnaround}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <DollarSign className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                          <div>
                            <h5 className="text-white font-bold mb-1">Starting Price</h5>
                            <p className="text-emerald-400 font-black text-xl mb-1">{service.startingPrice} KD</p>
                            <Link to="/pricing" className="text-slate-500 text-xs hover:text-cyan-400 transition-colors">View detailed pricing →</Link>
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a 
                          href="tel:+96555301913" 
                          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl py-3 px-6 transition-all flex-1 border border-slate-700"
                        >
                          <Phone className="w-5 h-5" /> Call Now
                        </a>
                        <a 
                          href={`https://wa.me/96555301913?text=${encodeURIComponent(`Hi! I need ${service.title.toLowerCase()} service. Please arrange free pickup.`)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl py-3 px-6 transition-all flex-1 shadow-lg shadow-emerald-900/20"
                        >
                          <MessageCircle className="w-5 h-5" /> WhatsApp Us
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Jump Menu / Sticky Footer Alternative */}
      <section className="py-16 px-6 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Service Quick Links</h2>
            <p className="text-slate-400 text-sm">Jump directly to the hardware solution you need.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800 px-5 py-3 rounded-full transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 font-medium text-sm">{service.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Massive CTA */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-12 rounded-3xl">
          <h2 className="text-4xl font-black mb-6 text-white">Device Failing? We Can Fix It.</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Contact KCROC today for expert hardware repair with free pickup and delivery across all Kuwait governorates. If we can't fix it, you pay nothing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full px-8 py-4 text-lg border border-slate-700 transition-all">
              <Phone className="w-5 h-5" /> 5530 1913
            </a>
            <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-8 py-4 text-lg transition-all shadow-lg">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
