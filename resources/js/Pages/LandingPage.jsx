import { Link } from "@inertiajs/react";
import React from "react";

// Dummy Data untuk Tabel dan Testimonial
const pricingData = [
  { plan: "Free", price: "$0/month", features: "Basic Features" },
  { plan: "Pro", price: "$29/month", features: "Advanced Features" },
  { plan: "Enterprise", price: "$99/month", features: "Full Features" },
];

const testimonials = [
  { name: "John Doe", feedback: "This platform is amazing!", img: "https://via.placeholder.com/150" },
  { name: "Jane Smith", feedback: "I love using this service.", img: "https://via.placeholder.com/150" },
];

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyCompany</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
          </nav>
          <Link href={route('login')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Professional Service</h1>
          <p className="text-lg mb-8">We provide the best solutions for your business growth.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold">Learn More</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Feature 1</h3>
              <p className="text-gray-600">Description of Feature 1.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Feature 2</h3>
              <p className="text-gray-600">Description of Feature 2.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Feature 3</h3>
              <p className="text-gray-600">Description of Feature 3.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-200 text-left">Plan</th>
                <th className="px-6 py-4 bg-gray-200 text-left">Price</th>
                <th className="px-6 py-4 bg-gray-200 text-left">Features</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((plan, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border-b">{plan.plan}</td>
                  <td className="px-6 py-4 border-b">{plan.price}</td>
                  <td className="px-6 py-4 border-b">{plan.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow flex items-center">
                <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 rounded-full mr-6" />
                <div>
                  <p className="text-xl font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 MyCompany. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
