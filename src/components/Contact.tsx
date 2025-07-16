import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Navigation } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Door No: 55, First Floor, Railway Station Road, Alandur',
      subtitle: 'Next to St. Thomas Mount Metro Parking, Chennai - 600 016',
      action: 'https://www.google.com/maps/place/Ecron+Technologies/@12.996849,80.200753,212m/data=!3m1!1e3!4m6!3m5!1s0x3a5267c5c50abd9d%3A0xa11be222559d6e88!8m2!3d12.9968485!4d80.200753!16s%2Fg%2F11x07c4j10?hl=en&entry=ttu&g_ep=EgoyMDI1MDYyMy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      content: '+91 8438829844',
      subtitle: '+91 8122236894',
      action: 'tel:+918438829844'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'ecrontechnologies@gmail.com',
      subtitle: 'Get in touch for course inquiries',
      action: 'mailto:ecrontechnologies@gmail.com'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon - Sat: 9:00 AM - 8:00 PM',
      subtitle: 'Sunday: Closed',
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your{' '}
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
              Tech Journey
            </span>{' '}
            Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your career? Get in touch with our admissions team 
            and take the first step toward your future in technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="animate-slide-in-left">
            <h3 className="text-3xl font-bold text-white mb-10">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <div className="flex items-start gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-pink-500/20 hover:border-pink-500/40">
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-xl group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 text-lg">{info.title}</h4>
                      <p className="text-pink-300 font-semibold text-lg">{info.content}</p>
                      {info.subtitle && (
                        <p className="text-gray-400 mt-1">{info.subtitle}</p>
                      )}
                    </div>
                  </div>
                );

                return info.action ? (
                  <a key={index} href={info.action} className="block group" target={info.action.startsWith('http') ? '_blank' : undefined} rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 space-y-4">
              <a
                href="tel:+918438829844"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 group transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Phone size={20} />
                Call Now: +91 8438829844
              </a>
              
              <a
                href="mailto:ecrontechnologies@gmail.com"
                className="flex items-center justify-center gap-3 bg-transparent border-2 border-pink-500 text-pink-400 px-8 py-4 rounded-xl font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 group transform hover:scale-105"
              >
                <Mail size={20} />
                Send Email
              </a>

              <a
                href="https://www.google.com/maps/place/Ecron+Technologies/@12.996849,80.200753,212m/data=!3m1!1e3!4m6!3m5!1s0x3a5267c5c50abd9d%3A0xa11be222559d6e88!8m2!3d12.9968485!4d80.200753!16s%2Fg%2F11x07c4j10?hl=en&entry=ttu&g_ep=EgoyMDI1MDYyMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 group transform hover:scale-105 border border-gray-700 hover:border-pink-500"
              >
                <Navigation size={20} />
                Get Directions
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-pink-500/20 animate-slide-in-right">
            <h3 className="text-3xl font-bold text-white mb-8">
              Send us a Message
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-3 font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-white mb-3 font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-3 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-white mb-3 font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="+91 8438829844"
                />
              </div>
              
              <div>
                <label className="block text-white mb-3 font-semibold">
                  Course of Interest
                </label>
                <select className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300">
                  <option value="" className="text-gray-800">Select a course</option>
                  <option value="python" className="text-gray-800">Python Programming</option>
                  <option value="javascript" className="text-gray-800">JavaScript Development</option>
                  <option value="java" className="text-gray-800">Java Programming</option>
                  <option value="cpp" className="text-gray-800">C/C++ Programming</option>
                  <option value="go" className="text-gray-800">Go Programming</option>
                  <option value="php" className="text-gray-800">PHP Development</option>
                  <option value="frontend" className="text-gray-800">HTML/CSS/Bootstrap</option>
                  <option value="oracle" className="text-gray-800">Oracle Database</option>
                  <option value="postgresql" className="text-gray-800">PostgreSQL</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-3 font-semibold">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all duration-300"
                  placeholder="Tell us more about your goals and how we can help..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;