import { Helmet } from 'react-helmet-async';
import { Award, Users, Clock, Shield, Zap, Heart, Star, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function About() {
  const achievements = [
    { icon: Users, number: "500+", label: "Happy Customers" },
    { icon: Clock, number: "24/7", label: "Support Available" },
    { icon: Award, number: "98%", label: "Success Rate" },
    { icon: Shield, number: "5+", label: "Years Experience" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Data Privacy First",
      description: "Your personal and business data is protected with enterprise-grade security protocols during every repair.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/9f8c9e79-77c9-4959-8f2e-d9a6bec17b1b.png"
    },
    {
      icon: Zap,
      title: "Lightning Fast Service",
      description: "Same-day hardware repairs with emergency response available across all Kuwait governorates.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/3ddd029d-1ed9-44d7-845e-911732d5888d.png"
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description: "We don't just fix computers - we build lasting trust and relationships with our clients.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/40780580-7370-475d-b516-fa2d41e142ba.png"
    },
    {
      icon: Star,
      title: "Quality Engineering",
      description: "Only genuine parts, precision micro-soldering, and professional-grade tools for every job.",
      image: "https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-03-01/fe0f254d-ca91-4dbb-a283-49603f110dab.png"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Helmet>
        <title>About KCROC | Expert Computer Repair Team in Kuwait</title>
        <meta name="description" content="Meet the expert technicians behind Kuwait Computer Repair On Call (KCROC). Imran Natiq and Riyaz Kawa lead Kuwait's most trusted computer and MacBook repair lab." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Award size={14} />
            <span>Kuwait's Trusted Hardware Lab</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Meet the Team Behind
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"> KCROC's Success</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Founded in 2019, Kuwait Computer Repair On Call (KCROC) has grown from a small shop to Kuwait's most trusted engineering lab. Our mission is simple: deliver world-class technical solutions with unmatched transparency.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <div key={index} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 text-center shadow-lg">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
                  <stat.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-500 font-medium uppercase
