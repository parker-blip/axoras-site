import { useNavigate } from 'react-router-dom'
import { Zap, Shield, Settings, Swords, ArrowLeft, Sparkles } from 'lucide-react'

export default function Features() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Zap,
      title: 'Performance',
      description: 'Our clients are optimized from the ground up to deliver maximum FPS with minimal latency. Experience smooth gameplay even on lower-end systems.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Undetectable',
      description: 'Advanced bypass systems keep you under the radar on all major servers. Our detection evasion is constantly updated to stay ahead.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Every aspect of our clients can be customized to match your playstyle. From HUD layouts to keybinds, make it truly yours.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Swords,
      title: 'PvP Optimized',
      description: 'Built specifically for competitive PvP. Features like auto-clicker, reach, and velocity give you the edge in every fight.',
      color: 'from-red-500 to-pink-500'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    { number: '100+', label: 'Features' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 text-2xl font-bold cursor-pointer group">
              <Sparkles className="w-8 h-8 text-indigo-400 group-hover:rotate-12 transition-transform" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AXORA</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => navigate('/features')} className="text-sm font-medium text-indigo-400">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Discord</a>
              <button onClick={() => navigate('/admin')} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105">Admin</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Axora</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for performance, designed for victory. Experience the difference with our premium tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {features.map((feature) => (
              <div key={feature.title} className="group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
