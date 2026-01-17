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
export default function AdminDashboard() {
  const router = useRouter()
  const [queues, setQueues] = useState<QueueStatus[]>([])
  const [loading, setLoading] = useState(false)
  const userName = localStorage.getItem("userName") || "Admin"
   useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/queue/status`)
        setQueues(response.data)
      } catch (error) {
        console.error("Failed to fetch queues", error)
        // Mock data
        setQueues([
          {
            queueId: 1,
            departmentId: 1,
            departmentName: "Cardiology",
            totalWaiting: 12,
            avgWaitTime: 20,
            status: "OPEN",
          },
          {
            queueId: 2,
            departmentId: 2,
            departmentName: "Orthopedics",
            totalWaiting: 8,
            avgWaitTime: 25,
            status: "OPEN",
          },
        ])
      }
    }

    fetchQueues()
    const interval = setInterval(fetchQueues, 5000)
    return () => clearInterval(interval)
  }, [])
  const handleCallNext = async (queueId: number) => {
    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/queue/${queueId}/call-next`)
      alert("Next patient called successfully")
    } catch (error) {
      alert("Failed to call next patient")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }