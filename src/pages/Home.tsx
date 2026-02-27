import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Zap, Settings, Swords, Download, ChevronRight, Menu, X } from 'lucide-react'

interface Client {
  id: string
  name: string
  tagline: string
  description: string
  version: string
  status: string
  statusColor: string
  iconColor: string
}

export default function Home() {
  const [clients, setClients] = useState<Client[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
              AXORA
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#clients" className="text-sm font-medium hover:text-indigo-400 transition-colors">Clients</a>
              <button onClick={() => navigate('/features')} className="text-sm font-medium hover:text-indigo-400 transition-colors">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-indigo-400 transition-colors">Discord</a>
              <button onClick={() => navigate('/admin')} className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-medium hover:scale-105 transition-transform">Admin</button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#clients" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Clients</a>
              <button onClick={() => { navigate('/features'); setIsMenuOpen(false) }} className="block text-sm font-medium w-full text-left">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Discord</a>
              <button onClick={() => { navigate('/admin'); setIsMenuOpen(false) }} className="block text-sm font-medium w-full text-left">Admin</button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700 mb-8">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium">Premium Minecraft Clients</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Elevate Your{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Gameplay
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Professional-grade Minecraft clients with unmatched performance and customization. No Discord required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#clients" className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/25 transition-all hover:scale-105 flex items-center gap-2">
              Browse Clients
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-slate-700 rounded-xl font-semibold hover:border-indigo-500 hover:text-indigo-400 transition-all">
              Join Discord
            </a>
          </div>
        </div>
      </section>

      <section id="clients" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Clients</h2>
            <p className="text-slate-400">Professional tools for serious players</p>
          </div>
          
          {clients.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No clients available yet. Check the Admin panel to add clients.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <div
                  key={client.id}
                  onClick={() => navigate(`/client/${client.id}`)}
                  className="group cursor-pointer bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${client.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{client.name
