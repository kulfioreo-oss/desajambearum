# 🧪 Testing Instructions

## ✅ Testing the Admin Authentication System

### 1. Setup & Start Server

```bash
# Make sure .env file exists with DATABASE_URL
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

### 2. Test Website Access (Public)

✅ **Homepage:** `http://localhost:3000`
- Should display beautiful village website
- Navbar should NOT show "Admin" link
- All sections should work (Sejarah, UMKM, etc.)

### 3. Test Admin Login (Hidden)

✅ **Direct Admin Access:** `http://localhost:3000/admin/login`

**Login with:**
- Username: `admin`
- Password: `jambearum2024!`

**Expected Results:**
- Beautiful login page with village theme
- Successful login redirects to dashboard
- Failed login shows error message

### 4. Test Dashboard Access (Protected)

✅ **Admin Dashboard:** `http://localhost:3000/admin/dashboard`

**Without Login:**
- Should redirect to `/admin/login`

**With Login:**
- Shows dashboard with stats cards
- Shows quick action buttons
- Has logout button in header

### 5. Test API Endpoints

✅ **Authentication Check:**
```bash
curl http://localhost:3000/api/admin/me
```

✅ **UMKM Data (Requires Auth):**
```bash
curl http://localhost:3000/api/admin/umkm
```

✅ **Real-time Stats (Requires Auth):**
```bash
curl http://localhost:3000/api/admin/stats
```

✅ **Logout:**
```bash
curl -X POST http://localhost:3000/api/admin/logout
```

### 6. Test Route Protection

✅ **Protected Routes (Should Redirect to Login):**
- `http://localhost:3000/admin`
- `http://localhost:3000/admin/dashboard`
- `http://localhost:3000/admin/umkm`
- `http://localhost:3000/admin/users`

✅ **Public Routes (Should Work):**
- `http://localhost:3000/`
- `http://localhost:3000/admin/login`

### 7. Test Database Authentication

✅ **Database Seeding:**
```bash
# Run seeder to create default admin
npm run db:seed
```

✅ **Check Database:**
```bash
# Open Prisma Studio to view database
npm run db:studio
```

✅ **Verify Admin Creation:**
- Admin table should have 1 record
- Username: `admin`
- Password should be hashed (bcrypt)
- Email: `admin@jambearum.desa.id`

### 8. Test Session Management

✅ **Logout Test:**
1. Login to admin
2. Click logout button
3. Should redirect to login page
4. Try accessing dashboard directly
5. Should redirect back to login

✅ **Token Expiry:**
- Login session expires after 24 hours
- Auto-redirect to login when expired

## 🐛 Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution:**
```bash
# Check if .env file exists and contains correct DATABASE_URL
cat .env

# Regenerate Prisma client
npm run db:generate
```

### Issue: "Property 'uMKM' does not exist" or "Property 'admin' does not exist"
**Solution:**
```bash
# Regenerate Prisma client after schema changes
npm run db:generate
npm run db:push
```

### Issue: "Admin not found" or login always fails
**Solution:**
```bash
# Run seeder to create default admin
npm run db:seed

# Or check if admin exists in database
npm run db:studio
```

### Issue: Admin login not working
**Solution:**
- Check credentials: `admin` / `jambearum2024!`
- Clear browser cookies
- Check browser console for errors

### Issue: Middleware not protecting routes
**Solution:**
- Restart development server
- Check middleware.ts configuration
- Verify JWT secret in auth.ts

## 📝 Test Checklist

### Basic Functionality
- [ ] Website loads without admin link in navbar
- [ ] Admin login page accessible via direct URL
- [ ] Login with correct credentials works
- [ ] Login with wrong credentials shows error
- [ ] Dashboard shows after successful login
- [ ] Dashboard redirects to login when not authenticated
- [ ] Logout button works and clears session
- [ ] Protected routes redirect to login
- [ ] API endpoints require authentication
- [ ] Middleware protects all /admin/* routes

### Database Integration
- [ ] Database seeder creates default admin successfully
- [ ] Admin credentials stored with hashed password
- [ ] Login validates against database (not hardcoded)
- [ ] Last login time updates on successful login
- [ ] Dashboard shows real statistics from database
- [ ] UMKM sample data created by seeder
- [ ] Prisma Studio shows correct data structure

## 🔍 Debug Commands

```bash
# Check if admin token exists in cookies
# Open browser DevTools > Application > Cookies > localhost:3000
# Look for 'admin-token' cookie

# Test API directly
curl -H "Cookie: admin-token=YOUR_TOKEN_HERE" http://localhost:3000/api/admin/me

# Check Prisma connection
curl http://localhost:3000/api/health
```

## ✨ Success Indicators

1. ✅ User can't see admin access from website
2. ✅ Admin can only access via direct URL
3. ✅ Authentication is required for all admin features
4. ✅ Sessions are secure and expire properly
5. ✅ All routes are properly protected
6. ✅ Beautiful UI matches village theme

---

<div align="center">
<p><strong>🧪 All tests passing = Admin system ready! 🎉</strong></p>
</div> 