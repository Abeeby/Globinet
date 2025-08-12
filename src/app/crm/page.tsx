'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Filter,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Import dynamique pour les graphiques (évite les erreurs SSR)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// Données simulées pour les KPIs
const kpis = [
  {
    title: 'Revenus',
    value: '€125,430',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-[#00F5FF] to-[#9B51E0]',
  },
  {
    title: 'Nouveaux Clients',
    value: '23',
    change: '+8.3%',
    trend: 'up',
    icon: Users,
    color: 'from-[#9B51E0] to-[#FF00A8]',
  },
  {
    title: 'Projets Actifs',
    value: '17',
    change: '-2.4%',
    trend: 'down',
    icon: Briefcase,
    color: 'from-[#FF00A8] to-[#00F5FF]',
  },
  {
    title: 'Tâches à Venir',
    value: '42',
    change: '+15.2%',
    trend: 'up',
    icon: Calendar,
    color: 'from-[#00F5FF] to-[#FF00A8]',
  },
]

// Données pour le graphique de revenus
const revenueChartOptions = {
  chart: {
    type: 'area' as const,
    toolbar: { show: false },
    zoom: { enabled: false },
    background: 'transparent',
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth' as const,
    width: 3,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 100],
      colorStops: [
        { offset: 0, color: '#00F5FF', opacity: 0.7 },
        { offset: 50, color: '#9B51E0', opacity: 0.5 },
        { offset: 100, color: '#FF00A8', opacity: 0.1 },
      ],
    },
  },
  xaxis: {
    categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    labels: { style: { colors: '#9CA3AF' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: { colors: '#9CA3AF' },
      formatter: (value: number) => `€${value}k`,
    },
  },
  grid: {
    borderColor: '#374151',
    strokeDashArray: 3,
    xaxis: { lines: { show: false } },
  },
  tooltip: {
    theme: 'dark',
    y: { formatter: (value: number) => `€${value}k` },
  },
  colors: ['#00F5FF'],
}

const revenueChartSeries = [
  {
    name: 'Revenus',
    data: [85, 95, 110, 98, 105, 115, 125],
  },
]

// Données pour le graphique en donut
const projectStatusOptions = {
  chart: {
    type: 'donut' as const,
    background: 'transparent',
  },
  labels: ['Terminés', 'En cours', 'En retard', 'Planifiés'],
  colors: ['#00F5FF', '#9B51E0', '#FF00A8', '#6B7280'],
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#9CA3AF',
            formatter: () => '48',
          },
        },
      },
    },
  },
  dataLabels: { enabled: false },
  legend: {
    position: 'bottom' as const,
    labels: { colors: '#9CA3AF' },
  },
  stroke: { show: false },
  tooltip: { theme: 'dark' },
}

const projectStatusSeries = [18, 12, 5, 13]

// Activités récentes
const recentActivities = [
  {
    id: 1,
    type: 'client',
    action: 'Nouveau client ajouté',
    description: 'TechCorp SA',
    time: 'Il y a 2 heures',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    type: 'project',
    action: 'Projet complété',
    description: 'Refonte site e-commerce',
    time: 'Il y a 4 heures',
    icon: CheckCircle,
    color: 'bg-green-500',
  },
  {
    id: 3,
    type: 'ticket',
    action: 'Ticket urgent',
    description: 'Bug système de paiement',
    time: 'Il y a 6 heures',
    icon: AlertCircle,
    color: 'bg-red-500',
  },
  {
    id: 4,
    type: 'revenue',
    action: 'Paiement reçu',
    description: '€15,000 - StartupX',
    time: 'Hier',
    icon: DollarSign,
    color: 'bg-purple-500',
  },
]

// Projets prioritaires
const priorityProjects = [
  {
    id: 1,
    name: 'Application Mobile Banking',
    client: 'FinanceApp',
    progress: 75,
    deadline: '15 Jan 2024',
    status: 'on-track',
  },
  {
    id: 2,
    name: 'Plateforme E-learning',
    client: 'EduTech Solutions',
    progress: 45,
    deadline: '28 Jan 2024',
    status: 'at-risk',
  },
  {
    id: 3,
    name: 'Site Vitrine Corporate',
    client: 'GlobalCorp',
    progress: 90,
    deadline: '10 Jan 2024',
    status: 'on-track',
  },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulation du chargement
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
            Tableau de Bord
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bienvenue sur votre espace de gestion GLOBIWEB
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F5FF]"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${kpi.color} rounded-xl text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                  {kpi.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {kpi.value}
                </p>
              </div>

              {/* Animated Line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              >
                <div className={`h-full bg-gradient-to-r ${kpi.color}`} />
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Évolution des Revenus</h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          {!isLoading && (
            <Chart
              options={revenueChartOptions}
              series={revenueChartSeries}
              type="area"
              height={300}
            />
          )}
        </motion.div>

        {/* Project Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Statut des Projets</h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          {!isLoading && (
            <Chart
              options={projectStatusOptions}
              series={projectStatusSeries}
              type="donut"
              height={280}
            />
          )}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Activités Récentes</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
                >
                  <div className={`p-2 ${activity.color} rounded-lg text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Priority Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Projets Prioritaires</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {priorityProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'on-track'
                      ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                      : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                  }`}>
                    {project.status === 'on-track' ? 'Sur la bonne voie' : 'À risque'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {project.client} • {project.deadline}
                </p>
                <div className="relative">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#00F5FF] to-[#9B51E0]"
                    />
                  </div>
                  <span className="absolute -top-1 right-0 text-xs text-gray-500">
                    {project.progress}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}