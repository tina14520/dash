import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Attendance = () => import('@/views/Attendance/Attendance')
const Settings=()=> import('@/views/settings/Settings')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - taxi Booking
const TripBooking = () => import('@/views/taxiBooking/TripBooking')
const CurrentStatus = () => import('@/views/taxiBooking/CurrentStatus')
const TripsTracking = () => import('@/views/taxiBooking/TripsTracking')
const FollowUp = () => import('@/views/taxiBooking/FollowUp')


// Views - Reports
const TripsReports = () => import('@/views/reports/TripsReports');
const BookingReports = () => import('@/views/reports/BookingReports');
const CancelledTrips = () => import('@/views/reports/CancelledTrips');
const FinancialReports = () => import('@/views/reports/FinancialReports');
const TopCustomers = () => import('@/views/reports/TopCustomers');


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
// Users
const Customers = () => import('@/views/users/Customers')
const Admins=()=> import ('@/views/users/Admins')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'users',
          redirect: '/users/admins',
          name: 'Users',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'admins',
              name: 'Admins',
              component: Admins
            },
            {
              path: 'customers',
              name: 'Customers',
              component: Customers
            },
          ]
        },
        {
          path: 'attendance&break',
          name: 'Attendance & Break',
          component: Attendance
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: 'taxiBooking',
          redirect: '/taxiBooking/trip-booking',
          name: 'Taxi Booking',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'trip-booking',
              name: 'Trip Booking',
              component: TripBooking
            },
            {
              path: 'current-status',
              name: 'Current Status',
              component: CurrentStatus
            },
            {
              path: 'trips-tracking',
              name: 'Trips Tracking',
              component: TripsTracking
            },
            {
              path: 'follow-up',
              name: 'Follow Up',
              component: FollowUp
            }
          ]
        },
        {
          path: 'reports',
          redirect: '/reports/trips-reports',
          name: 'Trips Reports',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'trips-reports',
              name: 'Trips Reports',
              component: TripsReports
            },
            {
              path: 'booking-reports',
              name: 'Booking Reports',
              component: BookingReports
            },
            {
              path: 'cancelled-trips',
              name: 'Cancelled Trips',
              component: CancelledTrips
            },
            {
              path: 'financial-reports',
              name: 'Financial Reports',
              component: FinancialReports
            },
            {
              path: 'top-customers',
              name: 'Top Customers',
              component: TopCustomers
            },
          ]
        },
        {
          path: 'users',
          redirect: '/users',
          name: 'Users',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'admins',
              name: 'Admins',
              component: Admins
            },
            {
              path: 'customers',
              name: 'Customers',
              component: Customers
            },
          ]
        }
      ]
    },
    {
      path: 'settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
      ]
    }
  ]
}

