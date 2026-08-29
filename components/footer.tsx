'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-cyan-400/20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 
                              flex items-center justify-center glow-border">
                <span className="text-xl font-bold gradient-text">S</span>
              </div>
              <span className="text-2xl font-bold">
                Stat<span className="text-cyan-400">Xam</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered exam engineering portal for Indian State Boards, JEE, NEET, and Competitive Exams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {['Dashboard', 'AI Generator', 'Analysis', 'Leaderboard', 'Profile'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase().replace(' ', '-')}`} 
                     className="hover:text-cyan-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:7604005666" 
                 className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>7604005666</span>
              </a>
              <a href="mailto:statxamp@gmail.com" 
                 className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>statxamp@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>India</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {[Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg glass hover:glow-border transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-cyan-400" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-cyan-400/10 flex flex-col md:flex-row 
                     justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © 2024 StatXam. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
