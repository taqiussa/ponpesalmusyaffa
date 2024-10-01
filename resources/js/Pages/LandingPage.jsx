import { Link } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";

// Dummy Data for Pricing and Testimonials
const pricingData = [
  { plan: "Basic Plan", price: "$10/month", features: "Access to basic features" },
  { plan: "Standard Plan", price: "$30/month", features: "Access to standard features" },
  { plan: "Premium Plan", price: "$60/month", features: "Access to all features" },
  { plan: "Professional Plan", price: "$100/month", features: "Professional features + Support" },
  { plan: "Enterprise Plan", price: "$150/month", features: "All features + Custom solutions" },
  { plan: "Startup Plan", price: "$20/month", features: "Ideal for startups" },
  { plan: "Growth Plan", price: "$40/month", features: "Scalable for growing businesses" },
  { plan: "Business Plan", price: "$70/month", features: "Comprehensive business solutions" },
  { plan: "Ultimate Plan", price: "$120/month", features: "All features + Priority support" },
  { plan: "Custom Plan", price: "Contact us", features: "Tailored solutions for your needs" },
  { plan: "Family Plan", price: "$50/month", features: "For family use" },
  { plan: "Student Plan", price: "$15/month", features: "Discounted for students" },
  { plan: "Individual Plan", price: "$25/month", features: "For individual users" },
  { plan: "Consultant Plan", price: "$90/month", features: "Ideal for consultants" },
  { plan: "Agency Plan", price: "$110/month", features: "Best for agencies" },
  { plan: "Non-Profit Plan", price: "$35/month", features: "Discounted for non-profits" },
  { plan: "Personal Plan", price: "$45/month", features: "Personal use plan" },
  { plan: "Team Plan", price: "$80/month", features: "For teams and groups" },
  { plan: "Corporate Plan", price: "$140/month", features: "Corporate solutions" },
  { plan: "VIP Plan", price: "$200/month", features: "Exclusive VIP benefits" },
];

const featuresData = [
  { title: "Feature 1", description: "Description for Feature 1" },
  { title: "Feature 2", description: "Description for Feature 2" },
  { title: "Feature 3", description: "Description for Feature 3" },
  { title: "Feature 4", description: "Description for Feature 4" },
  { title: "Feature 5", description: "Description for Feature 5" },
  { title: "Feature 6", description: "Description for Feature 6" },
  { title: "Feature 7", description: "Description for Feature 7" },
  { title: "Feature 8", description: "Description for Feature 8" },
  { title: "Feature 9", description: "Description for Feature 9" },
  { title: "Feature 10", description: "Description for Feature 10" },
  { title: "Feature 11", description: "Description for Feature 11" },
  { title: "Feature 12", description: "Description for Feature 12" },
  { title: "Feature 13", description: "Description for Feature 13" },
  { title: "Feature 14", description: "Description for Feature 14" },
  { title: "Feature 15", description: "Description for Feature 15" },
  { title: "Feature 16", description: "Description for Feature 16" },
  { title: "Feature 17", description: "Description for Feature 17" },
  { title: "Feature 18", description: "Description for Feature 18" },
  { title: "Feature 19", description: "Description for Feature 19" },
  { title: "Feature 20", description: "Description for Feature 20" },
];

const testimonials = [
  { name: "John Doe", feedback: "This platform has changed my life! Highly recommended.", img: "https://via.placeholder.com/150?text=John" },
  { name: "Jane Smith", feedback: "Amazing service and excellent support!", img: "https://via.placeholder.com/150?text=Jane" },
  { name: "Alice Johnson", feedback: "I achieved my goals faster with this service!", img: "https://via.placeholder.com/150?text=Alice" },
  { name: "Bob Brown", feedback: "Very professional and reliable.", img: "https://via.placeholder.com/150?text=Bob" },
  { name: "Charlie Davis", feedback: "I highly recommend it to everyone!", img: "https://via.placeholder.com/150?text=Charlie" },
  { name: "Diana Prince", feedback: "Great user experience and features!", img: "https://via.placeholder.com/150?text=Diana" },
  { name: "Edward Norton", feedback: "It has exceeded my expectations!", img: "https://via.placeholder.com/150?text=Edward" },
  { name: "Fiona Apple", feedback: "Fantastic service for small businesses!", img: "https://via.placeholder.com/150?text=Fiona" },
  { name: "George Clooney", feedback: "Top-notch quality and support.", img: "https://via.placeholder.com/150?text=George" },
  { name: "Hannah Montana", feedback: "I love using this platform!", img: "https://via.placeholder.com/150?text=Hannah" },
  { name: "Isabella Rossellini", feedback: "A must-have for professionals!", img: "https://via.placeholder.com/150?text=Isabella" },
  { name: "Jack Sparrow", feedback: "Pirates need good service too!", img: "https://via.placeholder.com/150?text=Jack" },
  { name: "Kylie Jenner", feedback: "Great for building a brand!", img: "https://via.placeholder.com/150?text=Kylie" },
  { name: "Leonardo DiCaprio", feedback: "Best decision I ever made!", img: "https://via.placeholder.com/150?text=Leonardo" },
  { name: "Miley Cyrus", feedback: "Innovative and user-friendly!", img: "https://via.placeholder.com/150?text=Miley" },
  { name: "Natalie Portman", feedback: "Perfect for anyone looking to grow!", img: "https://via.placeholder.com/150?text=Natalie" },
  { name: "Oscar Isaac", feedback: "Exceptional value for the price!", img: "https://via.placeholder.com/150?text=Oscar" },
  { name: "Penelope Cruz", feedback: "This is the best service I've ever used.", img: "https://via.placeholder.com/150?text=Penelope" },
  { name: "Quentin Tarantino", feedback: "I can't recommend it enough!", img: "https://via.placeholder.com/150?text=Quentin" },
  { name: "Ryan Gosling", feedback: "A revolutionary platform!", img: "https://via.placeholder.com/150?text=Ryan" },
  { name: "Selena Gomez", feedback: "Superb experience all around!", img: "https://via.placeholder.com/150?text=Selena" },
  { name: "Tom Hanks", feedback: "A game changer for my business!", img: "https://via.placeholder.com/150?text=Tom" },
];

// Intersection Observer hook for element visibility
const useInView = (options) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, inView];
};

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentPricingPage, setCurrentPricingPage] = useState(0);
  const [currentFeaturesPage, setCurrentFeaturesPage] = useState(0);
  const itemsPerPage = 9;
  const itemsPerPages = 10;
  const autoScrollInterval = 5000;

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll for testimonials
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextTestimonial();
    }, autoScrollInterval);

    return () => clearInterval(intervalId);
  }, [currentTestimonialIndex]);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Ref and visibility tracking for various sections
  const [heroRef, heroInView] = useInView({ threshold: 0.8 });
  const [headerRef, headerInView] = useInView({ threshold: 0.5 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.5 });
  const [pricingRef, pricingInView] = useInView({ threshold: 0.5 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.5 });

  const totalPricingPages = Math.ceil(pricingData.length / itemsPerPages);
  const totalFeaturesPages = Math.ceil(featuresData.length / itemsPerPage);

  // Get current items for Pricing and Features
  const currentPricingItems = pricingData.slice(currentPricingPage * itemsPerPages, (currentPricingPage + 1) * itemsPerPages);
  const currentFeatureItems = featuresData.slice(currentFeaturesPage * itemsPerPage, (currentFeaturesPage + 1) * itemsPerPage);

  const handleNextPricingPage = () => {
    if (currentPricingPage < totalPricingPages - 1) {
      setCurrentPricingPage((prev) => prev + 1);
    }
  };

  const handlePrevPricingPage = () => {
    if (currentPricingPage > 0) {
      setCurrentPricingPage((prev) => prev - 1);
    }
  };

  const handleNextFeaturesPage = () => {
    if (currentFeaturesPage < totalFeaturesPages - 1) {
      setCurrentFeaturesPage((prev) => prev + 1);
    }
  };

  const handlePrevFeaturesPage = () => {
    if (currentFeaturesPage > 0) {
      setCurrentFeaturesPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>My Logo</h1>
          <Link href={route('login')} className={`px-4 py-2 rounded transition duration-300 ${isScrolled ? '' : 'text-white'}`}>Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={headerRef} className={`relative transition-opacity duration-700 ${headerInView ?  'opacity-100' : 'opacity-0'}`}>
        <img
          src="https://cdn.pixabay.com/photo/2016/11/14/22/18/beach-1824855_640.jpg"
          alt="Banner Image"
          className="w-full h-screen object-cover"
        />
      </section>

      {/* Hero Content */}
      <section ref={heroRef} className={`bg-blue-600 text-white mx-10 rounded-lg py-20 mt-12 transition-opacity duration-700 ${heroInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our Professional Service</h1>
          <p className="text-lg mb-8">We provide the best solutions for your business growth.</p>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className={`py-10 mt-10 bg-gray-50 transition-opacity duration-700 ${featuresInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentFeatureItems.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg transition-all hover:bg-gradient-to-r from-blue-500 to-teal-400 hover:text-white"
              >
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Features Section Pagination Controls */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            {/* Tombol Previous to First */}
            {totalFeaturesPages > 5 && (
              <button
              onClick={() => setCurrentFeaturesPage(0)}
              disabled={currentFeaturesPage === 0}
              className={`px-4 py-2 rounded-md ${currentFeaturesPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            >
              «
            </button>
            )}
            {/* Previous Button */}
            <button
              onClick={() => setCurrentFeaturesPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentFeaturesPage === 0}
              className={`px-4 py-2 rounded-md ${currentFeaturesPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            >
              ‹
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: Math.min(5, totalFeaturesPages) }, (_, index) => {
              const startPage = Math.max(0, Math.min(totalFeaturesPages - 5, currentFeaturesPage - 2));
              const pageIndex = startPage + index;
              
              return (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentFeaturesPage(pageIndex)}
                  className={`px-4 py-2 rounded-md ${currentFeaturesPage === pageIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {pageIndex + 1}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentFeaturesPage((prev) => Math.min(prev + 1, totalFeaturesPages - 1))}
              disabled={currentFeaturesPage === totalFeaturesPages - 1}
              className={`px-4 py-2 rounded-md ${currentFeaturesPage === totalFeaturesPages - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            >
              ›
            </button>

            {/* Tombol Next to Last */}
            {totalFeaturesPages > 5 && (
              <button
                onClick={() => setCurrentFeaturesPage(totalFeaturesPages - 1)}
                disabled={currentFeaturesPage === totalFeaturesPages - 1}
                className={`px-4 py-2 rounded-md ${currentFeaturesPage === totalFeaturesPages - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
              >
                »
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className={`py-10 bg-white transition-opacity duration-700 ${pricingInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Pricing Plans</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-medium text-gray-700">No</th>
                  <th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-medium text-gray-700">Plan</th>
                  <th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-medium text-gray-700">Price</th>
                  <th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-medium text-gray-700">Features</th>
                  {/* <th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-medium text-gray-700">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {currentPricingItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-6 border-b border-gray-200">{currentPricingPage * itemsPerPages + index + 1}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{item.plan}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{item.price}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{item.features}</td>
                    {/* <td className="py-4 px-6 border-b border-gray-200">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Choose Plan</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Section Pagination Controls */}
          <div className="flex items-center justify-center mt-8 space-x-2">         
            {/* Tombol Previous to First */}
            {totalPricingPages > 5 && (
              <button
                onClick={() => setCurrentPricingPage(0)}
                disabled={currentPricingPage === 0}
                className={`px-4 py-2 rounded-md ${currentPricingPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
              >
                «
              </button>
            )}
            
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPricingPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPricingPage === 0}
              className={`px-4 py-2 rounded-md ${currentPricingPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            >
              ‹
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: Math.min(5, totalPricingPages) }, (_, index) => {
              const startPage = Math.max(0, Math.min(totalPricingPages - 5, currentPricingPage - 2));
              const pageIndex = startPage + index;
              
              return (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentPricingPage(pageIndex)}
                  className={`px-4 py-2 rounded-md ${currentPricingPage === pageIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {pageIndex + 1}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPricingPage((prev) => Math.min(prev + 1, totalPricingPages - 1))}
              disabled={currentPricingPage === totalPricingPages - 1}
              className={`px-4 py-2 rounded-md ${currentPricingPage === totalPricingPages - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            >
              ›
            </button>
            
            {/* Tombol Next to Last */}
            {totalPricingPages > 5 && (
              <button
                onClick={() => setCurrentPricingPage(totalPricingPages - 1)}
                disabled={currentPricingPage === totalPricingPages - 1}
                className={`px-4 py-2 rounded-md ${currentPricingPage === totalPricingPages - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
              >
                »
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials with Auto-scroll and Navigation */}
      <section ref={testimonialsRef} className={`py-28 mt-5 transition-opacity duration-700 ${testimonialsInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="flex items-center justify-center">
            {/* Previous Button */}
            <button onClick={handlePrevTestimonial} className="p-2 bg-gray-300 rounded-full mr-4">
              &lt;
            </button>
            <div className="flex space-x-4 overflow-hidden">
              {/* Display only one testimonial on mobile, three on larger screens */}
              {Array.from({ length: window.innerWidth < 768 ? 1 : 3 }, (_, i) => {
                const index = (currentTestimonialIndex + i) % testimonials.length;
                return (
                  <div key={index} className="bg-white p-10 rounded-lg shadow-lg flex items-center w-96">
                    <img src={testimonials[index].img} alt={testimonials[index].name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <p className="text-gray-700">{testimonials[index].feedback}</p>
                      <p className="font-bold">{testimonials[index].name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Next Button */}
            <button
              onClick={handleNextTestimonial}
              className="p-2 bg-gray-300 rounded-full ml-4"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 mt-10 bg-blue-500 text-center text-gray-50">
        <p>&copy; 2024 My Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
