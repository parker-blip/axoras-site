import { useNavigate } from 'react-router-dom'
import { Zap, Shield, Settings, Swords, ArrowLeft, Sparkles, Code, Lock, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse" style={style} />
)

export default function Features() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Zap,
      title: 'Performance',
      description: 'Our clients are optimized from the ground up to deliver maximum FPS with minimal latency. Experience smooth gameplay even on lower-end systems.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Undetectable',
      description: 'Advanced bypass systems keep you under the radar on all major servers. Our detection evasion is constantly updated to stay ahead.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Every aspect of our clients can be customized to match your playstyle. From HUD layouts to keybinds, make it truly yours.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Swords,
      title: 'PvP Optimized',
      description: 'Built specifically for competitive PvP. Features like auto-clicker, reach, and velocity give you the edge in every fight.',
      color: 'from-red-400 to-pink-500'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    { number: '100+', label: 'Features' },
  ]

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }))

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <Particle key={p.id} style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration
          }} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-black font-bold text-xl">Ax</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">Axora</span>
                <span className="text-yellow-400 text-xs tracking-widest">CLIENTS</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/')} className="text-sm text-zinc-400 hover:text-white transition-colors">Home</button>
              <button onClick={() => navigate('/features')} className="text-sm text-yellow-400">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors group animate-fade-in-up"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </button>
          
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Why Choose <span className="text-yellow-400">Axora</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
              Built for performance, designed for victory. Experience the difference with our premium tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`group p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-yellow-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Discord</a>
          </div>
          <p className="text-sm text-zinc-600">© 2024 Axora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
