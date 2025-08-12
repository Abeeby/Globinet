'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  Plus,
  Filter,
  Search,
  DollarSign,
  Calendar,
  User,
  Building2,
  MoreVertical,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  ArrowRight,
  Target,
  Award
} from 'lucide-react'

// Types
interface Deal {
  id: string
  title: string
  company: string
  contact: string
  value: number
  probability: number
  stage: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdDate: string
  expectedCloseDate: string
  lastActivity: string
  notes?: string
  tags: string[]
}

interface Stage {
  id: string
  name: string
  deals: Deal[]
  value: number
  color: string
}

// Données simulées
const initialDeals: Deal[] = [
  {
    id: '1',
    title: 'Refonte Site Web',
    company: 'TechCorp SA',
    contact: 'Jean Dupont',
    value: 45000,
    probability: 80,
    stage: 'negotiation',
    priority: 'high',
    createdDate: '2024-01-05',
    expectedCloseDate: '2024-02-15',
    lastActivity: 'Il y a 2 heures',
    tags: ['Web', 'Design', 'Urgent']
  },
  {
    id: '2',
    title: 'Application Mobile',
    company: 'StartupX',
    contact: 'Marie Laurent',
    value: 75000,
    probability: 60,
    stage: 'proposal',
    priority: 'medium',
    createdDate: '2024-01-10',
    expectedCloseDate: '2024-03-01',
    lastActivity: 'Il y a 1 jour',
    tags: ['Mobile', 'iOS', 'Android']
  },
  {
    id: '3',
    title: 'Consultation SEO',
    company: 'GlobalCorp',
    contact: 'Pierre Martin',
    value: 15000,
    probability: 30,
    stage: 'qualification',
    priority: 'low',
    createdDate: '2024-01-12',
    expectedCloseDate: '2024-02-28',
    lastActivity: 'Il y a 3 jours',
    tags: ['SEO', 'Marketing']
  },
  {
    id: '4',
    title: 'Plateforme E-learning',
    company: 'EduTech Solutions',
    contact: 'Sophie Bernard',
    value: 120000,
    probability: 90,
    stage: 'closing',
    priority: 'urgent',
    createdDate: '2023-12-15',
    expectedCloseDate: '2024-01-20',
    lastActivity: 'Il y a 30 minutes',
    tags: ['SaaS', 'Education']
  },
  {
    id: '5',
    title: 'Migration Cloud',
    company: 'FinanceApp',
    contact: 'Thomas Müller',
    value: 55000,
    probability: 40,
    stage: 'lead',
    priority: 'medium',
    createdDate: '2024-01-14',
    expectedCloseDate: '2024-04-01',
    lastActivity: 'Il y a 5 heures',
    tags: ['Cloud', 'Infrastructure']
  },
  {
    id: '6',
    title: 'Audit de Sécurité',
    company: 'SecureBank',
    contact: 'Lisa Chen',
    value: 25000,
    probability: 70,
    stage: 'proposal',
    priority: 'high',
    createdDate: '2024-01-08',
    expectedCloseDate: '2024-02-10',
    lastActivity: 'Il y a 1 heure',
    tags: ['Sécurité', 'Audit']
  }
]

const stageConfig = [
  { id: 'lead', name: 'Prospect', color: 'from-gray-400 to-gray-600' },
  { id: 'qualification', name: 'Qualification', color: 'from-blue-400 to-blue-600' },
  { id: 'proposal', name: 'Proposition', color: 'from-yellow-400 to-orange-500' },
  { id: 'negotiation', name: 'Négociation', color: 'from-purple-400 to-purple-600' },
  { id: 'closing', name: 'Closing', color: 'from-green-400 to-green-600' },
  { id: 'won', name: 'Gagné', color: 'from-[#00F5FF] to-[#9B51E0]' },
  { id: 'lost', name: 'Perdu', color: 'from-red-400 to-red-600' }
]

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all')
  const [expandedDeals, setExpandedDeals] = useState<Set<string>>(new Set())
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null)

  // Organiser les deals par stage
  const stages: Stage[] = stageConfig.map(config => {
    const stageDeals = deals.filter(deal => 
      deal.stage === config.id &&
      (filterPriority === 'all' || deal.priority === filterPriority) &&
      (searchTerm === '' || 
       deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       deal.company.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)
    return {
      ...config,
      deals: stageDeals,
      value: totalValue
    }
  })

  // Statistiques
  const stats = {
    totalDeals: deals.length,
    totalValue: deals.reduce((sum, deal) => sum + deal.value, 0),
    averageValue: deals.length > 0 ? deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length : 0,
    conversionRate: deals.filter(d => d.stage === 'won').length / deals.length * 100
  }

  // Gérer le drag and drop
  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal)
  }

  const handleDragEnd = () => {
    setDraggedDeal(null)
  }

  const handleDrop = (stageId: string) => {
    if (draggedDeal) {
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.id === draggedDeal.id 
            ? { ...deal, stage: stageId }
            : deal
        )
      )
    }
  }

  const toggleDealExpansion = (dealId: string) => {
    setExpandedDeals(prev => {
      const newSet = new Set(prev)
      if (newSet.has(dealId)) {
        newSet.delete(dealId)
      } else {
        newSet.add(dealId)
      }
      return newSet
    })
  }

  // Obtenir la couleur de priorité
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
            Pipeline Commercial
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {stats.totalDeals} affaires • €{(stats.totalValue / 1000).toFixed(0)}k de valeur totale
          </p>
        </div>
        <button className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl hover:shadow-lg hover:shadow-[#00F5FF]/25 transition-all duration-300 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouvelle Affaire</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Affaires Totales', value: stats.totalDeals, icon: Target, color: 'from-[#00F5FF] to-[#9B51E0]' },
          { label: 'Valeur Totale', value: `€${(stats.totalValue / 1000).toFixed(0)}k`, icon: DollarSign, color: 'from-green-400 to-green-600' },
          { label: 'Valeur Moyenne', value: `€${(stats.averageValue / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'from-yellow-400 to-orange-500' },
          { label: 'Taux de Conversion', value: `${stats.conversionRate.toFixed(1)}%`, icon: Award, color: 'from-[#9B51E0] to-[#FF00A8]' }
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
                placeholder="Rechercher une affaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
            >
              <option value="all">Toutes les priorités</option>
              <option value="urgent">Urgent</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex space-x-4 h-full min-w-max">
          {stages.map((stage, stageIndex) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
              className="w-80 flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(stage.id)}
            >
              {/* Stage Header */}
              <div className="bg-white dark:bg-gray-900 rounded-t-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{stage.name}</h3>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
                    {stage.deals.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    €{(stage.value / 1000).toFixed(0)}k
                  </span>
                  <div className={`h-1 w-20 bg-gradient-to-r ${stage.color} rounded-full`} />
                </div>
              </div>

              {/* Deals Container */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl p-2 space-y-2 overflow-y-auto">
                <AnimatePresence>
                  {stage.deals.map((deal, dealIndex) => (
                    <motion.div
                      key={deal.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: dealIndex * 0.05 }}
                      draggable
                      onDragStart={() => handleDragStart(deal)}
                      onDragEnd={handleDragEnd}
                      whileHover={{ y: -2 }}
                      whileDrag={{ scale: 1.05, rotate: 2 }}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-move"
                    >
                      {/* Deal Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1">{deal.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {deal.company}
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(deal.priority)}`} />
                      </div>

                      {/* Deal Value & Probability */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold">
                          €{(deal.value / 1000).toFixed(0)}k
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                          {deal.probability}%
                        </span>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                          <User className="w-3 h-3" />
                          <span>{deal.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(deal.expectedCloseDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${deal.probability}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full bg-gradient-to-r ${stage.color}`}
                        />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {deal.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {deal.tags.length > 2 && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                            +{deal.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Last Activity */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{deal.lastActivity}</span>
                        </span>
                        <button
                          onClick={() => setSelectedDeal(deal)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {stage.deals.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                      <Plus className="w-6 h-6" />
                    </div>
                    <p className="text-sm">Aucune affaire</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deal Detail Modal */}
      <AnimatePresence>
        {selectedDeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDeal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedDeal.title}</h2>
                    <p className="text-white/80 mt-1">{selectedDeal.company}</p>
                  </div>
                  <button
                    onClick={() => setSelectedDeal(null)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Deal Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Valeur</p>
                    <p className="text-2xl font-bold">€{(selectedDeal.value / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Probabilité</p>
                    <p className="text-2xl font-bold">{selectedDeal.probability}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Priorité</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${getPriorityColor(selectedDeal.priority)}`}>
                      {selectedDeal.priority === 'urgent' ? 'Urgente' : 
                       selectedDeal.priority === 'high' ? 'Haute' :
                       selectedDeal.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold mb-3">Contact Principal</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{selectedDeal.contact}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <span>{selectedDeal.company}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href="#" className="text-[#00F5FF] hover:underline">
                        {selectedDeal.contact.toLowerCase().replace(' ', '.')}@{selectedDeal.company.toLowerCase().replace(/\s+/g, '')}.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>+41 22 123 45 67</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold">Chronologie</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date de création</p>
                      <p className="font-medium">{new Date(selectedDeal.createdDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date de clôture prévue</p>
                      <p className="font-medium">{new Date(selectedDeal.expectedCloseDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Dernière activité</p>
                      <p className="font-medium">{selectedDeal.lastActivity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Étape actuelle</p>
                      <p className="font-medium">{stageConfig.find(s => s.id === selectedDeal.stage)?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-[#00F5FF]/10 to-[#9B51E0]/10 rounded-lg text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Éditer</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Marquer comme gagné</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}