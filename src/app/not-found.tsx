'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-3xl font-semibold text-white mb-4">
            Page non trouvée
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transform transition-transform duration-200"
          >
            Retour à l'accueil
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <div className="flex justify-center space-x-8 text-gray-500">
            <Link href="/#portfolio" className="hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              À propos
            </Link>
            <Link href="/#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
