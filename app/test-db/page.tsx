'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestDBPage() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Test 1: Check users table
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(1)

      if (usersError) throw usersError

      // Test 2: Check reservations table
      const { data: reservations, error: resError } = await supabase
        .from('reservations')
        .select('*')
        .limit(1)

      if (resError) throw resError

      setResult({
        users: users || [],
        reservations: reservations || [],
        message: '✅ Database is working!'
      })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif text-[#2D1B2E] mb-4">Database Test</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          ❌ Error: {error}
        </div>
      )}
      
      {result && (
        <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-lg">
          {result.message}
          <div className="mt-4 text-sm text-[#4A4A4A]">
            <p>📊 Users found: {result.users.length}</p>
            <p>📊 Reservations found: {result.reservations.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}