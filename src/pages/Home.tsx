import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Zap, Settings, Swords, Download, ChevronRight, Menu, X, Sparkles } from 'lucide-react'

interface Client {
  id: string
  name: string
  tagline: string
  description: string
  version: string
  status: string
  statusColor: string
  iconColor: string
  fileName?: string
}

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1476795038766858330/Zx90XU-8ltMx-eUdVI18dKvv9ShVvveYVWvvVA_s77HEyGSr_KUEFn5LP_uVf8BDwczm'

export default function Home() {
  const [clients, setClients] = useState<Client[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Track visitors and send to Discord
  useEffect(() => {
    const trackVisitor = async () => {
      // Get or create visitor count
      let visitorCount = parseInt(localStorage.getItem('axora_visitor_count') || '0')
      const hasVisited = sessionStorage.getItem('axora_session')
      
      if (!hasVisited) {
        visitorCount += 1
        localStorage.setItem('axora_visitor_count', visitorCount.toString())
        sessionStorage.setItem('axora_session', 'true')
        
        // Send to Discord webhook
        try {
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              embeds: [{
                title: '🔥 New Site Visitor',
                description: `Someone just visited Axora Clients!`,
                color: 0x6366f1,
                fields: [
                  { name: 'Total Visitors', value: visitorCount.toString(), inline: true },
                  { name: 'Time', value: new Date().toLocaleString(), inline: true }
                ],
                footer: { text: 'Axora Visitor Tracker' }
              }]
            })
          })
        } catch (e) {
          console.error('Webhook failed:', e)
        }
      }
    }
    
    trackVisitor()
  }, [])

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 text-2xl font-bold cursor-pointer group">
              <Sparkles className="w-8 h-8 text-indigo-400 group-hover:rotate-12 transition-transform" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AXORA</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#clients" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Clients
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all" />
              </a>
              <button onClick={() => navigate('/features')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all" />
              </button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Discord
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all" />
              </a>
              {/* NO ADMIN LINK - hidden from main page */}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-white/5 mt-4">
              <a href="#clients" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-slate-300 hover:text-white">Clients</a>
              <button onClick={() => { navigate('/features'); setIsMenuOpen(false) }} className="block text-sm font-medium text-slate-300 hover:text-white w-full text-left">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-slate-300 hover:text-white">Discord</a>
              {/* NO ADMIN LINK in mobile menu either */}
            </div>
          )}
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8 hover:border-indigo-500/50 transition-colors cursor-default">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-slate-300">Premium Minecraft Clients</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Elevate Your</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Gameplay</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Professional-grade Minecraft clients with unmatched performance and customization. 
            <span className="text-white font-medium"> No Discord required.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#clients" className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/25 transition-all hover:scale-105 flex items-center gap-2">
              Browse Clients
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 hover:border-indigo-500/50 transition-all">
              Join Discord
            </a>
          </div>
        </div>
      </section>

      <section id="clients" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Our Clients</h2>
            <p className="text-slate-400 text-lg">Professional tools for serious players</p>
          </div>
          
          {clients.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white/5 rounded-2xl border border-white/10">
              <Download className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">No clients available yet</p>
              <p className="text-slate-500 text-sm">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => navigate(`/client/${client.id}`)}
                  className="group cursor-pointer bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${client.iconColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${client.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Download className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{client.name}</h3>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${client.statusColor}`}>
                        {client.status}
                      </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{client.tagline}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-slate-500 font-mono">{client.version}</span>
                      <div className="flex items-center gap-1 text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        View Details <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Why Choose Axora</h2>
            <p className="text-slate-400 text-lg">Built for performance, designed for victory</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Performance', desc: 'Maximum FPS with zero lag' },
              { icon: Shield, title: 'Undetectable', desc: 'Advanced bypass systems' },
              { icon: Settings, title: 'Customizable', desc: 'Extensive config options' },
              { icon: Swords, title: 'PvP Optimized', desc: 'Competitive advantage' },
            ].map((feature) => (
              <div key={feature.title} className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-indigo-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl p-12 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Dominate?</h2>
            <p className="text-slate-300 mb-8 text-lg">Join thousands of players using Axora clients</p>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105">
              Join Discord <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AXORA</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-400">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Features</button>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          </div>
          <p className="text-sm text-slate-600">© 2024 Axora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
