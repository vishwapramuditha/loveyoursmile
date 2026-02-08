"use client"

import * as React from "react"

interface User {
    id: string
    handle: string
    isVerified: boolean
    karma: number
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (handle: string) => Promise<void>
    logout: () => void
    verify: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        // Check local storage for persisted session
        const stored = localStorage.getItem("zb_user")
        if (stored) {
            setUser(JSON.parse(stored))
        }
        setIsLoading(false)
    }, [])

    const login = async (handle: string) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        const newUser: User = {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            handle,
            isVerified: false,
            karma: 0,
        }
        setUser(newUser)
        localStorage.setItem("zb_user", JSON.stringify(newUser))
        setIsLoading(false)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("zb_user")
    }

    const verify = async () => {
        if (!user) return
        setIsLoading(true)
        // Simulate PoP verification
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const updatedUser = { ...user, isVerified: true }
        setUser(updatedUser)
        localStorage.setItem("zb_user", JSON.stringify(updatedUser))
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, verify }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
