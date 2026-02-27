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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AXORA
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#clients" className="text-sm font-medium hover:text-indigo-600 transition-colors">Clients</a>
              <a href="#features" className="text-sm font-medium hover:text-indigo-600 transition-colors">Features</a>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-indigo-600 transition-colors">Discord</a>
              <a href="/admin" className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:scale-105 transition-transform">Admin</a>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#clients" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Clients</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Features</a>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Discord</a>
              <a href="/admin" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Admin</a>
            </div>
          )}
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 mb-8 animate-fade-in-up">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium">Premium Minecraft Clients</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-100">
            Elevate Your{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Gameplay
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Professional-grade Minecraft clients with unmatched performance and customization. No Discord required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <a href="#clients" className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/25 transition-all hover:scale-105 flex items-center gap-2">
              Browse Clients
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all">
              Join Discord
            </a>
          </div>
        </div>
      </section>

      <section id="clients" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Clients</h2>
            <p className="text-slate-600 dark:text-slate-300">Professional tools for serious players</p>
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
                  className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${client.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{client.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${client.statusColor}`}>
                      {client.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{client.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{client.version}</span>
                    <div className="flex items-center gap-1 text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-white dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Axora</h2>
            <p className="text-slate-600 dark:text-slate-300">Built for performance, designed for victory</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Performance', desc: 'Optimized for maximum FPS and minimal latency' },
              { icon: Shield, title: 'Undetectable', desc: 'Advanced bypass systems for all servers' },
              { icon: Settings, title: 'Customizable', desc: 'Extensive configuration options' },
              { icon: Swords, title: 'PvP Optimized', desc: 'Built for competitive gameplay' },
            ].map((feature, index) => (
              <div key={feature.title} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dominate?</h2>
          <p className="text-indigo-100 mb-8 text-lg">Join thousands of players using Axora clients</p>
          <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105">
            Join Discord <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-700 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            AXORA
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#clients" className="hover:text-indigo-600 transition-colors">Clients</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Discord</a>
          </div>
          <p className="text-sm text-slate-500">© 2024 Axora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
