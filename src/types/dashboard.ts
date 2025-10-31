export interface InfrastructureStats {
  mikrotikDevices: number
  proxmoxServers: number
  networkDevices: number
  domains: number
  systemUptime: number
  networkLoad: number
  securityScore: number
  systemHealth: number
}

export interface NetworkActivityPoint {
  day: string
  traffic: number
  connections: number
  uptime?: number
}

export interface WeeklyActivityPoint {
  day: string
  devices: number
  users: number
  active: number
}

export interface SystemStatusSlice {
  name: string
  value: number
  color: string
}

export interface SystemPerformancePoint {
  time: string
  cpu: number
  memory: number
  network: number
}

export interface OverallHealthStatus {
  mikrotik: string
  proxmox: string
  dns: string
  network: string
}

export interface DashboardStats {
  infrastructure: InfrastructureStats
  networkActivity: NetworkActivityPoint[]
  weeklyActivity: WeeklyActivityPoint[]
  systemStatus: SystemStatusSlice[]
  systemPerformance: SystemPerformancePoint[]
  totalUsers: number
  activeUsers: number
  recentUsers: number
  overallHealth: OverallHealthStatus
}
