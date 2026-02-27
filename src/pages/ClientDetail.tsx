import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Shield, Zap, Settings, Sparkles } from 'lucide-react'

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

export default function ClientDetail() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      const clients = JSON.parse(savedClients)
      const found = clients.find((c: Client) => c.id === clientId)
      setClient(found || null)
    }
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Client Not Found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    )
  }

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
              <button onClick={() => navigate('/')} className="text-sm font-medium text-slate-300 hover:text-white">Home</button>
              <button onClick={() => navigate('/features')} className="text-sm font-medium text-slate-300 hover:text-white">Features</button>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 hover:text-white">Discord</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Clients
          </button>

          <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${client.iconColor} flex items-center justify-center shadow-2xl`}>
                <Download className="w-12 h-12 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{client.name}</h1>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${client.statusColor}`}>
                    {client.status}
                  </span>
                </div>
                <p className="text-xl text-slate-400">{client.tagline}</p>
              </div>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">{client.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Shield className="w-6 h-6 text-indigo-400" />
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="font-semibold text-white">{client.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Zap className="w-6 h-6 text-indigo-400" />
                <div>
                  <p className="text-xs text-slate-500">Version</p>
                  <p className="font-semibold text-white">{client.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Settings className="w-6 h-6 text-indigo-400" />
                <div>
                  <p className="text-xs text-slate-500">Type</p>
                  <p className="font-semibold text-white">Minecraft Client</p>
                </div>
              </div>
            </div>

            {client.fileData ? (
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all hover:scale-[1.02]"
              >
                <Download className="w-6 h-6" />
                Download {client.fileName || client.name}
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 text-slate-500 rounded-xl font-bold text-lg border border-white/10">
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
