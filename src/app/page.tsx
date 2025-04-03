'use client'

import { useEffect, useRef, useState } from 'react'
import { PhotoCard } from '@/components/PhotoCard'

// Mock data generator for demonstration
const generatePhotos = (page: number) => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: page * 12 + i,
    src: `https://picsum.photos/seed/${page * 12 + i}/800/800`,
    alt: `Photo ${page * 12 + i + 1}`,
  }))
}

export default function Home() {
  const [photos, setPhotos] = useState(generatePhotos(0))
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true)
          // Simulate API call delay
          setTimeout(() => {
            setPhotos((prev) => [...prev, ...generatePhotos(page)])
            setPage((prev) => prev + 1)
            setLoading(false)
          }, 1000)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [page, loading])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
          />
        ))}
      </div>
      <div
        ref={observerTarget}
        className="h-10 w-full"
      >
        {loading && (
          <div className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    </main>
  )
}
