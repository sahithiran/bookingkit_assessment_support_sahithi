/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  ChevronRight, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Twitter,
  Search,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const TOURS = [
  {
    id: 1,
    title: "Museum Island Express",
    description: "Skip the line at Berlin's most famous museums and discover 6,000 years of history.",
    price: 29,
    duration: "3 Hours",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80",
    tag: "Bestseller"
  },
  {
    id: 2,
    title: "Underground Bunker Tour",
    description: "Explore the dark history beneath the city streets in authentic WWII air-raid shelters.",
    price: 18,
    duration: "90 Mins",
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1599946347341-6cd394796175?auto=format&fit=crop&w=800&q=80",
    tag: "Historical"
  },
  {
    id: 3,
    title: "Berlin Wall Bike Tour",
    description: "A scenic ride along the former border, visiting Checkpoint Charlie and East Side Gallery.",
    price: 35,
    duration: "4 Hours",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80",
    tag: "Active"
  },
  {
    id: 4,
    title: "Street Art & Graffiti Workshop",
    description: "Learn the techniques from local artists and create your own masterpiece on a canvas.",
    price: 45,
    duration: "2.5 Hours",
    rating: 5.0,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    tag: "Creative"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoadingWidget, setIsLoadingWidget] = useState(true);
  const [widgetError, setWidgetError] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

// loading Bookingkit widget script 
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://e4f3731ff5f897d8041de92c673fc021.widget-sandbox.bookingkit.net/bkscript/a3eaf40ba1e10a325057e1c093a33348/";
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        setIsLoadingWidget(false);

      }, 2000); // shows loading message until widget loads
      
    };
    script.onerror = () => {
      setIsLoadingWidget(false);
      setWidgetError(true);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script); // script clean up
    };
    
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-brand-cream/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-tight">Adventure Berlin</span>
            <span className="text-xl">🇩🇪</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-brand-olive transition-colors">Tours</a>
            <a href="#" className="hover:text-brand-olive transition-colors">About</a>
            <a href="#" className="hover:text-brand-olive transition-colors">Contact</a>
            <button 
              onClick={scrollToBooking}
              className="bg-brand-olive text-white px-6 py-2 rounded-full hover:bg-brand-ink transition-all"
            >
              Book Now
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-cream border-b border-brand-ink/10 overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-4 text-center">
                <a href="#" className="text-lg font-serif">Tours</a>
                <a href="#" className="text-lg font-serif">About</a>
                <a href="#" className="text-lg font-serif">Contact</a>
                <button 
                  onClick={() => { scrollToBooking(); setIsMenuOpen(false); }}
                  className="bg-brand-olive text-white px-6 py-3 rounded-full"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1920&q=80" 
            alt="Berlin Skyline"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.3em] text-sm font-medium mb-4 block">Unforgettable Experiences</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">Experience Berlin Like a Local</h1>
            <p className="text-xl md:text-2xl font-light mb-10 opacity-90 max-w-2xl mx-auto">
              Discover hidden gems, world-class museums, and the vibrant culture of Germany's capital with our expert guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToBooking}
                className="bg-white text-brand-ink px-10 py-4 rounded-full font-medium hover:bg-brand-cream transition-all flex items-center justify-center gap-2 group"
              >
                Explore Tours
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-medium hover:bg-white/10 transition-all">
                Our Story
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-px h-12 bg-white/30 mx-auto" />
        </motion.div>
      </section>

      {/* Search/Filter Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-brand-ink/10 pb-4 md:pb-0">
            <Search className="text-brand-olive w-5 h-5" />
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-widest text-brand-ink/50 font-bold">Search</label>
              <input type="text" placeholder="Where to?" className="w-full bg-transparent outline-none text-sm font-medium" />
            </div>
          </div>
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-brand-ink/10 pb-4 md:pb-0">
            <Calendar className="text-brand-olive w-5 h-5" />
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-widest text-brand-ink/50 font-bold">When</label>
              <input type="text" placeholder="Any dates" className="w-full bg-transparent outline-none text-sm font-medium" />
            </div>
          </div>
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-brand-ink/10 pb-4 md:pb-0">
            <MapPin className="text-brand-olive w-5 h-5" />
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-widest text-brand-ink/50 font-bold">Category</label>
              <select className="w-full bg-transparent outline-none text-sm font-medium appearance-none">
                <option>All Activities</option>
                <option>Museums</option>
                <option>History</option>
                <option>Art</option>
              </select>
            </div>
          </div>
          <button className="bg-brand-olive text-white w-full py-4 rounded-2xl font-bold hover:bg-brand-ink transition-all shadow-lg shadow-brand-olive/20">
            Find Adventure
          </button>
        </div>
      </div>

      {/* Featured Tours */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-brand-olive font-medium uppercase tracking-[0.2em] text-xs mb-4 block">Handpicked for you</span>
            <h2 className="text-4xl md:text-5xl font-serif">Our Most Popular Experiences</h2>
          </div>
          <button className="text-brand-olive font-bold flex items-center gap-2 group">
            View all 24 tours
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOURS.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              /* onClick={() => openBooking(tour)} */
              onClick={scrollToBooking}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-brand-ink px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {tour.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <button 
                    className="w-full bg-white text-brand-ink py-3 rounded-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    Quick Book
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif font-bold group-hover:text-brand-olive transition-colors">{tour.title}</h3>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {tour.rating}
                </div>
              </div>
              
              <p className="text-sm text-brand-ink/60 mb-4 line-clamp-2 leading-relaxed">
                {tour.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-brand-ink/5">
                <div className="flex items-center gap-4 text-xs text-brand-ink/40 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tour.duration}
                  </div>
                </div>
                <div className="text-lg font-serif font-bold text-brand-olive">
                  €{tour.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand-cream rounded-[3rem] p-8 md:p-16 flex flex-col items-center text-center">
            <span className="text-brand-olive font-medium uppercase tracking-[0.2em] text-xs mb-4 block">Secure your spot</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Book Your Adventure?</h2>
            <p className="text-brand-ink/60 max-w-2xl mb-12 text-lg">
              Select your preferred tour and dates below. Our booking system is powered by bookingkit for a seamless experience.
            </p>

            {/* Widget Container */}

            <div className="w-full max-w-4xl min-h-[400px]">
              {isLoadingWidget && (
                <p className="text-brand-ink/60">
                Booking options are Loading, please wait...! 
                </p>
              )}

              {widgetError && (
                <div>
                  <p className="text-red-600 font-medium">
                    Unable to load the booking options. Please refresh the page or try after sometime.
                  </p>
                  </div>
              )}
            
            <div id="bookingKitContainer" data-cw="a3eaf40ba1e10a325057e1c093a33348" className="w-full max-w-4xl min-h-[400px]" />
            </div>
            
            <p className="mt-8 text-xs text-brand-ink/40 font-medium">
              Trusted by 10,000+ travelers every year. Secure payment guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-ink text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-3xl font-serif font-bold tracking-tight">Adventure Berlin</span>
                <span className="text-2xl">🇩🇪</span>
              </div>
              <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                We are a team of passionate Berliners dedicated to showing you the true heart of our city. From hidden bunkers to world-class art, we make every tour an adventure.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-ink transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-ink transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-ink transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-xl mb-8">Quick Links</h4>
              <ul className="flex flex-col gap-4 text-white/50 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Our Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Private Groups</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Vouchers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-xl mb-8">Contact Us</h4>
              <ul className="flex flex-col gap-4 text-white/50 font-medium">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-brand-olive" />
                  Unter den Linden 1, Berlin
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-olive" />
                  Mon - Sun: 09:00 - 18:00
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 font-medium uppercase tracking-widest">
            <p>&copy; 2026 Adventure Berlin GmbH. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Powered by bookingkit</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
