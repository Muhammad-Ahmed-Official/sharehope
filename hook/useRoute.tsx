'use client'

import { useRouter } from 'next/navigation'

export default function useRoute(path:string) {
    const router = useRouter();
    router.push(path)
}
