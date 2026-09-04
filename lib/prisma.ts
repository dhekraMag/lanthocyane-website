import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

//  (for build time)
const adapter = process.env.DATABASE_URL 
  ? new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    })
  : undefined

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ 
  adapter,
  // Skip validation during build
  ...(process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL ? {
    log: ['warn', 'error'],
  } : {}),
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma