'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Eye, EyeOff, Edit, X, RefreshCw } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  is_available: boolean
  is_popular: boolean
}

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'ENTREE',
    is_available: true,
    is_popular: false,
  })

  // ✅ Load menu items
  const loadMenu = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category')

      if (error) throw error
      setItems(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMenu()
  }, [])

  // ✅ Refresh function
  const handleRefresh = () => {
    console.log('🔄 Refreshing menu...')
    loadMenu()
  }

  // ✅ Add button
  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'ENTREE',
      is_available: true,
      is_popular: false,
    })
    setShowModal(true)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category,
      is_available: item.is_available,
      is_popular: item.is_popular,
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const data = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        is_available: formData.is_available,
        is_popular: formData.is_popular,
      }

      let error
      if (editingItem) {
        const result = await supabase
          .from('menu_items')
          .update(data)
          .eq('id', editingItem.id)
        error = result.error
      } else {
        const result = await supabase
          .from('menu_items')
          .insert([data])
        error = result.error
      }

      if (error) throw error

      setSuccess(editingItem ? 'Plat modifié!' : 'Plat ajouté!')
      await loadMenu()
      setShowModal(false)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const toggleAvailability = async (id: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !isAvailable })
        .eq('id', id)

      if (error) throw error
      await loadMenu()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce plat ?')) return
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadMenu()
    } catch (err: any) {
      setError(err.message)
    }
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
          <h1 className="text-3xl font-serif text-[#2D1B2E]">Menu</h1>
          <p className="text-[#4A4A4A]">{items.length} plats</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="bg-[#7B2D6E] text-white px-4 py-2 rounded-lg hover:bg-[#5C1F52] transition flex items-center gap-2"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="bg-[#7B2D6E] text-white px-4 py-2 rounded-lg hover:bg-[#5C1F52] transition flex items-center gap-2"
          >
            <Plus size={18} />
            Ajouter
          </button>
        </div>
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Nom</th>
              <th className="p-4 text-left text-sm font-medium">Prix</th>
              <th className="p-4 text-left text-sm font-medium">Catégorie</th>
              <th className="p-4 text-left text-sm font-medium">Statut</th>
              <th className="p-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Aucun plat
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4">{item.price}€</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.is_available ? 'Disponible' : 'Indisponible'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => toggleAvailability(item.id, item.is_available)}
                        className="p-2 text-[#7B2D6E] hover:bg-[#7B2D6E]/10 rounded-lg"
                      >
                        {item.is_available ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">
                {editingItem ? 'Modifier' : 'Ajouter'} un plat
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prix (€) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
                  >
                    <option value="ENTREE">Entrée</option>
                    <option value="PLAT">Plat</option>
                    <option value="DESSERT">Dessert</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                  />
                  Disponible
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                  />
                  Populaire
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#7B2D6E] text-white px-6 py-2 rounded-full hover:bg-[#5C1F52] transition disabled:opacity-50"
                >
                  {saving ? 'Enregistrement...' : editingItem ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border rounded-full hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}