import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Modal } from './Modal'

interface PhotoCardProps {
  src: string
  alt: string
  className?: string
}

export function PhotoCard({ src, alt, className }: PhotoCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        className={cn(
          'group relative aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
          className
        )}
        onClick={() => setShowModal(true)}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-4 border-gray-300" />
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin absolute top-0 left-0" />
            </div>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            'object-cover transition-all duration-500 ease-in-out',
            isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100 group-hover:scale-105'
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      {showModal && (
        <Modal
          src={src}
          alt={alt}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
} 