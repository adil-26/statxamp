'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-slate-200/90 bg-white">
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
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                S
              </div>
              <span className="text-2xl font-bold text-slate-900">
                Stat<span className="text-blue-600">Xam</span>
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              AI-powered exam engineering portal for Indian State Boards, JEE, NEET, and Competitive Exams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Quick Links</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              {['Dashboard', 'AI Generator', 'Analysis', 'Leaderboard', 'Profile'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase().replace(' ', '-')}`} 
                     className="hover:text-blue-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <a href="tel:7604005666" 
                 className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>7604005666</span>
              </a>
              <a href="mailto:statxamp@gmail.com" 
                 className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>statxamp@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>India</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {[Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-xs"
                >
                  <Icon className="w-4 h-4" />
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
          className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row 
                     justify-between items-center gap-4 text-xs text-slate-500"
        >
          <p>
            © 2024 StatXam. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
