"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { LogOut, BarChart3 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

interface QueueStatus {
  queueId: number
  departmentId: number
  departmentName: string
  totalWaiting: number
  avgWaitTime: number
  status: string
}