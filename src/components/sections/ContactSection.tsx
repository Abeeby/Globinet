'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const magneticButtonRef = useRef<HTMLButtonElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  useEffect(() => {
    // Animation des éléments flottants
    gsap.to('.floating-element', {
      y: 'random(-30, 30)',
      x: 'random(-30, 30)',
      rotation: 'random(-15, 15)',
      duration: 'random(4, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    })

    // Effet magnétique sur le bouton
    if (magneticButtonRef.current) {
      const button = magneticButtonRef.current
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const distance = Math.sqrt(x * x + y * y)
        
        if (distance < 100) {
          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      button.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        button.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <motion.div 
        className="container mx-auto px-6"
        style={{ scale, opacity }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-sm font-sora font-medium text-rose-magenta uppercase tracking-widest mb-4">
            Contact
          </span>
          
          <h2 className="text-5xl md:text-7xl font-space font-bold mb-6">
            <span className="text-white">Créons ensemble </span>
            <br />
            <span className="gradient-text">l'extraordinaire</span>
          </h2>
          
          <p className="text-xl font-sora text-gray-300 max-w-3xl mx-auto">
            Transformons vos idées en réalité digitale. 
            Partagez votre vision et commençons cette aventure créative
          </p>
        </motion.div>

        {/* Contact Form & Info */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-6 py-4 bg-transparent border-2 border-gris-fume rounded-2xl text-white font-sora focus:border-bleu-neon transition-colors outline-none"
                    placeholder=" "
                  />
                  <label className={`absolute left-6 transition-all pointer-events-none font-sora ${
                    formData.name || focusedField === 'name' 
                      ? 'top-0 -translate-y-1/2 text-xs bg-noir-profond px-2 text-bleu-neon' 
                      : 'top-4 text-gray-400'
                  }`}>
                    Votre nom
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-6 py-4 bg-transparent border-2 border-gris-fume rounded-2xl text-white font-sora focus:border-bleu-neon transition-colors outline-none"
                    placeholder=" "
                  />
                  <label className={`absolute left-6 transition-all pointer-events-none font-sora ${
                    formData.email || focusedField === 'email' 
                      ? 'top-0 -translate-y-1/2 text-xs bg-noir-profond px-2 text-bleu-neon' 
                      : 'top-4 text-gray-400'
                  }`}>
                    Email
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company */}
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-transparent border-2 border-gris-fume rounded-2xl text-white font-sora focus:border-violet-electrique transition-colors outline-none"
                    placeholder=" "
                  />
                  <label className={`absolute left-6 transition-all pointer-events-none font-sora ${
                    formData.company || focusedField === 'company' 
                      ? 'top-0 -translate-y-1/2 text-xs bg-noir-profond px-2 text-violet-electrique' 
                      : 'top-4 text-gray-400'
                  }`}>
                    Entreprise
                  </label>
                </div>

                {/* Budget */}
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('budget')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-transparent border-2 border-gris-fume rounded-2xl text-white font-sora focus:border-rose-magenta transition-colors outline-none appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-noir-profond">Sélectionner un budget</option>
                    <option value="<10k" className="bg-noir-profond">&lt; 10 000€</option>
                    <option value="10-25k" className="bg-noir-profond">10 000€ - 25 000€</option>
                    <option value="25-50k" className="bg-noir-profond">25 000€ - 50 000€</option>
                    <option value="50-100k" className="bg-noir-profond">50 000€ - 100 000€</option>
                    <option value=">100k" className="bg-noir-profond">&gt; 100 000€</option>
                  </select>
                  <label className={`absolute left-6 transition-all pointer-events-none font-sora ${
                    formData.budget || focusedField === 'budget' 
                      ? 'top-0 -translate-y-1/2 text-xs bg-noir-profond px-2 text-rose-magenta' 
                      : 'top-4 text-gray-400'
                  }`}>
                    Budget
                  </label>
                  <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Project Type */}
              <div className="relative">
                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('project')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-4 bg-transparent border-2 border-gris-fume rounded-2xl text-white font-sora focus:border-bleu-neon transition-colors outline-none"
                  placeholder=" "
                />
                <label className={`absolute left-6 transition-all pointer-events-none font-sora ${
                  formData.project || focusedField === 'project' 
                    ? 'top-0 -translate-y-1/2 text-xs bg-noir-profond px-2 text-bleu-neon' 
                    : 'top-4 text-gray-400'
                }`}>
                  Type de projet
                </label>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-transparent border-2 border-gris-fume rounded-2xl text-white font-sora focus:border-violet-electrique transition-colors outline-none resize-none"
                  placeholder=" "
                />
                <label className={`absolute left-6 transition-all pointer-events-none font-sora ${
                  formData.message || focusedField === 'message' 
                    ? 'top-0 -translate-y-1/2 text-xs bg-noir-profond px-2 text-violet-electrique' 
                    : 'top-4 text-gray-400'
                }`}>
                  Parlez-nous de votre projet
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                ref={magneticButtonRef}
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="relative w-full py-5 overflow-hidden rounded-2xl font-sora font-semibold text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-neon" />
                <div className="absolute inset-0 bg-gradient-neon blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-noir-profond">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message envoyé !
                    </span>
                  ) : (
                    'Envoyer le message'
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-space font-bold text-white mb-6">
                Contact Direct
              </h3>
              
              <div className="space-y-4">
                <a href="mailto:info@globinet.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center glass rounded-xl group-hover:bg-bleu-neon/20 transition-colors">
                    <svg className="w-6 h-6 text-bleu-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-sora text-gray-400">Email</p>
                    <p className="font-sora text-white group-hover:text-bleu-neon transition-colors">
                      info@globinet.com
                    </p>
                  </div>
                </a>

                <a href="tel:+41215050062" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center glass rounded-xl group-hover:bg-violet-electrique/20 transition-colors">
                    <svg className="w-6 h-6 text-violet-electrique" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-sora text-gray-400">Téléphone</p>
                    <p className="font-sora text-white group-hover:text-violet-electrique transition-colors">
                      +41 21 505 00 62
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center glass rounded-xl">
                    <svg className="w-6 h-6 text-rose-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-sora text-gray-400">Adresse</p>
                    <p className="font-sora text-white">
                      Rue du Collège 18<br />
                      1260 Nyon, Suisse
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-space font-bold text-white mb-6">
                Suivez-nous
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="floating-element w-16 h-16 flex items-center justify-center glass rounded-xl hover:bg-gradient-neon hover:text-noir-profond transition-all group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xs font-sora">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-space font-bold text-white mb-6">
                Horaires
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-sora text-gray-400">Lun - Ven</span>
                  <span className="font-sora text-white">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sora text-gray-400">Samedi</span>
                  <span className="font-sora text-white">10h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sora text-gray-400">Dimanche</span>
                  <span className="font-sora text-gray-500">Fermé</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-sora text-green-400">
                  Actuellement disponible
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          >
            <div 
              className="w-32 h-32 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${
                  ['#00F5FF', '#9B51E0', '#FF00A8'][i % 3]
                }40, transparent)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00F5FF 1px, transparent 1px), linear-gradient(90deg, #00F5FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gris-fume py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm font-sora text-gray-400">
              © 2024 Globinet. Tous droits réservés.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm font-sora text-gray-400 hover:text-bleu-neon transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-sm font-sora text-gray-400 hover:text-bleu-neon transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm font-sora text-gray-400 hover:text-bleu-neon transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
