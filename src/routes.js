import React from 'react'
import Betlist from './views/theme/betlist/Betlist'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
// Notifications


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Bet List', element: Colors, exact: true },
  { path: '/theme/user-management', name: 'User', element: Colors },
  { path: '/theme/bet-list', name: 'User', element: Betlist },
  { path: '/theme/content', name: 'Content', element: Typography },
 
]

export default routes
