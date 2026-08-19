'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, LogIn } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Login
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw new Error('Email ou mot de passe incorrect')
      }

      // ✅ SIMPLE EMAIL CHECK - NO DATABASE QUERY
      const adminEmails = ['admin@lanthocyane.com', 'dheka@gmail.com']

      if (adminEmails.includes(email)) {
        console.log('✅ Admin login - redirecting to /admin/dashboard')
        router.push('/admin/dashboard')
      } else {
        console.log('✅ User login - redirecting to /')
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || 'Email ou mot de passe incorrect')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF8F0] to-white py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-[#C9A96E]/10">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-[#2D1B2E]">Connexion</h2>
          <p className="mt-2 text-sm text-[#4A4A4A]">Accédez à votre espace personnel</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] size-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                placeholder="email@exemple.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] size-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Se connecter
              </>
            )}
          </button>

          <p className="text-center text-sm text-[#4A4A4A]">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-[#7B2D6E] hover:text-[#5C1F52] font-medium">
              S&apos;inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}