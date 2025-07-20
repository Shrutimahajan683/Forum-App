import { isAuthenticated } from "./auth.tsx"

export function notImplemeted() {
    if (!isAuthenticated()) {
        return
    }
    alert('Function not implemented')
}