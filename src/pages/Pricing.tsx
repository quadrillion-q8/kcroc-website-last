import { Check, X, Star, Zap, Shield, Clock, Calendar, Phone, MessageCircle, Wrench, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';

export default function Pricing() {
  const pricingPlans = [
    {
      name: "Basic Diagnostic",
      price: "15",
      originalPrice: "25",
      popular: false,
      description: "Perfect for simple issues and basic checkups",
      features: [
        "Complete system diagnostic",
        "Problem identification report",
        "Basic performance optimization",
        "Virus/malware scan",
        "Hardware health check",
        "Email support"
      ],
      notIncluded: [
        "Hardware replacement",
        "Data recovery",
        "On-site service"
      ],
      icon: Clock,
      color: "blue"
    },
    {
      name: "Standard Repair",
      price: "45",
      originalPrice: "65",
      popular: true,
      description: "Most popular choice for comprehensive repairs",
      features: [
        "Everything in Basic Diagnostic",
        "Hardware repair/replacement",
        "Software installation & setup",
        "Data backup & transfer",
        "Performance optimization",
        "30-day warranty",
        "Priority phone support",
        "Free pickup & delivery"
      ],
      notIncluded: [
        "Emergency 24/7 service",
        "Advanced data recovery"
      ],
      icon: Zap,
      color: "cyan"
    },
    {
      name: "Premium Service",
      price: "85",
      originalPrice: "120",
      popular: false,
      description: "Complete solution with premium support",
      features: [
        "Everything in Standard Repair",
        "Advanced data recovery",
        "Custom system optimization",
        "Preventive maintenance plan",
        "90-day extended warranty",
        "24/7 emergency support",
        "Same-day service guarantee",
        "Free annual checkup"
      ],
      notIncluded: [],
      icon: Shield,
      color: "emerald"
    }
  ];

  const addOns = [
    { name: "Express Service (Same Day)", price: "20", description: "Get your device back within 24 hours", icon: Zap },
    { name: "Data Recovery (Advanced)", price: "50", description: "Recover data from damaged drives", icon: Shield },
    { name: "On-Site Service", price: "30", description: "We come to your location", icon: Wrench },
    { name: "Extended Warranty (1 Year)", price: "25", description: "Full coverage for 12 months", icon: Award }
  ];

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <Badge variant="secondary" className="hero-badge">
              💰 Transparent Pricing
            </Badge>
            
            <h1 className="pricing-hero-title">
              Simple, Honest Pricing for
              <span className="gradient-text"> Every Budget</span>
            </h1>
            
            <p className="pricing-hero-description">
              No hidden fees, no surprises. Choose the service level that fits your needs 
              and budget. All prices include free diagnosis and consultation.
            </p>

            <div className="pricing-guarantee">
              <div className="guarantee-item">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="guarantee-item">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Free Pickup & Delivery</span>
              </div>
              <div className="guarantee-item">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>No Fix, No Fee Policy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/c06ce520-4418-4e6b-936b-50b9d603d515.png"
                alt="Before and after laptop repair comparison showing quality results"
                className="w-full h-80 object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-emerald-500/90 text-white border-0 text-sm px-3 py-1">
                  Before & After Results
                </Badge>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                See the Difference <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Quality Service</span> Makes
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Every repair at KCROC is backed by our commitment to excellence. From cracked screens to complete system overhauls, we restore your devices to like-new condition with genuine parts and expert craftsmanship.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2">
                  <Check className="w-4 h-4 mr-2" /> Genuine Parts
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
                  <Check className="w-4 h-4 mr-2" /> 90-Day Warranty
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
                  <Check className="w-4 h-4 mr-2" /> Expert Technicians
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="pricing-card-header">
                  <div className="pricing-icon">
                    <plan.icon className="w-8 h-8" />
                  </div>
                  
                  <CardTitle className="pricing-plan-name">{plan.name}</CardTitle>
                  
                  <div className="pricing-amount-container">
                    <div className="pricing-amount">
                      <span className="currency">KD</span>
                      <span className="price">{plan.price}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="original-price">
                        <span>KD {plan.originalPrice}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="pricing-description">{plan.description}</p>
                </CardHeader>

                <CardContent className="pricing-card-content">
                  <div className="features-section">
                    <h4 className="features-title">What's Included:</h4>
                    <ul className="features-list">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="feature-item included">
                          <Check className="w-4 h-4 feature-icon" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <>
                        <h4 className="features-title not-included-title">Not Included:</h4>
                        <ul className="features-list">
                          {plan.notIncluded.map((feature, featureIndex) => (
                            <li key={featureIndex} className="feature-item not-included">
                              <X className="w-4 h-4 feature-icon" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <Button 
                    className={`pricing-cta-button ${plan.popular ? 'popular-button' : ''}`}
                    size="lg"
                    asChild
                  >
                    <a href="tel:+96555301913">
                      Choose {plan.name}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process with Images */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Simple 3-Step Process
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Getting your device repaired has never been easier. Here's how it works.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/3ddd029d-1ed9-44d7-845e-911732d5888d.png"
                  alt="Free pickup and delivery service across Kuwait"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-cyan-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">1</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Free Pickup</h3>
                <p className="text-slate-300">We pick up your device from anywhere in Kuwait — completely free of charge.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/fe0f254d-ca91-4dbb-a283-49603f110dab.png"
                  alt="Professional repair tools and expert technicians at work"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">2</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Expert Repair</h3>
                <p className="text-slate-300">Our certified technicians diagnose and repair your device using genuine parts.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/40780580-7370-475d-b516-fa2d41e142ba.png"
                  alt="Happy customer receiving repaired device"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">3</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Free Delivery</h3>
                <p className="text-slate-300">Your repaired device is delivered back to you with a warranty guarantee.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Book Online 24/7 Section */}
      <section id="book-online" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Calendar className="w-4 h-4 mr-2" />
              24/7 Online Booking
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Book Your Appointment Online
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Schedule your computer repair service at your convenience. Choose a time that works best for you, 
              and we'll confirm your appointment immediately.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/quadrillion1980" 
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Prefer to call? Reach us at{' '}
              <a href="tel:+96555301913" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                +965 5530 1913
              </a>
              {' '}or{' '}
              <a 
                href="https://wa.me/96555301913" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                WhatsApp us
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="addons-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Optional Add-ons</h2>
            <p className="section-description">
              Enhance your service with these optional upgrades available for any plan.
            </p>
          </div>

          <div className="addons-grid">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <Card key={index} className="addon-card">
                  <CardContent className="addon-content">
                    <div className="addon-header">
                      <div className="flex items-center gap-3">
                        <div className="bg-cyan-500/10 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="addon-name">{addon.name}</h3>
                      </div>
                      <div className="addon-price">
                        <span className="currency">KD</span>
                        <span className="price">{addon.price}</span>
                      </div>
                    </div>
                    <p className="addon-description">{addon.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">What if my device can't be repaired?</h3>
              <p className="faq-answer">
                We follow a "No Fix, No Fee" policy. If we can't repair your device, 
                you only pay for the diagnostic fee (which is waived for most cases).
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Do you offer payment plans?</h3>
              <p className="faq-answer">
                Yes! We offer flexible payment options including installment plans 
                for repairs over KD 100. Contact us to discuss your options.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">What's covered under warranty?</h3>
              <p className="faq-answer">
                Our warranty covers all repair work and replacement parts. If the same 
                issue occurs within the warranty period, we'll fix it free of charge.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">How long does a typical repair take?</h3>
              <p className="faq-answer">
                Most repairs are completed within 24-48 hours. Complex issues may take 
                up to 5 business days. Express service is available for urgent repairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <Card className="cta-card">
            <CardContent className="cta-content">
              <h2 className="cta-title">Ready to Get Started?</h2>
              <p className="cta-description">
                Contact us today for a free consultation and diagnostic. 
                Our experts are standing by to help solve your tech problems.
              </p>
              
              <div className="cta-buttons">
                <Button size="lg" className="cta-primary" asChild>
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +965 5530 1913
                  </a>
                </Button>
                
                <Button size="lg" variant="outline" className="cta-secondary" asChild>
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