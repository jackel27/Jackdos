export default [
  {
    path: '/',
    name: 'todo',
    component: require('components/Todo')
  },
  // {
  //   path: '/somesubpage',
  //   name: 'some-sub-page',
  //   component: require('components/SomeSubPage')
  // },
  // {
  //   path: '/invitation/:id',
  //   name: 'event-invitation',
  //   component: require('components/EventInvitation')
  // },
  {
    path: '*',
    redirect: '/'
  }
]
