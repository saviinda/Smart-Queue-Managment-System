"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole")

    if (token && role) {
      if (role === "PATIENT") {
        router.push("/dashboard/patient")
      } else if (role === "HOSPITAL_ADMIN") {
        router.push("/dashboard/admin")
      } else if (role === "SYSTEM_ADMIN") {
        router.push("/dashboard/system-admin")
      }
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Hospital Queue Management</h1>
          <p className="text-xl text-gray-600 mb-8">
            Smart queue management with real-time tracking and ML predictions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Patients</h3>
            <p className="text-gray-600 text-sm mb-4">Book tokens and track your position in real-time</p>
            <Link href="/login" className="text-purple-600 font-medium hover:text-purple-700">
              Get Started →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hospital Admin</h3>
            <p className="text-gray-600 text-sm mb-4">Manage queues and call patients efficiently</p>
            <Link href="/login" className="text-purple-600 font-medium hover:text-purple-700">
              Get Started →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">System Admin</h3>
            <p className="text-gray-600 text-sm mb-4">Manage users, departments, and billing</p>
            <Link href="/login" className="text-purple-600 font-medium hover:text-purple-700">
              Get Started →
            </Link>
          </div>
        </div>

        <Link
          href="/login"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Login to System
        </Link>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div>
              <p className="font-semibold text-gray-900">Patient</p>
              <p className="text-gray-600 text-sm">patient1@example.com</p>
              <p className="text-gray-600 text-sm">password</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Hospital Admin</p>
              <p className="text-gray-600 text-sm">doctor1@example.com</p>
              <p className="text-gray-600 text-sm">password</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">System Admin</p>
              <p className="text-gray-600 text-sm">sysadmin@example.com</p>
              <p className="text-gray-600 text-sm">password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
