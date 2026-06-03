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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: 'from-blue-500 to-blue-600', border: 'border-blue-500/30' };
      case 'cyan':
        return { badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', icon: 'from-cyan-500 to-cyan-600', border: 'border-cyan-500/50' };
      case 'emerald':
        return { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: 'from-emerald-500 to-emerald-600', border: 'border-emerald-500/30' };
      default:
        return { badge: 'bg-gray-500/20 text-gray-300 border-gray-500/30', icon: 'from-gray-500 to-gray-600', border: 'border-gray-500/30' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2">
            💰 Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Honest Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No hidden fees. No surprises. Just professional computer repair services at fair prices with free pickup and delivery across Kuwait.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => {
              const colors = getColorClasses(plan.color);
              const Icon = plan.icon;
              return (
                <Card 
                  key={index} 
                  className={`bg-gray-900/40 border rounded-2xl relative overflow-hidden ${plan.popular ? colors.border : 'border-gray-800/80'}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-center py-2 text-sm font-bold">
                      ⭐ Most Popular
                    </div>
                  )}
                  <CardHeader className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                    <div className={`w-14 h-14 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">{plan.price}</span>
                        <span className="text-lg text-gray-400">KD</span>
                      </div>
                      <p className="text-gray-500 text-sm line-through">Was {plan.originalPrice} KD</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    {/* Included Features */}
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Not Included */}
                    {plan.notIncluded.length > 0 && (
                      <div className="space-y-3 mb-6 pt-4 border-t border-gray-800">
                        {plan.notIncluded.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Button 
                      asChild 
                      className={`w-full font-bold rounded-xl ${plan.popular ? 'bg-green-500 hover:bg-green-600 text-white' : 'border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent'}`}
                    >
                      <a href={`https://wa.me/96555301913?text=Hi! I'm interested in the ${plan.name} plan (${plan.price} KD). Please let me know the next steps.`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Get Started
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Optional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Add-Ons</span>
            </h2>
            <p className="text-gray-300">Enhance your service with these optional extras</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <Card key={index} className="bg-gray-900/40 border border-gray-800/80 rounded-2xl hover:border-cyan-500/40 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-white font-bold mb-2">{addon.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{addon.description}</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                      +{addon.price} KD
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300">Common questions about our pricing and services</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is the diagnostic fee included in the repair cost?",
                a: "Yes! If you proceed with the repair, the diagnostic fee is waived and included in your repair package price."
              },
              {
                q: "Do you offer free pickup and delivery?",
                a: "Absolutely! We provide free pickup and delivery across all Kuwait governorates for Standard and Premium plans."
              },
              {
                q: "What if the repair costs more than estimated?",
                a: "We always provide a detailed quote before proceeding. If additional issues are found, we'll contact you for approval before any extra charges."
              },
              {
                q: "How long does a typical repair take?",
                a: "Most common repairs are completed within 24-48 hours. Complex issues like motherboard repair or data recovery may take 3-5 days."
              },
              {
                q: "What warranty do you provide?",
                a: "Basic plans include a 7-day warranty, Standard includes 30 days, and Premium includes 90 days. Extended 1-year warranty is available as an add-on."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-900/40 border border-gray-800/80 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-2">
              <Calendar className="w-4 h-4 mr-2 inline" />
              Schedule Online
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">Book Your Appointment</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose a convenient time and we'll arrange free pickup from your location
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-gray-900/40 border border-gray-800/80 rounded-2xl overflow-hidden p-4">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/kcroc-kw/30min"
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Fix Your Device?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact us today for a free consultation. No obligation, just honest advice about your computer issue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-8 py-6 text-lg">
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +965 5530 1913
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-8 py-6 text-lg">
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
    </div>
  );
}