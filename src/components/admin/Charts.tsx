'use client'

import React from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface ChartData {
  [key: string]: any
}

interface ChartProps {
  data: ChartData[]
  title?: string
  height?: number
}

// Componente base para gráficos com tema dark
export function ChartContainer({ 
  children, 
  title, 
  height = 300 
}: { 
  children: React.ReactNode
  title?: string
  height?: number
}) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-sm">
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      )}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Gráfico de atividade semanal
export function WeeklyActivityChart({ data, title, height }: ChartProps) {
  return (
    <ChartContainer title={title || "Atividade Semanal"} height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorConnections" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorDevices" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="day" 
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={{ stroke: '#4b5563' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={{ stroke: '#4b5563' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#f9fafb'
          }}
        />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="connections" 
          stroke="#3b82f6" 
          fillOpacity={1} 
          fill="url(#colorConnections)"
          strokeWidth={2}
          name="Conexões"
        />
        <Area 
          type="monotone" 
          dataKey="devices" 
          stroke="#10b981" 
          fillOpacity={1} 
          fill="url(#colorDevices)"
          strokeWidth={2}
          name="Dispositivos"
        />
      </AreaChart>
    </ChartContainer>
  )
}

// Gráfico de pizza para distribuição de planos (tema dark)
export function PlanDistributionChart({ data, title, height }: ChartProps) {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

  return (
    <ChartContainer title={title || "Distribuição de Planos"} height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [value, 'Assinaturas']}
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#f9fafb'
          }}
        />
      </PieChart>
    </ChartContainer>
  )
}

// Gráfico de barras para status de serviços (tema dark)
export function ServiceStatusChart({ data, title, height }: ChartProps) {
  return (
    <ChartContainer title={title || "Status dos Serviços"} height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={{ stroke: '#4b5563' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={{ stroke: '#4b5563' }}
        />
        <Tooltip 
          formatter={(value: number) => [value, 'Quantidade']}
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#f9fafb'
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

// Gráfico de linha para monitoramento de sistema (tema dark)
export function SystemMonitorChart({ data, title, height }: ChartProps) {
  return (
    <ChartContainer title={title || "Monitoramento do Sistema"} height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={{ stroke: '#4b5563' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={{ stroke: '#4b5563' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#f9fafb'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="cpu" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          name="CPU %"
        />
        <Line 
          type="monotone" 
          dataKey="memory" 
          stroke="#10b981" 
          strokeWidth={3}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          name="Memória %"
        />
        <Line 
          type="monotone" 
          dataKey="network" 
          stroke="#f59e0b" 
          strokeWidth={3}
          dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
          name="Rede %"
        />
      </LineChart>
    </ChartContainer>
  )
}