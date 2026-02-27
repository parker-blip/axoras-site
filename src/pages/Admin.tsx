import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Upload, Trash2, Plus, Download, Eye, EyeOff } from 'lucide-react'

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

export default function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [newClient, setNewClient] = useState({
    name: '',
    tagline: '',
    description: '',
    version: '',
    status: 'Available',
    fileUrl: ''
  })

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  const handleLogin = () => {
    if (password === atob('UEBya2VyRDN2aXNzZXIyMDEx')) {
      setIsAuthenticated(true)
    } else {
      alert('Wrong password')
    }
  }

  const saveClients = (updatedClients: Client[]) => {
    setClients(updatedClients)
    localStorage.setItem('axora_clients', JSON.stringify(updatedClients))
  }

  const addClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      tagline: newClient.tagline,
      description: newClient.description,
      version: newClient.version,
      status: newClient.status,
      statusColor: newClient.status === 'Available' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600',
      iconColor: 'from-indigo-500 to-violet-500',
      fileUrl: newClient.fileUrl || undefined
    }
    saveClients([...clients, client])
    setNewClient({ name: '', tagline: '', description: '', version: '', status: 'Available', fileUrl: '' })
  }

  const deleteClient = (id: string) => {
    saveClients(clients.filter(c => c.id !== id))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md">
          <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mb-6 mx-auto">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Unlock
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button onClick={() => navigate('/')} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Back to Site
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add New Client
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client Name"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700"
            />
            <input
              type="text"
              placeholder="Version (e.g., v1.0.0)"
              value={newClient.version}
              onChange={(e) => setNewClient({...newClient, version: e.target.value})}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700"
            />
            <input
              type="text"
              placeholder="Tagline"
              value={newClient.tagline}
              onChange={(e) => setNewClient({...newClient, tagline: e.target.value})}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 md:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={newClient.description}
              onChange={(e) => setNewClient({...newClient, description: e.target.value})}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 md:col-span-2 h-24 resize-none"
            />
            <input
              type="text"
              placeholder="Download URL (optional)"
              value={newClient.fileUrl}
              onChange={(e) => setNewClient({...newClient, fileUrl: e.target.value})}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 md:col-span-2"
            />
          </div>
          <button
            onClick={addClient}
            className="mt-4 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Upload className="w-5 h-5" /> Add Client
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold">Manage Clients</h2>
          </div>
          {clients.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No clients added yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {clients.map((client) => (
                <div key={client.id} className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{client.name}</h3>
                    <p className="text-sm text-slate-500">{client.tagline}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-slate-400">{client.version}</span>
                      {client.fileUrl && (
                        <a href={client.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline">
                          <Download className="w-4 h-4" /> Has Download
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
