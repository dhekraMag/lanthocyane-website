import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        table: true,
      },
    })
    return NextResponse.json(reservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newReservation = await prisma.reservation.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        date: new Date(body.date),
        time: body.time,
        guests: body.guests,
        specialRequests: body.specialRequests || null,
        status: 'PENDING',
      },
    })
    return NextResponse.json(newReservation)
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        status: data.status,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        date: data.date ? new Date(data.date) : undefined,
        time: data.time,
        guests: data.guests,
        specialRequests: data.specialRequests || null,
      },
    })
    return NextResponse.json(updatedReservation)
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    await prisma.reservation.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 })
  }
}