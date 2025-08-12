'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  User,
  FileText,
  Download,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ChevronRight,
  Globe,
  Briefcase
} from 'lucide-react'

// Types
interface Client {
  id: number
  name: string
  company: string
  email: string
  phone: string
  address: string
  website?: string
  status: 'active' | 'inactive' | 'prospect'
  rating: number
  revenue: number
  projects: number
  joinedDate: string
  lastContact: string
  tags: string[]
  avatar?: string
  description?: string
}

// Données simulées
const clientsData: Client[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    company: 'TechCorp SA',
    email: 'jean.dupont@techcorp.com',
    phone: '+41 21 123 45 67',
    address: 'Rue de la Gare 10, 1003 Lausanne',
    website: 'www.techcorp.ch',
    status: 'active',
    rating: 5,
    revenue: 125000,
    projects: 8,
    joinedDate: '2023-01-15',
    lastContact: 'Il y a 2 jours',
    tags: ['Premium', 'Tech', 'Long-terme'],
    description: 'Client stratégique dans le secteur tech, collaboration sur plusieurs projets innovants.'
  },
  {
    id: 2,
    name: 'Marie Laurent',
    company: 'StartupX',
    email: 'marie@startupx.io',
    phone: '+41 22 987 65 43',
    address: 'Avenue du Léman 25, 1204 Genève',
    website: 'www.startupx.io',
    status: 'active',
    rating: 4,
    revenue: 85000,
    projects: 5,
    joinedDate: '2023-03-22',
    lastContact: 'Il y a 1 semaine',
    tags: ['Startup', 'Innovation', 'Agile']
  },
  {
    id: 3,
    name: 'Pierre Martin',
    company: 'GlobalCorp',
    email: 'p.martin@globalcorp.com',
    phone: '+41 24 456 78 90',
    address: 'Place du Marché 5, 1260 Nyon',
    status: 'prospect',
    rating: 3,
    revenue: 0,
    projects: 0,
    joinedDate: '2024-01-05',
    lastContact: 'Il y a 3 jours',
    tags: ['Prospect', 'Enterprise']
  },
  {
    id: 4,
    name: 'Sophie Bernard',
    company: 'EduTech Solutions',
    email: 'sophie.bernard@edutech.ch',
    phone: '+41 26 321 09 87',
    address: 'Rue des Alpes 15, 1700 Fribourg',
    website: 'www.edutech.ch',
    status: 'active',
    rating: 5,
    revenue: 95000,
    projects: 6,
    joinedDate: '2023-02-10',
    lastContact: 'Aujourd\'hui',
    tags: ['Education', 'SaaS', 'Récurrent']
  },
  {
    id: 5,
    name: 'Thomas Müller',
    company: 'FinanceApp',
    email: 't.muller@financeapp.ch',
    phone: '+41 31 234 56 78',
    address: 'Bundesplatz 12, 3000 Bern',
    status: 'inactive',
    rating: 4,
    revenue: 45000,
    projects: 3,
    joinedDate: '2022-11-20',
    lastContact: 'Il y a 2 mois',
    tags: ['Finance', 'Pause']
  }
]

export default function ClientsPage() {
  const [clients] = useState<Client[]>(clientsData)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filtrage des clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Statistiques
  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    prospects: clients.filter(c => c.status === 'prospect').length,
    revenue: clients.reduce((sum, c) => sum + c.revenue, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
            Gestion des Clients
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {stats.total} clients • {stats.active} actifs • {stats.prospects} prospects
          </p>
        </div>
        <button className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl hover:shadow-lg hover:shadow-[#00F5FF]/25 transition-all duration-300 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau Client</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: stats.total, icon: User, color: 'from-[#00F5FF] to-[#9B51E0]' },
          { label: 'Clients Actifs', value: stats.active, icon: CheckCircle, color: 'from-green-400 to-green-600' },
          { label: 'Prospects', value: stats.prospects, icon: TrendingUp, color: 'from-yellow-400 to-orange-500' },
          { label: 'Revenus Total', value: `€${(stats.revenue / 1000).toFixed(0)}k`, icon: DollarSign, color: 'from-[#9B51E0] to-[#FF00A8]' }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="prospect">Prospects</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Clients Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        <AnimatePresence mode="popLayout">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedClient(client)}
              className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group ${
                viewMode === 'list' ? 'p-4' : 'p-6'
              }`}
            >
              {viewMode === 'grid' ? (
                // Card View
                <>
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      client.status === 'active' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                        : client.status === 'prospect'
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {client.status === 'active' ? 'Actif' : client.status === 'prospect' ? 'Prospect' : 'Inactif'}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        // Actions menu
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] flex items-center justify-center text-white font-bold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{client.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{client.company}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < client.rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({client.rating}.0)</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                    {client.website && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Globe className="w-4 h-4" />
                        <span className="truncate">{client.website}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Revenus</p>
                      <p className="text-lg font-semibold">€{(client.revenue / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Projets</p>
                      <p className="text-lg font-semibold">{client.projects}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover Action */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </>
              ) : (
                // List View
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] flex items-center justify-center text-white font-bold text-sm">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{client.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{client.email}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold">€{(client.revenue / 1000).toFixed(0)}k</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.status === 'active' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                          : client.status === 'prospect'
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {client.status === 'active' ? 'Actif' : client.status === 'prospect' ? 'Prospect' : 'Inactif'}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="relative h-32 bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8]">
                <button
                  onClick={() => setSelectedClient(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="relative px-8 pb-8">
                {/* Avatar */}
                <div className="absolute -top-12 left-8">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] flex items-center justify-center text-white text-2xl font-bold">
                      {selectedClient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Éditer</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Contacter</span>
                  </button>
                </div>

                {/* Client Info */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{selectedClient.company}</p>
                  
                  {/* Status & Rating */}
                  <div className="flex items-center space-x-4 mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedClient.status === 'active' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                        : selectedClient.status === 'prospect'
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {selectedClient.status === 'active' ? 'Client Actif' : selectedClient.status === 'prospect' ? 'Prospect' : 'Client Inactif'}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedClient.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  {selectedClient.description && (
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {selectedClient.description}
                    </p>
                  )}

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg mb-3">Informations de Contact</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <span>{selectedClient.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <span>{selectedClient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span>{selectedClient.address}</span>
                        </div>
                        {selectedClient.website && (
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <a href={`https://${selectedClient.website}`} target="_blank" rel="noopener noreferrer" className="text-[#00F5FF] hover:underline">
                              {selectedClient.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg mb-3">Statistiques</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Revenus Total</p>
                          <p className="text-xl font-bold">€{(selectedClient.revenue / 1000).toFixed(0)}k</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Projets</p>
                          <p className="text-xl font-bold">{selectedClient.projects}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Client Depuis</p>
                          <p className="text-sm font-medium">{new Date(selectedClient.joinedDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dernier Contact</p>
                          <p className="text-sm font-medium">{selectedClient.lastContact}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gradient-to-r from-[#00F5FF]/10 to-[#9B51E0]/10 rounded-lg text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}