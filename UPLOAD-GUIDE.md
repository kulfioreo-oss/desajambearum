# 📸 Sistem Upload Gambar - Panduan Lengkap

## 🎯 Overview

Sistem upload gambar terintegrasi untuk manajemen UMKM dengan fitur drag & drop, preview real-time, validasi file, dan manajemen gambar yang aman.

## ✨ Fitur Upload Gambar

### 🔧 **Core Features:**
- ✅ **Drag & Drop Upload** - Interface yang user-friendly
- ✅ **Click to Upload** - Alternative upload method
- ✅ **Real-time Preview** - Immediate image preview
- ✅ **File Validation** - Type, size, dan format validation
- ✅ **Progress Feedback** - Loading states dan progress indicators
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Image Management** - Delete dan replace functionality
- ✅ **Security Protection** - Admin-only upload access

### 📊 **Technical Specs:**
```typescript
MAX_FILE_SIZE: 5MB
ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
UPLOAD_DIRECTORY: '/public/uploads'
NAMING_CONVENTION: UUID + original extension
```

## 🎨 **UI Components**

### **ImageUpload Component**
```typescript
interface ImageUploadProps {
  currentImage?: string          // Existing image URL
  onImageChange: (url) => void  // Callback for image changes  
  className?: string            // Additional CSS classes
  disabled?: boolean           // Disable upload functionality
}
```

### **Visual States:**
- **Empty State:** Upload prompt dengan icon dan instructions
- **Drag Over:** Highlighted border saat drag over
- **Uploading:** Loading spinner dengan progress message
- **Preview:** Gambar dengan delete button
- **Error:** Error message dengan retry option

## 🛠️ **API Endpoints**

### **Upload Endpoint**
```typescript
POST /api/upload
Content-Type: multipart/form-data

Body: FormData with 'file' field

Response: {
  success: boolean
  message: string
  data: {
    filename: string
    originalName: string
    size: number
    type: string
    url: string        // /uploads/[uuid].[ext]
  }
}
```

### **Delete Endpoint**
```typescript
DELETE /api/upload?filename=[filename]

Response: {
  success: boolean
  message: string
}
```

## 🔒 **Security & Validation**

### **Authentication:**
- ✅ Admin JWT token required
- ✅ Role-based access control
- ✅ Session validation on every request

### **File Validation:**
```typescript
// Size validation
if (file.size > 5 * 1024 * 1024) {
  return 'File terlalu besar. Maksimal 5MB.'
}

// Type validation
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
if (!allowedTypes.includes(file.type)) {
  return 'Tipe file tidak didukung.'
}
```

### **Storage Security:**
- ✅ UUID filename generation (prevents conflicts)
- ✅ File extension validation
- ✅ Directory traversal protection
- ✅ Gitignore untuk uploaded files

## 📁 **File Structure**

```
jambearum/
├── public/
│   └── uploads/
│       ├── .gitignore          # Ignore uploaded files
│       ├── .gitkeep            # Keep directory in git
│       └── [uuid].[ext]        # Uploaded images
├── src/
│   ├── app/
│   │   └── api/
│   │       └── upload/
│   │           └── route.ts    # Upload/Delete API
│   └── components/
│       └── ImageUpload.tsx     # Upload component
└── next.config.ts              # Image domain config
```

## 🎯 **Integration dalam Forms**

### **Create UMKM Form:**
```typescript
<ImageUpload
  currentImage={formData.image || undefined}
  onImageChange={(imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl || '' }))
  }}
  disabled={loading}
/>
```

### **Edit UMKM Form:**
```typescript
<ImageUpload
  currentImage={umkm.image || undefined}  // Pre-load existing image
  onImageChange={(imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl || '' }))
  }}
  disabled={loading}
/>
```

## 🖼️ **Image Display Integration**

### **UMKM Showcase:**
```typescript
{umkm.image ? (
  <Image
    src={umkm.image}
    alt={umkm.name}
    width={400}
    height={300}
    className="w-full h-full object-cover"
  />
) : (
  <div className="text-4xl">{getCategoryIcon(umkm.category)}</div>
)}
```

### **Detail Page:**
```typescript
<div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border">
  {umkm.image ? (
    <Image
      src={umkm.image}
      alt={umkm.name}
      width={500}
      height={500}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(umkm.category)} flex items-center justify-center`}>
      <div className="text-center text-white">
        <div className="text-8xl mb-4">{getCategoryIcon(umkm.category)}</div>
        <div className="text-2xl font-bold">{umkm.category}</div>
      </div>
    </div>
  )}
</div>
```

## ⚡ **User Experience Flow**

### **Upload Process:**
1. **Select Image** - Click atau drag & drop
2. **Validate File** - Type, size, format check
3. **Show Preview** - Immediate local preview
4. **Upload to Server** - Background upload dengan progress
5. **Update UI** - Replace preview dengan server URL
6. **Form Integration** - Auto-update form data

### **Error Handling:**
- **File too large** - Clear message dengan size limit
- **Invalid type** - List of supported formats
- **Upload failed** - Retry option dengan error details
- **Network error** - Fallback to previous state

### **Success States:**
- **Upload Success** - Immediate preview update
- **Form Submission** - Image URL included in form data
- **Database Storage** - Image URL saved to UMKM record

## 🎨 **UI/UX Design**

### **Visual Elements:**
- **Drag Area** - Dashed border dengan hover effects
- **Upload Icon** - 📸 Camera icon untuk visual appeal
- **Progress Indicator** - Spinning loader saat upload
- **Preview Image** - Rounded corners dengan shadow
- **Delete Button** - Red X button pada corner
- **Error Messages** - Red background dengan warning icon

### **Responsive Design:**
- **Desktop** - Full drag & drop area
- **Tablet** - Optimized touch interactions  
- **Mobile** - Simplified upload interface
- **All Devices** - Consistent preview quality

## 🔧 **Configuration**

### **Next.js Image Config:**
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
    {
      protocol: 'http', 
      hostname: 'localhost',
    },
  ],
}
```

### **Upload Directory Setup:**
```bash
# Create uploads directory
mkdir -p public/uploads

# Set permissions (if needed)
chmod 755 public/uploads

# Create gitignore
echo "*\n!.gitignore\n!.gitkeep" > public/uploads/.gitignore
```

## 📊 **Performance Optimization**

### **File Handling:**
- ✅ **Streaming Upload** - Efficient memory usage
- ✅ **Client-side Preview** - Immediate feedback
- ✅ **Unique Naming** - Prevent caching issues
- ✅ **Progressive Enhancement** - Fallback untuk older browsers

### **Image Optimization:**
- ✅ **Next.js Image Component** - Automatic optimization
- ✅ **Responsive Images** - Different sizes untuk different screens  
- ✅ **Lazy Loading** - Load images only when needed
- ✅ **WebP Support** - Modern format support

## 🚀 **Deployment Considerations**

### **Production Setup:**
- 📁 **Static Files** - Ensure uploads directory exists
- 🔒 **File Permissions** - Proper read/write permissions
- 🌐 **CDN Integration** - Optional untuk large scale
- 📈 **Monitoring** - Track upload success rates

### **Backup Strategy:**
- 💾 **Regular Backups** - Include uploads directory
- ☁️ **Cloud Storage** - Consider S3/GCS untuk production
- 🔄 **Sync Strategy** - Keep backups in sync
- 📋 **Recovery Plan** - Document recovery procedures

## 🧪 **Testing**

### **Manual Testing:**
```bash
# Test upload functionality
1. Access /admin/umkm/create
2. Try uploading different file types
3. Test file size limits
4. Verify drag & drop functionality
5. Check preview and delete features
```

### **API Testing:**
```bash
# Test upload API
curl -X POST \
  -H "Cookie: admin-token=[jwt-token]" \
  -F "file=@test-image.jpg" \
  http://localhost:3001/api/upload

# Test delete API  
curl -X DELETE \
  -H "Cookie: admin-token=[jwt-token]" \
  "http://localhost:3001/api/upload?filename=test.jpg"
```

## 🎉 **Benefits**

### **For Admins:**
- 🎯 **Easy Upload** - Drag & drop simplicity
- 👁️ **Visual Preview** - See images before saving
- ⚡ **Quick Management** - Easy delete and replace
- 🛡️ **Secure Process** - Protected upload endpoints

### **For Users:**
- 📸 **Rich Content** - Visual UMKM profiles
- 🎨 **Better UX** - Images enhance browsing experience
- 📱 **Mobile Optimized** - Works great on all devices
- ⚡ **Fast Loading** - Optimized image delivery

### **For Business:**
- 📈 **Better Engagement** - Visual content performs better
- 🎯 **Professional Look** - Enhanced website appearance  
- 📊 **SEO Benefits** - Images improve search rankings
- 💼 **Brand Value** - Professional UMKM presentation

---

<div align="center">
<p><strong>🎨 Sistem Upload Gambar Siap Digunakan! 📸</strong></p>
<p><em>"Upload gambar dengan mudah, kelola dengan professional"</em></p>
<p>💡 <strong>Ready for Production - Secure & User-Friendly</strong> 💡</p>
</div> 