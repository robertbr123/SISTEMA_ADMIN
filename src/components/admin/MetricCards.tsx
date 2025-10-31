'use client'

import React from 'react'
import { 
  Users, 
  CreditCard, 
  Activity, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Server,
  Wifi,
  Shield
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo'
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  color = 'blue' 
}: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500'
  }

  const bgColorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200',
    purple: 'bg-purple-50 border-purple-200',
    indigo: 'bg-indigo-50 border-indigo-200'
  }

  return (
    <div className={`p-6 rounded-lg border ${bgColorClasses[color]} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className="text-sm flex items-center mt-2">
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-gray-500 ml-1">{changeLabel}</span>
              )}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componentes específicos para diferentes métricas
export function UsersMetricCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Total de Usuários"
      value={value}
      change={change}
      changeLabel={changeLabel}
      icon={<Users className="h-6 w-6" />}
      color="blue"
    />
  )
}

export function RevenueMetricCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Receita Total"
      value={`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
      change={change}
      changeLabel={changeLabel}
      icon={<DollarSign className="h-6 w-6" />}
      color="green"
    />
  )
}

export function SubscriptionsMetricCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Assinaturas Ativas"
      value={value}
      change={change}
      changeLabel={changeLabel}
      icon={<CreditCard className="h-6 w-6" />}
      color="purple"
    />
  )
}

export function PlansMetricCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Planos Disponíveis"
      value={value}
      change={change}
      changeLabel={changeLabel}
      icon={<Activity className="h-6 w-6" />}
      color="indigo"
    />
  )
}

export function ConversionRateCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Taxa de Conversão"
      value={`${Number(value).toFixed(1)}%`}
      change={change}
      changeLabel={changeLabel}
      icon={<TrendingUp className="h-6 w-6" />}
      color="yellow"
    />
  )
}

export function MikrotikDevicesCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Dispositivos Mikrotik"
      value={value}
      change={change}
      changeLabel={changeLabel}
      icon={<Wifi className="h-6 w-6" />}
      color="blue"
    />
  )
}

export function ProxmoxServersCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Servidores Proxmox"
      value={value}
      change={change}
      changeLabel={changeLabel}
      icon={<Server className="h-6 w-6" />}
      color="purple"
    />
  )
}

export function ActiveConnectionsCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Conexões Ativas"
      value={value}
      change={change}
      changeLabel={changeLabel}
      icon={<Activity className="h-6 w-6" />}
      color="green"
    />
  )
}

export function DomainsCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Domínios Gerenciados"
      value={value}
      change={change}
      changeLabel={changeLabel}
      icon={<Shield className="h-6 w-6" />}
      color="indigo"
    />
  )
}

export function SystemUptimeCard({ value, change, changeLabel }: Omit<MetricCardProps, 'title' | 'icon' | 'color'>) {
  return (
    <MetricCard
      title="Uptime do Sistema"
      value={`${Number(value).toFixed(1)}%`}
      change={change}
      changeLabel={changeLabel}
      icon={<TrendingUp className="h-6 w-6" />}
      color="green"
    />
  )
}