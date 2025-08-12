'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactMethods = [
  {
    icon: '📧',
    title: 'Email',
    value: 'hello@globinet.com',
    link: 'mailto:hello@globinet.com',
    color: '#00F5FF'
  },
  {
    icon: '📱',
    title: 'Téléphone',
    value: '+33 1 23 45 67 89',
    link: 'tel:+33123456789',
    color: '#9B51E0'
  },
  {
    icon: '📍',
    title: 'Adresse',
    value: 'Paris, France',
    link: '#',
    color: '#FF00A8'
  }
]

const socialLinks = [
  { name: 'LinkedIn', icon: 'in', link: '#', color: '#0077B5' },
  { name: 'Twitter', icon: 'X', link: '#', color: '#000000' },
  { name: 'Instagram', icon: 'IG', link: '#', color: '#E4405F' },
  { name: 'Dribbble', icon: 'Dr', link: '#', color: '#EA4C89' }
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (!isInView) return

    // Animation des champs de formulaire
    gsap.fromTo('.form-field',
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        }
      }
    )

    // Animation des méthodes de contact
    gsap.fromTo('.contact-method',
      {
        opacity: 0,
        x: -50,
        rotateY: -30,
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-methods',
          start: 'top 80%',
        }
      }
    )

    // Animation des particules flottantes
    gsap.to('.floating-particle', {
      y: 'random(-30, 30)',
      x: 'random(-30, 30)',
      rotation: 'random(-180, 180)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    })
  }, [isInView])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Animation de soumission
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    })

    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        message: ''
      })
      
      // Animation de succès
      gsap.fromTo('.success-message',
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background 3D Scene */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? '#00F5FF' : i % 3 === 1 ? '#9B51E0' : '#FF00A8',
                boxShadow: `0 0 10px ${i % 3 === 0 ? '#00F5FF' : i % 3 === 1 ? '#9B51E0' : '#FF00A8'}`,
                opacity: 0.3,
              }}
            />
          </div>
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bleu-neon/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-electrique/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-magenta/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ opacity }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-sm font-sora font-medium text-bleu-neon uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Contact
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-space font-bold mb-6">
            <span className="text-white">Créons ensemble </span>
            <span className="gradient-text">l'extraordinaire</span>
          </h2>
          
          <p className="text-xl font-sora text-gray-300 max-w-3xl mx-auto">
            Prêt à propulser votre projet vers de nouveaux sommets ? 
            Discutons de vos ambitions digitales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-field relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-white font-sora focus:border-bleu-neon focus:outline-none transition-all"
                    placeholder="Votre nom"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={focusedField === 'name' ? { opacity: 1 } : { opacity: 0 }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(0, 245, 255, 0.1), transparent)',
                    }}
                  />
                </div>

                <div className="form-field relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-white font-sora focus:border-bleu-neon focus:outline-none transition-all"
                    placeholder="Votre email"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={focusedField === 'email' ? { opacity: 1 } : { opacity: 0 }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(0, 245, 255, 0.1), transparent)',
                    }}
                  />
                </div>
              </div>

              {/* Company & Project Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-field relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-white font-sora focus:border-violet-electrique focus:outline-none transition-all"
                    placeholder="Entreprise (optionnel)"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={focusedField === 'company' ? { opacity: 1 } : { opacity: 0 }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(155, 81, 224, 0.1), transparent)',
                    }}
                  />
                </div>

                <div className="form-field relative">
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('project')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-white font-sora focus:border-violet-electrique focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-noir-profond">Type de projet</option>
                    <option value="website" className="bg-noir-profond">Site Web</option>
                    <option value="webapp" className="bg-noir-profond">Application Web</option>
                    <option value="mobile" className="bg-noir-profond">Application Mobile</option>
                    <option value="ecommerce" className="bg-noir-profond">E-commerce</option>
                    <option value="other" className="bg-noir-profond">Autre</option>
                  </select>
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={focusedField === 'project' ? { opacity: 1 } : { opacity: 0 }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(155, 81, 224, 0.1), transparent)',
                    }}
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="form-field relative">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('budget')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-white font-sora focus:border-rose-magenta focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-noir-profond">Budget estimé</option>
                  <option value="5-10k" className="bg-noir-profond">5 000€ - 10 000€</option>
                  <option value="10-25k" className="bg-noir-profond">10 000€ - 25 000€</option>
                  <option value="25-50k" className="bg-noir-profond">25 000€ - 50 000€</option>
                  <option value="50k+" className="bg-noir-profond">50 000€+</option>
                </select>
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={focusedField === 'budget' ? { opacity: 1 } : { opacity: 0 }}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 0, 168, 0.1), transparent)',
                  }}
                />
              </div>

              {/* Message */}
              <div className="form-field relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-white font-sora focus:border-rose-magenta focus:outline-none transition-all resize-none"
                  placeholder="Parlez-nous de votre projet..."
                />
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={focusedField === 'message' ? { opacity: 1 } : { opacity: 0 }}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 0, 168, 0.1), transparent)',
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative w-full px-8 py-5 overflow-hidden rounded-xl magnetic-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                data-cursor="hover"
                data-cursor-text="Envoyer"
              >
                <div className="absolute inset-0 bg-gradient-neon rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <motion.div
                      className="w-6 h-6 border-2 border-noir-profond border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      <span className="font-sora font-semibold text-noir-profond">
                        Envoyer le message
                      </span>
                      <svg className="w-5 h-5 text-noir-profond transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </div>
              </motion.button>

              {/* Success Message */}
              <motion.div
                className="success-message hidden text-center p-4 glass rounded-xl"
                initial={{ opacity: 0 }}
              >
                <span className="text-bleu-neon font-sora">
                  ✨ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                </span>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Contact Methods */}
            <div className="contact-methods space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  className="contact-method group block"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="glass rounded-2xl p-6 flex items-center gap-4 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{ background: `radial-gradient(circle at left, ${method.color}, transparent)` }}
                    />
                    
                    <motion.div
                      className="text-3xl"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      {method.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-sora text-gray-400 mb-1">{method.title}</p>
                      <p className="text-lg font-space text-white group-hover:text-bleu-neon transition-colors">
                        {method.value}
                      </p>
                    </div>
                    
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-bleu-neon transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-space font-bold text-white mb-6">
                Suivez-nous
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    className="group relative w-full aspect-square glass rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="hover"
                  >
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: social.color }}
                    />
                    <span className="font-space font-bold text-gray-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map or Office Image */}
            <div className="glass rounded-2xl p-2 overflow-hidden">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-bleu-neon/20 via-violet-electrique/20 to-rose-magenta/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-white font-space font-bold text-xl">Paris, France</p>
                    <p className="text-gray-400 font-sora text-sm mt-2">Disponible dans le monde entier</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
