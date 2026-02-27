import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Upload, Trash2, Plus, Download, Eye, EyeOff, Sparkles, FileUp, X } from 'lucide-react'

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
  fileSize?: number
}

export default function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [newClient, setNewClient] = useState({
    name: '',
    tagline: '',
    description: '',
    version: '',
    status: 'Available',
  })

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  const handleLogin = () => {
    const correctPassword = atob('UEBya2VyRDN2aXNzZXIyMDEx')
    if (password === correctPassword) {
      setIsAuthenticated(true)
    } else {
      alert('Wrong password')
      setPassword('')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large! Max 5MB. Use Google Drive/MediaFire for larger files.')
        return
      }
      setSelectedFile(file)
    }
  }

  const saveClients = (updatedClients: Client[]) => {
    setClients(updatedClients)
    localStorage.setItem('axora_clients', JSON.stringify(updatedClients))
  }

  const addClient = async () => {
    if (!newClient.name || !newClient.tagline) {
      alert('Please fill in name and tagline')
      return
    }

    let fileData = ''
    let fileName = ''
    let fileSize = 0

    if (selectedFile) {
      fileData = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(selectedFile)
      })
      fileName = selectedFile.name
      fileSize = selectedFile.size
    }

    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      tagline: newClient.tagline,
      description: newClient.description,
      version: newClient.version || 'v1.0.0',
      status: newClient.status,
      statusColor: newClient.status === 'Available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      iconColor: 'from-indigo-500 to-purple-500',
      fileData,
      fileName,
      fileSize
    }

    saveClients([...clients, client])
    setNewClient({ name: '', tagline: '', description: '', version: '', status: 'Available' })
    setSelectedFile(null)
  }

  const deleteClient = (id: string) => {
    if (confirm('Delete this client?')) {
      saveClients(clients.filter(c => c.id !== id))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl mb-6 mx-auto shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2 text-white">Admin Access</h1>
          <p className="text-slate-400 text-center mb-6 text-sm">Enter password to manage clients</p>
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            Unlock
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 text-2xl font-bold cursor-pointer">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AXORA</span>
            </div>
            <span className="text-slate-600">/</span>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          </div>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm">
            Back to Site
          </button>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" /> Add New Client
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client Name *"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Version (e.g., v1.0.0)"
              value={newClient.version}
              onChange={(e) => setNewClient({...newClient, version: e.target.value})}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Tagline *"
              value={newClient.tagline}
              onChange={(e) => setNewClient({...newClient, tagline: e.target.value})}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none md:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={newClient.description}
              onChange={(e) => setNewClient({...newClient, description: e.target.value})}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none md:col-span-2 h-24 resize-none"
            />
            
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-400 mb-2">Client File (Max 5MB)</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".jar,.zip,.rar"
                    className="hidden"
                  />
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-colors">
                    <FileUp className="w-5 h-5 text-indigo-400" />
                    <span className="text-slate-300 truncate">
                      {selectedFile ? selectedFile.name : 'Click to upload file (.jar, .zip)'}
                    </span>
                  </div>
                </label>
                {selectedFile && (
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {selectedFile && (
                <p className="text-xs text-slate-500 mt-1">
                  Size: {formatFileSize(selectedFile.size)}
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={addClient}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            <Upload className="w-5 h-5" /> Add Client
          </button>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Manage Clients ({clients.length})</h2>
          </div>
          
          {clients.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No clients added yet.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {clients.map((client) => (
                <div key={client.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg text-white">{client.name}</h3>
                    <p className="text-sm text-slate-400">{client.tagline}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-slate-500">{client.version}</span>
                      {client.fileName && (
                        <span className="flex items-center gap-1 text-green-400">
                          <Download className="w-3 h-3" /> {client.fileName} ({formatFileSize(client.fileSize || 0)})
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
