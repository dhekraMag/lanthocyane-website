import { NextResponse } from 'next/server'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'UNDEFINED'
  const directUrl = process.env.DIRECT_URL || 'UNDEFINED'
  const mask = (url: string) => url.replace(/:([^:@]+)@/, ':***@')
  
  return NextResponse.json({
    hasDbUrl: !!process.env.DATABASE_URL,
    dbUrlMasked: mask(dbUrl),
    hasDirectUrl: !!process.env.DIRECT_URL,
    directUrlMasked: mask(directUrl),
    nodeEnv: process.env.NODE_ENV,
  })
}
