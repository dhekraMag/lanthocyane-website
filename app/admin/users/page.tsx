'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, Shield, User, UserCog, Trash2, Edit, Check, X, Plus } from 'lucide-react'

type User = {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
  updatedAt: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${name}" ?`)) return
    
    try {
      const response = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        setMessage({ type: 'success', text: `✅ Utilisateur "${name}" supprimé` })
        fetchUsers()
      } else {
        setMessage({ type: 'error', text: '❌ Erreur lors de la suppression' })
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      setMessage({ type: 'error', text: '❌ Erreur lors de la suppression' })
    }
  }

  const startEditing = (user: User) => {
    setEditingId(user.id)
    setSelectedRole(user.role)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setSelectedRole('')
  }

  const updateRole = async (id: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: selectedRole }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: '✅ Rôle mis à jour avec succès' })
        fetchUsers()
        cancelEditing()
      } else {
        setMessage({ type: 'error', text: '❌ Erreur lors de la mise à jour du rôle' })
      }
    } catch (error) {
      console.error('Error updating role:', error)
      setMessage({ type: 'error', text: '❌ Erreur lors de la mise à jour du rôle' })
    }
  }

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: `✅ Utilisateur "${formData.name}" créé avec succès` })
        setShowModal(false)
        setFormData({ name: '', email: '', password: '', role: 'USER' })
        fetchUsers()
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: `❌ ${error.error || 'Erreur lors de la création'}` })
      }
    } catch (error) {
      console.error('Error creating user:', error)
      setMessage({ type: 'error', text: '❌ Erreur lors de la création' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleBadge = (role: string) => {
    const badges: Record<string, string> = {
      ADMIN: 'bg-[#7B2D6E] text-white',
      STAFF: 'bg-blue-100 text-blue-800',
      USER: 'bg-gray-100 text-gray-800',
    }
    return badges[role] || 'bg-gray-100 text-gray-800'
  }

  const getRoleIcon = (role: string) => {
    if (role === 'ADMIN') return <Shield size={14} className="inline mr-1" />
    if (role === 'STAFF') return <UserCog size={14} className="inline mr-1" />
    return <User size={14} className="inline mr-1" />
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw size={32} className="animate-spin text-[#7B2D6E]" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-playfair text-2xl text-[#2C2C2C]">Utilisateurs</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#7B2D6E] text-white rounded-lg hover:bg-[#6B255E] transition-colors"
          >
            <Plus size={18} />
            Ajouter
          </button>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#2C2C2C] rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-[#E8DDD0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5EDE6]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Rôle</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Inscrit le</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-[#5C5C5C]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDD0]">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#5C5C5C]">
                    Aucun utilisateur
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FDF8F0] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#2C2C2C]">{user.name}</td>
                    <td className="px-6 py-4 text-[#5C5C5C]">{user.email}</td>
                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="px-3 py-1 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent text-sm"
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="STAFF">STAFF</option>
                          <option value="USER">USER</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#5C5C5C]">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.role === 'ADMIN' ? (
                        <span className="text-xs text-[#5C5C5C] bg-gray-100 px-3 py-1 rounded-full">
                          🔒 Protégé
                        </span>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          {editingId === user.id ? (
                            <>
                              <button
                                onClick={() => updateRole(user.id)}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Confirmer"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Annuler"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditing(user)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                title="Changer le rôle"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => deleteUser(user.id, user.name)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title={`Supprimer ${user.name}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#E8DDD0]">
              <h2 className="font-playfair text-xl text-[#2C2C2C]">Ajouter un utilisateur</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#F5EDE6] rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={createUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Nom *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  placeholder="Nom complet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  placeholder="email@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Mot de passe *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  placeholder="Min 6 caractères"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                >
                  <option value="USER">USER</option>
                  <option value="STAFF">STAFF</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#E8DDD0]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-[#E8DDD0] rounded-lg hover:bg-[#F5EDE6] transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-[#7B2D6E] text-white rounded-lg hover:bg-[#6B255E] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}