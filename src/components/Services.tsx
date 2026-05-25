import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Laptop, 
  Monitor, 
  CircuitBoard, 
  HardDrive, 
  Cpu, 
  Shield,
  Wrench,
  Smartphone
} from 'lucide-react';

const services = [
  {
    icon: Laptop,
    title: 'Laptop Repair',
    description: 'Screen replacement, battery, keyboard, overheating, and performance tuning. All brands supported.',
    features: ['Screen Replacement', 'Battery Issues', 'Keyboard Repair', 'Overheating Fix'],
    color: 'bg-blue-500'
  },
  {
    icon: Monitor,
    title: 'Desktop PC Repair',
    description: 'Power supply, motherboard, RAM, OS reinstall, and custom PC builds.',
    features: ['Power Supply', 'Motherboard', 'RAM Upgrade', 'OS Reinstall'],
    color: 'bg-emerald-500'
  },
  {
    icon: CircuitBoard,
    title: 'Motherboard & Chip-Level Repair',
    description: 'Advanced diagnostics and solder-level repairs to save costs over full replacements.',
    features: ['Chip-Level Repair', 'Soldering', 'Component Testing', 'Board Diagnostics'],
    color: 'bg-purple-500'
  },
  {
    icon: HardDrive,
    title: 'Data Recovery & Backup',
    description: 'Recover files from failed drives and provide secure backup solutions.',
    features: ['File Recovery', 'Drive Repair', 'Backup Setup', 'Data Migration'],
    color: 'bg-orange-500'
  },
  {
    icon: Cpu,
    title: 'SSD & RAM Upgrades',
    description: 'Speed upgrades and memory expansion for better performance and reliability.',
    features: ['SSD Installation', 'RAM Upgrade', 'Performance Boost', 'Speed Optimization'],
    color: 'bg-red-500'
  },
  {
    icon: Shield,
    title: 'Software & Virus Removal',
    description: 'OS reinstall, virus removal, drivers, and essential software setup.',
    features: ['Virus Removal', 'OS Installation', 'Driver Updates', 'Software Setup'],
    color: 'bg-green-500'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-4 py-2 mb-4">
            🔧 Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Comprehensive Computer Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From basic repairs to advanced motherboard-level fixes, we handle all your computer and laptop needs 
            with professional expertise and guaranteed results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50"
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Wrench className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Don't See Your Issue Listed?
                  </h3>
                  <p className="text-slate-600 text-lg">
                    We handle all types of computer and laptop problems. Contact us for a free consultation 
                    and diagnostic to determine the best solution for your device.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant="outline" className="border-emerald-500 text-emerald-700 px-6 py-3 text-lg font-semibold">
                    Free Diagnosis
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}