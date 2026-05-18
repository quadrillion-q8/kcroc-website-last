import { useState } from 'react';

export default function Index() {
  const [showGallery, setShowGallery] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const galleryImages = [
    { id: 1, src: "/images/photo1764802837.jpg", title: "Laptop Screen Replacement", category: "Laptop Repair" },
    { id: 2, src: "/images/DesktopRepair.jpg", title: "Desktop Hardware Upgrade", category: "Desktop Repair" },
    { id: 3, src: "/images/DataRecovery.jpg", title: "Data Recovery Process", category: "Data Recovery" },
    { id: 4, src: "/images/photo1764638717.jpg", title: "Virus Removal Service", category: "Software Repair" },
    { id: 5, src: "/images/SSDUpgrade.jpg", title: "SSD Installation", category: "Hardware Upgrade" },
    { id: 6, src: "/images/photo1764638717.jpg", title: "Motherboard Repair", category: "Advanced Repair" },
    { id: 7, src: "/images/Technician.jpg", title: "Our Expert Technician", category: "Team" },
    { id: 8, src: "/images/Technician.jpg", title: "KCROC Professional Service", category: "Business" },
    { id: 9, src: "/images/LaptopHingeRepair.jpg", title: "Laptop Hinge Repair - Before", category: "Hinge Repair" },
    { id: 10, src: "/images/HingeRepair.jpg", title: "Laptop Hinge Repair - After", category: "Hinge Repair" },
    { id: 11, src: "/images/Battery.jpg", title: "Battery Replacement Service", category: "Battery Repair" },
    { id: 12, src: "/images/BatteryReplacement.jpg", title: "New Battery Installation", category: "Battery Repair" },
    { id: 13, src: "/images/ChargerRepair.jpg", title: "Charger Port Repair", category: "Charging Issues" },
    { id: 14, src: "/images/PowerJackReplacement.jpg", title: "Power Jack Replacement", category: "Charging Issues" },
    { id: 15, src: "/images/photo1764638725.jpg", title: "Cooling Fan Cleaning", category: "Cooling System" },
    { id: 16, src: "/images/FanReplacement.jpg", title: "Fan Replacement Service", category: "Cooling System" },
    { id: 17, src: "https://i.postimg.cc/p9VW6DGg/Laptop-internal-Connector1.jpg", title: "Internal Connector Repair", category: "Internal Components" },
    { id: 18, src: "https://i.postimg.cc/yJ61bFpq/Laptop-internal-Connector2.jpg", title: "Cable Connection Service", category: "Internal Components" },
    { id: 19, src: "https://i.postimg.cc/t1RqMhvQ/Laptop-Keyboard1.jpg", title: "Keyboard Replacement", category: "Keyboard Repair" },
    { id: 20, src: "/images/KeyboardRepair.jpg", title: "New Keyboard Installation", category: "Keyboard Repair" },
    { id: 21, src: "/images/LCDScreenRepair.jpg", title: "LCD Screen Repair", category: "Screen Repair" },
    { id: 22, src: "/images/LCDScreenRepair.jpg", title: "Screen Replacement Complete", category: "Screen Repair" },
    { id: 23, src: "/images/MotherboardDiagnostics.jpg", title: "Motherboard Diagnostics", category: "Motherboard Repair" },
    { id: 24, src: "/images/photo1764803713.jpg", title: "Chip-Level Motherboard Repair", category: "Motherboard Repair" },
    { id: 25, src: "https://i.postimg.cc/3yr8cgfx/RAM1.jpg", title: "RAM Memory Upgrade", category: "Memory Upgrade" },
    { id: 26, src: "/images/MemoryUpgrade.jpg", title: "Memory Installation Complete", category: "Memory Upgrade" }
  ];

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = currentFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === currentFilter);
  const modalImage = activeModal ? galleryImages.find(img => img.id === activeModal) : null;

  const scrollToSection = (id: string) => {
    setShowGallery(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const device = formData.get('device');
    const issue = formData.get('issue');
    const message = `Hello! I need a quote for computer repair.%0A%0AName: ${name}%0APhone: ${phone}%0ADevice: ${device}%0AIssue: ${issue}`;
    window.open(`https://wa.me/96555301913?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/ComputerRepair.jpg" alt="KCROC Logo" className="w-16 h-16 object-contain bg-white/10 p-2 rounded-lg" />
              <div>
                <h1 className="text-lg font-bold">KCROC — Kuwait Computer Repair On Call</h1>
                <p className="text-sm text-emerald-100">Expert repairs • Free Pickup & Delivery • Data privacy</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="tel:+96555301913" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
                📞 Call
              </a>
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {!showGallery ? (
        <main className="pt-24">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4 py-16 text-center">
            <div className="max-w-5xl">
              <div className="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-full font-bold mb-6 animate-pulse-custom shadow-lg">
                🔥 SAME-DAY SERVICE AVAILABLE - CALL NOW!
              </div>
              <h1 className="text-5xl font-bold text-emerald-800 mb-4">Professional Computer Repair Services in Kuwait</h1>
              <p className="text-2xl text-emerald-700 font-semibold mb-4">Fast • Reliable • Affordable</p>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Expert laptop and computer repairs with free pickup & delivery across Kuwait. Your data privacy is our priority. Certified technicians with 10+ years experience.</p>
              
              <div className="flex gap-4 justify-center flex-wrap mb-12">
                <a href="tel:+96555301913" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg animate-pulse-custom">
                  📞 Call Now: +965 5530 1913
                </a>
                <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg">
                  💬 WhatsApp Us
                </a>
                <button onClick={() => scrollToSection('pricing')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg">
                  Get Free Quote
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: '🚚', title: 'Free Pickup & Delivery', desc: 'We come to you! Free pickup and delivery service across Kuwait.' },
                  { icon: '🔒', title: 'Data Privacy Guaranteed', desc: 'Your personal data and files are completely secure with us.' },
                  { icon: '⚡', title: 'Fast Turnaround', desc: 'Same-day service available for most repairs. Quick and efficient.' }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section id="why-choose" className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Why Choose KCROC?</h2>
                <p className="text-xl text-gray-600">Your trusted computer repair partner in Kuwait with proven expertise and customer satisfaction</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                  { number: '10+', label: 'Years Experience' },
                  { number: '5000+', label: 'Repairs Completed' },
                  { number: '98%', label: 'Customer Satisfaction' },
                  { number: '100%', label: 'Data Privacy' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border-2 border-emerald-600">
                    <div className="text-5xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                    <div className="text-emerald-800 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '✓', title: 'Certified Technicians', desc: 'Our team consists of certified professionals with extensive training in computer repair and diagnostics.' },
                  { icon: '🛡️', title: '90-Day Warranty', desc: 'All repairs come with a comprehensive 90-day warranty for your peace of mind.' },
                  { icon: '⏱️', title: 'Same-Day Service', desc: 'Most repairs completed within 24 hours. Same-day service available for urgent cases.' },
                  { icon: '💰', title: 'Transparent Pricing', desc: "No hidden fees. You'll know the exact cost before we start any repair work." },
                  { icon: '📍', title: 'All Kuwait Coverage', desc: 'We serve all areas across Kuwait with free pickup and delivery service.' },
                  { icon: '👥', title: 'Friendly Customer Service', desc: 'Our team is always ready to help with any questions or concerns you may have.' }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-xl border-l-4 border-emerald-600">
                    <div className="text-3xl">{benefit.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-emerald-800 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Common Repairs */}
          <section id="common-repairs" className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Common Computer Problems We Fix</h2>
                <p className="text-xl text-gray-600">From simple fixes to complex repairs, we handle all types of computer issues</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Broken/Cracked Screens', desc: 'LCD and LED screen replacement for laptops and all-in-one computers' },
                  { title: 'Slow Performance', desc: 'System optimization, RAM upgrades, and SSD installation for faster speeds' },
                  { title: 'Virus & Malware Removal', desc: 'Complete system cleaning and security software installation' },
                  { title: 'Data Recovery', desc: 'Recover lost files from damaged hard drives and corrupted systems' },
                  { title: 'Keyboard Not Working', desc: 'Keyboard replacement and repair for all laptop models' },
                  { title: 'Battery Issues', desc: 'Battery replacement and power management optimization' },
                  { title: 'Overheating Problems', desc: 'Fan cleaning, thermal paste replacement, and cooling system repair' },
                  { title: "Won't Turn On", desc: 'Power supply diagnosis and motherboard repair' },
                  { title: 'Broken Hinges', desc: 'Laptop hinge repair and replacement for all brands' },
                  { title: 'Charging Port Issues', desc: 'DC jack repair and charging port replacement' },
                  { title: 'Blue Screen Errors', desc: 'Windows troubleshooting and system repair' },
                  { title: 'Hardware Upgrades', desc: 'RAM, SSD, and hard drive upgrades for better performance' }
                ].map((repair, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border-2 border-transparent hover:border-emerald-600">
                    <h4 className="text-lg font-bold text-emerald-800 mb-2 flex items-center gap-2">
                      <span className="text-green-500 text-xl">✓</span>
                      {repair.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{repair.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section id="service-areas" className="py-20 px-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">We Serve All Kuwait</h2>
                <p className="text-xl text-emerald-100">Free pickup and delivery across all Kuwait governorates</p>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: 'Hawalli', note: 'Main Location' },
                  { name: 'Salmiya', note: 'Free Service' },
                  { name: 'Kuwait City', note: 'Free Service' },
                  { name: 'Jabriya', note: 'Free Service' },
                  { name: 'Farwaniya', note: 'Free Service' },
                  { name: 'Ahmadi', note: 'Free Service' },
                  { name: 'Mubarak Al-Kabeer', note: 'Free Service' },
                  { name: 'All Other Areas', note: 'Call for Details' }
                ].map((area, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-center border-2 border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">📍</div>
                    <h4 className="text-lg font-bold mb-1">{area.name}</h4>
                    <p className="text-emerald-100 text-sm">{area.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Our Professional Services</h2>
                <p className="text-xl text-gray-600">Comprehensive computer and laptop repair services for all your technical needs</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { img: "/images/photo1764802837.jpg", title: 'Laptop Repair', desc: 'Complete laptop repair services for all brands including HP, Dell, Lenovo, ASUS, Acer, and more.', features: ['Screen & LCD replacement', 'Keyboard & trackpad repair', 'Battery replacement', 'Performance tuning', 'Hinge repair'] },
                  { img: "/images/DesktopRepair.jpg", title: 'Desktop PC Repair', desc: 'Professional desktop computer diagnostics, hardware replacement, and system optimization.', features: ['Hardware diagnostics', 'Component replacement', 'System optimization', 'Virus removal', 'Custom PC building'] },
                  { img: "/images/DataRecovery.jpg", title: 'Data Recovery & Backup', desc: 'Professional data recovery services for damaged hard drives, corrupted files, and lost data.', features: ['Hard drive recovery', 'File restoration', 'System backup', 'Data migration', 'Emergency recovery'] },
                  { img: "/images/photo1764638717.jpg", title: 'Software & Virus Removal', desc: 'Complete virus removal, malware cleaning, and security setup to protect your system.', features: ['Virus removal', 'Security software', 'System cleaning', 'Privacy protection', 'Windows installation'] },
                  { img: "/images/SSDUpgrade.jpg", title: 'SSD & RAM Upgrades', desc: 'Hardware upgrades to dramatically boost your computer\'s speed and performance.', features: ['SSD installation', 'RAM upgrades', 'Performance boost', 'System optimization', 'All brands compatible'] },
                  { img: "/images/photo1764638717.jpg", title: 'Motherboard & Chip-Level Repair', desc: 'Advanced motherboard diagnostics and chip-level repairs for complex hardware issues.', features: ['Motherboard diagnostics', 'Chip-level repair', 'Component replacement', 'Circuit board repair', 'Power IC repair'] }
                ].map((service, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-emerald-600">
                    <img src={service.img} alt={service.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-emerald-800 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.desc}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, j) => (
                          <li key={j} className="text-gray-700 flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button onClick={() => setShowGallery(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg inline-flex items-center gap-3">
                  📸 View Our Work Gallery (26 Photos) →
                </button>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Transparent Pricing</h2>
                <p className="text-xl text-gray-600">No hidden fees. Know exactly what you're paying for before we start any work</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { title: 'Diagnostic Service', price: 'FREE', note: 'With any repair', features: ['Complete system diagnosis', 'Problem identification', 'Repair cost estimate', 'No obligation quote'], cta: 'Call for Diagnostic', link: 'tel:+96555301913', featured: false },
                  { title: 'Standard Repairs', price: '15-45 KD', note: 'Most common repairs', features: ['Screen replacement', 'Keyboard replacement', 'Battery replacement', 'Virus removal & cleanup', '90-day warranty included'], cta: 'Get Quote on WhatsApp', link: 'https://wa.me/96555301913', featured: true },
                  { title: 'Advanced Repairs', price: '50-150 KD', note: 'Complex repairs', features: ['Motherboard repair', 'Data recovery services', 'Chip-level repairs', 'Component replacement', '90-day warranty included'], cta: 'Call for Pricing', link: 'tel:+96555301913', featured: false }
                ].map((plan, i) => (
                  <div key={i} className={`bg-white rounded-xl p-8 text-center transition-all hover:-translate-y-2 ${plan.featured ? 'border-4 border-emerald-600 shadow-2xl relative' : 'border-2 border-gray-200 shadow-lg'}`}>
                    {plan.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm">MOST POPULAR</div>}
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">{plan.title}</h3>
                    <div className="text-5xl font-bold text-emerald-600 mb-2">{plan.price}</div>
                    <p className="text-gray-600 mb-6">{plan.note}</p>
                    <ul className="text-left space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-gray-700">
                          <span className="text-green-500 text-xl">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a href={plan.link} target={plan.link.startsWith('http') ? '_blank' : undefined} rel={plan.link.startsWith('http') ? 'noopener noreferrer' : undefined} className={`block w-full py-3 rounded-lg font-bold transition-all ${plan.featured ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                      {plan.cta}
                    </a>
                  </div>
                ))}
              </div>

              {/* Quote Form */}
              <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-emerald-800 text-center mb-6">Get a Free Quote</h3>
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">Your Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">Phone Number *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">Device Type *</label>
                    <select name="device" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-600 focus:outline-none">
                      <option value="">Select device type</option>
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Desktop PC</option>
                      <option value="all-in-one">All-in-One PC</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">Describe the Issue *</label>
                    <textarea name="issue" required rows={4} placeholder="Please describe what's wrong with your device..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-600 focus:outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2">
                    💬 Send Quote Request via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Owner */}
          <section id="owner" className="py-20 px-4 bg-slate-100">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <img src="/images/ComputerRepair.jpg" alt="Imran - Owner" className="w-64 h-64 rounded-full object-cover shadow-2xl" />
                <div>
                  <h2 className="text-3xl font-bold text-emerald-700 mb-4">A Message from the Owner</h2>
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">At KCROC, our mission is simple — to make computer repair fast, transparent, and reliable. With over 10 years of hands-on experience, I've seen every problem from burnt motherboards to lost data, and I understand how important your devices are to your life and business.</p>
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">Every repair is done with precision, honesty, and care — as if it were my own machine. We don't just fix computers; we build lasting relationships with our customers based on trust and quality service.</p>
                  <p className="text-gray-600 italic">– Imran, Founder & Lead Technician</p>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section id="reviews" className="py-20 px-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
                <p className="text-xl text-emerald-100">Real testimonials from satisfied customers across Kuwait</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Ahmed Hassan', location: 'Hawalli • Laptop Screen Repair', text: 'Excellent service! They fixed my laptop screen quickly and the price was very reasonable. Free pickup and delivery made it so convenient. Highly recommend KCROC!', avatar: 'AH' },
                  { name: 'Sara Mohammed', location: 'Salmiya • Virus Removal & RAM Upgrade', text: 'My computer was running very slow and had viruses. KCROC cleaned it up perfectly and now it runs like new. They also upgraded my RAM. Professional and trustworthy!', avatar: 'SM' },
                  { name: 'Khalid Al-Ahmad', location: 'Jabriya • Data Recovery Service', text: 'Professional service with great attention to data privacy. They recovered all my important files from a damaged hard drive. I\'m so grateful for their expertise!', avatar: 'KA' },
                  { name: 'Fatima Youssef', location: 'Kuwait City • Keyboard Replacement', text: 'Fast and efficient! My laptop keyboard stopped working and they replaced it the same day. The technician was very knowledgeable and friendly. Will definitely use again.', avatar: 'FY' }
                ].map((review, i) => (
                  <div key={i} className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="text-yellow-500 text-2xl mb-3">★★★★★</div>
                    <p className="text-gray-600 italic mb-4 leading-relaxed">{review.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">{review.avatar}</div>
                      <div>
                        <h4 className="font-bold text-emerald-800">{review.name}</h4>
                        <p className="text-sm text-gray-600">{review.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-20 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">Find answers to common questions about our computer repair services</p>
              </div>

              <div className="space-y-4">
                {[
                  { q: 'How long does a typical repair take?', a: 'Most repairs are completed within 24-48 hours. Simple repairs like virus removal or software installation can often be done the same day. More complex repairs like motherboard issues may take 3-5 days. We always provide an estimated completion time when you drop off your device.' },
                  { q: 'Do you offer a warranty on repairs?', a: "Yes! All our repairs come with a comprehensive 90-day warranty. If you experience any issues with the repaired component within 90 days, we'll fix it free of charge. This warranty covers parts and labor for the specific repair performed." },
                  { q: 'Is my data safe during the repair?', a: 'Absolutely! Data privacy is our top priority. We never access your personal files unless specifically requested for data recovery services. All our technicians sign confidentiality agreements, and we use secure procedures to protect your information throughout the repair process.' },
                  { q: 'Do you provide free pickup and delivery?', a: "Yes! We offer free pickup and delivery service across all Kuwait governorates. Simply call us or WhatsApp, and we'll arrange a convenient time to collect your device from your location. Once the repair is complete, we'll deliver it back to you at no extra charge." },
                  { q: 'What brands do you repair?', a: 'We repair all major laptop and desktop brands including HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI, Toshiba, Samsung, and more. Our technicians have experience with both Windows and Mac systems, as well as custom-built PCs.' },
                  { q: 'How much does a diagnostic cost?', a: "Our diagnostic service is completely FREE when you proceed with the repair. We'll thoroughly examine your device, identify all issues, and provide a detailed quote before starting any work. There's no obligation to proceed if you decide not to repair." },
                  { q: 'Can you recover data from a dead hard drive?', a: "In most cases, yes! We have specialized tools and expertise for data recovery from damaged, corrupted, or non-functioning hard drives. Our success rate is very high, though it depends on the extent of the damage. We'll assess your drive and provide an honest evaluation of recovery chances." },
                  { q: 'Do you use original parts?', a: "We always strive to use original manufacturer parts when available. For some repairs, we may use high-quality compatible parts that meet or exceed original specifications. We'll always inform you about the parts being used and give you options when available." }
                ].map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} className="w-full px-6 py-5 text-left font-bold text-lg text-emerald-800 hover:bg-gray-50 transition-all flex justify-between items-center">
                      {faq.q}
                      <span className={`text-2xl text-emerald-600 transition-transform ${activeFAQ === i ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeFAQ === i && (
                      <div className="px-6 pb-5">
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-emerald-700 mb-6">About KCROC</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>KCROC — Kuwait Computer Repair On Call — is Kuwait's leading professional tech service providing fast, affordable, and reliable computer and laptop repairs. Established over 10 years ago, we've built our reputation on quality workmanship, honest service, and customer satisfaction.</p>
                <p>We specialize in hardware upgrades, software troubleshooting, data recovery, and chip-level repairs for both individuals and businesses across Kuwait. Our certified technicians have extensive experience with all major brands and can handle everything from simple repairs to complex motherboard diagnostics.</p>
                <p>Our free pickup and delivery service saves you time and hassle, while our transparent diagnostics ensure you always know what's being repaired and why. We believe in technology that works for you — not against you.</p>
                <p>Whether you're a student, a small business, or a home user, our goal is to keep your devices running smoothly so you can stay productive and connected. With a 98% customer satisfaction rate and thousands of successful repairs, KCROC is the name you can trust for all your computer repair needs in Kuwait.</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Contact Us</h2>
                <p className="text-xl text-gray-600">Get in touch with KCROC for professional computer repair services across Kuwait</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-6">Get In Touch</h3>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: '📞', title: 'Phone', content: <a href="tel:+96555301913" className="text-gray-700 hover:text-emerald-600">+965 5530 1913</a> },
                      { icon: '✉️', title: 'Email', content: <a href="mailto:quadrillion1980@gmail.com" className="text-gray-700 hover:text-emerald-600">quadrillion1980@gmail.com</a> },
                      { icon: '📍', title: 'Address', content: <span className="text-gray-700">Basement Shop #4, Al Mullah Complex<br/>Ibn Khaldoun St., Hawalli, Kuwait</span> },
                      { icon: '💬', title: 'WhatsApp', content: <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-emerald-600">+965 5530 1913</a> }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-emerald-800 mb-1">{item.title}</h4>
                          <div>{item.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-600 mb-6">
                    <h4 className="font-bold text-emerald-800 mb-4">Operating Hours</h4>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between"><span>Saturday - Thursday</span><span>9:00 AM - 9:00 PM</span></div>
                      <div className="flex justify-between"><span>Friday</span><span>2:00 PM - 9:00 PM</span></div>
                      <div className="flex justify-between"><span className="font-semibold text-emerald-600">Emergency Service</span><span className="font-semibold text-emerald-600">Available 24/7</span></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-emerald-800 mb-4">Follow Us on Social Media</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Facebook', icon: '📘', link: 'https://www.facebook.com/profile.php?viewas=100000686899395&id=100080636080738', color: 'bg-blue-600' },
                        { name: 'Instagram', icon: '📷', link: 'https://www.instagram.com/quadrillion.q8/', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
                        { name: 'Google Reviews', icon: '⭐', link: 'https://share.google/i4tn6GTq72hmt9T8w', color: 'bg-red-600' },
                        { name: 'TikTok', icon: '🎵', link: 'https://www.tiktok.com/@computer.q8', color: 'bg-black' }
                      ].map((social, i) => (
                        <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className={`${social.color} text-white p-4 rounded-lg hover:opacity-90 transition-all flex items-center gap-3 shadow-lg`}>
                          <span className="text-2xl">{social.icon}</span>
                          <span className="font-semibold">{social.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.9771439412793!2d48.0102713!3d29.3416656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b4a9072aacd%3A0x368691a3a1f0ca66!2sKuwait%20Computer%20Repair%20on%20Call!5e0!3m2!1sen!2skw!4v1763685269194!5m2!1sen!2skw" className="w-full h-full min-h-[500px]" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="pt-24">
          <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <button onClick={() => setShowGallery(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold mb-6">← Back to Home</button>
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Our Work Gallery</h2>
                <p className="text-xl text-gray-600">See our professional computer repair services in action. From laptop repairs to data recovery, we handle every job with precision and care.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setCurrentFilter(cat)} className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentFilter === cat ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {filteredImages.map(img => (
                  <div key={img.id} onClick={() => setActiveModal(img.id)} className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2 group">
                    <img src={img.src} alt={img.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-semibold inline-block mb-2 w-fit">{img.category}</span>
                      <h4 className="text-white font-semibold">{img.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { number: '26+', label: 'Repair Photos' },
                  { number: '10', label: 'Service Types' },
                  { number: '5000+', label: 'Repairs Done' },
                  { number: '98%', label: 'Success Rate' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/ComputerRepair.jpg" alt="KCROC Logo" className="w-12 h-12 object-contain bg-white/10 p-2 rounded-lg" />
                <div>
                  <h3 className="font-bold text-lg">KCROC</h3>
                  <p className="text-sm text-slate-300">Kuwait Computer Repair On Call</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">Professional computer and laptop repair services across Kuwait. We provide fast, reliable repairs with free pickup and delivery.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['home', 'services', 'pricing', 'reviews', 'faq', 'contact'].map(link => (
                  <button key={link} onClick={() => scrollToSection(link)} className="block text-slate-300 hover:text-white transition-colors capitalize">{link}</button>
                ))}
                <button onClick={() => setShowGallery(true)} className="block text-slate-300 hover:text-white transition-colors">Gallery</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-slate-300 text-sm">
                <p><strong>Phone:</strong><br/><a href="tel:+96555301913" className="hover:text-white">+965 5530 1913</a></p>
                <p><strong>Email:</strong><br/><a href="mailto:quadrillion1980@gmail.com" className="hover:text-white">quadrillion1980@gmail.com</a></p>
                <p><strong>Address:</strong><br/>Basement Shop #4, Al Mullah Complex<br/>Ibn Khaldoun St., Hawalli, Kuwait</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Business Hours</h4>
              <div className="space-y-2 text-slate-300 text-sm">
                <p>Saturday - Thursday<br/>9:00 AM - 9:00 PM</p>
                <p>Friday<br/>2:00 PM - 9:00 PM</p>
                <p className="text-green-400 font-semibold">Emergency Service Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>© 2025 KCROC — Kuwait Computer Repair On Call. All rights reserved.</p>
            <p className="mt-2">Professional computer repair services across Kuwait | Same-day service available</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a href="tel:+96555301913" className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl transition-all hover:-translate-y-1">
          📞
        </a>
        <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl transition-all hover:-translate-y-1">
          💬
        </a>
      </div>

      {/* Modal */}
      {activeModal && modalImage && (
        <div onClick={() => setActiveModal(null)} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-2xl z-10">×</button>
            <img src={modalImage.src} alt={modalImage.title} className="w-full max-h-[70vh] object-contain" />
            <div className="p-6">
              <span className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-semibold inline-block mb-2">{modalImage.category}</span>
              <h3 className="text-2xl font-bold text-emerald-800">{modalImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}