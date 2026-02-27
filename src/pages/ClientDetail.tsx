import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Shield, Zap, Settings, Menu, X } from 'lucide-react'

interface Client {
  id: string
  name: string
  tagline: string
  description: string
  version: string
  status: string
  statusColor: string
  iconColor: string
  fileUrl?: string
}

export default function ClientDetail() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      const clients = JSON.parse(savedClients)
      const found = clients.find((c: Client) => c.id === clientId)
      setClient(found || null)
    }
  }, [clientId])

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Client Not Found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent cursor-pointer">
              AXORA
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium hover:text-indigo-600 transition-colors">Home</a>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-indigo-600 transition-colors">Discord</a>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="/" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Home</a>
              <a href="https://discord.gg/axoras" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium">Discord</a>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Clients
          </button>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${client.iconColor} flex items-center justify-center`}>
                <Download className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{client.name}</h1>
                  <span className={`px-3 py-1 text-sm rounded-full ${client.statusColor}`}>
                    {client.status}
                  </span>
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-300">{client.tagline}</p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-lg leading-relaxed">{client.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Shield className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-semibold">{client.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Zap className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Version</p>
                  <p className="font-semibold">{client.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Settings className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Type</p>
                  <p className="font-semibold">Minecraft Client</p>
                </div>
              </div>
            </div>

            {client.fileUrl ? (
              <a
                href={client.fileUrl}
                download
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-[1.02]"
              >
                <Download className="w-6 h-6" />
                Download {client.name}
              </a>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full py-4 bg-slate-200 dark:bg-slate-700 text-slate-500 rounded-xl font-bold text-lg cursor-not-allowed">
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
