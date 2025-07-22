export default [
  {
    path: '/',
    component: () => import('@/routes/mainRouter.vue'),
    children: [
      {
        path: '',
        name: 'homeView',
        components: {
          ViewProducts: () => import('@/views/viewProducts.vue'),
        },
      },
    ],
  },
]
