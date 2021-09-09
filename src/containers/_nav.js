export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        // badge: {
        //   color: 'primary',
        //   text: 'NEW'
        // }
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Taxi Booking',
        route: '/buttons',
        icon: 'cil-taxi',
        items: [
          {
            name: 'Trips booking',
            to: '/buttons/standard-buttons'
          },
          {
            name: 'Trips Tracking',
            to: '/buttons/dropdowns'
          },
          {
            name: 'Current status',
            to: '/buttons/button-groups'
          },
          {
            name: 'Follow-up',
            to: '/buttons/brand-buttons'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Attendance / Break ',
        to: '/charts',
        icon: 'cil-address-book'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Reports',
        route: '/icons',
        icon: 'cil-notes',
        items: [
          {
            name: 'Trips Report',
            to: '/icons/coreui-icons',
            // badge: {
            //   color: 'info',
            //   text: 'NEW'
            // }
          },
          {
            name: 'Booking Report',
            to: '/icons/brands'
          },
          {
            name: 'Cancelled Trips',
            to: '/icons/flags'
          },
          {
            name: 'Financial Reports',
            to: '/icons/flags'
          },
          {
            name: 'Top Customers',
            to: '/icons/flags'
          },
          
        ]
      },
      {
       _name: 'CSidebarNavItem',
        name: 'Settings',
        route: '/notifications',
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Users',
        route: '/users',
        icon: 'cil-user',
        items: [
          {
            name: 'Admins',
            to: '/users/admins'
          },
          {
            name: 'Customers',
            to: '/users/users'
          },
          // {
          //   name: 'Modals',
          //   to: '/notifications/modals'
          // }
        ]
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Widgets',
      //   to: '/widgets',
      //   icon: 'cil-calculator',
      //   badge: {
      //     color: 'primary',
      //     text: 'NEW',
      //     shape: 'pill'
      //   }
      // },
      // {
      //   _name: 'CSidebarNavDivider',
      //   _class: 'm-2'
      // },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Extras']
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Pages',
      //   route: '/pages',
      //   icon: 'cil-star',
      //   items: [
      //     {
      //       name: 'Login',
      //       to: '/pages/login'
      //     },
      //     {
      //       name: 'Register',
      //       to: '/pages/register'
      //     },
      //     {
      //       name: 'Error 404',
      //       to: '/pages/404'
      //     },
      //     {
      //       name: 'Error 500',
      //       to: '/pages/500'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Download CoreUI',
      //   href: 'http://coreui.io/vue/',
      //   icon: { name: 'cil-cloud-download', class: 'text-white' },
      //   _class: 'bg-success text-white',
      //   target: '_blank'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Try CoreUI PRO',
      //   href: 'http://coreui.io/pro/vue/',
      //   icon: { name: 'cil-layers', class: 'text-white' },
      //   _class: 'bg-danger text-white',
      //   target: '_blank'
      // }
    ]
  }
]