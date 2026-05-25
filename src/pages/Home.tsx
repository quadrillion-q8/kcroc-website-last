import { Phone, Clock, Shield, Wrench, Laptop, Monitor, HardDrive, Cpu, MapPin, Truck, Award, Zap, Users, Star, CheckCircle, Printer, MessageCircle, DollarSign, ThumbsUp, Package, Gauge, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsAnimated(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const trustStats = [
    { icon: Users, number: 500, suffix: '+', label: 'Repairs Completed' },
    { icon: Award, number: 98, suffix: '%', label: 'Success Rate' },
    { icon: Truck, number: 0, suffix: 'KD', label: 'Free Pick & Drop' },
    { icon: Shield, number: 90, suffix: ' Days', label: 'Warranty' },
  ];

  const whyKCROC = [
    {
      icon: Truck,
      title: 'Free Pickup & Delivery',
      description: 'Across all Kuwait governorates',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Package,
      title: 'Genuine Parts',
      description: 'Genuine or high-grade compatible parts',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: ThumbsUp,
      title: 'Clear Explanations',
      description: 'Issues explained before any repair',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: '90-Day Warranty',
      description: 'Extended warranty on all repairs',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Sparkles,
      title: 'Gaming & MacBook Specialists',
      description: 'Experts in gaming laptops and MacBooks',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Gauge,
      title: 'Same/Next-Day Service',
      description: 'Fast turnaround for most jobs',
      gradient: 'from-cyan-500 to-cyan-600'
    }
  ];

  const startingPrices = [
    {
      service: 'Laptop Format & Windows Reinstall',
      price: '15',
      icon: Laptop,
      description: 'Complete OS installation with drivers'
    },
    {
      service: 'Laptop Screen Replacement',
      price: '20',
      icon: Monitor,
      description: 'Model dependent, genuine parts',
      note: '(model dependent)'
    }
  ];

  const commonRepairs = [
    { 
      title: 'Power Issues', 
      description: 'Won\'t turn on, charging problems, dead battery',
      icon: '⚡',
      problems: ['No power', 'Won\'t charge', 'Battery drain']
    },
    { 
      title: 'Performance Lag', 
      description: 'Slow system, freezing, hanging issues',
      icon: '🚀',
      problems: ['Slow boot', 'Freezing', 'Hanging']
    },
    { 
      title: 'System Crashes', 
      description: 'Random shutdowns, blue screens, restarts',
      icon: '💥',
      problems: ['Blue screen', 'Sudden shutdown', 'Restart loop']
    },
    { 
      title: 'Overheating', 
      description: 'Fan noise, thermal throttling, hot chassis',
      icon: '🔥',
      problems: ['Loud fan', 'Hot laptop', 'Thermal issues']
    },
    { 
      title: 'Display Issues', 
      description: 'Cracked screen, no display, flickering',
      icon: '🖥️',
      problems: ['Broken screen', 'No display', 'Flickering']
    },
    { 
      title: 'Liquid Damage', 
      description: 'Water spills, liquid exposure, corrosion',
      icon: '💧',
      problems: ['Water damage', 'Spill repair', 'Corrosion']
    }
  ];

  const serviceAreas = [
    { name: 'Hawalli', icon: '🏘️' },
    { name: 'Salmiya', icon: '🏙️' },
    { name: 'Farwaniya', icon: '🏡' },
    { name: 'Kuwait City', icon: '🏛️' },
    { name: 'Jahra', icon: '🏖️' },
    { name: 'Ahmadi', icon: '🌆' },
    { name: 'Mubarak Al-Kabeer', icon: '🏠' }
  ];

  const reviews = [
    { 
      name: 'Ahmed Al-Mutairi', 
      rating: 5, 
      text: 'Outstanding service! They fixed my gaming PC tower quickly and professionally. The team knows their stuff and prices are very reasonable.', 
      date: '2 weeks ago',
      repair: 'Gaming PC Tower',
      googleReviewUrl: 'https://www.google.com/maps/contrib/117628843778096128332/reviews?hl=en-GB'
    },
    { 
      name: 'Sarah Abdullah', 
      rating: 5, 
      text: 'Excellent repair work on my Predator Helios laptop. Fast, reliable service with great customer support. Highly recommend KCROC!', 
      date: '1 month ago',
      repair: 'Predator Helios Repair',
      googleReviewUrl: 'https://www.google.com/maps/contrib/112755757920113095727/reviews?hl=en-GB'
    },
    { 
      name: 'Mohammed Hassan', 
      rating: 5, 
      text: 'Amazing experience! They repaired my gaming laptop perfectly and the service was incredibly fast. Great value for money.', 
      date: '3 weeks ago',
      repair: 'Gaming Laptop',
      googleReviewUrl: 'https://www.google.com/maps/contrib/114373482485141892486/reviews?hl=en-GB'
    },
    { 
      name: 'Fatima Al-Rashid', 
      rating: 5, 
      text: 'Professional service for my Alienware laptop repair. The technicians are skilled and the turnaround time was impressive.', 
      date: '1 week ago',
      repair: 'Alienware Laptop',
      googleReviewUrl: 'https://www.google.com/maps/contrib/104711687171275411574/reviews?hl=en-GB'
    },
    { 
      name: 'Khalid Ibrahim', 
      rating: 5, 
      text: 'Honest and reliable laptop repair service. They diagnosed the issue correctly and fixed it at a fair price. Very satisfied!', 
      date: '2 weeks ago',
      repair: 'Laptop Repair',
      googleReviewUrl: 'https://www.google.com/maps/contrib/112677222563093992279/reviews?hl=en-GB'
    },
    { 
      name: 'Noor Al-Salem', 
      rating: 5, 
      text: 'Same-day MacBook repair service was fantastic! Professional team, quick turnaround, and excellent results. Definitely coming back.', 
      date: '3 days ago',
      repair: 'MacBook Repair',
      googleReviewUrl: 'https://www.google.com/maps/contrib/112548726765708055722/reviews?hl=en-GB'
    },
  ];

  const faqs = [
    {
      question: 'Do you offer free pickup and delivery in Kuwait?',
      answer: 'Yes! We provide completely free pickup and delivery service across all Kuwait governorates including Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, and Mubarak Al-Kabeer.'
    },
    {
      question: 'How long do repairs usually take?',
      answer: 'Most laptop diagnostics are completed same-day. Common repairs like screen replacement, battery replacement, or Windows reinstall typically take 24-48 hours. Complex motherboard repairs may take 3-5 days.'
    },
    {
      question: 'Is my data safe during repair?',
      answer: 'Absolutely. Data safety is our top priority. We never access, copy, or modify your personal files. For repairs requiring data backup, we inform you first and get your explicit permission.'
    },
    {
      question: 'Do you repair Apple MacBooks?',
      answer: 'Yes, we specialize in MacBook repairs including screen replacement, battery replacement, keyboard repair, liquid damage repair, and logic board diagnostics for all MacBook models.'
    },
    {
      question: 'Do you repair gaming PCs and custom builds?',
      answer: 'Yes! We are experts in gaming laptop and desktop PC repair. We handle high-performance systems including Alienware, ASUS ROG, MSI, Predator, and custom-built gaming rigs.'
    },
    {
      question: 'What areas of Kuwait do you cover?',
      answer: 'We serve all Kuwait governorates: Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, and Mubarak Al-Kabeer with free pickup and delivery service.'
    },
    {
      question: 'Do you offer emergency or after-hours service?',
      answer: 'Yes, we offer emergency service for critical business systems or urgent home office issues in Kuwait. Contact us at +965 5530 1913 for emergency support.'
    }
  ];

  const Counter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!statsAnimated) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, statsAnimated]);

    return <span className="counter">{count}{suffix}</span>;
  };

  return (
    <>
      {/* Hero Section with CTAs */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900/20 to-emerald-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEQ5RkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Expert <span className="gradient-text">Laptop & Computer</span><br />Repair in Kuwait
              </h1>
              <p className="text-xl md:text-2xl text-emerald-400 font-semibold">
                Call or WhatsApp now for same-day diagnosis and free pickup anywhere in Kuwait
              </p>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Serving all Kuwait: Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, Mubarak Al-Kabeer – with free pickup and delivery
              </p>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
              >
                <a href="tel:+96555301913">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +965 5530 1913
                </a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
              >
                <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Starting Prices Section */}
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              <span className="gradient-text">Transparent Pricing</span> – No Hidden Fees
            </h2>
            <p className="text-xl text-slate-300">
              Starting prices for our most popular services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {startingPrices.map((item, index) => (
              <Card key={index} className="glass-card hover-lift border-emerald-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center neon-glow-blue flex-shrink-0">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{item.service}</h3>
                      <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black gradient-text">Starting {item.price} KD</span>
                        {item.note && <span className="text-sm text-slate-400">{item.note}</span>}
                      </div>
                      <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mt-2 inline-block">
                        View full pricing →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why KCROC vs Other Shops */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Why <span className="gradient-text-purple">KCROC</span> vs Other Shops?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience the KCROC difference with premium service and unmatched expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyKCROC.map((benefit, index) => (
              <div key={index} className={`glass-card hover-lift p-6 rounded-xl border-l-4 border-purple-500 stagger-animation stagger-delay-${(index % 3) + 1}`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-4 neon-glow-blue`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2 text-lg">{benefit.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laptop Repair Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-xl hover-lift">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                <span className="gradient-text">Laptop Repair</span> in Kuwait
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Professional laptop repair in Kuwait for all brands – broken screen, keyboard problems, battery issues, Windows errors, and slow performance. Service is available in Hawalli and all nearby areas, with fast pickup or on-site visit when possible. Get your laptop running like new again without losing your important files.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Common Laptop Problems We Fix:</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Broken or cracked screens
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Battery not charging or draining fast
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Keyboard or touchpad issues
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Slow performance and freezing
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Windows not booting or crashing
                  </li>
                </ul>
              </div>

              <Button asChild className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                <a href="https://wa.me/96555301913?text=I need laptop repair. Please arrange free pickup.">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Call or WhatsApp now to book free pickup
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop & Gaming PC Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900/10 via-slate-900 to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-xl hover-lift">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                <span className="gradient-text">Desktop & Gaming PC</span> Repair Kuwait
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Desktop and gaming PC repair for home and office users in Kuwait. Fixing random shutdowns, overheating from Kuwait heat, blue screens, power issues, and noisy fans. Services include cleaning and thermal paste replacement, SSD and RAM upgrades, graphics card troubleshooting, and complete Windows reinstall with drivers and updates.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Desktop & Gaming PC Services:</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Random shutdowns and blue screens
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Overheating and thermal issues
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Graphics card troubleshooting
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    SSD and RAM upgrades
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Complete system optimization
                  </li>
                </ul>
              </div>

              <Button asChild className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                <a href="https://wa.me/96555301913?text=I need desktop PC repair. Please arrange free pickup.">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Call or WhatsApp now to book free pickup
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* On-Site Service Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-xl hover-lift">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                <span className="gradient-text">On-Site Computer Repair</span> in Hawalli & All Kuwait
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                On-site computer repair service anywhere in Kuwait – Hawalli, Salmiya, Kuwait City, Farwaniya, and more. A technician comes to your home or office to diagnose and repair laptops, desktops, and small business PCs. Ideal for customers who need fast help without disconnecting cables or carrying heavy computers to a shop.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">On-Site Service Benefits:</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    No need to disconnect cables
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Technician comes to you
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Business IT support available
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Network setup and troubleshooting
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    Same-day service available
                  </li>
                </ul>
              </div>

              <Button asChild className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                <a href="https://wa.me/96555301913?text=I need on-site computer repair service.">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Call or WhatsApp now to book free pickup
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-emerald-900/10 to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Kuwait Computer Repair On Call
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Kuwait's most trusted computer repair clinic with professional service
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {trustStats.map((stat, index) => (
              <div key={index} className={`glass-card hover-lift text-center p-6 rounded-xl stagger-animation stagger-delay-${index + 1}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow-blue">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black gradient-text mb-2">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Repairs */}
      <section className="py-20 bg-gradient-to-br from-emerald-900/10 via-slate-900 to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              <span className="gradient-text">Professional Solutions</span> for Every Problem
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Advanced diagnostics and quality repairs for all computer issues
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonRepairs.map((repair, index) => (
              <Link 
                key={index} 
                to="/services"
                className={`glass-card hover-lift p-6 rounded-xl stagger-animation stagger-delay-${(index % 3) + 1} block transition-all duration-300 hover:border-cyan-400`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{repair.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-2 text-lg flex items-center gap-2">
                      {repair.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-3">{repair.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {repair.problems.map((problem, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {problem}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About the Team */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/10 to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Meet <span className="gradient-text-purple">Our Expert Team</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experienced technicians dedicated to honest diagnostics and quality service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Founder & CEO */}
            <Card className="glass-card hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-emerald-500/30">
                  <img 
                    src="https://i.postimg.cc/rFcfQZhj/KCROC_Owner_Image.png" 
                    alt="Imran Natiq - Founder & CEO of KCROC"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=Imran+Natiq&background=00D9FF&color=0A0A0A&size=128&format=png&bold=true`;
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Imran Natiq</h3>
                <p className="text-emerald-400 font-semibold mb-4">Founder & CEO</p>
                <p className="text-slate-300 leading-relaxed">
                  Experienced technician with years in Kuwait's computer repair market. Specializes in honest diagnostics, data safety, and customer education. Committed to transparent service and building long-term trust with every client.
                </p>
              </CardContent>
            </Card>

            {/* Co-Founder & CTO */}
            <Card className="glass-card hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-500/30">
                  <img 
                    src="https://i.postimg.cc/C1zZJhST/KCROC_Co_Founder_Image.png" 
                    alt="Riyaz Kawa - Co-Founder & CTO of KCROC"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=Riyaz+Kawa&background=00D9FF&color=0A0A0A&size=128&format=png&bold=true`;
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Riyaz Kawa</h3>
                <p className="text-cyan-400 font-semibold mb-4">Co-Founder & CTO</p>
                <p className="text-slate-300 leading-relaxed">
                  Technical lead specializing in advanced troubleshooting and performance optimization. Expert in gaming laptops, high-end systems, and complex motherboard repairs. Passionate about delivering cutting-edge solutions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Photo */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card hover-lift overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src="https://i.postimg.cc/mDv2dPvJ/Whats_App_Image_2026_01_29_at_3_19_40_AM.jpg"
                    alt="A Strong Team Behind KCROC - Kuwait Computer Repair Experts"
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=KCROC+Team&background=1a1a1a&color=00D9FF&size=800x400&format=png`;
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6">
                    <h3 className="text-2xl md:text-3xl font-black text-white text-center">
                      <span className="gradient-text">A Strong Team Behind</span> Every Repair
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gradient-to-br from-purple-900/10 via-slate-900 to-emerald-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              <span className="gradient-text-purple">Service</span> Areas
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Free pickup and delivery across all Kuwait governorates
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className={`glass-card hover-lift p-4 rounded-xl text-center stagger-animation stagger-delay-${(index % 4) + 1}`}>
                <div className="text-4xl mb-2">{area.icon}</div>
                <h4 className="font-bold text-white text-sm">{area.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-emerald-900/10 to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              <span className="gradient-text">100% Recommended</span> by Verified Google Reviewers
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Real stories from satisfied customers across Kuwait. Tap any card to view the original Google review.
            </p>
            <Button asChild variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
              <a href="https://share.google/rE2M4xOsiQQ4mdnLv" target="_blank" rel="noopener noreferrer">
                <Star className="w-5 h-5 mr-2 fill-current" />
                View All Reviews on Google
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <a
                key={index}
                href={review.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card hover-lift p-6 rounded-xl stagger-animation stagger-delay-${(index % 3) + 1} block text-decoration-none cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:scale-105`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-300 mb-4 italic leading-relaxed">"{review.text}"</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{review.name}</h4>
                      <p className="text-slate-400 text-xs">{review.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {review.repair}
                    </div>
                    <p className="text-cyan-400 text-xs mt-1">Tap to view →</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              <span className="gradient-text">Frequently Asked</span> Questions
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to know about our computer repair services in Kuwait
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-emerald-400 flex-shrink-0">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-slate-300 leading-relaxed pl-7">
                    <span className="text-cyan-400 font-semibold">A:</span> {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
        <div className="container mx-auto px-4">
          <Card className="glass-card max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Get Your Computer Fixed?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Don't let computer problems slow you down. Contact KCROC today for fast, 
                reliable repair services with free pickup and delivery across Kuwait.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-6 text-lg">
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +965 5530 1913
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
    </>
  );
}