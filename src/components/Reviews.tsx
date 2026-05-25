import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Hassan',
    location: 'Salmiya',
    rating: 5,
    text: 'My gaming laptop was overheating — KCROC fixed it fast and it runs like new. Highly recommended!',
    service: 'Laptop Cooling Repair'
  },
  {
    name: 'Maryam',
    location: 'Hawalli',
    rating: 5,
    text: 'They came to my home, repaired my desktop, and installed new Windows — very professional!',
    service: 'Home Service & OS Install'
  },
  {
    name: 'Ahmed',
    location: 'Kuwait City',
    rating: 5,
    text: 'Lost all my photos when my hard drive crashed. KCROC recovered everything! Amazing service.',
    service: 'Data Recovery'
  },
  {
    name: 'Sarah',
    location: 'Ahmadi',
    rating: 5,
    text: 'Fast pickup, fair price, and my laptop screen looks perfect now. Will definitely use again.',
    service: 'Screen Replacement'
  },
  {
    name: 'Omar',
    location: 'Jahra',
    rating: 5,
    text: 'Motherboard repair saved me hundreds of dinars. Expert technicians with honest pricing.',
    service: 'Motherboard Repair'
  },
  {
    name: 'Fatima',
    location: 'Farwaniya',
    rating: 5,
    text: 'Excellent customer service and quick turnaround. My business laptop is working perfectly.',
    service: 'Business Laptop Repair'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 px-4 py-2 mb-4">
            ⭐ Customer Reviews
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real customers across Kuwait 
            have to say about our computer repair services.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start">
                    <Quote className="w-8 h-8 text-emerald-500 opacity-50" />
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                      {review.service}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 leading-relaxed font-medium">
                    "{review.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{review.name}</p>
                        <p className="text-sm text-slate-500">{review.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Verified Customer</div>
                        <div className="text-xs text-emerald-600 font-medium">✓ Confirmed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating & CTA */}
        <div className="text-center">
          <Card className="bg-white shadow-xl border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">5.0 out of 5</h3>
                  <p className="text-slate-600">Based on 100+ verified customer reviews</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  >
                    <a 
                      href="https://g.page/r/CWbK8KGjkYY2EBE/review" 
                      target="_blank" 
                      rel="noopener"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Leave a Google Review
                    </a>
                  </Button>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-bold"
                  >
                    <a href="#contact">
                      Read More Reviews
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}