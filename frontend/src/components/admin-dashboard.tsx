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
    return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Hospital Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {userName}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 size={28} />
          Department Queues
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queues.map((queue) => (
            <div key={queue.queueId} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{queue.departmentName}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Waiting Patients:</span>
                  <span className="font-bold text-purple-600">{queue.totalWaiting}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Wait Time:</span>
                  <span className="font-bold text-blue-600">{queue.avgWaitTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-bold ${queue.status === "OPEN" ? "text-green-600" : "text-red-600"}`}>
                    {queue.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCallNext(queue.queueId)}
                disabled={loading || queue.totalWaiting === 0}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition"
              >
                Call Next Patient
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
