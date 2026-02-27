import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, ChevronRight, Shield, Code, Zap, Menu, X, Sparkles, Users, Lock, Globe } from 'lucide-react'

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

// Particle component
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div 
    className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse"
    style={style}
  />
)

export default function Home() {
  const [clients, setClients] = useState<Client[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Track visitors
  useEffect(() => {
    const trackVisitor = async () => {
      let visitorCount = parseInt(localStorage.getItem('axora_visitor_count') || '0')
      const hasVisited = sessionStorage.getItem('axora_session')
      
      if (!hasVisited) {
        visitorCount += 1
        localStorage.setItem('axora_visitor_count', visitorCount.toString())
        sessionStorage.setItem('axora_session', 'true')
        
        try {
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              embeds: [{
                title: '🔥 New Site Visitor',
                description: `Someone just visited Axora Clients!`,
                color: 0xfbbf24,
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
    
    if (!isLoading) trackVisitor()
  }, [isLoading])

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  // Generate random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }))

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="flex flex-col items-center gap-4">
          <span className="loader"></span>
          <p className="text-yellow-400 text-sm font-medium tracking-wider">LOADING AXORA</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-yellow-400/30">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <Particle 
            key={p.id} 
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration
            }} 
          />
        ))}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-black font-bold text-xl">Ax</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">Axora</span>
                <span className="text-yellow-400 text-xs tracking-widest">CLIENTS</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/features')} className="text-sm text-zinc-400 hover:text-white transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </button>
              <a href="#clients" className="text-sm text-zinc-400 hover:text-white transition-colors relative group">
                Download
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors relative group">
                Discord
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            <button 
              onClick={() => navigate('/admin')} 
              className="hidden md:flex px-6 py-2.5 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 glow-yellow"
            >
              Download Now
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-white/10 mt-4 animate-fade-in-up">
              <button onClick={() => { navigate('/features'); setIsMenuOpen(false) }} className="block text-sm text-zinc-400 hover:text-white w-full text-left">Features</button>
              <a href="#clients" onClick={() => setIsMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white">Download</a>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white">Discord</a>
              <button onClick={() => { navigate('/admin'); setIsMenuOpen(false) }} className="block w-full px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg text-center">Download Now</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      >
        {/* Mouse spotlight effect */}
        <div 
          className="pointer-events-none absolute w-[600px] h-[600px] rounded-full opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)`,
            left: mousePosition.x - 300,
            top: mousePosition.y - 300
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Version Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-400 text-sm font-medium">Minecraft 1.8 - 1.21</span>
          </div>

          {/* Main Title */}
          <h1 className="animate-fade-in-up-delay-1 text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-white">Axora</span>{' '}
            <span className="text-yellow-400">Clients</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 text-xl md:text-2xl text-zinc-400 font-medium mb-8">
            Free Minecraft Utility Mods
          </p>

          {/* Description */}
          <p className="animate-fade-in-up-delay-2 text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Axora Clients is a collection of premium Minecraft clients packed with over 100+ modules 
            for basehunting, automation, and combat. Every feature is free with no paywalls or premium tiers.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#clients" 
              className="group flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 glow-yellow"
            >
              Download for 1.8+
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://discord.gg/axoras" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-zinc-800/50 text-white font-semibold rounded-lg border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              Join Community
            </a>
          </div>

          {/* Feature Cards */}
          <div className="animate-fade-in-up-delay-4 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-1">
              <Globe className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Official Website</h3>
              <p className="text-xs text-zinc-500">Verified Source</p>
            </div>
            <div className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-1">
              <Code className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Open Source</h3>
              <p className="text-xs text-zinc-500">Fully Transparent</p>
            </div>
            <div className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-1">
              <Zap className="w-6 h-6 text-yellow-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Free Forever</h3>
              <p className="text-xs text-zinc-500">No Premium Tiers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Clients</h2>
            <p className="text-zinc-500 text-lg">Professional tools for serious players</p>
          </div>
          
          {clients.length === 0 ? (
            <div className="text-center py-20 px-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 animate-fade-in-up-delay-1">
              <Download className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 text-lg mb-2">No clients available yet</p>
              <p className="text-zinc-600 text-sm">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <div
                  key={client.id}
                  onClick={() => navigate(`/client/${client.id}`)}
                  className="group cursor-pointer bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/10 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${client.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Download className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{client.name}</h3>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${client.statusColor}`}>
                      {client.status}
                    </span>
                  </div>
                  
                  <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{client.tagline}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <span className="text-xs text-zinc-600 font-mono">{client.version}</span>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      Download <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-zinc-950/50 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Why Choose Axora</h2>
            <p className="text-zinc-500 text-lg">Built for performance, designed for victory</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Performance', desc: 'Maximum FPS with zero lag', color: 'text-yellow-400' },
              { icon: Shield, title: 'Undetectable', desc: 'Advanced bypass systems', color: 'text-green-400' },
              { icon: Code, title: 'Customizable', desc: 'Extensive config options', color: 'text-blue-400' },
              { icon: Lock, title: 'Secure', desc: 'No data collection', color: 'text-purple-400' },
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className="group p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800 hover:border-yellow-400/30 transition-all duration-500 hover:-translate-y-2 hover:bg-zinc-900/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-3xl" />
          <div className="relative bg-zinc-900/50 rounded-3xl p-12 border border-zinc-800 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in-up">Ready to Dominate?</h2>
            <p className="text-zinc-400 mb-8 text-lg max-w-xl mx-auto animate-fade-in-up-delay-1">
              Join thousands of players using Axora clients to gain the competitive edge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
              <a 
                href="https://discord.gg/axoras" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 glow-yellow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Join Discord
              </a>
              <a 
                href="#clients" 
                className="px-8 py-4 bg-zinc-800 text-white font-semibold rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-all duration-300"
              >
                View Clients
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">Ax</span>
            </div>
            <span className="text-white font-bold">Axora</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-zinc-500">
            <button onClick={() => navigate('/')} className="hover:text-yellow-400 transition-colors">Home</button>
            <button onClick={() => navigate('/features')} className="hover:text-yellow-400 transition-colors">Features</button>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Discord</button>
          </div>
          <p className="text-sm text-zinc-600">© 2024 Axora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
