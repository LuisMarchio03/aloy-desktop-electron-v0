"use client"

import { motion } from "framer-motion"
import { Calendar, Bot, Database, MessageSquare } from "lucide-react"

export default function ApiStatus() {
  return (
    <div className="bg-gray-950/90 border-b border-gray-800/50 py-1.5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <Calendar className="h-3.5 w-3.5 text-blue-400" />
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <span className="text-gray-400">GOOGLE</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <Database className="h-3.5 w-3.5 text-purple-400" />
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              />
            </div>
            <span className="text-gray-400">NOTION</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <Bot className="h-3.5 w-3.5 text-blue-400" />
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
              />
            </div>
            <span className="text-gray-400">DISCORD</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <MessageSquare className="h-3.5 w-3.5 text-green-400" />
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.9 }}
              />
            </div>
            <span className="text-gray-400">WHATSAPP</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-500">API STATUS:</span>
          <span className="text-green-400">ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </div>
  )
}

