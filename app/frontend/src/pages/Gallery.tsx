import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Camera } from 'lucide-react';

// ─── Schema ──────────────────────────────────────────────────────────────────
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.computerrepairkuwait.com/#business',
      name: 'Kuwait Computer Repair On Call',
      alternateName: 'KCROC',
      url: 'https://www.computerrepairkuwait.com',
      telephone: '+96555301913',
      email: 'quadrillion1980@gmail.com',
      image: 'https://www.computerrepairkuwait.com/logo.png',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
        addressLocality: 'Hawalli',
        addressCountry: 'KW',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.3356,
        longitude: 48.025,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
      },
      sameAs: ['https://www.computerrepairkuwait.com'],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.computerrepairkuwait.com/gallery#webpage',
      name: 'KCROC Gallery – Computer Repair Work in Kuwait',
      url: 'https://www.computerrepairkuwait.com/gallery',
      isPartOf: { '@id': 'https://www.computerrepairkuwait.com/#website' },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const WA_LINK =
  'https://wa.me/96555301913?text=Hi%2C+I+need+a+repair.+Please+arrange+free+pickup.';

const images = [
  // ── Shop & Facility ──────────────────────────────────────────────────────
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/KCROC_shop_exterior_and_storefront_-_Al_Mullah_Complex_Hawalli_ewah64.png',
    alt: 'KCROC shop exterior – Al Mullah Complex, Hawalli Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Modern_repair_facility_interior_-_KCROC_Kuwait_tkxkat.jpg',
    alt: 'Modern repair facility interior – KCROC Kuwait, Hawalli',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Professional_service_environment_-_KCROC_workshop_Hawalli_xi7rhy.jpg',
    alt: 'Professional service environment – KCROC workshop, Hawalli',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg',
    alt: 'KCROC repair workshop – Kuwait Computer Repair On Call, Hawalli',
  },
  // ── New uploads ──────────────────────────────────────────────────────────
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139062/2026-01-22_11_k6dvsz.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_10_betuoi.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_8_jn8uu2.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139060/2026-01-22_7_s7a6ed.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139059/2026-01-22_6_mx8bxj.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139058/2026-01-22_5_znlovp.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139060/2026-01-22_4_uezhno.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139058/2026-01-22_3_ooiy7d.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139058/2026-01-22_2_wcnani.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139058/2026-01-22_1_jeaf3i.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139058/2026-01-22_nynw7n.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139060/2025-11-03_1_wrihqk.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139059/2025-09-01_e6nvya.jpg',
    alt: 'KCROC computer repair work – Kuwait',
  },
  // ── Repair Work ──────────────────────────────────────────────────────────
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Professional_laptop_motherboard_soldering_repair_-_Hawalli_service_vropbf.jpg',
    alt: 'Professional laptop motherboard soldering repair – Hawalli',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Internal_circuit_board_and_motherboard_work_-_Farwaniya_repair_wlxnvn.jpg',
    alt: 'Internal circuit board and motherboard repair – Farwaniya',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Desktop_motherboard_diagnostic_and_repair_-_Jahra_service_tnojnq.jpg',
    alt: 'Desktop motherboard diagnostic and repair – Jahra service',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png',
    alt: 'CPU cooling fan replacement and maintenance – Salmiya client',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg',
    alt: 'Dell laptop screen protection installation – Kuwait City',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Acer_laptop_power_jack_repair_process_-_Farwaniya_pickup_axi9by.jpg',
    alt: 'Acer laptop power jack repair – Farwaniya free pickup',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/New_Dell_laptop_battery_42Wh_installation_-_Jahra_pickup_hsbxb8.jpg',
    alt: 'New Dell laptop battery 42Wh installation – Jahra pickup',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Original_ASUS_laptop_battery_replacement_-_Ahmadi_customer_yymfro.jpg',
    alt: 'Original ASUS laptop battery replacement – Ahmadi customer',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Wireless_computer_keyboard_replacement_-_Salmiya_service_afddzo.jpg',
    alt: 'Wireless computer keyboard replacement – Salmiya service',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908593/HP_laptop_small_pin_power_connector_-_Ahmadi_service_du0imp.jpg',
    alt: 'HP laptop power connector repair – Ahmadi service',
  },
  // ── Parts & Stock ────────────────────────────────────────────────────────
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Various_computer_hardware_repair_components_-_Hawalli_stock_clrf5g.jpg',
    alt: 'Various computer hardware repair components – Hawalli stock',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908593/ASUS_laptop_power_adapter_charger_-_Kuwait_City_stock_rbo4yo.jpg',
    alt: 'ASUS laptop power adapter charger – Kuwait City stock',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Various_laptop_chargers_and_power_adapters_-_Kuwait_stock_nhjuut.jpg',
    alt: 'Various laptop chargers and power adapters – Kuwait stock',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Laptop_protective_packaging_for_safe_transport_-_free_pickup_service_bpm4vw.jpg',
    alt: 'Laptop protective packaging for safe transport – free pickup service Kuwait',
  },
  // ── Networking ───────────────────────────────────────────────────────────
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Professional_network_installation_-_Ahmadi_business_client_kaphu7.jpg',
    alt: 'Professional network installation – Ahmadi business client',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908593/Network_infrastructure_components_-_Kuwait_City_installation_bwi8pd.png',
    alt: 'Network infrastructure components – Kuwait City installation',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908593/Network_CAT-6_cables_for_high-speed_connectivity_-_Kuwait_installation_xyxhir.jpg',
    alt: 'Network CAT-6 cables for high-speed connectivity – Kuwait installation',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908592/Wireless_networking_equipment_-_Salmiya_customer_pg4hly.jpg',
    alt: 'Wireless networking equipment – Salmiya customer',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908592/Network_setup_and_configuration_tools_-_Hawalli_service_nxlzhv.jpg',
    alt: 'Network setup and configuration tools – Hawalli service',
  },
  // ── Team ─────────────────────────────────────────────────────────────────
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908603/KCROC-Owner-Image_zpdyg4.png',
    alt: 'Imran Natiq – Founder and CEO of KCROC Kuwait',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908601/KCROC-Co-Founder-Image_salp7t.png',
    alt: 'Riyaz Kawa – Co-Founder and CTO of KCROC Kuwait',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Gallery() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>Gallery | KCROC Computer Repair Work in Kuwait</title>
        <meta
          name="description"
          content="See our professional computer and laptop repair work in Kuwait. Motherboard soldering, battery replacement, screen repair, and more. Free pickup across all Kuwait. KCROC Hawalli."
        />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/gallery" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gallery | KCROC Computer Repair Work in Kuwait" />
        <meta
          property="og:description"
          content="See our professional computer and laptop repair work in Kuwait. Motherboard soldering, battery replacement, screen repair, and more. Free pickup across all Kuwait."
        />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/gallery" />
        <meta property="og:image" content="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1769908594/Modern_repair_facility_interior_-_KCROC_Kuwait_tkxkat.jpg" />
        <meta property="og:site_name" content="Kuwait Computer Repair On Call" />

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2">
            <Camera className="w-4 h-4 mr-2 inline" /> Our Work
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Repair Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              in Kuwait
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Precision engineering and quality repairs across all Kuwait governorates —
            Hawalli, Salmiya, Farwaniya, Kuwait City, Ahmadi, and Jahra.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-emerald-500/40 transition-all"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://ui-avatars.com/api/?name=KCROC&background=111827&color=10b981&size=400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-sm leading-snug">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 mt-8 border-t border-gray-800">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a repair?</h2>
          <p className="text-gray-400 mb-8">
            Kuwait Computer Repair On Call — Hawalli, Ibn Khaldoun St, Al Mullah Complex,
            Basement Shop 19. Free pickup across all Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6"
              asChild
            >
              <a href="tel:+96555301913">
                <Phone className="mr-2" /> Call 55301913
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
              asChild
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" /> WhatsApp 55301913
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
