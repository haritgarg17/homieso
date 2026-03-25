/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, FormEvent } from "react";
import { 
  Search, 
  MapPin, 
  Home, 
  ShieldCheck, 
  Zap, 
  Users, 
  Heart, 
  Star, 
  ChevronRight, 
  Menu, 
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Mock Data for PGs
const MOCK_PGS = [
  {
    id: 1,
    name: "Stanza Living - Mumbai Central",
    location: "Mumbai Central",
    price: 18000,
    type: "Co-living",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    amenities: ["WiFi", "AC", "Laundry", "Food", "Gym"],
    description: "Premium co-living space in the heart of Mumbai. Perfect for students and young professionals who value comfort and community."
  },
  {
    id: 2,
    name: "Zolo Scholar - Andheri East",
    location: "Andheri East",
    price: 12500,
    type: "Boys",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555854816-809728a6714d?auto=format&fit=crop&q=80&w=800",
    amenities: ["WiFi", "Gym", "Food", "Security"],
    description: "Affordable and secure housing for male students. Located near major educational hubs and metro stations."
  },
  {
    id: 3,
    name: "Your-Space - Powai",
    location: "Powai",
    price: 22000,
    type: "Girls",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
    amenities: ["WiFi", "AC", "Security", "Food", "Library"],
    description: "Exclusive girls' hostel with top-notch security and modern amenities. Close to IIT Bombay and Hiranandani."
  },
  {
    id: 4,
    name: "Homieso Premium - Bandra",
    location: "Bandra West",
    price: 25000,
    type: "Co-living",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1512918766674-ed62b90eaa9c?auto=format&fit=crop&q=80&w=800",
    amenities: ["WiFi", "AC", "Laundry", "Parking", "Terrace"],
    description: "Luxury living in Mumbai's most vibrant neighborhood. High-end interiors and a community of like-minded individuals."
  },
  {
    id: 5,
    name: "Dadar Residency",
    location: "Dadar",
    price: 15000,
    type: "Co-living",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    amenities: ["WiFi", "Food", "Laundry"],
    description: "Centrally located with excellent connectivity to all parts of Mumbai. Ideal for daily commuters."
  },
  {
    id: 6,
    name: "Colaba Heritage Stay",
    location: "Colaba",
    price: 30000,
    type: "Girls",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
    amenities: ["WiFi", "AC", "Security", "Breakfast"],
    description: "Experience the charm of South Mumbai in this beautifully restored heritage building turned hostel."
  }
];

const LOCALITIES = ["All", "Andheri East", "Bandra West", "Powai", "Dadar", "Mumbai Central", "Colaba"];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [selectedPG, setSelectedPG] = useState<any>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [showListPropertyModal, setShowListPropertyModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPGs = useMemo(() => {
    return MOCK_PGS.filter(pg => {
      const matchesSearch = pg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pg.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocality = selectedLocality === "All" || pg.location === selectedLocality;
      const matchesType = selectedType === "All" || pg.type === selectedType;
      return matchesSearch && matchesLocality && matchesType;
    });
  }, [searchQuery, selectedLocality, selectedType]);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    setShowBookingSuccess(true);
    setTimeout(() => {
      setShowBookingSuccess(false);
      setSelectedPG(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-[#C41E3A] rounded-full flex items-center justify-center">
              <Home className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight font-display ${scrolled ? "text-[#C41E3A]" : "text-white"}`}>
              homieso
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Listings", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-medium hover:text-[#C41E3A] transition-colors ${scrolled ? "text-stone-600" : "text-white/90"}`}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => setShowListPropertyModal(true)}
              className="bg-[#C41E3A] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#A01830] transition-all shadow-lg"
            >
              List Property
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? "text-stone-900" : "text-white"} /> : <Menu className={scrolled ? "text-stone-900" : "text-white"} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {["Home", "Listings", "About", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-2xl font-semibold text-stone-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowListPropertyModal(true);
                }}
                className="bg-[#C41E3A] text-white px-6 py-4 rounded-xl text-lg font-semibold"
              >
                List Property
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Mumbai Skyline"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold font-display text-white mb-6 leading-tight"
          >
            Find Your <span className="text-[#C41E3A]">Peace</span> in Mumbai
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            One stop shop for all your PG and accommodation needs. Verified listings, zero brokerage, and peace of mind.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-6 py-3 w-full">
              <MapPin className="text-[#C41E3A] w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search by locality..." 
                className="w-full outline-none text-stone-800 placeholder-stone-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-8 w-[1px] bg-stone-200 hidden md:block" />
            <div className="flex-1 flex items-center gap-3 px-6 py-3 w-full">
              <Users className="text-[#C41E3A] w-5 h-5 flex-shrink-0" />
              <select 
                className="w-full outline-none bg-transparent text-stone-800 cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Co-living">Co-living</option>
              </select>
            </div>
            <button 
              onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#C41E3A] text-white px-10 py-4 rounded-xl md:rounded-full font-bold hover:bg-[#A01830] transition-all w-full md:w-auto flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {LOCALITIES.slice(1, 6).map(loc => (
              <span 
                key={loc} 
                onClick={() => {
                  setSelectedLocality(loc);
                  document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm border border-white/30 cursor-pointer hover:bg-white/30 transition-all"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="listings" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-stone-900 mb-4">Explore Accommodations</h2>
              <p className="text-stone-500">Showing {filteredPGs.length} verified results in Mumbai.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {LOCALITIES.map(loc => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocality(loc)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedLocality === loc 
                    ? "bg-[#C41E3A] text-white shadow-lg" 
                    : "bg-white text-stone-600 border border-stone-200 hover:border-[#C41E3A]"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {filteredPGs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPGs.map((pg) => (
                <motion.div 
                  layout
                  key={pg.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 group cursor-pointer"
                  onClick={() => setSelectedPG(pg)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={pg.image} 
                      alt={pg.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#C41E3A]">
                      {pg.type}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {pg.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 truncate font-display">{pg.name}</h3>
                    <div className="flex items-center gap-1 text-stone-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 text-[#C41E3A]" />
                      {pg.location}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pg.amenities.slice(0, 3).map(a => (
                        <span key={a} className="text-[10px] uppercase tracking-wider font-bold bg-stone-100 text-stone-500 px-2 py-1 rounded">
                          {a}
                        </span>
                      ))}
                      {pg.amenities.length > 3 && (
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-stone-100 text-stone-500 px-2 py-1 rounded">
                          +{pg.amenities.length - 3} More
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <div>
                        <span className="text-2xl font-bold text-[#C41E3A]">₹{pg.price.toLocaleString()}</span>
                        <span className="text-stone-400 text-xs">/month</span>
                      </div>
                      <button className="bg-stone-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#C41E3A] transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-stone-200">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-stone-400 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">No results found</h3>
              <p className="text-stone-500 mb-8">Try adjusting your filters or searching for a different area.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocality("All");
                  setSelectedType("All");
                }}
                className="text-[#C41E3A] font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" 
                  alt="Our Team" 
                  className="rounded-[3rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -right-10 bg-[#C41E3A] p-8 rounded-[2rem] text-white shadow-xl hidden md:block">
                  <div className="text-4xl font-bold mb-1">100%</div>
                  <div className="text-sm font-medium opacity-80">Verified Properties</div>
                </div>
              </motion.div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#C41E3A]/5 rounded-full blur-3xl" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold font-display text-stone-900 mb-8 leading-tight">
                Our Mission is <span className="text-[#C41E3A]">Peace</span>
              </h2>
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                Homieso was born out of a simple observation: finding a PG in Mumbai is a nightmare. From fake photos to hidden brokerage, the process is anything but peaceful.
              </p>
              <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                We're changing that. Our team physically visits every property, verifies every amenity, and ensures that what you see is exactly what you get. No surprises, just a place you can call home.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: "Safety First", desc: "24/7 security and verified roommates." },
                  { icon: Zap, title: "Instant Move-in", desc: "Paperless process, move in within 24 hours." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-[#C41E3A] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPG && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPG(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedPG(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-900 hover:bg-stone-100 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img 
                    src={selectedPG.image} 
                    alt={selectedPG.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-2 text-[#C41E3A] font-bold text-sm mb-4 uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Property
                  </div>
                  <h2 className="text-3xl font-bold font-display mb-2">{selectedPG.name}</h2>
                  <div className="flex items-center gap-2 text-stone-500 mb-6">
                    <MapPin className="w-4 h-4" />
                    {selectedPG.location}
                  </div>
                  
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    {selectedPG.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="font-bold mb-4">Amenities</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedPG.amenities.map((a: string) => (
                        <span key={a} className="bg-stone-100 text-stone-700 px-4 py-2 rounded-xl text-sm font-medium">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-3xl mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-stone-500 font-medium">Monthly Rent</span>
                      <span className="text-3xl font-bold text-[#C41E3A]">₹{selectedPG.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-500">Security Deposit</span>
                      <span className="font-bold">₹{selectedPG.price.toLocaleString()} (Refundable)</span>
                    </div>
                  </div>

                  {showBookingSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 text-green-700 p-6 rounded-3xl flex items-center gap-4 border border-green-100"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold">Visit Scheduled!</h4>
                        <p className="text-sm opacity-80">Our team will contact you shortly to confirm the time.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder="Your Name" className="bg-stone-100 p-4 rounded-xl outline-none focus:ring-2 ring-[#C41E3A]/20 transition-all" />
                        <input required type="tel" placeholder="Phone Number" className="bg-stone-100 p-4 rounded-xl outline-none focus:ring-2 ring-[#C41E3A]/20 transition-all" />
                      </div>
                      <button type="submit" className="w-full bg-[#C41E3A] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#A01830] transition-all flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Schedule a Visit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* List Property Modal */}
      <AnimatePresence>
        {showListPropertyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowListPropertyModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl"
            >
              <button 
                onClick={() => setShowListPropertyModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 hover:bg-stone-200 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold font-display mb-2 text-center">List Your Property</h2>
              <p className="text-stone-500 text-center mb-10">Join Mumbai's most trusted network of accommodations.</p>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Our verification team will contact you within 24 hours to schedule a site visit.");
                setShowListPropertyModal(false);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 ml-1">Property Name</label>
                    <input required type="text" placeholder="e.g. Bandra Heights PG" className="w-full bg-stone-100 p-4 rounded-xl outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 ml-1">Locality</label>
                    <select className="w-full bg-stone-100 p-4 rounded-xl outline-none">
                      {LOCALITIES.slice(1).map(loc => <option key={loc}>{loc}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 ml-1">Expected Rent (₹/month)</label>
                  <input required type="number" placeholder="15000" className="w-full bg-stone-100 p-4 rounded-xl outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 ml-1">Contact Details</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="Your Name" className="bg-stone-100 p-4 rounded-xl outline-none" />
                    <input required type="tel" placeholder="Phone Number" className="bg-stone-100 p-4 rounded-xl outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#C41E3A] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#A01830] transition-all shadow-xl shadow-[#C41E3A]/20">
                  Submit for Verification
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contact" className="bg-stone-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-[#C41E3A] rounded-full flex items-center justify-center">
                  <Home className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight font-display">homieso</span>
              </div>
              <p className="text-stone-400 mb-8 leading-relaxed text-lg">
                Mumbai's most trusted platform for student and professional accommodations. Because you deserve peace.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center hover:bg-[#C41E3A] transition-all group">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 font-display">Quick Links</h4>
              <ul className="space-y-4 text-stone-400 text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#listings" className="hover:text-white transition-colors">Find PGs</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" onClick={() => setShowListPropertyModal(true)} className="hover:text-white transition-colors">List Property</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 font-display">Support</h4>
              <ul className="space-y-4 text-stone-400 text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guide</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 font-display">Contact Us</h4>
              <ul className="space-y-6 text-stone-400 text-lg">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  hello@homieso.india
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  123, Peace Tower, Bandra West, Mumbai - 400050
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-800 text-center text-stone-500 text-sm">
            <p>© 2026 Homieso India. All rights reserved. Built for Mumbai with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
