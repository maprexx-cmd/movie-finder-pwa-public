// Google Play Billing integration
// Questo file gestisce gli acquisti in-app per Android

export interface PremiumStatus {
  isPremium: boolean
  expiryDate?: string
}

// Funzione per verificare se l'utente ha Premium attivo
export async function checkPremiumStatus(): Promise<PremiumStatus> {
  // In ambiente web, usa localStorage
  if (typeof window !== "undefined" && !isNativeApp()) {
    const hasUnlocked = localStorage.getItem("hasPremiumSubscription") === "true"
    return { isPremium: hasUnlocked }
  }

  // In ambiente nativo Android, usa Google Play Billing
  try {
    // @ts-ignore - Capacitor plugin viene caricato dinamicamente
    const { Purchase } = await import("@capawesome/capacitor-purchases")
    const result = await Purchase.getCustomerInfo()

    const isPremium = result.customerInfo?.entitlements?.active?.["premium"] !== undefined
    const expiryDate = result.customerInfo?.entitlements?.active?.["premium"]?.expirationDate

    return { isPremium, expiryDate }
  } catch (error) {
    console.error("[v0] Error checking premium status:", error)
    return { isPremium: false }
  }
}

// Funzione per avviare l'acquisto Premium
export async function purchasePremium(): Promise<boolean> {
  // In ambiente web, mostra alert
  if (typeof window !== "undefined" && !isNativeApp()) {
    alert("Acquisto Premium disponibile solo nell'app Android")
    return false
  }

  try {
    // @ts-ignore
    const { Purchase } = await import("@capawesome/capacitor-purchases")
    const result = await Purchase.purchasePackage({
      identifier: "premium_monthly_trial", // Updated ID for monthly subscription with trial
    })

    return result.customerInfo?.entitlements?.active?.["premium"] !== undefined
  } catch (error) {
    console.error("[v0] Error purchasing premium:", error)
    return false
  }
}

// Verifica se l'app è in ambiente nativo
function isNativeApp(): boolean {
  return typeof window !== "undefined" && (window as any).Capacitor !== undefined
}

// Inizializza Google Play Billing al caricamento dell'app
export async function initializeBilling() {
  if (!isNativeApp()) return

  try {
    // @ts-ignore
    const { Purchase } = await import("@capawesome/capacitor-purchases")
    // API Key is configured in android/app/src/main/assets/capacitor.config.json
    // This is only used in native Android builds, not in web version
    await Purchase.configure({})
    console.log("[v0] Google Play Billing initialized")
  } catch (error) {
    console.error("[v0] Error initializing billing:", error)
  }
}
