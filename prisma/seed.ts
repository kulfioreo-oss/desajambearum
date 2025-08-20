import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: 'admin' }
  })

  if (existingAdmin) {
    console.log('✅ Default admin already exists')
    return
  }

  // Hash the default password
  const hashedPassword = await bcrypt.hash('jambearum2024!', 12)

  // Create default admin user
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@jambearum.desa.id',
      name: 'Administrator',
      role: 'admin',
      isActive: true
    }
  })

  console.log('✅ Default admin created:', {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name
  })

  // Create some sample UMKM data
  const sampleUMKM = [
    {
      name: 'Hasil Tani Sumber Kokap',
      description: 'Menyediakan hasil pertanian segar dari lahan subur kaki Gunung Raung',
      category: 'Pertanian',
      owner: 'Pak Suryanto',
      phone: '081234567890',
      address: 'Jl. Raya Sumber Kokap No. 15',
      dusun: 'Sumber Kokap Barat',
      products: ['Padi', 'Jagung', 'Cabai', 'Tomat']
    },
    {
      name: 'Kerajinan Bambu Paceh',
      description: 'Kerajinan anyaman bambu berkualitas tinggi dengan motif tradisional',
      category: 'Kerajinan',
      owner: 'Bu Siti Aminah',
      phone: '082345678901',
      address: 'Dusun Paceh RT 02/03',
      dusun: 'Paceh',
      products: ['Anyaman Bambu', 'Tikar', 'Tas Belanja', 'Tempat Nasi']
    },
    {
      name: 'Madu Hutan Biarum',
      description: 'Madu asli hutan Gunung Raung dengan kualitas premium',
      category: 'Produk Olahan',
      owner: 'Pak Wahyudi',
      phone: '083456789012',
      address: 'Dusun Biarum RT 01/02',
      dusun: 'Biarum',
      products: ['Madu Murni', 'Madu Kelengkeng', 'Propolis', 'Royal Jelly']
    }
  ]

  for (const umkm of sampleUMKM) {
    const existingUMKM = await prisma.uMKM.findFirst({
      where: { name: umkm.name }
    })

    if (!existingUMKM) {
      await prisma.uMKM.create({
        data: umkm
      })
      console.log(`✅ Created UMKM: ${umkm.name}`)
    }
  }

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 