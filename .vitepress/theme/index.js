import DefaultTheme from 'vitepress/theme'
import './custom.css'

const SCROLL_KEY_PREFIX = 'fire-operator-scroll:'

function getScrollKey() {
  return `${SCROLL_KEY_PREFIX}${window.location.pathname}`
}

function saveScrollPosition() {
  try {
    window.sessionStorage.setItem(getScrollKey(), String(window.scrollY))
  } catch {
    // 浏览器禁用存储时不影响页面使用
  }
}

function restoreScrollPosition() {
  try {
    const value = Number(window.sessionStorage.getItem(getScrollKey()))
    if (Number.isFinite(value) && value > 0) {
      window.scrollTo({ top: value, behavior: 'auto' })
    }
  } catch {
    // 浏览器禁用存储时不影响页面使用
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    let saveTimer
    const save = () => {
      window.clearTimeout(saveTimer)
      saveTimer = window.setTimeout(saveScrollPosition, 100)
    }

    window.addEventListener('scroll', save, { passive: true })
    window.addEventListener('pagehide', saveScrollPosition)
    window.addEventListener('beforeunload', saveScrollPosition)

    const restore = () => window.setTimeout(restoreScrollPosition, 80)
    restore()

    const previousRouteChanged = router.onAfterRouteChanged
    router.onAfterRouteChanged = (to) => {
      previousRouteChanged?.(to)
      restore()
    }
  }
}
