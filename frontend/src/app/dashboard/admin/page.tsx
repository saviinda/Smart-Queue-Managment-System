"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "HOSPITAL_ADMIN") {
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) return <div>Loading...</div>

  return <AdminDashboard />
}
