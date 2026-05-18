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
        url: "/images/WirelessKeyboard.jpg",
        caption: "Wireless computer keyboard replacement - Salmiya service",
        alt: "Wireless keyboard Kuwait - computer peripheral replacement"
      },
      {
        url: "https://i.postimg.cc/nHGrZCV0/desktop-computer-ram-memory-slots-motherboard-kuwait-jpg.jpg",
        caption: "Desktop RAM memory slots on motherboard - upgrade service",
        alt: "Desktop RAM slots Kuwait - memory upgrade installation"
      },
      {
        url: "https://i.postimg.cc/81mcDjkZ/desktop-computer-ram-memory-upgrade-kuwait-jpg.jpg",
        caption: "Desktop memory upgrade installation - Hawalli customer",
        alt: "Desktop memory upgrade Kuwait - RAM installation service"
      },
      {
        url: "/images/CPUInstallation.jpg",
        caption: "Desktop CPU processor installation service - Kuwait City",
        alt: "CPU installation Kuwait - processor upgrade service"
      },
      {
        url: "https://i.postimg.cc/M6ZTGqX1/gaming-desktop-motherboard-asus-high-performance-kuwait-jpg.jpg",
        caption: "ASUS gaming motherboard high-performance setup - Farwaniya",
        alt: "ASUS gaming motherboard Kuwait - high-performance PC build"
      },
      {
        url: "https://i.postimg.cc/Q8NtMhVp/gaming-desktop-motherboard-cpu-processor-repair-kuwait-jpg.jpg",
        caption: "Gaming desktop CPU and motherboard repair - Salmiya client",
        alt: "Gaming PC motherboard repair Kuwait - CPU diagnostics"
      },
      {
        url: "https://i.postimg.cc/m4V3yr3Q/asus-laptop-battery-replacement-kuwait-jpg.jpg",
        caption: "ASUS laptop battery replacement service - Hawalli workshop",
        alt: "ASUS laptop battery replacement Kuwait - genuine parts"
      },
      {
        url: "/images/ASUSlaptopbatteryreplacement.jpg",
        caption: "Original ASUS laptop battery replacement - Ahmadi customer",
        alt: "ASUS battery replacement Kuwait - original parts service"
      },
      {
        url: "/images/LaptopBatteryReplacement.jpg",
        caption: "Dell laptop 42Wh battery replacement - Kuwait City service",
        alt: "Dell laptop battery replacement Kuwait - 42Wh battery"
      },
      {
        url: "/images/DellLaptopBattery.jpg",
        caption: "New Dell laptop battery 42Wh installation - Jahra pickup",
        alt: "Dell battery installation Kuwait - genuine 42Wh battery"
      },
      {
        url: "https://i.postimg.cc/1PFfL6tt/asdf.png",
        caption: "Computer component diagnostic tools - professional service Kuwait",
        alt: "Computer diagnostic tools Kuwait - professional repair equipment"
      }
    ],
    accessories: [
      {
        url: "https://i.postimg.cc/8GwdmCdf/acer-laptop-charger-new-in-box-kuwait-jpg.jpg",
        caption: "New Acer laptop charger in original packaging - Hawalli",
        alt: "Acer laptop charger Kuwait - new original adapter"
      },
      {
        url: "https://i.postimg.cc/KbQ7DY7L/acer-laptop-power-adapter-charger-kuwait-jpg.jpg",
        caption: "Acer laptop power adapter and charger - Salmiya service",
        alt: "Acer power adapter Kuwait - laptop charger replacement"
      },
      {
        url: "/images/AcerASUSlaptopcharger.jpg",
        caption: "ASUS laptop power adapter charger - Kuwait City stock",
        alt: "ASUS laptop charger Kuwait - power adapter replacement"
      },
      {
        url: "https://i.postimg.cc/LRXtCMvY/chicony-laptop-power-adapter-charger-kuwait-jpg.jpg",
        caption: "Chicony laptop power adapter charger - Farwaniya service",
        alt: "Chicony laptop charger Kuwait - power adapter"
      },
      {
        url: "https://i.postimg.cc/LH35Rn43/dell-laptop-power-adapter-charger-65w-kuwait-jpg.jpg",
        caption: "Dell laptop 65W power adapter charger - Hawalli customer",
        alt: "Dell 65W charger Kuwait - laptop power adapter"
      },
      {
        url: "https://i.postimg.cc/3hVkS9Kk/Lenovo-Type-C-Charger3.jpg",
        caption: "Lenovo Type-C laptop charger - Jahra customer",
        alt: "Lenovo Type-C charger Kuwait - USB-C power adapter"
      },
      {
        url: "https://i.postimg.cc/TxFK7QRh/466.jpg",
        caption: "Laptop adapter and charging accessories - Salmiya stock",
        alt: "Laptop charging accessories Kuwait - adapters and cables"
      },
      {
        url: "https://i.postimg.cc/0vFzWZ8s/KANA-ZA-KUTOS.jpg",
        caption: "Specialized laptop charging solutions - Kuwait service",
        alt: "Laptop charging solutions Kuwait - specialized adapters"
      }
    ],
    networking: [
      {
        url: "https://i.postimg.cc/GRV47zcB/Gemini-Generated-Image-cfpmjlcfpmjlcfpm.png",
        caption: "Network infrastructure components - Kuwait City installation",
        alt: "Network infrastructure Kuwait - business IT setup"
      },
      {
        url: "https://i.postimg.cc/PH9C3Ktt/Gemini-Generated-Image-lcxfa1lcxfa1lcxf.png",
        caption: "Network cable management solutions - Farwaniya office",
        alt: "Cable management Kuwait - network organization"
      },
      {
        url: "https://i.postimg.cc/Fv8YWG9S/1221.png",
        caption: "Network setup and configuration - Hawalli service",
        alt: "Network setup Kuwait - configuration equipment"
      }
    ],
    branding: [
      {
        url: "https://i.postimg.cc/C0XRPJFw/Gemini-Generated-Image-u0ktlwu0ktlwu0kt.png",
        caption: "Modern repair facility interior - KCROC Kuwait",
        alt: "Computer repair facility Kuwait - modern workshop"
      },
      {
        url: "https://i.postimg.cc/Sq9Jw8sN/Gemini-Generated-Image-vm5ezmvm5ezmvm5e.png",
        caption: "Technical workspace and equipment - KCROC Hawalli",
        alt: "Technical workspace Kuwait - computer repair equipment"
      }
    ]
  };

  const getAllImages = () => {
    return Object.values(galleryImages).flat();
  };

  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return getAllImages();
    }
    return galleryImages[selectedCategory] || [];
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-gradient-to-br from-slate-900 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-purple-500/20 text-purple-300 border border-purple-500/30">
              📸 Our Work Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              See Our <span className="gradient-text-purple">Professional Work</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Browse through our collection of real repair work, components, and services in Kuwait.
              Each image showcases our commitment to quality and professional standards.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 bg-slate-900">
        <div className="container mx-auto px-4">
          {filteredImages.length > 0 ? (
            <div className="gallery-grid">
              {filteredImages.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=KCROC&background=1a1a1a&color=00D9FF&size=400x250&format=png`;
                    }}
                  />
                  <div className="gallery-caption">
                    {image.caption}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageOff className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Experience Our Professional Service?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              See the quality of our work firsthand. Contact us today for expert computer
              repair services with the same attention to detail shown in our gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <a href="tel:+96555301913">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +965 5530 1913
                </a>
              </Button>
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <a
                  href="https://wa.me/96555301913"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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