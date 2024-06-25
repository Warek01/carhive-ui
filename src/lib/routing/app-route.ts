enum AppRoute {
  HOME = '/',
  LISTINGS = '/listings',
  NEW_LISTING = '/listings/new',
  LISTING_DETAILS = '/listings/details/:listingId',
  PROFILE = '/me',
  REGISTER = '/register',
  LOGIN = '/login',
  ADMIN_DASHBOARD = '/admin',
  ABOUT = '/about',
  ANY = '*',
}

export default AppRoute
