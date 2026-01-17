"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
