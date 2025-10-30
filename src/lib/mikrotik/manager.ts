import { RouterOSAPI } from 'node-routeros'

export interface MikrotikDevice {
  id: string
  name: string
  ip: string
  mac?: string
  username: string
  password: string
  port: number
}

export interface MikrotikSystemInfo {
  model: string
  version: string
  uptime: string
  cpuLoad: number
  freeMemory: number
  totalMemory: number
  freeHddSpace: number
  totalHddSpace: number
}

export interface MikrotikInterface {
  id: string
  name: string
  type: string
  macAddress?: string
  status: string
  rxByte: number
  txByte: number
}

export class MikrotikManager {
  private client: any = null
  private connected = false

  async connect(device: MikrotikDevice): Promise<boolean> {
    try {
      console.log(`Attempting to connect to ${device.ip}:${device.port} as ${device.username}`)
      this.client = new RouterOSAPI({
        host: device.ip,
        user: device.username,
        password: device.password,
        port: device.port,
        timeout: 10000,
        keepalive: true
      })

      console.log('Calling client.connect()...')
      await this.client.connect()
      console.log('Connection successful!')
      this.connected = true
      return true
    } catch (error) {
      console.error('Failed to connect to Mikrotik device:', error)
      this.connected = false
      return false
    }
  }

  async disconnect(): Promise<void> {
    if (this.client && this.connected) {
      try {
        await this.client.close()
      } catch (error) {
        console.error('Error disconnecting from Mikrotik:', error)
      }
      this.connected = false
      this.client = null
    }
  }

  async getSystemInfo(): Promise<MikrotikSystemInfo | null> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const systemResource = await this.client.write('/system/resource/print')
      const identity = await this.client.write('/system/identity/print')

      if (!systemResource || systemResource.length === 0) {
        return null
      }

      const resource = systemResource[0]
      return {
        model: resource['board-name'] || 'Unknown',
        version: resource['version'] || 'Unknown',
        uptime: resource['uptime'] || 'Unknown',
        cpuLoad: parseFloat(resource['cpu-load'] || '0'),
        freeMemory: parseFloat(resource['free-memory'] || '0'),
        totalMemory: parseFloat(resource['total-memory'] || '0'),
        freeHddSpace: parseFloat(resource['free-hdd-space'] || '0'),
        totalHddSpace: parseFloat(resource['total-hdd-space'] || '0')
      }
    } catch (error) {
      console.error('Error getting system info:', error)
      return null
    }
  }

  async getInterfaces(): Promise<MikrotikInterface[]> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const interfaces = await this.client.write('/interface/print')

      return interfaces.map((iface: any) => ({
        id: iface['.id'] || iface.id,
        name: iface.name || 'Unknown',
        type: iface.type || 'Unknown',
        macAddress: iface['mac-address'],
        status: iface.running === 'true' ? 'up' : 'down',
        rxByte: parseInt(iface['rx-byte'] || '0'),
        txByte: parseInt(iface['tx-byte'] || '0')
      }))
    } catch (error) {
      console.error('Error getting interfaces:', error)
      return []
    }
  }

  async getIPAddresses(): Promise<Array<{ address: string, interface: string }>> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }
    try {
      const addrs = await this.client.write('/ip/address/print')
      return (addrs || []).map((a: any) => ({ address: a.address, interface: a.interface }))
    } catch (e) {
      console.error('Error getting IP addresses:', e)
      return []
    }
  }

  async getIpServices(): Promise<Array<{ name: string, port: number, disabled?: boolean }>> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }
    try {
      const svcs = await this.client.write('/ip/service/print')
      return (svcs || []).map((s: any) => ({ name: s.name, port: Number(s.port ?? 0), disabled: s.disabled === 'true' }))
    } catch (e) {
      console.error('Error getting IP services:', e)
      return []
    }
  }

  async getLogs(lines: number = 50): Promise<any[]> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      // Try without count parameter first
      const logs = await this.client.write('/log/print', {})

      // Limit to the requested number of lines
      return logs.slice(0, lines).map((log: any) => ({
        time: log.time,
        message: log.message
      }))
    } catch (error) {
      console.error('Error getting logs:', error)
      return []
    }
  }

  async backupConfiguration(filename?: string): Promise<string | null> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const backupName = filename || `backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.rsc`

      await this.client.write('/export', {
        file: backupName
      })

      // Wait a moment for the export to complete
      await new Promise(resolve => setTimeout(resolve, 2000))

      return backupName
    } catch (error) {
      console.error('Error creating backup:', error)
      return null
    }
  }

  async getBackupFiles(): Promise<any[]> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const files = await this.client.write('/file/print', {
        '.proplist': 'name,size,creation-time'
      })

      return files.filter((file: any) =>
        file.name && (file.name.endsWith('.rsc') || file.name.endsWith('.backup'))
      )
    } catch (error) {
      console.error('Error getting backup files:', error)
      return []
    }
  }

  async ping(host: string, count: number = 4): Promise<any[]> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const result = await this.client.write('/ping', {
        address: host,
        count: count,
        interval: '1s'
      })

      return result
    } catch (error) {
      console.error('Error pinging host:', error)
      return []
    }
  }

  async getWirelessClients(): Promise<any[]> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const clients = await this.client.write('/interface/wireless/registration-table/print')
      return clients
    } catch (error) {
      console.error('Error getting wireless clients:', error)
      return []
    }
  }

  async getARP(): Promise<any[]> {
    if (!this.connected || !this.client) throw new Error('Not connected to Mikrotik device')
    try {
      const arp = await this.client.write('/ip/arp/print')
      return arp
    } catch (e) {
      console.error('Error getting ARP table:', e)
      return []
    }
  }

  async getDHCPLeases(): Promise<any[]> {
    if (!this.connected || !this.client) throw new Error('Not connected to Mikrotik device')
    try {
      const leases = await this.client.write('/ip/dhcp-server/lease/print')
      return leases
    } catch (e) {
      console.error('Error getting DHCP leases:', e)
      return []
    }
  }

  async reboot(): Promise<boolean> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      await this.client.write('/system/reboot')
      return true
    } catch (error) {
      console.error('Error rebooting device:', error)
      return false
    }
  }

  async getPPPConnections(): Promise<any[]> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const connections = await this.client.write('/ppp/active/print')
      return connections
    } catch (error) {
      console.error('Error getting PPP connections:', error)
      return []
    }
  }

  async getPPPSecrets(): Promise<any[]> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const secrets = await this.client.write('/ppp/secret/print')
      return secrets
    } catch (error) {
      console.error('Error getting PPP secrets:', error)
      return []
    }
  }

  async addPPPSecret(secretData: {
    name: string
    password: string
    service?: string
    profile?: string
    callerId?: string
    routes?: string
    comment?: string
  }): Promise<any> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      const addCommand: any = {
        name: secretData.name,
        password: secretData.password
      }

      // Only add optional parameters if they have values
      if (secretData.service && secretData.service.trim()) {
        addCommand.service = secretData.service
      }
      if (secretData.profile && secretData.profile.trim()) {
        addCommand.profile = secretData.profile
      }
      if (secretData.callerId && secretData.callerId.trim()) {
        addCommand['caller-id'] = secretData.callerId
      }
      if (secretData.routes && secretData.routes.trim()) {
        addCommand.routes = secretData.routes
      }
      if (secretData.comment && secretData.comment.trim()) {
        addCommand.comment = secretData.comment
      }

  // Don't log the raw password - mask it for safety
  const maskedCommand = { ...addCommand, password: addCommand.password ? '****' : undefined }
  console.log('Adding PPP secret with command:', maskedCommand)
  const result = await this.client.write('/ppp/secret/add', addCommand)
      console.log('PPP secret add result:', result)
      return result
    } catch (error) {
      console.error('Error adding PPP secret:', error)
      throw error
    }
  }

  async removePPPConnection(connectionId: string): Promise<any> {
    if (!this.connected || !this.client) {
      throw new Error('Not connected to Mikrotik device')
    }

    try {
      // Remove the active PPP connection
      const result = await this.client.write('/ppp/active/remove', {
        '.id': connectionId
      })
      return result
    } catch (error) {
      console.error('Error removing PPP connection:', error)
      throw error
    }
  }
}

// Factory function to create and manage Mikrotik connections
export async function withMikrotikConnection<T>(
  device: MikrotikDevice,
  operation: (manager: MikrotikManager) => Promise<T>
): Promise<T | null> {
  const manager = new MikrotikManager()

  try {
    const connected = await manager.connect(device)
    if (!connected) {
      throw new Error('Failed to connect to Mikrotik device')
    }

    return await operation(manager)
  } catch (error) {
    console.error('Mikrotik operation failed:', error)
    return null
  } finally {
    await manager.disconnect()
  }
}