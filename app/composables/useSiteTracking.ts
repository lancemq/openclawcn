import { track } from '@vercel/analytics'

type TrackingValue = string | number | boolean | null | undefined

export function useSiteTracking() {
  const route = useRoute()

  function trackAction(name: string, properties: Record<string, TrackingValue> = {}) {
    track(name, {
      page: route.path,
      ...properties,
    })
  }

  return {
    trackAction,
  }
}
