import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Phone, ArrowLeft, Monitor, AlertTriangle, 
  Laptop, Droplets, Wind, Sun, MessageCircle, CheckCircle, 
  Info, PenTool, Thermometer, MapPin, HardDrive, Wrench, 
  Clock, Zap, ShieldAlert, Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ─── Schema Module ───────────────────────────────────────────────────────────
const blogSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.computerrepairkuwait.com/#business",
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "url": "https://www.computerrepairkuwait.com",
      "telephone": "+96555301913",
      "email": "quadrillion1980@gmail.com",
      "image": "https://www.computerrepairkuwait.com/logo.png",
      "address": { 
        "@type": "PostalAddress", 
        "streetAddress": "Al Mullah Complex, Ibn Khaldoun St, Basement Shop 19", 
        "addressLocality": "Hawalli", 
        "addressCountry": "KW" 
      },
      "geo": { 
        "@type": "GeoCoordinates", 
        "latitude": 29.3356, 
        "longitude": 48.025 
      },
      "openingHoursSpecification": { 
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], 
        "opens": "10:00", 
        "closes": "22:00" 
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.computerrepairkuwait.com/blog/how-to-protect-laptop-screen#webpage",
      "url": "https://www.computerrepairkuwait.com/blog/how-to-protect-laptop-screen",
      "name": "How to Protect Your Laptop Screen & Repair Guide | KCROC",
      "isPartOf": { "@id": "https://www.computerrepairkuwait.com/#website" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.computerrepairkuwait.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.computerrepairkuwait.com/blog" },
        { "@type": "ListItem", "position": 3, "name": "Laptop Screen Protection & Repair Guide" }
      ]
    },
    {
      "@type": "Article",
      "@id": "https://www.computerrepairkuwait.com/blog/how-to-protect-laptop-screen#article",
      "headline": "How to Protect Your Laptop Screen: The Ultimate Expert Care & Repair Guide",
      "description": "Expert advice from KCROC technicians on preventing laptop screen damage. Learn the physics of screen failure, Kuwait climate impacts, and repair costs.",
      "author": { 
        "@type": "Organization", 
        "name": "KCROC Technical Team",
        "url": "https://www.computerrepairkuwait.com",
        "logo": { "@type": "ImageObject", "url": "https://www.computerrepairkuwait.com/logo.png" }
      },
      "publisher": { "@id": "https://www.computerrepairkuwait.com/#business" },
      "mainEntityOfPage": { "@id": "https://www.computerrepairkuwait.com/blog/how-to-protect-laptop-screen#webpage" },
      "articleSection": "Hardware Maintenance & Repair Guides",
      "datePublished": "2026-06-01T08:00:00+03:00",
      "dateModified": "2026-06-11T10:00:00+03:00",
      "image": "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg",
      "wordCount": 1850,
      "inLanguage": "en-KW",
      "keywords": "protect laptop screen, laptop screen repair Kuwait, laptop display replacement, cracked laptop screen prevention, laptop hinge repair Hawalli, fix MacBook screen Kuwait"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Can a cracked laptop screen be repaired?", "acceptedAnswer": { "@type": "Answer", "text": "No, physically cracked LCD or OLED panels cannot be repaired; the entire display panel assembly must be replaced. At KCROC, we provide professional screen replacement for all major brands in Kuwait." } },
        { "@type": "Question", "name": "How much does laptop screen replacement cost in Kuwait?", "acceptedAnswer": { "@type": "Answer", "text": "Costs vary depending on the model, resolution (FHD, 4K), and panel type (LCD vs OLED). Standard laptop screens generally range from 20 to 45 KD, while premium MacBook or touchscreens cost more. We provide free, transparent quotes before any repair." } },
        { "@type": "Question", "name": "Can a laptop screen crack internally?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Internal fractures occur when pressure is applied to the laptop lid without breaking the outer glass, often causing ink-like black spots, dead pixels, or colored vertical lines." } },
        { "@type": "Question", "name": "How long does it take to replace a laptop screen?", "acceptedAnswer": { "@type": "Answer", "text": "If the screen is in stock at our Hawalli lab, replacement takes 1 to 2 hours. With our free pickup and delivery service, you can generally expect a 24-hour turnaround across Kuwait governorates." } },
        { "@type": "Question", "name": "Can heat damage a laptop screen?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Leaving a laptop in a hot vehicle in Kuwait can warp the display layers, melt internal adhesives, and cause severe backlight bleeding or permanent panel delamination." } },
        { "@type": "Question", "name": "Do you offer free pickup for screen repairs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Kuwait Computer Repair On Call offers free pickup and delivery for all screen replacements, serving Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, and Ahmadi." } },
        { "@type": "Question", "name": "Can keyboard debris crack a screen?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this is one of the most common causes of screen damage. A single grain of sand or crumb acts as a pivot point, cracking the glass instantly when the lid is closed." } },
        { "@type": "Question", "name": "What should I do if my screen starts flickering?", "acceptedAnswer": { "@type": "Answer", "text": "Flickering can be a failing GPU, a loose eDP display cable, or motherboard failure. Stop moving the lid, back up your data, and contact a professional for a hardware diagnostic." } }
      ]
    }
  ]
};

export default function BlogScreenProtection() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>How to Protect Your Laptop Screen: Expert Repair Guide | KCROC</title>
        <meta name="description" content="Discover how to protect your laptop screen from damage. Learn the physics of screen failure, Kuwait climate impacts, and when to seek professional screen repair." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/blog/how-to-protect-laptop-screen" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="How to Protect Your Laptop Screen: Expert Repair Guide | KCROC" />
        <meta property="og:description" content="Discover how to protect your laptop screen from damage in Kuwait. Professional maintenance tips, repair costs, and failure diagnostics." />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/blog/how-to-protect-laptop-screen" />
        <meta property="og:image" content="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg" />
        <meta property="og:site_name" content="Kuwait Computer Repair On Call" />
        
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>
      
      {/* Article Hero */}
      <section className="pt-32 pb-16 px-6 border-b border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 mb-8 font-semibold w-fit">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2">
            <Monitor className="w-4 h-4 mr-2 inline" /> Hardware Maintenance Guide
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
            How to Protect Your Laptop Screen: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">The Ultimate Expert Guide</span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mt-8 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                <Wrench size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-bold text-gray-200">KCROC Technical Team</p>
                <p>20+ Years Hardware Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-800 pl-6">
              <MapPin size={16} className="text-gray-500" />
              <span>Hawalli, Kuwait</span>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-800 pl-6">
              <CheckCircle size={16} className="text-emerald-500" />
              <span>Verified Repair Insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="text-xl text-gray-300 leading-relaxed mb-12 space-y-6">
            <p>
              Your laptop screen is a marvel of modern engineering, packing millions of microscopic pixels into a panel only millimeters thick. Unfortunately, to achieve ultra-thin aesthetics, manufacturers have drastically reduced the structural rigidity of modern laptop lids. It is, without question, the most fragile component of your machine.
            </p>
            <p>
              As the leading <Link to="/laptop-repair-hawalli-kuwait" className="text-emerald-400 font-semibold hover:underline">laptop repair specialists in Kuwait</Link>, our technicians at <strong>Kuwait Computer Repair On Call (KCROC)</strong> replace hundreds of shattered, bleeding, and glitching displays every year. Through our extensive workshop experience in Hawalli, we've found that over 80% of these costly hardware failures were entirely preventable.
            </p>
            <p>
              Whether you are commuting to a corporate office in Kuwait City, studying at a café in Salmiya, or running a business in Farwaniya, this comprehensive technical guide will teach you exactly how laptop screens fail, how Kuwait's unique climate destroys them, and the proven steps you must take to protect your investment.
            </p>
          </div>

          <figure className="my-12 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
            <img 
              src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1000/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg" 
              alt="Technician performing laptop screen protection installation and diagnostic in Kuwait City" 
              className="w-full h-auto object-cover max-h-[500px]"
              loading="lazy"
            />
            <figcaption className="p-4 text-sm text-gray-400 text-center italic bg-gray-900/50">
              A KCROC technician diagnosing a damaged laptop display panel at our Hawalli workshop.
            </figcaption>
          </figure>

          {/* The Physics of Screen Failure */}
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Cpu className="text-emerald-500" /> The Engineering Behind Screen Failure
          </h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-12">
            <p>
              To understand how to protect your screen, you must understand how it fails. Modern displays (both LCD and OLED) are built using a "sandwich" of incredibly thin layers: protective glass, polarizing filters, liquid crystal or organic diode layers, and backlight diffusers. 
            </p>
            <p>
              Because the outer chassis is so thin, the display panel itself absorbs almost all kinetic energy when the laptop is compressed, twisted, or impacted. 
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-400">
              <li><strong className="text-gray-200">Pressure Damage:</strong> Often leaves no external glass cracks. Instead, internal pressure crushes the liquid crystal matrix, resulting in permanent, ink-like black spots (dead pixels) that slowly spread across the screen.</li>
              <li><strong className="text-gray-200">Torsional Twist:</strong> Opening the laptop by pulling heavily on one corner bends the delicate internal eDP display cables and twists the glass. This leads to vertical colored lines, flickering, and eventual hinge failure.</li>
              <li><strong className="text-gray-200">Backlight Failure:</strong> Impact to the bottom bezel often shorts the inverter board or crushes the LED backlight strip, leaving the screen functioning but too dark to see without a flashlight.</li>
            </ul>
          </div>

          {/* Kuwait's Climate */}
          <Card className="bg-gray-900/40 border-gray-800 my-12 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500 w-full" />
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Thermometer className="text-orange-500" /> Kuwait's Climate: A Screen's Worst Enemy
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Our local environment puts extreme stress on portable electronics. Based on our repair data across Kuwait governorates, environmental damage is a leading cause of screen failure:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Sun className="text-orange-400 mt-1 flex-shrink-0 w-6 h-6" />
                  <div>
                    <strong className="text-white text-lg block mb-1">Extreme Heat Expansion</strong>
                    <span className="text-gray-400">Leaving a laptop in a parked car during a Kuwait summer is disastrous. The extreme heat melts the OCA (Optically Clear Adhesive) binding the screen layers, causing the display to warp, delaminate, and suffer massive backlight bleeding around the edges.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Wind className="text-yellow-400 mt-1 flex-shrink-0 w-6 h-6" />
                  <div>
                    <strong className="text-white text-lg block mb-1">Airborne Desert Dust</strong>
                    <span className="text-gray-400">Fine sand naturally settles into the keyboard deck during dust storms. When the lid is closed tightly, these abrasive micro-particles grind against the display's anti-glare coating, causing permanent micro-scratches.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Droplets className="text-blue-400 mt-1 flex-shrink-0 w-6 h-6" />
                  <div>
                    <strong className="text-white text-lg block mb-1">A/C Condensation Shorts</strong>
                    <span className="text-gray-400">Transporting a laptop from a freezing air-conditioned office directly into the humid summer heat can cause internal condensation. Water droplets form on the sensitive display connector on the <Link to="/chip-level-motherboard-repair-hawalli" className="text-emerald-400 hover:underline">laptop motherboard</Link>, causing immediate electrical shorts.</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* The Core Preventative Tips */}
          <h2 className="text-3xl font-bold text-white mb-8 mt-16">The 7 Rules of Laptop Screen Protection</h2>
          
          <div className="space-y-10">
            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2"><ShieldCheck /> 1. Invest in Proper Transport Protection</h3>
              <p className="text-gray-300 text-lg">Carrying a bare laptop in a backpack alongside heavy books, chargers, and metal water bottles is a guarantee for pressure damage. Always use a rigid, padded laptop sleeve. The sleeve acts as a shock absorber, dispersing kinetic energy away from the glass panel during your daily commute.</p>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2"><Laptop /> 2. Master the "Center Lift" Technique</h3>
              <p className="text-gray-300 text-lg">Never open the lid by pulling aggressively from one corner. This forces the entire resistance of both metal hinges onto one side of the fragile display glass. Always open your laptop by lifting gently from the top-center of the bezel to distribute the weight evenly.</p>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2"><AlertTriangle /> 3. Beware of Keyboard Debris (The #1 Killer)</h3>
              <p className="text-gray-300 text-lg">This is the most common cause of cracked screens we see at our Hawalli workshop. A stray earbud, a pen, or even a hard breadcrumb left on the keyboard acts as a lever pivot point. When you close the lid, all the force is concentrated on that tiny object, shattering the glass instantly.</p>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2"><Monitor /> 4. Stop Using Thick Webcam Covers</h3>
              <p className="text-gray-300 text-lg">Modern ultrabooks and <Link to="/macbook-repair" className="text-emerald-400 hover:underline">Apple MacBooks</Link> are engineered with zero-clearance tolerances between the glass and the keyboard deck. Sticking a hard plastic webcam slider alters this clearance. When the lid is closed, the glass is forced to bend around the plastic cover, resulting in an immediate fracture.</p>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2"><Droplets /> 5. Clean with Absolute Care</h3>
              <p className="text-gray-300 text-lg">Never spray Windex, alcohol, or any liquid directly onto your screen. The liquid rapidly runs down the glass, pools at the bottom bezel, and shorts out the display inverter board. Lightly dampen a clean microfiber cloth first, then gently wipe the display in wide, circular motions.</p>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2"><Sun /> 6. Manage Temperature Exposure</h3>
              <p className="text-gray-300 text-lg">As mentioned, heat is a silent killer. Never leave your laptop exposed to direct sunlight near a window or inside a vehicle. The thermal expansion causes the metal chassis to expand at a different rate than the glass, creating tension that can pop the screen right out of its bezel.</p>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2"><Wind /> 7. Mind Your Environment</h3>
              <p className="text-gray-300 text-lg">Avoid leaving your laptop open on the floor, on a bed, or precariously near the edge of a desk. Accidental stepping, sitting, or a quick knock off a table accounts for nearly 40% of all structural display damage. Treat your laptop like an expensive pane of glass, because fundamentally, it is.</p>
            </div>
          </div>

          <figure className="my-12 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 flex justify-center p-6">
            <img 
              src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Professional_service_environment_-_KCROC_workshop_Hawalli_xi7rhy.jpg" 
              alt="Clean professional environment at KCROC workshop handling delicate laptop screen components" 
              className="w-full h-auto object-cover max-h-[400px] rounded-xl"
              loading="lazy"
            />
          </figure>

          {/* Mistakes Made After Damage */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-16">The Biggest Mistakes to Avoid AFTER Screen Damage</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
              <h4 className="font-bold text-red-400 flex items-center gap-2 mb-2"><ShieldAlert size={18} /> Pressing the Glass</h4>
              <p className="text-gray-300 text-sm">Users often press on cracked glass or spreading black ink spots to "see how bad it is." This drives microscopic glass shards deep into the backlight layers, turning a simple screen replacement into a messy, complicated repair.</p>
            </div>
            <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
              <h4 className="font-bold text-red-400 flex items-center gap-2 mb-2"><HardDrive size={18} /> Delaying Data Backup</h4>
              <p className="text-gray-300 text-sm">If your screen goes black after a drop, the hard drive or motherboard may also be failing. Immediately connect an external monitor to verify functionality and <Link to="/data-security" className="text-emerald-400 hover:underline">backup your critical data</Link> before the system dies completely.</p>
            </div>
          </div>

          {/* Repair vs Replace & Costs */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-16 flex items-center gap-3">
            <Wrench className="text-emerald-500" /> Repair vs. Replace: The Kuwait Market Reality
          </h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-12">
            <p>
              A common question we receive at our workshop is: <em>"Can you just fix the glass, or is the laptop ruined?"</em>
            </p>
            <p>
              If the display panel is physically cracked, bleeding ink, or showing permanent colored lines, the actual LCD/OLED panel is destroyed. It cannot be "glued" or software-repaired. However, <strong>you absolutely do not need to buy a new laptop.</strong>
            </p>
            <p>
              At KCROC, we perform factory-grade display assembly replacements. We source OEM-quality panels and swap out the broken screen, restoring your laptop for a fraction of the cost of a new machine. 
            </p>
            <p>
              <strong>Cost Breakdown Context:</strong> In Kuwait, a standard 1080p FHD laptop screen replacement is incredibly affordable, making it highly worth repairing. Premium touchscreens, 4K displays, and MacBook Retina assemblies require higher-end parts, but are still vastly cheaper than replacing a 500+ KD machine.
            </p>
          </div>

          {/* The KCROC Process */}
          <Card className="bg-gray-900/50 border-gray-800 my-16">
            <CardHeader className="border-b border-gray-800 pb-6 mb-6">
              <CardTitle className="text-2xl font-bold text-white text-center">The KCROC Screen Replacement Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <MapPin className="text-emerald-400" size={24} />
                  </div>
                  <h4 className="font-bold text-white mb-2">1. Free Pickup</h4>
                  <p className="text-sm text-gray-400">We collect your damaged laptop directly from your home or office, anywhere in Kuwait.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Monitor className="text-emerald-400" size={24} />
                  </div>
                  <h4 className="font-bold text-white mb-2">2. Free Diagnosis</h4>
                  <p className="text-sm text-gray-400">Our technicians inspect the screen, hinges, and display cables to ensure no hidden motherboard damage exists.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Zap className="text-emerald-400" size={24} />
                  </div>
                  <h4 className="font-bold text-white mb-2">3. Rapid Repair</h4>
                  <p className="text-sm text-gray-400">We provide a transparent quote, install a pristine new panel, test it rigorously, and deliver it back.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brands Supported */}
          <div className="border-y border-gray-800 py-10 mb-16">
            <h3 className="text-xl font-bold text-white mb-6 text-center">We Provide Professional Screen Replacements For:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Apple MacBook', 'Dell XPS & Latitude', 'HP Envy & Pavilion', 'Lenovo ThinkPad', 'ASUS ROG & VivoBook', 'Acer', 'MSI Gaming', 'Microsoft Surface'].map(brand => (
                <Badge key={brand} variant="outline" className="border-gray-700 text-gray-300 bg-gray-900 px-4 py-2 text-sm">{brand}</Badge>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <section className="py-12">
            <h2 className="text-3xl font-black text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Can a cracked laptop screen be repaired?", a: "No, physically cracked LCD or OLED panels cannot be repaired; the entire display panel assembly must be replaced. At KCROC, we provide professional screen replacement for all major brands in Kuwait." },
                { q: "How much does laptop screen replacement cost in Kuwait?", a: "Costs vary depending on the model, resolution (FHD, 4K), and panel type. Standard screens are very affordable, while premium MacBook or touchscreens cost more. We provide free, transparent quotes before any repair." },
                { q: "Can a laptop screen crack internally?", a: "Yes. Internal fractures occur when pressure is applied to the laptop lid without breaking the outer glass, often causing ink-like black spots or colored vertical lines." },
                { q: "How long does it take to replace a laptop screen?", a: "If the screen is in stock at our Hawalli lab, replacement takes 1 to 2 hours. With our free pickup and delivery service, you can generally expect a 24-hour turnaround." },
                { q: "Can heat damage a laptop screen?", a: "Absolutely. Leaving a laptop in a hot vehicle in Kuwait can warp the display layers, melt internal adhesives, and cause severe backlight bleeding." },
                { q: "Do you offer free pickup for screen repairs?", a: "Yes, Kuwait Computer Repair On Call offers free pickup and delivery for all screen replacements, serving Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, and Ahmadi." },
                { q: "Can keyboard debris crack a screen?", a: "Yes, this is one of the most common causes of screen damage. A single grain of sand or crumb acts as a pivot point, cracking the glass instantly when the lid is closed." },
                { q: "What should I do if my screen starts flickering?", a: "Flickering can be a failing GPU, a loose eDP display cable, or motherboard failure. Stop moving the lid, back up your data, and contact a professional for a hardware diagnostic." }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-start gap-3">
                    <span className="text-emerald-400 font-black mt-0.5">Q:</span> {faq.q}
                  </h3>
                  <p className="text-gray-400 pl-7 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </section>

      {/* Ultimate Conversion CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 uppercase tracking-widest font-bold">
              Emergency Repair Available
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Don't Work Through a Broken Screen.</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A cracked screen severely damages your productivity and risks internal electrical shorts. Kuwait Computer Repair On Call (KCROC) provides rapid, factory-grade screen replacements so you can get back to work safely.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 text-left">
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
                <CheckCircle className="text-emerald-500 flex-shrink-0" size={28} />
                <div>
                  <span className="font-bold text-white block">Free Diagnostics</span>
                  <span className="text-sm text-gray-500">No Fix, No Charge</span>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
                <HardDrive className="text-emerald-500 flex-shrink-0" size={28} />
                <div>
                  <span className="font-bold text-white block">100% Data Safe</span>
                  <span className="text-sm text-gray-500">Privacy Guaranteed</span>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
                <Clock className="text-emerald-500 flex-shrink-0" size={28} />
                <div>
                  <span className="font-bold text-white block">Free Kuwait Pickup</span>
                  <span className="text-sm text-gray-500">Fast Turnaround</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-10 py-7 shadow-lg shadow-emerald-900/50" asChild>
                  <Link to="/book">Book Your Free Pickup Now</Link>
                </Button>
                <Button size="lg" className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 text-lg px-10 py-7" asChild>
                  <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" size={22} /> Get a Quote on WhatsApp
                  </a>
                </Button>
            </div>
            <p className="text-gray-500 text-sm mt-8 flex items-center justify-center gap-2">
              <MapPin size={16} /> Fast Dispatch to Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, and Ahmadi.
            </p>
        </div>
      </section>

    </main>
  );
}
