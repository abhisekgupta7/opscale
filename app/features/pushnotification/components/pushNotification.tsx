"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { sendNotification } from "../actions/action"
import { subscribeToPush } from "../actions/enablePushNotification"

export function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(null)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            setIsSupported(true)
            registerServiceWorker()
        }
    }, [])

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
        })

        const sub = await registration.pushManager.getSubscription()
        setSubscription(sub)
    }

    async function handleSubscribe() {
        setError(null)
        setIsLoading(true)

        try {
            const sub = await subscribeToPush()
            setSubscription(sub)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to enable push notifications.")
        } finally {
            setIsLoading(false)
        }
    }

    async function unsubscribeFromPush() {
        setError(null)
        setIsLoading(true)

        try {
            const currentSubscription =
                subscription ??
                (await (await navigator.serviceWorker.ready).pushManager.getSubscription())

            if (!currentSubscription) {
                setSubscription(null)
                return
            }

            const endpoint = currentSubscription.endpoint
            await currentSubscription.unsubscribe()

            const response = await fetch("/api/pushnotification", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ endpoint }),
            })

            if (!response.ok) {
                throw new Error("Failed to remove push notification subscription.")
            }

            setSubscription(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to unsubscribe from push notifications.")
        } finally {
            setIsLoading(false)
        }
    }

    async function sendTestNotification() {
        if (!subscription) {
            return
        }

        setError(null)
        setIsLoading(true)

        try {
            await sendNotification(message)
            setMessage("")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send notification.")
        } finally {
            setIsLoading(false)
        }
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>
    }

    return (
        <div className="space-y-4 rounded-xl border border-border bg-background p-4 shadow-sm">
            <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">
                    Push Notifications
                </h3>
                <p className="text-sm text-muted-foreground">
                    Enable browser notifications for this account and send a local test message.
                </p>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            {subscription ? (
                <div className="space-y-3">
                    <p className="text-sm text-foreground">
                        You are subscribed to push notifications.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button type="button" variant="outline" onClick={unsubscribeFromPush} disabled={isLoading}>
                            Unsubscribe
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Enter notification message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                        />
                        <Button type="button" onClick={sendTestNotification} disabled={isLoading || !message.trim()}>
                            Send Test
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-sm text-foreground">
                        You are not subscribed to push notifications.
                    </p>
                    <Button type="button" onClick={handleSubscribe} disabled={isLoading}>
                        Enable Push Notifications
                    </Button>
                </div>
            )}
        </div>
    )
}