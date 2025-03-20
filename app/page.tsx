"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  MicOff,
  Settings,
  Send,
  Power,
  Maximize2,
  Minimize2,
  Server,
  Activity,
  Calendar,
  Bot,
  Globe,
  MessageSquare,
  BrainCircuit,
  Sparkles,
  Webhook,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ConfigPanel from "./config-panel"
import VoiceVisualizer from "./voice-visualizer"
import SystemStatus from "./system-status"
import IntegrationsPanel from "./integrations-panel"
import ApiStatus from "./api-status"

export default function Home() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello, I'm Aloy. How can I assist you today?", isUser: false },
  ])
  const [input, setInput] = useState("")
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSystemStatus, setShowSystemStatus] = useState(false)
  const [wakeWordDetected, setWakeWordDetected] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate wake word detection
  useEffect(() => {
    if (wakeWordDetected) {
      const timer = setTimeout(() => {
        setWakeWordDetected(false)
        setIsListening(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [wakeWordDetected])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    setMessages([...messages, { text: input, isUser: true }])
    setInput("")

    // Simulate assistant typing
    setIsTyping(true)

    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          text: `I'm processing your request: "${input}"`,
          isUser: false,
        },
      ])
    }, 1500)
  }

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode)
    if (isListening) setIsListening(false)
  }

  const toggleListening = () => {
    if (!isListening) {
      // Simulate wake word detection
      setWakeWordDetected(true)
    } else {
      setIsListening(false)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,26,107,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,79,138,0.05),transparent_70%)]"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-800/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-800/20 to-transparent"></div>

      {/* Subtle floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500/5"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Main interface container */}
      <motion.div
        className={`relative z-10 flex flex-col w-full max-w-4xl mx-auto my-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm ${
          isFullscreen ? "fixed inset-4 max-w-none m-0" : "h-[85vh]"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Interface header with glowing accent */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30"></div>
          <header className="flex justify-between items-center px-6 py-4 bg-gray-950/80">
            <div className="flex items-center gap-3">
              <motion.div
                className="relative w-8 h-8 rounded-full bg-black flex items-center justify-center border border-purple-900/50"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(139, 92, 246, 0)",
                      "0 0 8px rgba(139, 92, 246, 0.3)",
                      "0 0 0 rgba(139, 92, 246, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <Power className="w-4 h-4 text-purple-400" />
              </motion.div>
              <div>
                <h1 className="text-xl font-light tracking-wider text-white">ALOY</h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-xs text-gray-400">SYSTEM ONLINE</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 rounded-full h-8 px-3 text-xs"
                onClick={() => setShowIntegrations(!showIntegrations)}
              >
                <Webhook className="h-3.5 w-3.5 text-blue-400 mr-1.5" />
                APIS
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 rounded-full h-8 px-3 text-xs"
                onClick={() => setShowSystemStatus(!showSystemStatus)}
              >
                <Server className="h-3.5 w-3.5 text-blue-400 mr-1.5" />
                SYSTEM
              </Button>
              <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-full">
                <span className="text-xs text-gray-400">VOICE</span>
                <Switch
                  checked={isVoiceMode}
                  onCheckedChange={toggleVoiceMode}
                  className="data-[state=checked]:bg-purple-700 h-5 w-9"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 rounded-full h-8 w-8"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-3.5 w-3.5 text-gray-400" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5 text-gray-400" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 rounded-full h-8 w-8"
                onClick={() => setShowConfig(!showConfig)}
              >
                <Settings className="h-3.5 w-3.5 text-gray-400" />
              </Button>
            </div>
          </header>
        </div>

        {/* System status panel */}
        <AnimatePresence>
          {showSystemStatus && <SystemStatus onClose={() => setShowSystemStatus(false)} />}
        </AnimatePresence>

        {/* Integrations panel */}
        <AnimatePresence>
          {showIntegrations && <IntegrationsPanel onClose={() => setShowIntegrations(false)} />}
        </AnimatePresence>

        {/* API Status Bar */}
        <ApiStatus />

        {/* Main content area with tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="bg-gray-950/90 border-b border-gray-800/50 px-4">
            <TabsList className="bg-transparent border-b border-gray-800/0 h-12 p-0 gap-4">
              <TabsTrigger
                value="chat"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-white rounded-none border-b-2 border-transparent px-2 py-3 text-xs"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                CHAT
              </TabsTrigger>
              <TabsTrigger
                value="discord"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-white rounded-none border-b-2 border-transparent px-2 py-3 text-xs"
              >
                <Bot className="h-4 w-4 mr-2" />
                DISCORD
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-white rounded-none border-b-2 border-transparent px-2 py-3 text-xs"
              >
                <Calendar className="h-4 w-4 mr-2" />
                CALENDAR
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-white rounded-none border-b-2 border-transparent px-2 py-3 text-xs"
              >
                <BrainCircuit className="h-4 w-4 mr-2" />
                AI MODELS
              </TabsTrigger>
              <TabsTrigger
                value="prompts"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-white rounded-none border-b-2 border-transparent px-2 py-3 text-xs"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                PROMPTS
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-950 to-black">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-purple-900/20 border border-purple-900/30 flex items-center justify-center mr-3 mt-1">
                        <span className="text-xs text-purple-400">A</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.isUser
                          ? "bg-gray-900/50 text-gray-100 border border-gray-800/50"
                          : "bg-gradient-to-br from-gray-900/80 to-gray-950/80 text-gray-200 border border-purple-900/20"
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-blue-900/20 border border-blue-900/30 flex items-center justify-center ml-3 mt-1">
                        <span className="text-xs text-blue-400">U</span>
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-900/20 border border-purple-900/30 flex items-center justify-center mr-3 mt-1">
                      <span className="text-xs text-purple-400">A</span>
                    </div>
                    <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-gradient-to-br from-gray-900/80 to-gray-950/80 text-gray-200 border border-purple-900/20">
                      <motion.div
                        className="flex space-x-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="w-1.5 h-1.5 bg-purple-500/70 rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-purple-500/70 rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-purple-500/70 rounded-full"></span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="relative p-6 bg-gray-950/90 border-t border-gray-900/30">
              {/* Wake word detection animation */}
              <AnimatePresence>
                {wakeWordDetected && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 transform -translate-y-full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="p-6 bg-gray-950/90 border-t border-gray-900/30">
                      <div className="rounded-lg bg-gray-900/30 border border-purple-800/30 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="w-2 h-2 rounded-full bg-purple-500"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                              }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            />
                            <span className="text-xs text-purple-300">WAKE WORD DETECTED</span>
                          </div>
                        </div>

                        <div className="flex justify-center items-center py-4">
                          <motion.div
                            className="relative w-20 h-20 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                              animate={{
                                scale: [1, 1.5, 1.8],
                                opacity: [0.8, 0.4, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeOut",
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-purple-500/50"
                              animate={{
                                scale: [1, 1.3],
                                opacity: [1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeOut",
                                delay: 0.2,
                              }}
                            />
                            <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center">
                              <span className="text-lg font-light text-purple-300">Aloy</span>
                            </div>
                          </motion.div>
                        </div>

                        <div className="text-center text-sm text-purple-300 mt-2">"Hey Aloy" detected</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Voice visualizer */}
              <AnimatePresence>
                {isVoiceMode && isListening && !wakeWordDetected && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 transform -translate-y-full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="p-6 bg-gray-950/90 border-t border-gray-900/30">
                      <VoiceVisualizer />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={isVoiceMode ? "Say 'Hey Aloy' or type your message..." : "Type your message..."}
                  className="w-full rounded-full py-3 pl-5 pr-12 bg-gray-900/50 border border-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-700/50 focus:border-purple-700/50"
                  disabled={isVoiceMode && isListening}
                />
                {isVoiceMode ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 ${
                      isListening
                        ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                        : "bg-purple-900/30 text-purple-400 hover:bg-purple-900/50"
                    }`}
                    onClick={toggleListening}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* System status indicators */}
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.span>
                    <span>NODE.JS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    ></motion.span>
                    <span>DISCORD</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-purple-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    ></motion.span>
                    <span>LLAMA 3</span>
                  </div>
                </div>
                <span>ALOY v2.0.3</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discord" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-950 to-black">
              <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Bot className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="text-sm font-medium text-white">Discord Bot Status</h3>
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
                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-gray-400">Bot Activity</span>
                      <span className="text-blue-300">Active in 3 servers</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-800/50 rounded p-2 text-xs text-center">
                        <div className="text-blue-300 font-medium">42</div>
                        <div className="text-gray-500 mt-1">Commands</div>
                      </div>
                      <div className="flex-1 bg-gray-800/50 rounded p-2 text-xs text-center">
                        <div className="text-blue-300 font-medium">128</div>
                        <div className="text-gray-500 mt-1">Messages</div>
                      </div>
                      <div className="flex-1 bg-gray-800/50 rounded p-2 text-xs text-center">
                        <div className="text-blue-300 font-medium">8</div>
                        <div className="text-gray-500 mt-1">Users</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-gray-400">Recent Commands</span>
                      <span className="text-blue-300 cursor-pointer hover:underline">View All</span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto terminal-text">
                      <div className="text-xs bg-gray-800/50 rounded p-2">
                        <span className="text-green-400">User1:</span>{" "}
                        <span className="text-gray-300">/schedule meeting "Team Sync" tomorrow 2pm</span>
                      </div>
                      <div className="text-xs bg-gray-800/50 rounded p-2">
                        <span className="text-green-400">User2:</span>{" "}
                        <span className="text-gray-300">/search latest news on AI development</span>
                      </div>
                      <div className="text-xs bg-gray-800/50 rounded p-2">
                        <span className="text-green-400">User1:</span>{" "}
                        <span className="text-gray-300">/remind me to call client in 3 hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-gray-400">Command Channels</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          <span className="text-gray-300">#general</span>
                        </div>
                        <span className="text-gray-500">12 commands today</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          <span className="text-gray-300">#productivity</span>
                        </div>
                        <span className="text-gray-500">8 commands today</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          <span className="text-gray-300">#ai-prompts</span>
                        </div>
                        <span className="text-gray-500">22 commands today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
                  <div className="flex items-center mb-3">
                    <MessageSquare className="h-4 w-4 text-blue-400 mr-2" />
                    <h3 className="text-sm text-white">Command Configuration</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-gray-300">Prefix Commands</span>
                        <Switch defaultChecked className="data-[state=checked]:bg-blue-700 h-4 w-7" />
                      </div>
                      <input
                        type="text"
                        value="!"
                        className="w-full bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-gray-300">Slash Commands</span>
                        <Switch defaultChecked className="data-[state=checked]:bg-blue-700 h-4 w-7" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Slash commands are enabled and registered with Discord.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
                  <div className="flex items-center mb-3">
                    <Globe className="h-4 w-4 text-blue-400 mr-2" />
                    <h3 className="text-sm text-white">Discord API Status</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-300">API Latency</span>
                        <span className="text-green-400">42ms</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-green-600 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "15%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-gray-300">Gateway Status</span>
                        <span className="text-green-400">Connected</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
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
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-950 to-black">
              <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="text-sm font-medium text-white">Calendar Integrations</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 border border-blue-900/50 flex items-center justify-center mr-2">
                          <span className="text-xs text-blue-400">G</span>
                        </div>
                        <span className="text-sm text-gray-300">Google Calendar</span>
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
                    <div className="mt-2 text-xs text-gray-500">Last synced: 5 minutes ago</div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-purple-900/30 border border-purple-900/50 flex items-center justify-center mr-2">
                          <span className="text-xs text-purple-400">N</span>
                        </div>
                        <span className="text-sm text-gray-300">Notion Database</span>
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
                    <div className="mt-2 text-xs text-gray-500">Last synced: 12 minutes ago</div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-green-900/30 border border-green-900/50 flex items-center justify-center mr-2">
                          <span className="text-xs text-green-400">W</span>
                        </div>
                        <span className="text-sm text-gray-300">WhatsApp Reminders</span>
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
                    <div className="mt-2 text-xs text-gray-500">Last synced: 3 minutes ago</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-white">Upcoming Events</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-full text-xs border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 px-2.5"
                  >
                    Refresh
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Team Meeting</span>
                      <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded-full">Google</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">Today, 2:00 PM - 3:00 PM</div>
                    <div className="mt-2 text-xs text-gray-500">Participants: You, John, Sarah, Mike</div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Project Deadline</span>
                      <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-0.5 rounded-full">Notion</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">Tomorrow, All Day</div>
                    <div className="mt-2 text-xs text-gray-500">Submit final project deliverables</div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Call with Client</span>
                      <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">WhatsApp</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">Friday, 10:00 AM - 10:30 AM</div>
                    <div className="mt-2 text-xs text-gray-500">Discuss project requirements</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-950 to-black">
              <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <BrainCircuit className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="text-sm font-medium text-white">AI Models</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-purple-900/30 border border-purple-900/50 flex items-center justify-center mr-2">
                          <span className="text-xs text-purple-400">L</span>
                        </div>
                        <span className="text-sm text-gray-300">LLaMA 3</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-green-500"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span className="text-xs text-gray-400">ACTIVE</span>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Model Size:</span>
                        <span className="text-purple-300 ml-1">8B</span>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Context:</span>
                        <span className="text-purple-300 ml-1">8K tokens</span>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Temperature:</span>
                        <span className="text-purple-300 ml-1">0.7</span>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Memory:</span>
                        <span className="text-purple-300 ml-1">2.4 GB</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 border border-blue-900/50 flex items-center justify-center mr-2">
                          <span className="text-xs text-blue-400">W</span>
                        </div>
                        <span className="text-sm text-gray-300">Whisper AI</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-yellow-500"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span className="text-xs text-gray-400">STANDBY</span>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Model:</span>
                        <span className="text-blue-300 ml-1">Medium</span>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Language:</span>
                        <span className="text-blue-300 ml-1">English</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-green-900/30 border border-green-900/50 flex items-center justify-center mr-2">
                          <span className="text-xs text-green-400">C</span>
                        </div>
                        <span className="text-sm text-gray-300">Coqui TTS</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-yellow-500"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span className="text-xs text-gray-400">STANDBY</span>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Voice:</span>
                        <span className="text-green-300 ml-1">Female</span>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2">
                        <span className="text-gray-400">Speed:</span>
                        <span className="text-green-300 ml-1">1.0x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
                  <div className="flex items-center mb-3">
                    <Activity className="h-4 w-4 text-purple-400 mr-2" />
                    <h3 className="text-sm text-white">LLaMA 3 Performance</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">CPU Usage</span>
                        <span className="text-purple-300">42%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-600 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "42%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Memory Usage</span>
                        <span className="text-purple-300">2.4 GB / 4 GB</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-600 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-purple-300">320ms</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-600 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "32%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
                  <div className="flex items-center mb-3">
                    <Settings className="h-4 w-4 text-purple-400 mr-2" />
                    <h3 className="text-sm text-white">Model Configuration</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Temperature</span>
                        <span className="text-purple-300">0.7</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue="0.7"
                        className="w-full h-1.5 bg-gray-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Precise</span>
                        <span>Creative</span>
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Context Length</span>
                        <span className="text-purple-300">8K tokens</span>
                      </div>
                      <select className="w-full bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white mt-1">
                        <option>4K tokens</option>
                        <option selected>8K tokens</option>
                        <option>16K tokens</option>
                        <option>32K tokens</option>
                      </select>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">System Prompt</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-purple-400 hover:text-purple-300 p-0"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-gray-300 bg-gray-800/50 p-2 rounded max-h-20 overflow-y-auto">
                        You are Aloy, a helpful AI assistant. You are running on a local PC with Node.js and Express.
                        You have access to various APIs and can automate tasks on the user's computer.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prompts" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-950 to-black">
              <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
                    <h3 className="text-sm font-medium text-white">Prompt Engineering</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-full text-xs border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 px-2.5"
                  >
                    New Prompt
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Saved Prompt Templates</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="bg-gray-800/50 rounded p-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-300">Creative Writing</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-300">
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-300">
                              <span className="text-xs">↗</span>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-1 text-gray-400">For generating creative stories and narratives</div>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-300">Code Explanation</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-300">
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-300">
                              <span className="text-xs">↗</span>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-1 text-gray-400">For explaining complex code in simple terms</div>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-300">MidJourney Optimized</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-300">
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-300">
                              <span className="text-xs">↗</span>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-1 text-gray-400">For generating detailed image prompts for MidJourney</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Prompt Generator</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="bg-gray-800/50 rounded p-2 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-300">Target AI Model</span>
                        </div>
                        <select className="w-full bg-gray-900/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white">
                          <option>LLaMA 3</option>
                          <option>GPT-4</option>
                          <option>Claude</option>
                          <option>MidJourney</option>
                          <option>DALL-E</option>
                        </select>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-300">Prompt Type</span>
                        </div>
                        <select className="w-full bg-gray-900/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white">
                          <option>Creative Writing</option>
                          <option>Technical Explanation</option>
                          <option>Image Generation</option>
                          <option>Code Generation</option>
                          <option>Custom</option>
                        </select>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-300">Description</span>
                        </div>
                        <textarea
                          className="w-full bg-gray-900/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white h-20"
                          placeholder="Describe what you want the prompt to accomplish..."
                        ></textarea>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-800 hover:to-yellow-700 text-xs">
                        Generate Optimized Prompt
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
                  <div className="flex items-center mb-3">
                    <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                    <h3 className="text-sm text-white">Recent Prompts</h3>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2 text-xs">
                      <div className="text-yellow-300">Website Design Prompt</div>
                      <div className="mt-1 text-gray-400 line-clamp-2">
                        Create a modern, minimalist website design for a tech startup focusing on AI solutions. The
                        design should incorporate...
                      </div>
                      <div className="mt-1 text-gray-500">Generated 2 hours ago</div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2 text-xs">
                      <div className="text-yellow-300">Marketing Copy</div>
                      <div className="mt-1 text-gray-400 line-clamp-2">
                        Write compelling marketing copy for a new productivity app that helps users organize their tasks
                        and schedule...
                      </div>
                      <div className="mt-1 text-gray-500">Generated yesterday</div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-2 text-xs">
                      <div className="text-yellow-300">MidJourney Art Concept</div>
                      <div className="mt-1 text-gray-400 line-clamp-2">
                        A futuristic cityscape at night with neon lights, flying cars, and holographic advertisements.
                        Cyberpunk aesthetic...
                      </div>
                      <div className="mt-1 text-gray-500">Generated 3 days ago</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-4">
                  <div className="flex items-center mb-3">
                    <Settings className="h-4 w-4 text-yellow-400 mr-2" />
                    <h3 className="text-sm text-white">Prompt Settings</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-300">Auto-Save Prompts</span>
                        <Switch defaultChecked className="data-[state=checked]:bg-yellow-700 h-4 w-7" />
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-300">Prompt History</span>
                        <select className="bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white">
                          <option>Keep for 30 days</option>
                          <option>Keep for 60 days</option>
                          <option>Keep forever</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded border border-gray-800/30 p-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-300">Default AI Model</span>
                        <select className="bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-xs text-white">
                          <option>LLaMA 3</option>
                          <option>GPT-4</option>
                          <option>Claude</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Configuration panel */}
      <AnimatePresence>{showConfig && <ConfigPanel onClose={() => setShowConfig(false)} />}</AnimatePresence>
    </main>
  )
}

