'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Eye, EyeOff, Edit, X, RefreshCw } from 'lucide-react'

type MenuItem = {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  dietary: string | null
  isAvailable: boolean
  isPopular: boolean
  image: string | null
}

type MenuFormData = {
  name: string
  description: string
  price: string
  category: string
  dietary: string
  isAvailable: boolean
  isPopular: boolean
  image: string
}

const initialFormData: MenuFormData = {
  name: '',
  description: '',
  price: '',
  category: 'ENTREE',
  dietary: '',
  isAvailable: true,
  isPopular: false,
  image: '',
}

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<MenuFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const toggleAvailability = async (id: string) => {
    try {
      const item = items.find(i => i.id === id)
      if (!item) return
      
      const response = await fetch('/api/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isAvailable: !item.isAvailable }),
      })
      if (response.ok) {
        fetchItems()
      }
    } catch (error) {
      console.error('Error toggling availability:', error)
    }
  }

  const deleteItem = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      try {
        const response = await fetch(`/api/menu?id=${id}`, { method: 'DELETE' })
        if (response.ok) {
          fetchItems()
        }
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData(initialFormData)
    setShowModal(true)
  }

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category,
      dietary: item.dietary || '',
      isAvailable: item.isAvailable,
      isPopular: item.isPopular,
      image: item.image || '',
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData(initialFormData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      ...formData,
      price: parseFloat(formData.price),
    }

    try {
      const response = await fetch('/api/menu', {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem ? { ...data, id: editingItem.id } : data),
      })

      if (response.ok) {
        fetchItems()
        closeModal()
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-playfair text-2xl text-[#2C2C2C]">Gestion du Menu</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#7B2D6E] text-white rounded-lg hover:bg-[#6B255E] transition-colors"
        >
          <Plus size={18} />
          Ajouter un plat
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw size={32} className="animate-spin text-[#7B2D6E]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E8DDD0]">
          <p className="text-[#5C5C5C]">Aucun élément dans le menu.</p>
          <p className="text-sm text-[#5C5C5C] mt-2">Cliquez sur &quot;Ajouter un plat&quot; pour commencer.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-[#E8DDD0] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-playfair text-lg text-[#2C2C2C]">{item.name}</h3>
                  <p className="text-sm text-[#5C5C5C] mt-1 line-clamp-2">{item.description || 'Pas de description'}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-[#F5EDE6] rounded-full text-[#5C5C5C]">
                      {item.category}
                    </span>
                    {item.isPopular && (
                      <span className="text-xs px-2 py-1 bg-[#C9A96E] text-white rounded-full">
                        ★ Coup de cœur
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-[#7B2D6E] mt-2">{item.price.toFixed(2)} €</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.isAvailable
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                    title={item.isAvailable ? 'Masquer' : 'Afficher'}
                  >
                    {item.isAvailable ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#E8DDD0]">
              <h2 className="font-playfair text-xl text-[#2C2C2C]">
                {editingItem ? 'Modifier le plat' : 'Ajouter un plat'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-[#F5EDE6] rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                  Nom du plat *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  placeholder="Ex: Magret de Canard"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  placeholder="Description du plat..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                    Prix (€) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  >
                    <option value="ENTREE">Entrée</option>
                    <option value="PLAT">Plat</option>
                    <option value="DESSERT">Dessert</option>
                    <option value="BOISSON">Boisson</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                  Régime (optionnel)
                </label>
                <input
                  type="text"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  placeholder="Ex: Végétarien, Sans gluten"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                  URL de l&apos;image (optionnel)
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
                  placeholder="/images/menu/plat.jpg"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-[#7B2D6E] rounded border-[#E8DDD0]"
                  />
                  Disponible
                </label>
                <label className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                  <input
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-[#7B2D6E] rounded border-[#E8DDD0]"
                  />
                  Coup de cœur
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#E8DDD0]">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-[#E8DDD0] rounded-lg hover:bg-[#F5EDE6] transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-[#7B2D6E] text-white rounded-lg hover:bg-[#6B255E] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sauvegarde...' : editingItem ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}