"use client"

import { motion } from "framer-motion"
import { X, Server, Activity, RefreshCw, Bot, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"


interface SystemInfo {
  cpu_usage?: number
  memory_usage?: number
  disk_usage?: number
  net_sent?: number
  net_recv?: number
  ip?: string
}

interface SystemStatusProps {
  onClose: () => void
}

export default function SystemStatus({ onClose }: SystemStatusProps) {
  const [loading, setLoading] = useState<boolean>(true)

  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)

  // Discord Bot
  const [discordBotConnectedServers, setDiscordBotConnectedServers] = useState<number>(0)
  const [discordBotStatusService, setDiscordBotStatusService] = useState<boolean>(false)
  const [discordBotLatency, setDiscordBotLatency] = useState<number>(0)
  const [discordBotTotalCommandsToday, setDiscordBotTotalCommandsToday] = useState<number>(0)

  // Status Apis Integrations
  const [googleCalendar, setGoogleCalendar] = useState<boolean>(false)
  const [notion, setNotion] = useState<boolean>(false)
  const [discord, setDiscord] = useState<boolean>(false)
  const [whatsapp, setWhatsapp] = useState<boolean>(false)

  // Latency Apis Integrations
  const [googleCalendarLatency, setGoogleCalendarLatency] = useState<number>(0)
  const [notionLatency, setNotionLatency] = useState<number>(0)
  const [discordLatency, setDiscordLatency] = useState<number>(0)
  const [whatsappLatency, setWhatsappLatency] = useState<number>(0)


  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/system-info');
        const systemInfoData = await response.json();
        setSystemInfo({
          cpu_usage: systemInfoData.cpu_usage,
          memory_usage: systemInfoData.memory_usage,
          disk_usage: systemInfoData.disk_usage,
          net_sent:  systemInfoData.net_sent,
          net_recv: systemInfoData.net_recv,
          ip: systemInfoData.ip
        });
      } catch (error) {
        console.error('Failed to load system info', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const testApisIntegrationsStatus = () => {
    //TODO: Test API Integrations Status (Dentro do serviço responsavel por comunicação com as APIs - Node.js)
    setGoogleCalendar(true)
    setNotion(true)
    setDiscord(true)
    setWhatsapp(true)
  }

  if (loading) {
    return (
      <motion.div
        className="absolute top-[72px] left-0 right-0 z-20 bg-gray-950/95 border-b border-gray-800/50"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <div className="p-6 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-light tracking-wider text-white flex items-center">
              <Server className="h-4 w-4 mr-2 text-blue-400" />
              SYSTEM STATUS
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white rounded-full h-7 w-7"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex items-center justify-center h-32">
            <div className="w-6 h-6 border-2 border-t-2 border-gray-800 rounded-full animate-spin" />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute top-[72px] left-0 right-0 z-20 bg-gray-950/95 border-b border-gray-800/50"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="p-6 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-light tracking-wider text-white flex items-center">
            <Server className="h-4 w-4 mr-2 text-blue-400" />
            SYSTEM STATUS
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full h-7 w-7"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Node.js Server Status */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Server className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="text-sm text-white">PC SERVER</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-xs text-gray-400">ONLINE</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">CPU Usage</span>
                  <span className="text-blue-300">{systemInfo?.cpu_usage}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "32%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-blue-300">{systemInfo?.memory_usage}GB / 16GB</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Network Upload</span>
                  <span className="text-blue-300">{systemInfo?.net_sent} MB/s</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-blue-600 rounded-full"
                      animate={{
                        height: [1, Math.random() * 8 + 4, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Network Download</span>
                  <span className="text-blue-300">{systemInfo?.net_recv} MB/s</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-blue-600 rounded-full"
                      animate={{
                        height: [1, Math.random() * 8 + 4, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>IP: 192.168.1.100</span>
                <span>Aloy Rodando à: 2h</span>
              </div>
            </div>
          </div>

          {/* Discord Bot Status */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Bot className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="text-sm text-white">DISCORD BOT</h3>
              </div>
              <div className="flex items-center gap-1.5">


                {discordBotStatusService ? (
                  <>
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-xs text-gray-400">ONLINE</span>
                  </>
                ) : (
                  <>
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-red-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-xs text-gray-400">OFFLINE</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Connected Servers</span>
                  <span className="text-blue-300">3</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="flex-1 bg-gray-800/50 rounded p-1.5 text-xs text-center">
                    <div className="text-blue-300 font-medium">Personal</div>
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded p-1.5 text-xs text-center">
                    <div className="text-blue-300 font-medium">Work</div>
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded p-1.5 text-xs text-center">
                    <div className="text-blue-300 font-medium">Friends</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">API Latency</span>
                  <span className="text-blue-300">42ms</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "15%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Commands Today</span>
                  <span className="text-blue-300">42</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-blue-600 rounded-full"
                      animate={{
                        height: [1, Math.random() * 8 + 4, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Integrations Status */}
        <div className="mt-4 bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Database className="h-4 w-4 text-purple-400 mr-2" />
              <h3 className="text-sm text-white">API INTEGRATIONS</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 rounded-full text-xs border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 px-2.5"
            >
              <RefreshCw className="h-3 w-3 mr-1.5" />
              REFRESH
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-900/30 border border-blue-900/50 flex items-center justify-center mr-1.5">
                    <span className="text-[8px] text-blue-400">G</span>
                  </div>
                  <span className="text-gray-300">Google Calendar</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Status</span>
                {googleCalendar ? (
                  <span className="text-green-400">Online</span>
                ) : (
                  <span className="text-red-400">Offline</span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-400">Latency</span>
                <span className="text-blue-300">
                  {googleCalendarLatency ? `${googleCalendarLatency}ms` : "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-900/30 border border-purple-900/50 flex items-center justify-center mr-1.5">
                    <span className="text-[8px] text-purple-400">N</span>
                  </div>
                  <span className="text-gray-300">Notion</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Status</span>
                {notion ? (
                  <span className="text-green-400">Online</span>
                ) : (
                  <span className="text-red-400">Offline</span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-400">Latency</span>
                <span className="text-blue-300">
                  {notionLatency ? `${notionLatency}ms` : "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-900/30 border border-blue-900/50 flex items-center justify-center mr-1.5">
                    <span className="text-[8px] text-blue-400">D</span>
                  </div>
                  <span className="text-gray-300">Discord</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Status</span>
                {discord ? (
                  <span className="text-green-400">Online</span>
                ) : (
                  <span className="text-red-400">Offline</span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-400">Latency</span>
                <span className="text-blue-300">
                  {discordLatency ? `${discordLatency}ms` : "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-900/30 border border-green-900/50 flex items-center justify-center mr-1.5">
                    <span className="text-[8px] text-green-400">W</span>
                  </div>
                  <span className="text-gray-300">WhatsApp</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Status</span>
                {whatsapp ? (
                  <span className="text-green-400">Online</span>
                ) : (
                  <span className="text-red-400">Offline</span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-400">Latency</span>
                <span className="text-blue-300">
                  {whatsappLatency ? `${whatsappLatency}ms` : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LLaMA 3 Status */}
        <div className="mt-4 bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-purple-400 mr-2" />
              <h3 className="text-sm text-white">LLAMA 3 STATUS</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Model</span>
                <span className="text-purple-300">LLaMA 3 8B</span>
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400">Loaded</span>
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-gray-400">Memory Usage</span>
                <span className="text-purple-300">2.4 GB</span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Inference Speed</span>
                <span className="text-purple-300">32 tokens/s</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-purple-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-gray-400">Temperature</span>
                <span className="text-purple-300">0.7</span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Requests Today</span>
                <span className="text-purple-300">128</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-1 bg-purple-600 rounded-full"
                    animate={{
                      height: [1, Math.random() * 8 + 4, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-gray-400">Avg. Response Time</span>
                <span className="text-purple-300">320ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
          <span>Last updated: Just now</span>
          <span className="text-blue-400 cursor-pointer hover:underline">View detailed logs</span>
        </div>
      </div>
    </motion.div>
  )
}

