"use client"

import * as React from "react"
import { Scan, Fingerprint, CheckCircle, Smartphone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function VerifyHumanity() {
    const { verify, user } = useAuth()
    const [status, setStatus] = React.useState<"idle" | "scanning" | "verified">("idle")

    const handleVerify = async () => {
        setStatus("scanning")
        toast.info("Initiating Liveness Check...")

        // Simulate multi-step verification
        await new Promise(r => setTimeout(r, 1000))

        try {
            await verify()
            setStatus("verified")
            toast.success("Proof of Personhood Verified!")
        } catch (error) {
            setStatus("idle")
            toast.error("Verification failed. Please try again.")
        }
    }

    if (status === "verified" || user?.isVerified) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 rounded-full" />
                    <CheckCircle className="w-16 h-16 text-green-500 relative z-10" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-green-500">Verified Human</h3>
                <p className="text-muted-foreground text-center">
                    Your unique biological signature has been cryptographically secured.
                </p>
            </div>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto border-zinc-800 bg-black/50 backdrop-blur-sm relative overflow-hidden">
            {status === "scanning" && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-input from-transparent via-cyan-500/10 to-transparent animate-scan" />
                </div>
            )}

            <CardHeader className="text-center relative z-10">
                <CardTitle className="flex flex-col items-center gap-2 text-2xl">
                    <Scan className="w-8 h-8 text-cyan-400" />
                    Proof of Personhood
                </CardTitle>
                <CardDescription>
                    Complete the biometric attestation to verify your humanity.
                    <br />
                    <span className="text-xs text-muted-foreground/50">Zero-knowledge proof. No personal data stored.</span>
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-8 relative z-10">
                <div className="relative group cursor-pointer" onClick={status === "idle" ? handleVerify : undefined}>
                    {/* Animated Rings */}
                    {status === "scanning" && (
                        <>
                            <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[ping_1.5s_ease-in-out_infinite]" />
                            <div className="absolute inset-[-10px] rounded-full border border-cyan-500/20 animate-[ping_2s_ease-in-out_infinite_200ms]" />
                        </>
                    )}

                    <div className={`
            w-24 h-24 rounded-full flex items-center justify-center
            transition-all duration-500
            ${status === "scanning"
                            ? "bg-cyan-500/10 border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                            : "bg-zinc-900 border border-zinc-700 hover:border-cyan-500/50 hover:bg-zinc-800"}
          `}>
                        <Fingerprint className={`
               w-12 h-12 transition-colors duration-300
               ${status === "scanning" ? "text-cyan-400" : "text-zinc-500 group-hover:text-cyan-400"}
             `} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <Button
                        size="lg"
                        className="w-full relative overflow-hidden font-mono"
                        onClick={handleVerify}
                        disabled={status !== "idle"}
                        variant={status === "scanning" ? "secondary" : "default"}
                    >
                        {status === "scanning" ? (
                            <span className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4 animate-pulse" />
                                Validating Biometrics...
                            </span>
                        ) : (
                            "Initiate Liveness Check"
                        )}
                    </Button>

                    {status === "scanning" && (
                        <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '100%' }} />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
