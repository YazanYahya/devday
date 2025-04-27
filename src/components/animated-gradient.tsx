"use client"

import { useEffect, useRef } from "react"

// Define the Circle type
interface Circle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  initialRadius: number
  pulseSpeed: number
  pulsePhase: number
}

export default function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight * 0.9

    canvas.width = width
    canvas.height = height

    const circles: Circle[] = []
    const colors = [
      "rgba(59, 130, 246, 0.4)", // Blue
      "rgba(99, 102, 241, 0.4)", // Indigo
      "rgba(139, 92, 246, 0.4)", // Purple
      "rgba(236, 72, 153, 0.35)", // Pink
      "rgba(167, 139, 250, 0.35)", // Violet
    ]

    // Create more circles for a richer effect
    for (let i = 0; i < 8; i++) {
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 350 + 120,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() * 0.2 - 0.1) * 0.7, // Slower movement
        vy: (Math.random() * 0.2 - 0.1) * 0.7, // Slower movement
        // Add pulsing effect
        initialRadius: Math.random() * 350 + 120,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Update time for animation
      const time = Date.now() * 0.001

      // Draw circles
      circles.forEach((circle) => {
        // Update radius with pulsing effect
        circle.radius = circle.initialRadius * (1 + 0.1 * Math.sin(time * circle.pulseSpeed + circle.pulsePhase))
        
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)
        gradient.addColorStop(0, circle.color)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Move circles
        circle.x += circle.vx
        circle.y += circle.vy

        // Seamless wrapping around edges
        if (circle.x < -circle.radius) circle.x = width + circle.radius
        if (circle.x > width + circle.radius) circle.x = -circle.radius
        if (circle.y < -circle.radius) circle.y = height + circle.radius
        if (circle.y > height + circle.radius) circle.y = -circle.radius
      })

      requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight * 0.9
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  )
}
