import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ImageOff } from 'lucide-react';
import { useState } from 'react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Images', count: 32 },
    { id: 'repairs', name: 'In-Shop Repairs / Before & After', count: 6 },
    { id: 'components', name: 'Laptop & Desktop Components', count: 15 },
    { id: 'accessories', name: 'Chargers, Adapters & Accessories', count: 8 },
    { id: 'networking', name: 'Networking & Cables', count: 3 },
    { id: 'branding', name: 'Shop Exterior & Brand Images', count: 2 }
  ];

  const galleryImages: Record<string, Array<{ url: string; caption: string; alt: string }>> = {
    repairs: [
      {
        url: "https://i.postimg.cc/m4V3yr3N/broken-laptop-cover-kuwait.jpg",
        caption: "Laptop cover repair before restoration - Salmiya customer",
        alt: "Broken laptop cover repair Kuwait - before restoration"
      },
      {
        url: "https://i.postimg.cc/z5BCt1py/broken-business-2237920-jpg.jpg",
        caption: "Business laptop repair case study - Kuwait City client",
        alt: "Business laptop repair Kuwait - corporate IT support"
      },
      {
        url: "https://i.postimg.cc/zNpwFfwR/acer-laptop-keyboard-repair-service-kuwait-jpg.jpg",
        caption: "Acer laptop keyboard replacement service - Hawalli workshop",
        alt: "Acer laptop keyboard repair Kuwait - professional replacement"
      },
      {
        url: "https://i.postimg.cc/csBCZr1m/desktop-case-internal-upgrade-kcroc-jpg.jpg",
        caption: "Desktop case internal upgrade and optimization - Ahmadi customer",
        alt: "Desktop PC internal upgrade Kuwait - hardware optimization"
      },
      {
        url: "https://i.postimg.cc/J150mG7c/dell-laptop-cooling-fan-replacement-kuwait.jpg",
        caption: "Dell laptop cooling system repair - Hawalli customer",
        alt: "Dell laptop fan replacement Kuwait - thermal repair"
      }
    ],
    components: [
      {
        url: "https://i.postimg.cc/2YM1cTzr/16GB-DDR4-DESKTOP.jpg",
        caption: "16GB DDR4 Desktop RAM Memory Module - upgrade service Kuwait",
        alt: "16GB DDR4 RAM Kuwait - desktop memory upgrade"
      },
      {
        url: "https://i.postimg.cc/19rXPfRV/computer-motherboard-green-pcb-expansion-slots-kuwait-jpg.jpg",
        caption: "Computer motherboard with expansion slots - Kuwait repair parts",
        alt: "Computer motherboard Kuwait - PCB expansion slots"
      },
      {
        url: "https://i.postimg.cc/Yk96nw8m/computer-graphics-video-card-gpu-repair-kuwait-jpg.jpg",
        caption: "Graphics card GPU repair and maintenance - gaming PC Kuwait",
        alt: "Graphics card repair Kuwait - GPU maintenance service"
      },
      {
        url: "https://i.postimg.cc/8kBBnwPH/laptop-screen-replacement-kuwait-repair-service-jpg.jpg",
        caption: "Laptop screen replacement service - LCD/LED panel Kuwait",
        alt: "Laptop screen replacement Kuwait - LCD repair"
      },
      {
        url: "https://i.postimg.cc/pXhKmKBt/laptop-keyboard-replacement-service-kuwait-jpg.jpg",
        caption: "Laptop keyboard replacement - all brands available Kuwait",
        alt: "Laptop keyboard replacement Kuwait - typing repair"
      },
      {
        url: "https://i.postimg.cc/7YnCQGKz/laptop-battery-replacement-service-kuwait-jpg.jpg",
        caption: "Laptop battery replacement - genuine batteries Kuwait",
        alt: "Laptop battery replacement Kuwait - power repair"
      },
      {
        url: "https://i.postimg.cc/SxNhVWJz/hard-drive-data-recovery-kuwait-repair-jpg.jpg",
        caption: "Hard drive data recovery service - professional Kuwait",
        alt: "Hard drive data recovery Kuwait - storage repair"
      },
      {
        url: "https://i.postimg.cc/bNzGmqvT/ssd-solid-state-drive-upgrade-kuwait-jpg.jpg",
        caption: "SSD solid state drive upgrade - speed boost Kuwait",
        alt: "SSD upgrade Kuwait - storage performance"
      },
      {
        url: "https://i.postimg.cc/Gt1sCrBR/cpu-processor-thermal-paste-application-kuwait-jpg.jpg",
        caption: "CPU thermal paste application - cooling maintenance Kuwait",
        alt: "CPU thermal paste Kuwait - processor cooling"
      },
      {
        url: "https://i.postimg.cc/VNxLPGhQ/ram-memory-module-laptop-upgrade-kuwait-jpg.jpg",
        caption: "RAM memory module for laptop upgrade - Kuwait service",
        alt: "RAM upgrade Kuwait - laptop memory"
      },
      {
        url: "https://i.postimg.cc/7hqDm3Yz/power-supply-unit-desktop-repair-kuwait-jpg.jpg",
        caption: "Desktop power supply unit repair and replacement Kuwait",
        alt: "Power supply repair Kuwait - desktop PSU"
      },
      {
        url: "https://i.postimg.cc/Kz3dFhBm/cooling-fan-laptop-replacement-kuwait-jpg.jpg",
        caption: "Laptop cooling fan replacement - overheating fix Kuwait",
        alt: "Cooling fan replacement Kuwait - thermal repair"
      },
      {
        url: "https://i.postimg.cc/DwPBtqPz/wifi-card-laptop-replacement-kuwait-jpg.jpg",
        caption: "WiFi card replacement for laptop - connectivity fix Kuwait",
        alt: "WiFi card replacement Kuwait - wireless repair"
      },
      {
        url: "https://i.postimg.cc/4x0Qmz7P/usb-port-repair-laptop-kuwait-jpg.jpg",
        caption: "USB port repair and replacement - laptop Kuwait",
        alt: "USB port repair Kuwait - connectivity fix"
      },
      {
        url: "https://i.postimg.cc/SRKgvmzW/charging-port-dc-jack-repair-kuwait-jpg.jpg",
        caption: "Charging port DC jack repair - power fix Kuwait",
        alt: "Charging port repair Kuwait - DC jack fix"
      }
    ],
    accessories: [
      {
        url: "https://i.postimg.cc/Qd0Jvh1w/laptop-charger-adapter-65w-kuwait-jpg.jpg",
        caption: "65W laptop charger adapter - universal compatibility Kuwait",
        alt: "Laptop charger 65W Kuwait - power adapter"
      },
      {
        url: "https://i.postimg.cc/KvRGmqzP/macbook-charger-type-c-kuwait-jpg.jpg",
        caption: "MacBook Type-C charger - genuine Apple Kuwait",
        alt: "MacBook charger Kuwait - Type-C power"
      },
      {
        url: "https://i.postimg.cc/Y0vBhJkz/usb-hub-multiport-adapter-kuwait-jpg.jpg",
        caption: "USB hub multiport adapter - connectivity expansion Kuwait",
        alt: "USB hub Kuwait - multiport adapter"
      },
      {
        url: "https://i.postimg.cc/g2LhPfRq/external-hard-drive-backup-kuwait-jpg.jpg",
        caption: "External hard drive for backup - data protection Kuwait",
        alt: "External hard drive Kuwait - backup storage"
      },
      {
        url: "https://i.postimg.cc/Hn1Kf0Qr/wireless-mouse-keyboard-combo-kuwait-jpg.jpg",
        caption: "Wireless mouse and keyboard combo - office setup Kuwait",
        alt: "Wireless peripherals Kuwait - mouse keyboard"
      },
      {
        url: "https://i.postimg.cc/T1Jqm0Bz/laptop-cooling-pad-stand-kuwait-jpg.jpg",
        caption: "Laptop cooling pad stand - thermal management Kuwait",
        alt: "Laptop cooling pad Kuwait - temperature control"
      },
      {
        url: "https://i.postimg.cc/fRBnNqhz/hdmi-cable-4k-kuwait-jpg.jpg",
        caption: "4K HDMI cable - display connectivity Kuwait",
        alt: "HDMI cable 4K Kuwait - display connection"
      },
      {
        url: "https://i.postimg.cc/bJhqPmzK/laptop-bag-backpack-kuwait-jpg.jpg",
        caption: "Laptop bag backpack - protection and mobility Kuwait",
        alt: "Laptop bag Kuwait - carrying case"
      }
    ],
    networking: [
      {
        url: "https://i.postimg.cc/RFqLmPzN/ethernet-cable-cat6-kuwait-jpg.jpg",
        caption: "Cat6 Ethernet cable - high-speed networking Kuwait",
        alt: "Ethernet cable Cat6 Kuwait - network connectivity"
      },
      {
        url: "https://i.postimg.cc/Pr1qBmzK/wifi-router-setup-kuwait-jpg.jpg",
        caption: "WiFi router setup and configuration - home office Kuwait",
        alt: "WiFi router Kuwait - wireless setup"
      },
      {
        url: "https://i.postimg.cc/HnQmPfRz/network-switch-business-kuwait-jpg.jpg",
        caption: "Network switch for business - enterprise connectivity Kuwait",
        alt: "Network switch Kuwait - business networking"
      }
    ],
    branding: [
      {
        url: "https://i.postimg.cc/J4Lm0BzK/kcroc-shop-exterior-hawalli-kuwait-jpg.jpg",
        caption: "KCROC shop exterior - Al Mullah Complex, Hawalli Kuwait",
        alt: "KCROC shop Hawalli Kuwait - computer repair store"
      },
      {
        url: "https://i.postimg.cc/Qd1Jvh1w/kcroc-brand-logo-kuwait-jpg.jpg",
        caption: "KCROC brand logo - Kuwait Computer Repair On Call",
        alt: "KCROC logo Kuwait - brand identity"
      }
    ]
  };

  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return Object.values(galleryImages).flat();
    }
    return galleryImages[selectedCategory] || [];
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2">
            📸 Our Work
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Repair <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse our collection of repair work, components, and accessories. See the quality of parts and services we provide across Kuwait.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-900/40 border border-gray-800/80 text-gray-300 hover:border-cyan-500/40 hover:text-cyan-300'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900/40 border border-gray-800/80 rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-800/50"><span class="text-gray-500 text-sm">Image unavailable</span></div>';
                        }
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageOff className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No images in this category</h3>
              <p className="text-gray-500">Try selecting a different category above</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Need Computer Repair Services?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact KCROC today for professional repair services with free pickup and delivery across Kuwait.
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
          </div>
        </div>
      </section>
    </div>
  );
}