'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { RefreshCw, Shield, User, UserCog } from 'lucide-react'

interface UserType {
  id: string
  email: string
  name: string
  role: string
  created_at: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleRefresh = () => {
    console.log('🔄 Refreshing users...')
    loadUsers()
  }

  const updateRole = async (id: string, role: string) => {
    setUpdating(id)
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', id)

      if (error) throw error
      setSuccess('Rôle mis à jour!')
      await loadUsers()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUpdating(null)
    }
  }

  const getBadge = (role: string) => {
    const colors: any = {
      ADMIN: 'bg-purple-100 text-purple-800',
      STAFF: 'bg-blue-100 text-blue-800',
      USER: 'bg-gray-100 text-gray-800',
    }
    return colors[role] || 'bg-gray-100'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#7B2D6E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-serif text-[#2D1B2E]">Utilisateurs</h1>
          <p className="text-[#4A4A4A]">{users.length} utilisateurs</p>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-[#7B2D6E] text-white px-4 py-2 rounded-lg hover:bg-[#5C1F52] transition flex items-center gap-2"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Rafraîchir
        </button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg mb-4">
          ✅ {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4">
          ❌ {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Utilisateur</th>
              <th className="p-4 text-left text-sm font-medium">Email</th>
              <th className="p-4 text-left text-sm font-medium">Rôle</th>
              <th className="p-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Aucun utilisateur
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#7B2D6E]/10 flex items-center justify-center">
                        <User size={20} className="text-[#7B2D6E]" />
                      </div>
                      <span className="font-medium">{user.name || 'Sans nom'}</span>
                    </div>
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadge(user.role)}`}>
                      {user.role || 'USER'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {user.role !== 'ADMIN' && (
                        <button
                          onClick={() => updateRole(user.id, 'ADMIN')}
                          disabled={updating === user.id}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                        >
                          <Shield size={18} />
                        </button>
                      )}
                      {user.role === 'ADMIN' && (
                        <button
                          onClick={() => updateRole(user.id, 'USER')}
                          disabled={updating === user.id}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <UserCog size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}