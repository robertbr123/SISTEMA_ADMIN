import AdminSidebar from '@/components/admin/AdminSidebar'
import GlobalSearch from '@/components/admin/GlobalSearch'
import LogoutButton from '@/components/admin/LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="md:flex">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          {/* Top header (desktop) */}
          <div className="hidden md:flex items-center justify-end sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-gray-800 px-6 py-3 gap-3">
            <GlobalSearch />
            <LogoutButton />
          </div>
          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
