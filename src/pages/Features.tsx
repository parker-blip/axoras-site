import { useNavigate } from 'react-router-dom'
import { Zap, Shield, Settings, Swords, ArrowLeft, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Features() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimized for maximum FPS and minimal latency. Our clients are built from the ground up to ensure you get the best performance possible.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Undetectable',
      description: 'Advanced bypass systems for all servers. Stay under the radar with our constantly updated detection evasion.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Extensive configuration options. Customize every aspect of your client to match your playstyle perfectly.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Swords,
      title: 'PvP Optimized',
      description: 'Built for competitive gameplay. Every feature is designed to give you the edge in PvP combat.',
      color: 'from-red-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => navigate('/')} 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent cursor-pointer"
            >
              AXORA
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-indigo-400 transition-colors">Home</button>
              <button onClick={() => navigate('/features')} className="text-sm font-medium text-indigo-400">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-indigo-400 transition-colors">Discord</a>
              <button onClick={() => navigate('/admin')} className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-medium hover:scale-105 transition-transform">Admin</button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <button onClick={() => { navigate('/'); setIsMenuOpen(false) }} className="block text-sm font-medium w-full text-left">Home</button>
              <button onClick={() => { navigate('/features'); setIsMenuOpen(false) }} className="block text-sm font-medium text-indigo-400 w-full text-left">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Discord</a>
              <button onClick={() => { navigate('/admin'); setIsMenuOpen(false) }} className="block text-sm font-medium w-full text-left">Admin</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Axora</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for performance, designed for victory. Experience the difference with our premium tools.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-all hover:transform hover:scale-[1.02]"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Active Users' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Support' },
              { number: '100+', label: 'Features' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-slate-800/30">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dominate?</h2>
          <p className="text-indigo-100 mb-8 text-lg">Join thousands of players using Axora clients</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              Browse Clients
            </button>
            <a 
              href="https://discord.gg/axoras" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            AXORA
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Features</button>
            <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          </div>
          <p className="text-sm text-slate-500">© 2024 Axora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
