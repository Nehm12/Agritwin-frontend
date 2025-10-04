import React, { useState } from 'react';
import { Sprout, MapPin, Activity, TrendingUp, Users, Shield, Zap, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Interactive Field Mapping',
      description: 'Visualize your fields with satellite imagery and real-time data overlays'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Digital Twin Technology',
      description: 'Create intelligent digital replicas of your farming operations'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Predictive Analytics',
      description: 'Run simulations to optimize yield, water, and fertilizer usage'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Alerts',
      description: 'Receive instant notifications via SMS, WhatsApp, or in-app'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Climate Resilience',
      description: 'Adapt to climate change with data-driven decision making'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Insights',
      description: 'Learn from best practices shared by farmers in your region'
    }
  ];

  const testimonials = [
    {
      name: 'John Appleseed',
      role: 'Corn Farmer, Iowa',
      quote: 'AgriTwin helped me reduce water usage by 30% while increasing my yield. Game changer!',
      avatar: 'JA'
    },
    {
      name: 'Maria Santos',
      role: 'Organic Farm Manager',
      quote: 'The simulation features saved me thousands in fertilizer costs. Highly recommended!',
      avatar: 'MS'
    },
    {
      name: 'David Chen',
      role: 'Agricultural Consultant',
      quote: 'This platform bridges the gap between traditional farming and precision agriculture perfectly.',
      avatar: 'DC'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Farmers' },
    { value: '250K+', label: 'Hectares Monitored' },
    { value: '35%', label: 'Avg Water Savings' },
    { value: '28%', label: 'Yield Increase' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AgriTwin</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Pricing</a>
              <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Login
              </button>
              <button onClick={() => navigate('/login')} className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium">How It Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 font-medium">Testimonials</a>
                <a href="#pricing" className="text-gray-700 hover:text-emerald-600 font-medium">Pricing</a>
                <button onClick={() => alert('Login')} className="text-left text-gray-700 hover:text-emerald-600 font-medium">
                  Login
                </button>
                <button onClick={() => navigate('/login')} className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 text-center">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Farm's Digital Twin for Smarter Agriculture
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Transform your farming with AI-powered insights, real-time monitoring, and predictive analytics. Make data-driven decisions that increase yield and reduce costs.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => alert('Start free trial')} className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-600 transition-colors shadow-lg">
                  Start Free Trial
                </button>
                <button onClick={() => alert('Watch demo')} className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors border-2 border-emerald-500">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-2xl">
                <Sprout className="w-48 h-48 text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Farming</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to optimize your farming operations in one intelligent platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How AgriTwin Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to transform your farming</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create Your Fields', desc: 'Add your fields with GPS coordinates and crop details' },
              { step: '2', title: 'Monitor & Analyze', desc: 'Get real-time data from satellites and weather stations' },
              { step: '3', title: 'Optimize & Grow', desc: 'Run simulations and implement data-driven decisions' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Farmers Worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-emerald-50 mb-8">
            Join thousands of farmers already using AgriTwin to increase yields and reduce costs
          </p>
          <button onClick={() => navigate('/login')} className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg inline-flex items-center gap-2">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="w-8 h-8 text-emerald-400" />
                <span className="text-xl font-bold">AgriTwin</span>
              </div>
              <p className="text-gray-400">Your digital farming companion</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Demo</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Contact</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AgriTwin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;