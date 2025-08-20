'use client'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string | null) => void
  className?: string
  disabled?: boolean
}

interface UploadedFile {
  filename: string
  originalName: string
  size: number
  type: string
  url: string
}

export default function ImageUpload({ 
  currentImage, 
  onImageChange, 
  className = '',
  disabled = false 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    
    if (file.size > maxSize) {
      return 'File terlalu besar. Maksimal 5MB.'
    }
    
    if (!allowedTypes.includes(file.type)) {
      return 'Tipe file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.'
    }
    
    return null
  }

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Upload failed')
    }
    
    return result.data
  }

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)
    
    // Validate file
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setUploading(true)

    try {
      // Create preview URL immediately
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Upload file
      const uploadedFile = await uploadFile(file)
      
      if (uploadedFile) {
        // Replace preview with uploaded file URL
        URL.revokeObjectURL(objectUrl)
        setPreviewUrl(uploadedFile.url)
        onImageChange(uploadedFile.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError(error instanceof Error ? error.message : 'Upload gagal')
      setPreviewUrl(currentImage || null)
    } finally {
      setUploading(false)
    }
  }, [currentImage, onImageChange])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (disabled) return
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleRemoveImage = async () => {
    if (previewUrl && previewUrl.startsWith('/uploads/')) {
      try {
        const filename = previewUrl.split('/uploads/')[1]
        await fetch(`/api/upload?filename=${filename}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.error('Failed to delete file:', error)
      }
    }
    
    setPreviewUrl(null)
    onImageChange(null)
    setError(null)
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragOver && !disabled 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
          ${uploading ? 'pointer-events-none' : ''}
        `}
      >
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Mengupload...</p>
            </div>
          </div>
        )}

        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <Image
                src={previewUrl}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-lg object-cover border shadow-sm"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveImage()
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                disabled={disabled}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Klik untuk mengganti gambar atau drag & drop gambar baru
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl text-gray-400">📸</div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Upload Gambar UMKM
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Klik untuk pilih file atau drag & drop gambar di sini
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <p>Format: JPEG, PNG, WebP, GIF</p>
              <p>Ukuran maksimal: 5MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">⚠️</span>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Help Text */}
      {!error && (
        <div className="text-xs text-gray-500">
          <p>💡 Tips: Gunakan gambar berkualitas baik untuk hasil terbaik</p>
          <p>🔒 File akan diupload ke server secara aman</p>
        </div>
      )}
    </div>
  )
} 