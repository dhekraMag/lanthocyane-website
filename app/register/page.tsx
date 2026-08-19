'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setIsLoading(false)
      return
    }

    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      setError('Veuillez entrer une adresse email valide')
      setIsLoading(false)
      return
    }

    try {
      // Step 1: Register user with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      })

      if (signUpError) {
        // Check for specific errors
        if (signUpError.message.includes('User already registered')) {
          setError('Cet email est déjà utilisé. Veuillez vous connecter.')
          setIsLoading(false)
          return
        }
        if (signUpError.message.includes('Email address is invalid')) {
          setError('Adresse email invalide. Veuillez vérifier votre email.')
          setIsLoading(false)
          return
        }
        if (signUpError.message.includes('Password should be at least 6 characters')) {
          setError('Le mot de passe doit contenir au moins 6 caractères.')
          setIsLoading(false)
          return
        }
        if (signUpError.message.includes('rate limit')) {
          setError('Trop de tentatives. Veuillez attendre quelques minutes.')
          setIsLoading(false)
          return
        }
        throw signUpError
      }

      // Step 2: Create user profile in users table
      if (authData.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: email,
              name: name,
              role: 'USER',
            }
          ])

        if (insertError) {
          console.warn('Profile creation warning:', insertError)
          // Don't throw - user is already created in auth
        }
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login?registered=true')
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF8F0] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-[#C9A96E]/10">
        <div>
          <h2 className="text-center text-3xl font-serif text-[#2D1B2E]">
            Inscription
          </h2>
          <p className="mt-2 text-center text-sm text-[#4A4A4A]">
            Créez votre compte
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              ✅ Inscription réussie ! Redirection vers la page de connexion...
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
              Nom complet *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] size-5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                placeholder="Jean Dupont"
                disabled={isLoading || success}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] size-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                placeholder="email@exemple.com"
                disabled={isLoading || success}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
              Mot de passe *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] size-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                placeholder="••••••••"
                disabled={isLoading || success}
                minLength={6}
              />
            </div>
            <p className="text-xs text-[#4A4A4A]/60 mt-1">Minimum 6 caractères</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
              Confirmer le mot de passe *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] size-5" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                placeholder="••••••••"
                disabled={isLoading || success}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className={`w-full bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
              (isLoading || success) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Inscription en cours...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                S&apos;inscrire
              </>
            )}
          </button>

          <p className="text-center text-sm text-[#4A4A4A]">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-[#7B2D6E] hover:text-[#5C1F52] font-medium">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}