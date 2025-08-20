# 🚀 Setup Instructions

## 📝 Membuat File .env

Karena file `.env` tidak disertakan dalam repository untuk keamanan, Anda perlu membuatnya secara manual:

### 1. Buat file `.env` di root directory

Buat file baru bernama `.env` (tanpa ekstensi) di folder root project (sejajar dengan `package.json`).

### 2. Isi dengan konfigurasi database

Copy dan paste konfigurasi berikut ke dalam file `.env`:

```env
# Database PostgreSQL (Neon)
DATABASE_URL="postgresql://neondb_owner:npg_QSBrJIpa70eD@ep-snowy-truth-a1u7jp2c-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### 3. Save file dan lanjutkan setup

Setelah file `.env` dibuat, lanjutkan dengan command:

```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database
npm run db:push

# Test koneksi database
curl http://localhost:3000/api/health
```

## ✅ Verifikasi Setup

1. ✅ File `.env` sudah dibuat dan berisi `DATABASE_URL`
2. ✅ `npm run db:generate` berhasil
3. ✅ `npm run db:push` berhasil  
4. ✅ `npm run dev` berjalan tanpa error
5. ✅ Website terbuka di http://localhost:3000
6. ✅ API health check `/api/health` mengembalikan success

## 🔧 Troubleshooting

**Error: Environment variable not found**
- Pastikan file `.env` ada di root directory
- Pastikan tidak ada spasi di sekitar `=`
- Restart development server (`npm run dev`)

**Error: Can't reach database server**
- Pastikan string koneksi database benar
- Check koneksi internet
- Coba test dengan `/api/health`

**Error: Prisma Client error**
- Run `npm run db:generate` lagi
- Pastikan schema.prisma tidak ada syntax error 