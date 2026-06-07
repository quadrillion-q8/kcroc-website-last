import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Clock, Shield, Truck } from 'lucide-react';

export default function CallToAction() {
  return (
    <section id="book-repair" className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2 mb-4 backdrop-blur-sm border-0 border-white/30">
            🚀 Ready to Get Started?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Fix Your Device?
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Don't wait for your computer problems to get worse. We offer fast, reliable service 
            with free pickup and delivery across Kuwait. Contact us now for a free quote.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Response</h3>
            <p className="text-emerald-100 text-sm">Usually reply within 10 minutes</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Pickup</h3>
            <p className="text-emerald-100 text-sm">Anywhere in Kuwait, no extra cost</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Guaranteed Work</h3>
            <p className="text-emerald-100 text-sm">Warranty on all repairs</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Button 
              asChild
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-8 py-8 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <a href="tel:+96555301913" className="flex items-center justify-center gap-3 w-full cursor-pointer">
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-lg font-bold leading-none mb-1">Call Now</div>
                  <div className="text-sm opacity-80 leading-none">+965 5530 1913</div>
                </div>
              </a>
            </Button>
            
            <div className="text-emerald-200 font-medium">OR</div>
            
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-emerald-700 font-bold px-8 py-8 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <a 
                href="https://wa.me/96555301913" 
                target="_blank" 
                rel="noopener"
                className="flex items-center justify-center gap-3 w-full cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 group-hover:text-emerald-700" />
                <div className="text-left group-hover:text-emerald-700">
                  <div className="text-lg font-bold leading-none mb-1">WhatsApp</div>
                  <div className="text-sm opacity-80 leading-none">Message Us</div>
                </div>
              </a>
            </Button>
          </div>
          
          <p className="text-emerald-200 text-sm mt-6">
            💡 Tip: Provide device type and short issue description for faster service
          </p>
        </div>

        {/* Urgency Card */}
        <Card className="mt-12 bg-white/10 backdrop-blur-md border-white/20 max-w-2xl mx-auto">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              🚨 Emergency Repair Service Available
            </h3>
            <p className="text-emerald-100 mb-4">
              Need your device fixed urgently? We offer same-day and emergency repair services 
              for critical business and personal needs.
            </p>
            <Badge variant="secondary" className="bg-red-500 hover:bg-red-600 border-0 text-white px-4 py-2 text-sm font-bold shadow-md">
              Same-Day Service Available
            </Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
