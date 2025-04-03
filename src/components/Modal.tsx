import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  src: string
  alt: string
  onClose: () => void
}

export function Modal({ src, alt, onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Small delay to ensure the modal is mounted before starting the animation
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Wait for the fade-out animation to complete before calling onClose
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <div className="relative h-[90vh] w-[90vw]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-white/30" />
              <div className="h-16 w-16 rounded-full border-4 border-white border-t-transparent animate-spin absolute top-0 left-0" />
            </div>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            'object-contain transition-all duration-500 ease-in-out',
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          )}
          priority
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  )
} 