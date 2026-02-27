import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Shield, Zap, Settings, Sparkles, ChevronRight } from 'lucide-react'

interface Client {
  id: string
  name: string
  tagline: string
  description: string
  version: string
  status: string
  statusColor: string
  iconColor: string
  fileData?: string
  fileName?: string
}

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse" style={style} />
)

export default function ClientDetail() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }))

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      const clients = JSON.parse(savedClients)
      const found = clients.find((c: Client) => c.id === clientId)
      setClient(found || null)
    }
    setTimeout(() => setIsVisible(true), 100)
  }, [clientId])

  const handleDownload = () => {
    if (client?.fileData && client?.fileName) {
      const link = document.createElement('a')
      link.href = client.fileData
      link.download = client.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Client Not Found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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
              <button onClick={() => navigate('/features')} className="text-sm text-zinc-400 hover:text-white transition-colors">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/')} 
            className={`flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <ArrowLeft className="w-5 h-5" /> Back to Clients
          </button>

          <div className={`bg-zinc-900/50 rounded-3xl p-8 md:p-12 border border-zinc-800 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${client.iconColor} flex items-center justify-center shadow-2xl shadow-yellow-400/20 transform hover:scale-105 transition-transform duration-300`}>
                <Download className="w-12 h-12 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{client.name}</h1>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${client.statusColor}`}>
                    {client.status}
                  </span>
                </div>
                <p className="text-xl text-zinc-400">{client.tagline}</p>
              </div>
            </div>

            <p className="text-lg text-zinc-300 leading-relaxed mb-8">{client.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-zinc-950/50 rounded-xl border border-zinc-800">
                <Shield className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-xs text-zinc-500">Status</p>
                  <p className="font-semibold text-white">{client.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-950/50 rounded-xl border border-zinc-800">
                <Zap className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-xs text-zinc-500">Version</p>
                  <p className="font-semibold text-white">{client.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-950/50 rounded-xl border border-zinc-800">
                <Settings className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-xs text-zinc-500">Type</p>
                  <p className="font-semibold text-white">Minecraft Client</p>
                </div>
              </div>
            </div>

            {client.fileData ? (
              <button
                onClick={handleDownload}
                className="group flex items-center justify-center gap-2 w-full py-4 bg-yellow-400 text-black rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-[1.02] glow-yellow"
              >
                <Download className="w-6 h-6" />
                Download {client.fileName || client.name}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-800 text-zinc-500 rounded-xl font-bold text-lg border border-zinc-700">
                <Download className="w-6 h-6" />
                Download Coming Soon
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
