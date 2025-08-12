'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  FolderKanban,
  TicketCheck,
  BarChart3,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  ChevronLeft,
  Plus,
  Command
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/crm' },
  { icon: Users, label: 'Clients', path: '/crm/clients' },
  { icon: TrendingUp, label: 'Pipeline', path: '/crm/pipeline' },
  { icon: FolderKanban, label: 'Projets', path: '/crm/projects' },
  { icon: TicketCheck, label: 'Tickets', path: '/crm/tickets' },
  { icon: BarChart3, label: 'Analytics', path: '/crm/analytics' },
  { icon: Settings, label: 'Paramètres', path: '/crm/settings' },
]

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Raccourci clavier pour la recherche
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar Desktop */}
      <motion.aside
        initial={{ x: 0 }}
        animate={{ x: sidebarOpen ? 0 : -240 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden lg:block"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
            <Link href="/crm" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] rounded-xl animate-pulse" />
                <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] bg-clip-text text-transparent">
                    G
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#9B51E0] to-[#FF00A8] bg-clip-text text-transparent">
                GLOBIWEB
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-4">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] text-white rounded-xl hover:shadow-lg hover:shadow-[#00F5FF]/25 transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span className="font-medium">Nouveau Client</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 pb-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path || 
                (item.path !== '/crm' && pathname.startsWith(item.path))
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00F5FF]/10 to-[#9B51E0]/10 text-[#00F5FF]'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#00F5FF] to-[#9B51E0] rounded-r-full"
                    />
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#00F5FF]' : 'group-hover:text-[#00F5FF] transition-colors'}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.label === 'Tickets' && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#9B51E0] flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@globiweb.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Toggle Button (when sidebar is closed) */}
      {!sidebarOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-7 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 hidden lg:flex"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-6 h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-auto px-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center space-x-3 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
              >
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 flex-1 text-left">Rechercher...</span>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-700">⌘</kbd>
                  <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-700">K</kbd>
                </div>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-gray-900 lg:hidden"
            >
              {/* Mobile menu content similar to desktop sidebar */}
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-xl font-bold bg-gradient-to-r from-[#00F5FF] to-[#9B51E0] bg-clip-text text-transparent">
                    GLOBIWEB CRM
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 p-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Rechercher des clients, projets, tickets..."
                  className="flex-1 bg-transparent outline-none text-lg"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                <div className="text-sm text-gray-500 dark:text-gray-400">Suggestions</div>
                {['Client: TechCorp', 'Projet: Refonte Site Web', 'Ticket: Bug Login', 'Analytics: Rapport Mensuel'].map((item) => (
                  <div
                    key={item}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <Command className="w-4 h-4 text-gray-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}