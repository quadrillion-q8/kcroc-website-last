// ... (keep imports the same)
{/* Mobile Navigation Drawer - Solid Background & Extreme Z-Index */}
<div className={`lg:hidden fixed inset-0 top-0 pt-20 bg-slate-950 transition-all duration-300 z-[99999] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
  <nav className="flex flex-col p-6 gap-2 h-full overflow-y-auto pb-24 bg-slate-950">
    <Link to="/" className="text-xl font-bold text-white py-4 border-b border-slate-800">Home</Link>
    {/* ... rest of your mobile links remain the same ... */}
  </nav>
</div>
