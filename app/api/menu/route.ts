import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { category: 'asc' },
    })
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newItem = await prisma.menuItem.create({
      data: {
        name: body.name,
        description: body.description || null,
        price: body.price,
        category: body.category,
        dietary: body.dietary || null,
        isAvailable: body.isAvailable ?? true,
        isPopular: body.isPopular ?? false,
        image: body.image || null,
      },
    })
    return NextResponse.json(newItem)
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        category: data.category,
        dietary: data.dietary || null,
        isAvailable: data.isAvailable,
        isPopular: data.isPopular,
        image: data.image || null,
      },
    })
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    await prisma.menuItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}