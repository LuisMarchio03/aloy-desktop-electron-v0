"use client"

import { motion } from "framer-motion"
import { X, Check, ChevronRight, Server, Cpu, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConfigPanelProps {
  onClose: () => void
}

export default function ConfigPanel({ onClose }: ConfigPanelProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md rounded-xl bg-gray-950 border border-gray-800/50 shadow-xl backdrop-blur-md overflow-hidden"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with glowing accent */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30"></div>
          <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
            <h2 className="text-lg font-light tracking-wider text-white">SYSTEM CONFIGURATION</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/30 p-1 gap-1">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md text-xs py-1.5"
            >
              GENERAL
            </TabsTrigger>
            <TabsTrigger
              value="voice"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md text-xs py-1.5"
            >
              VOICE
            </TabsTrigger>
            <TabsTrigger
              value="hardware"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md text-xs py-1.5"
            >
              HARDWARE
            </TabsTrigger>
            <TabsTrigger
              value="display"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md text-xs py-1.5"
            >
              DISPLAY
            </TabsTrigger>
          </TabsList>

          <div className="p-4">
            <TabsContent value="general" className="mt-0 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                  <span className="text-sm text-gray-300">System Notifications</span>
                  <Switch defaultChecked className="data-[state=checked]:bg-purple-700" />
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Response Speed</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} className="[&>span]:bg-purple-700" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>SLOWER</span>
                    <span>FASTER</span>
                  </div>
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">System Language</span>
                  </div>
                  <Select defaultValue="english">
                    <SelectTrigger className="w-full bg-gray-900/50 border-gray-800/50 text-sm">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="portuguese">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                  <span className="text-sm text-gray-300">Advanced Mode</span>
                  <Switch className="data-[state=checked]:bg-purple-700" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="voice" className="mt-0 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                  <span className="text-sm text-gray-300">Wake Word Detection</span>
                  <Switch defaultChecked className="data-[state=checked]:bg-purple-700" />
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Wake Word</span>
                  </div>
                  <Select defaultValue="hey_aloy">
                    <SelectTrigger className="w-full bg-gray-900/50 border-gray-800/50 text-sm">
                      <SelectValue placeholder="Select wake word" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="hey_aloy">Hey Aloy</SelectItem>
                      <SelectItem value="aloy">Aloy</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                      <SelectItem value="computer">Computer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Voice Profile</span>
                  </div>
                  <Select defaultValue="female">
                    <SelectTrigger className="w-full bg-gray-900/50 border-gray-800/50 text-sm">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="robotic">Robotic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Volume</span>
                    <span className="text-xs text-gray-500">75%</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} step={1} className="[&>span]:bg-purple-700" />
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Microphone Sensitivity</span>
                    <span className="text-xs text-gray-500">65%</span>
                  </div>
                  <Slider defaultValue={[65]} max={100} step={1} className="[&>span]:bg-purple-700" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hardware" className="mt-0 space-y-4">
              <div className="space-y-4">
                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                  <div className="flex items-center mb-2">
                    <Server className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm text-gray-300">PC Server</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Connection</span>
                      <span className="text-green-400">Connected</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">IP Address</span>
                      <input
                        type="text"
                        value="192.168.1.100"
                        className="bg-gray-900/50 border border-gray-800/50 rounded px-2 py-1 w-32 text-right"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Port</span>
                      <input
                        type="text"
                        value="8080"
                        className="bg-gray-900/50 border border-gray-800/50 rounded px-2 py-1 w-32 text-right"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                  <div className="flex items-center mb-2">
                    <Cpu className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-sm text-gray-300">Raspberry Pi</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Connection</span>
                      <span className="text-green-400">Connected</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">IP Address</span>
                      <input
                        type="text"
                        value="192.168.1.101"
                        className="bg-gray-900/50 border border-gray-800/50 rounded px-2 py-1 w-32 text-right"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Audio Device</span>
                      <Select defaultValue="usb_mic">
                        <SelectTrigger className="w-32 h-7 bg-gray-900/50 border-gray-800/50 text-xs">
                          <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800">
                          <SelectItem value="usb_mic">USB Microphone</SelectItem>
                          <SelectItem value="builtin">Built-in Mic</SelectItem>
                          <SelectItem value="bluetooth">Bluetooth Mic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                  <div className="flex items-center mb-2">
                    <Wifi className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-sm text-gray-300">Connection Settings</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Protocol</span>
                      <Select defaultValue="websocket">
                        <SelectTrigger className="w-32 h-7 bg-gray-900/50 border-gray-800/50 text-xs">
                          <SelectValue placeholder="Select protocol" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800">
                          <SelectItem value="websocket">WebSocket</SelectItem>
                          <SelectItem value="mqtt">MQTT</SelectItem>
                          <SelectItem value="rest">REST API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Encryption</span>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-700 h-4 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="display" className="mt-0 space-y-4">
              <div className="space-y-4">
                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Interface Theme</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative h-14 rounded-md bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-blue-900/50 cursor-pointer border border-white/20 group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 flex items-center justify-center transition-opacity">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="h-14 rounded-md bg-gradient-to-r from-gray-900 to-black cursor-pointer border border-gray-800/50 group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 flex items-center justify-center transition-opacity">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="h-14 rounded-md bg-gradient-to-r from-cyan-900/50 to-blue-900/50 cursor-pointer border border-gray-800/50 group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 flex items-center justify-center transition-opacity">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                  <span className="text-sm text-gray-300">Dark Mode</span>
                  <Switch defaultChecked className="data-[state=checked]:bg-purple-700" />
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Animation Level</span>
                  </div>
                  <Select defaultValue="high">
                    <SelectTrigger className="w-full bg-gray-900/50 border-gray-800/50 text-sm">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Interface Scale</span>
                    <span className="text-xs text-gray-500">100%</span>
                  </div>
                  <Slider defaultValue={[100]} max={150} min={75} step={5} className="[&>span]:bg-purple-700" />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="p-4 border-t border-gray-800/50 flex justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 text-xs"
          >
            CANCEL
          </Button>
          <Button className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-xs">
            APPLY CHANGES <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

