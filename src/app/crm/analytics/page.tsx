'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  DollarSign,
  Users,
  Briefcase,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  // Graphique des revenus
  const revenueOptions = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      background: 'transparent'
    },
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        colorStops: [
          { offset: 0, color: '#00F5FF', opacity: 0.7 },
          { offset: 50, color: '#9B51E0', opacity: 0.5 },
          { offset: 100, color: '#FF00A8', opacity: 0.1 }
        ]
      }
    },
    xaxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      labels: { style: { colors: '#9CA3AF' } }
    },
    yaxis: {
      labels: {
        style: { colors: '#9CA3AF' },
        formatter: (value: number) => `€${value}k`
      }
    },
    grid: { borderColor: '#374151', strokeDashArray: 3 },
    tooltip: { theme: 'dark' },
    colors: ['#00F5FF']
  }

  const revenueSeries = [{
    name: 'Revenus',
    data: [85, 95, 110, 98, 105, 115, 125, 135, 128, 140, 155, 165]
  }]

  // KPIs
  const kpis = [
    { title: 'Revenus Annuels', value: '€1.4M', change: '+23.5%', trend: 'up', icon: DollarSign },
    { title: 'Nouveaux Clients', value: '248', change: '+18.2%', trend: 'up', icon: Users },
    { title: 'Taux de Conversion', value: '32.5%', change: '+5.8%', trend: 'up', icon: Target },
    { title: 'Satisfaction Client', value: '4.8/5', change: '+0.3', trend: 'up', icon: Activity }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
            Analytics & Reporting
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analysez vos performances et générez des rapports détaillés
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <Filter className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] rounded-xl text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{kpi.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Graphique principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-6">Évolution des Revenus</h2>
        {!isLoading && (
          <Chart
            options={revenueOptions}
            series={revenueSeries}
            type="area"
            height={350}
          />
        )}
      </motion.div>
    </div>
  )
}