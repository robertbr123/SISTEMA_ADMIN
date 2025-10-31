"use client"

import React from 'react'

function shimmer() {
  return 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'
}

export function CardSkeleton() {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg border border-gray-700 ${shimmer()}`}>
      <div className="h-4 w-32 bg-gray-700 rounded mb-4" />
      <div className="h-8 w-24 bg-gray-700 rounded mb-2" />
      <div className="h-3 w-40 bg-gray-700 rounded" />
    </div>
  )
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg border border-gray-700 ${shimmer()}`}>
      <div className="h-5 w-48 bg-gray-700 rounded mb-4" />
      <div className="w-full bg-gray-700 rounded" style={{ height }} />
    </div>
  )
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ChartsRowSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  )
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <GridSkeleton />
      <ChartsRowSkeleton />
    </div>
  )
}
