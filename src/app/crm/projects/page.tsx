'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  MoreVertical,
  ChevronRight,
  Briefcase,
  Target,
  TrendingUp,
  DollarSign,
  Edit,
  Trash2,
  FileText,
  Link2,
  MessageSquare,
  BarChart3
} from 'lucide-react'

// Types
interface Task {
  id: string
  name: string
  status: 'todo' | 'in-progress' | 'done'
  assignee: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

interface Project {
  id: string
  name: string
  client: string
  status: 'planning' | 'active' | 'on-hold' | 'completed'
  progress: number
  budget: number
  spent: number
  startDate: string
  endDate: string
  team: string[]
  tasks: Task[]
  priority: 'low' | 'medium' | 'high'
  description: string
}

// Données simulées
const projectsData: Project[] = [
  {
    id: '1',
    name: 'Application Mobile Banking',
    client: 'FinanceApp',
    status: 'active',
    progress: 75,
    budget: 120000,
    spent: 90000,
    startDate: '2023-11-01',
    endDate: '2024-02-15',
    team: ['Alice', 'Bob', 'Charlie'],
    tasks: [
      { id: 't1', name: 'Design UI/UX', status: 'done', assignee: 'Alice', dueDate: '2023-12-15', priority: 'high' },
      { id: 't2', name: 'Développement Backend', status: 'in-progress', assignee: 'Bob', dueDate: '2024-01-30', priority: 'high' },
      { id: 't3', name: 'Tests et QA', status: 'todo', assignee: 'Charlie', dueDate: '2024-02-10', priority: 'medium' }
    ],
    priority: 'high',
    description: 'Application mobile complète pour services bancaires avec authentification biométrique.'
  },
  {
    id: '2',
    name: 'Plateforme E-learning',
    client: 'EduTech Solutions',
    status: 'active',
    progress: 45,
    budget: 85000,
    spent: 38000,
    startDate: '2023-12-01',
    endDate: '2024-03-30',
    team: ['David', 'Eve'],
    tasks: [
      { id: 't4', name: 'Architecture système', status: 'done', assignee: 'David', dueDate: '2023-12-20', priority: 'high' },
      { id: 't5', name: 'Module de cours', status: 'in-progress', assignee: 'Eve', dueDate: '2024-02-15', priority: 'high' },
      { id: 't6', name: 'Système de paiement', status: 'todo', assignee: 'David', dueDate: '2024-03-15', priority: 'medium' }
    ],
    priority: 'medium',
    description: 'Plateforme complète de formation en ligne avec système de vidéoconférence intégré.'
  },
  {
    id: '3',
    name: 'Site Vitrine Corporate',
    client: 'GlobalCorp',
    status: 'completed',
    progress: 100,
    budget: 35000,
    spent: 32000,
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    team: ['Frank'],
    tasks: [
      { id: 't7', name: 'Tous les livrables', status: 'done', assignee: 'Frank', dueDate: '2023-12-31', priority: 'low' }
    ],
    priority: 'low',
    description: 'Site web corporate avec CMS headless et optimisation SEO avancée.'
  },
  {
    id: '4',
    name: 'Migration Cloud AWS',
    client: 'TechCorp SA',
    status: 'planning',
    progress: 10,
    budget: 150000,
    spent: 15000,
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    team: ['Grace', 'Henry', 'Iris'],
    tasks: [
      { id: 't8', name: 'Audit infrastructure', status: 'in-progress', assignee: 'Grace', dueDate: '2024-02-15', priority: 'high' },
      { id: 't9', name: 'Plan de migration', status: 'todo', assignee: 'Henry', dueDate: '2024-02-28', priority: 'high' },
      { id: 't10', name: 'Migration données', status: 'todo', assignee: 'Iris', dueDate: '2024-05-30', priority: 'high' }
    ],
    priority: 'high',
    description: 'Migration complète de l\'infrastructure on-premise vers AWS avec haute disponibilité.'
  }
]

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(projectsData)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'planning' | 'active' | 'on-hold' | 'completed'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid')

  // Filtrage des projets
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Statistiques
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0)
  }

  // Couleurs de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
      case 'active': return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
      case 'on-hold': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
      case 'completed': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-400 to-red-600'
      case 'medium': return 'from-yellow-400 to-orange-500'
      case 'low': return 'from-green-400 to-green-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  // Fonction pour générer la vue Timeline/Gantt
  const renderTimelineView = () => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin']
    
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Header avec les mois */}
            <div className="flex border-b border-gray-200 dark:border-gray-800">
              <div className="w-64 p-4 font-semibold">Projet</div>
              <div className="flex-1 flex">
                {months.map((month) => (
                  <div key={month} className="flex-1 p-4 text-center border-l border-gray-200 dark:border-gray-800">
                    {month}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Projets */}
            {filteredProjects.map((project, index) => {
              const startMonth = new Date(project.startDate).getMonth()
              const endMonth = new Date(project.endDate).getMonth()
              const duration = endMonth - startMonth + 1
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-64 p-4">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{project.client}</div>
                  </div>
                  <div className="flex-1 flex relative p-4">
                    <div className="absolute inset-0 flex">
                      {months.map((_, i) => (
                        <div key={i} className="flex-1 border-l border-gray-100 dark:border-gray-800" />
                      ))}
                    </div>
                    <div
                      className="relative h-10 rounded-lg overflow-hidden shadow-sm"
                      style={{
                        marginLeft: `${(startMonth / 6) * 100}%`,
                        width: `${(duration / 6) * 100}%`
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${getPriorityColor(project.priority)} opacity-20`} />
                      <div
                        className={`h-full bg-gradient-to-r ${getPriorityColor(project.priority)} transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {project.progress}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
            Gestion des Projets
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {stats.total} projets • {stats.active} actifs • €{(stats.totalBudget / 1000).toFixed(0)}k de budget total
          </p>
        </div>
        <button className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl hover:shadow-lg hover:shadow-[#00F5FF]/25 transition-all duration-300 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau Projet</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Projets', value: stats.total, icon: Briefcase, color: 'from-[#00F5FF] to-[#9B51E0]' },
          { label: 'Projets Actifs', value: stats.active, icon: PlayCircle, color: 'from-green-400 to-green-600' },
          { label: 'Terminés', value: stats.completed, icon: CheckCircle2, color: 'from-gray-400 to-gray-600' },
          { label: 'Budget Total', value: `€${(stats.totalBudget / 1000).toFixed(0)}k`, icon: DollarSign, color: 'from-[#9B51E0] to-[#FF00A8]' },
          { label: 'Dépensé', value: `€${(stats.totalSpent / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'from-yellow-400 to-orange-500' }
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
                  <p className="text-xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg text-white`}>
                  <Icon className="w-4 h-4" />
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
                placeholder="Rechercher un projet..."
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
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
            >
              <option value="all">Tous les statuts</option>
              <option value="planning">Planification</option>
              <option value="active">Actif</option>
              <option value="on-hold">En pause</option>
              <option value="completed">Terminé</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Grille
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'timeline' 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Timeline
              </button>
            </div>

            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects View */}
      {viewMode === 'timeline' ? (
        renderTimelineView()
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProject(project)}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Project Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status === 'planning' ? 'Planification' :
                       project.status === 'active' ? 'Actif' :
                       project.status === 'on-hold' ? 'En pause' : 'Terminé'}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Progression</span>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r ${getPriorityColor(project.priority)}`}
                      />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                      <p className="text-sm font-semibold">€{(project.budget / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Dépensé</p>
                      <p className="text-sm font-semibold">€{(project.spent / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Date de fin</p>
                      <p className="text-sm font-semibold">{new Date(project.endDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Équipe</p>
                      <div className="flex -space-x-2 mt-1">
                        {project.team.slice(0, 3).map((member, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900"
                          >
                            {member[0]}
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-900">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tasks Summary */}
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Tâches</span>
                      <span className="text-xs text-gray-500">
                        {project.tasks.filter(t => t.status === 'done').length}/{project.tasks.length} terminées
                      </span>
                    </div>
                    <div className="space-y-2">
                      {project.tasks.slice(0, 2).map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {task.status === 'done' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : task.status === 'in-progress' ? (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-sm">{task.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{task.assignee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`h-1 bg-gradient-to-r ${getPriorityColor(project.priority)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}