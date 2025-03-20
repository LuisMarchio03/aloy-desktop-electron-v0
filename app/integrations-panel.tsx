"use client"

import { motion } from "framer-motion"
import { X, Calendar, Bot, Database, MessageSquare, RefreshCw, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface IntegrationsPanelProps {
  onClose: () => void
}

export default function IntegrationsPanel({ onClose }: IntegrationsPanelProps) {
  return (
    <motion.div
      className="absolute top-[72px] left-0 right-0 z-20 bg-gray-950/95 border-b border-gray-800/50"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-light tracking-wider text-white flex items-center">
            <Globe className="h-4 w-4 mr-2 text-blue-400" />
            API INTEGRATIONS
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
          {/* Google Calendar Integration */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="text-sm text-white">Google Calendar</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-xs text-gray-400">CONNECTED</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">API Status</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-400">Operational</span>
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-green-600 rounded-full"
                      animate={{
                        height: [1, Math.random() * 6 + 2, 1],
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

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-gray-400">Connected Account</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-900/30 border border-blue-900/50 flex items-center justify-center">
                    <span className="text-xs text-blue-400">G</span>
                  </div>
                  <span className="text-xs text-gray-300">user@example.com</span>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Sync Settings</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Auto-sync events</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-blue-700 h-4 w-7" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Sync frequency</span>
                    <select className="bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white">
                      <option>5 minutes</option>
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notion Integration */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Database className="h-4 w-4 text-purple-400 mr-2" />
                <h3 className="text-sm text-white">Notion</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-xs text-gray-400">CONNECTED</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">API Status</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-400">Operational</span>
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-purple-600 rounded-full"
                      animate={{
                        height: [1, Math.random() * 6 + 2, 1],
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

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-gray-400">Connected Workspace</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-900/30 border border-purple-900/50 flex items-center justify-center">
                    <span className="text-xs text-purple-400">N</span>
                  </div>
                  <span className="text-xs text-gray-300">Personal Workspace</span>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Connected Databases</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Tasks</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400">Connected</span>
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Projects</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400">Connected</span>
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Notes</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400">Connected</span>
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discord Integration */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Bot className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="text-sm text-white">Discord</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-xs text-gray-400">CONNECTED</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">API Status</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-400">Operational</span>
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-blue-600 rounded-full"
                      animate={{
                        height: [1, Math.random() * 6 + 2, 1],
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

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-gray-400">Bot Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-900/30 border border-blue-900/50 flex items-center justify-center">
                    <span className="text-xs text-blue-400">B</span>
                  </div>
                  <span className="text-xs text-gray-300">Aloy#1234</span>
                  <span className="text-xs bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded-full ml-auto">
                    Online
                  </span>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Connected Servers</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Personal Server</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400">Connected</span>
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Work Server</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400">Connected</span>
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Friends Server</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400">Connected</span>
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Integration */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 text-green-400 mr-2" />
                <h3 className="text-sm text-white">WhatsApp</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-xs text-gray-400">CONNECTED</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">API Status</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-400">Operational</span>
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-green-600 rounded-full"
                      animate={{
                        height: [1, Math.random() * 6 + 2, 1],
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

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-gray-400">Connected Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 border border-green-900/50 flex items-center justify-center">
                    <span className="text-xs text-green-400">W</span>
                  </div>
                  <span className="text-xs text-gray-300">+1 (555) 123-4567</span>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Message Settings</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Send reminders</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-green-700 h-4 w-7" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Send notifications</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-green-700 h-4 w-7" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Quiet hours</span>
                    <select className="bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white">
                      <option>None</option>
                      <option>10 PM - 7 AM</option>
                      <option>11 PM - 6 AM</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full text-xs border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 px-3"
          >
            <RefreshCw className="h-3 w-3 mr-1.5" />
            REFRESH ALL CONNECTIONS
          </Button>
          <span className="text-xs text-gray-500">Last updated: Just now</span>
        </div>
      </div>
    </motion.div>
  )
}

