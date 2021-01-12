export type themeTypes = 'dark' | 'light' | 'system'

function prefersDark() {
  return (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
}

export function initTheme() {
  if (localStorage.getItem('theme') === 'dark' || prefersDark()) {
    document.querySelector('html')?.classList.add('dark')
  } else {
    document.querySelector('html')?.classList.remove('dark')
  }
}

export function getCurrent(): themeTypes {
  const type = localStorage.getItem('theme')
  if (type === 'dark' || type === 'light') return type
  return 'system'
}

export function setDark() {
  localStorage.setItem('theme', 'dark')
  document.querySelector('html')?.classList.add('dark')
}

export function setLight() {
  localStorage.setItem('theme', 'light')
  document.querySelector('html')?.classList.remove('dark')
}

export function setSystem() {
  localStorage.removeItem('theme')
  if (prefersDark()) {
    document.querySelector('html')?.classList.add('dark')
  } else {
    document.querySelector('html')?.classList.remove('dark')
  }
}
