'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Mail,
  Save,
  Check,
  X,
  Moon,
  Sun,
  Monitor,
  Users,
  Plus,
  Edit,
  Trash2,
  ChevronRight
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [darkMode, setDarkMode] = useState('system')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newsletter: true
  })

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'team', label: 'Équipe', icon: Users }
  ]

  const teamMembers = [
    { id: 1, name: 'Alice Martin', email: 'alice@globiweb.com', role: 'Admin', avatar: 'AM' },
    { id: 2, name: 'Bob Chen', email: 'bob@globiweb.com', role: 'Développeur', avatar: 'BC' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@globiweb.com', role: 'Designer', avatar: 'CD' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
          Paramètres
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gérez vos préférences et paramètres du CRM
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#00F5FF]/10 to-[#9B51E0]/10 text-[#00F5FF]'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Informations du Profil</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      defaultValue="Admin"
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@globiweb.com"
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue="+41 21 505 00 62"
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Entreprise</label>
                    <input
                      type="text"
                      defaultValue="GLOBIWEB"
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
                    />
                  </div>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>Enregistrer</span>
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Préférences de Notifications</h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div>
                        <h3 className="font-medium capitalize">{key === 'sms' ? 'SMS' : key}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'email' && 'Recevoir des notifications par email'}
                          {key === 'push' && 'Notifications push dans le navigateur'}
                          {key === 'sms' && 'Notifications par SMS'}
                          {key === 'newsletter' && 'Newsletter hebdomadaire'}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          value ? 'bg-gradient-to-r from-[#00F5FF] to-[#9B51E0]' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Apparence</h2>
                <div>
                  <h3 className="font-medium mb-4">Thème</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Clair', icon: Sun },
                      { id: 'dark', label: 'Sombre', icon: Moon },
                      { id: 'system', label: 'Système', icon: Monitor }
                    ].map((theme) => {
                      const Icon = theme.icon
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setDarkMode(theme.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            darkMode === theme.id
                              ? 'border-[#00F5FF] bg-gradient-to-r from-[#00F5FF]/10 to-[#9B51E0]/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <Icon className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">{theme.label}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Gestion de l'Équipe</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Inviter</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] flex items-center justify-center text-white font-bold">
                          {member.avatar}
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">
                          {member.role}
                        </span>
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Mot de passe</h3>
                      <button className="text-[#00F5FF] hover:underline text-sm">Modifier</button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dernière modification il y a 30 jours</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Authentification à deux facteurs</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 rounded text-xs">
                        Activé
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Protection supplémentaire pour votre compte</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}