export function createPageUrl(pageName) {
  const routes = {
    Home: '/',
    About: '/about',
    Services: '/services',
    Contact: '/contact',
  }
  return routes[pageName] || `/${String(pageName).toLowerCase().replace(/\s+/g, '-')}`
}
