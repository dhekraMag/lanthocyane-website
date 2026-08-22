import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()
    return NextResponse.json(settings ? [settings] : [])
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { key, value } = body

    console.log('Saving:', key, '=', value) // Debug log

    // Get existing settings or create default
    let settings = await prisma.settings.findFirst()

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          restaurantName: '',
          address: '',
          phone: '',
          email: '',
          lunchStart: '',
          lunchEnd: '',
          dinnerStart: '',
          dinnerEnd: '',
          maxGuests: 8,
          reservationBuffer: 30,
          closedDays: '',
        },
      })
    }

    // Build update data
    const updateData: Record<string, any> = {}
    
    switch (key) {
      case 'restaurant_name':
        updateData.restaurantName = value
        break
      case 'address':
        updateData.address = value
        break
      case 'phone':
        updateData.phone = value
        break
      case 'email':
        updateData.email = value
        break
      case 'lunch_start':
        updateData.lunchStart = value
        break
      case 'lunch_end':
        updateData.lunchEnd = value
        break
      case 'dinner_start':
        updateData.dinnerStart = value
        break
      case 'dinner_end':
        updateData.dinnerEnd = value
        break
      case 'max_guests':
        updateData.maxGuests = parseInt(value) || 8
        break
      case 'reservation_buffer':
        updateData.reservationBuffer = parseInt(value) || 30
        break
      case 'closed_days':
        updateData.closedDays = value
        break
      default:
        return NextResponse.json({ error: 'Invalid setting key: ' + key }, { status: 400 })
    }

    // Update the settings
    const updatedSettings = await prisma.settings.update({
      where: { id: settings.id },
      data: updateData,
    })

    console.log('Updated settings:', updatedSettings) // Debug log

    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}