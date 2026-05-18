import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  ExternalLink,
  Truck,
  Shield
} from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-4 py-2 mb-4">
            📍 Contact & Location
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to fix your device? Contact us now for a free quote and fast service. 
            We're here to help with all your computer repair needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <Card className="hover:shadow-lg transition-shadow border-emerald-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <CardTitle className="text-lg">Phone</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a 
                    href="tel:+96555301913" 
                    className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    +965 5530 1913
                  </a>
                  <p className="text-slate-600 mt-1">Call for immediate assistance</p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="hover:shadow-lg transition-shadow border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Email</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:quadrillion1980@gmail.com" 
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors break-all"
                  >
                    quadrillion1980@gmail.com
                  </a>
                  <p className="text-slate-600 mt-1">Send us your inquiry</p>
                </CardContent>
              </Card>
            </div>

            {/* Address & Hours */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Visit Our Shop</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Address</h4>
                  <p className="text-slate-700">
                    Basement Shop #4, Al Mullah Complex<br />
                    Ibn Khaldoun St., Hawalli, Kuwait
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Business Hours</h4>
                    <div className="space-y-1 text-slate-700">
                      <p>Saturday – Thursday: 09:00 – 22:00</p>
                      <p>Friday: 17:00 – 22:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Free Pickup & Delivery Areas</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  We provide free pickup and delivery service across all Kuwait governorates:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {['Hawalli', 'Kuwait City', 'Ahmadi', 'Farwaniya', 'Jahra', 'Mubarak Al-Kabeer'].map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-700">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-0">
              <CardHeader>
                <CardTitle className="text-white text-xl">Quick Contact</CardTitle>
                <p className="text-emerald-100">Get instant support</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  asChild
                  size="lg"
                  className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-bold"
                >
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-emerald-600 font-bold"
                >
                  <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Location Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-medium">Interactive Map</p>
                    <p className="text-sm">Coming Soon</p>
                  </div>
                </div>
                <Button 
                  asChild
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  <a 
                    href="https://g.page/r/CWbK8KGjkYY2EBE" 
                    target="_blank" 
                    rel="noopener"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Trusted Service</h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>✓ Licensed Technicians</p>
                    <p>✓ Data Privacy Guaranteed</p>
                    <p>✓ Warranty on All Repairs</p>
                    <p>✓ 100+ Satisfied Customers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}