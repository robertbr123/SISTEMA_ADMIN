import Link from 'next/link'

interface LogoProps {
  className?: string
  showIcon?: boolean
}

export default function Logo({ className = '', showIcon = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 hover:opacity-80 transition-opacity group ${className}`}>
      {showIcon && (
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
      )}
      <span className="text-red-600 font-bold text-2xl tracking-wide font-['Inter','system-ui','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','sans-serif'] group-hover:text-red-700 transition-colors">
        Linket
      </span>
    </Link>
  )
}