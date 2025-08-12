'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  User,
  Calendar,
  Tag,
  MoreVertical,
  ArrowUpRight,
  XCircle,
  AlertTriangle,
  Info
} from 'lucide-react'

// Types
interface Ticket {
  id: string
  title: string
  description: string
  client: string
  assignee: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: string
  updatedAt: string
  messages: number
}

// Données simulées
const ticketsData: Ticket[] = [
  {
    id: 'T001',
    title: 'Bug système de paiement',
    description: 'Les utilisateurs ne peuvent pas finaliser leurs achats avec PayPal',
    client: 'TechCorp SA',
    assignee: 'Alice Martin',
    status: 'in-progress',
    priority: 'urgent',
    category: 'Bug',
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-15T14:45:00',
    messages: 8
  },
  {
    id: 'T002',
    title: 'Demande de nouvelle fonctionnalité',
    description: 'Ajouter un système de notifications push',
    client: 'StartupX',
    assignee: 'Bob Chen',
    status: 'open',
    priority: 'medium',
    category: 'Feature Request',
    createdAt: '2024-01-14T09:15:00',
    updatedAt: '2024-01-14T09:15:00',
    messages: 3
  },
  {
    id: 'T003',
    title: 'Problème de performance',
    description: 'Le site est lent lors des heures de pointe',
    client: 'GlobalCorp',
    assignee: 'Charlie Davis',
    status: 'resolved',
    priority: 'high',
    category: 'Performance',
    createdAt: '2024-01-13T16:00:00',
    updatedAt: '2024-01-15T11:30:00',
    messages: 12
  },
  {
    id: 'T004',
    title: 'Question sur l\'utilisation',
    description: 'Comment exporter les données en CSV?',
    client: 'EduTech Solutions',
    assignee: 'Diana Evans',
    status: 'closed',
    priority: 'low',
    category: 'Support',
    createdAt: '2024-01-12T14:20:00',
    updatedAt: '2024-01-13T10:00:00',
    messages: 5
  },
  {
    id: 'T005',
    title: 'Erreur 500 sur la page produits',
    description: 'Erreur serveur lors de l\'accès à certains produits',
    client: 'FinanceApp',
    assignee: 'Eve Foster',
    status: 'in-progress',
    priority: 'high',
    category: 'Bug',
    createdAt: '2024-01-15T08:00:00',
    updatedAt: '2024-01-15T15:30:00',
    messages: 6
  }
]

export default function TicketsPage() {
  const [tickets] = useState<Ticket[]>(ticketsData)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved' | 'closed'>('all')
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all')

  // Filtrage
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  // Statistiques
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length
  }

  // Couleurs
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
      case 'in-progress': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
      case 'resolved': return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
      case 'closed': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />
      case 'low': return <Info className="w-4 h-4 text-green-500" />
      default: return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-500'
      case 'high': return 'border-orange-500'
      case 'medium': return 'border-yellow-500'
      case 'low': return 'border-green-500'
      default: return 'border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
            Tickets & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {stats.total} tickets • {stats.open} ouverts • {stats.inProgress} en cours
          </p>
        </div>
        <button className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl hover:shadow-lg hover:shadow-[#00F5FF]/25 transition-all duration-300 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau Ticket</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'from-[#00F5FF] to-[#9B51E0]' },
          { label: 'Ouverts', value: stats.open, color: 'from-blue-400 to-blue-600' },
          { label: 'En cours', value: stats.inProgress, color: 'from-yellow-400 to-orange-500' },
          { label: 'Résolus', value: stats.resolved, color: 'from-green-400 to-green-600' },
          { label: 'Urgents', value: stats.urgent, color: 'from-red-400 to-red-600' }
        ].map((stat, index) => (
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
              <div className={`w-2 h-8 bg-gradient-to-b ${stat.color} rounded-full`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un ticket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="open">Ouvert</option>
              <option value="in-progress">En cours</option>
              <option value="resolved">Résolu</option>
              <option value="closed">Fermé</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none"
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

      {/* Tickets List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigné à
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priorité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Mis à jour
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {filteredTickets.map((ticket, index) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-l-4 ${getPriorityColor(ticket.priority)}`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium">{ticket.id}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {ticket.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{ticket.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] flex items-center justify-center text-white text-xs font-bold">
                          {ticket.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="ml-2 text-sm">{ticket.assignee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status === 'open' ? 'Ouvert' :
                         ticket.status === 'in-progress' ? 'En cours' :
                         ticket.status === 'resolved' ? 'Résolu' : 'Fermé'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {getPriorityIcon(ticket.priority)}
                        <span className="text-sm">
                          {ticket.priority === 'urgent' ? 'Urgent' :
                           ticket.priority === 'high' ? 'Haute' :
                           ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(ticket.updatedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Actions
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}