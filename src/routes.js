import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/login/Login'))
const User = React.lazy(() => import('./views/user/User'));
const Slotlist = React.lazy(() => import('./views/slotlist/Slotlist'))
const UserProfile = React.lazy(() => import('./views/userprofile/Userprofile'))
const AddSlot = React.lazy(() => import('./views/slot/AddSlot'))
const SlotDetail = React.lazy(() => import('./views/slotdetail/Slotdetail'))
// Notifications

const routes = [
 

  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', element: Login,exact: true },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
   { path: '/user', name: 'User', element: User },
   { path: '/slotlist', name: 'Slotlist', element: Slotlist },
   { path: '/slot-detail', name: 'SlotDetail', element: SlotDetail },
   { path: '/userprofile/:id', name: 'UserProfile', element: UserProfile },
   { path: '/slot', name: 'AddSlot', element: AddSlot }
 
]

export default routes
