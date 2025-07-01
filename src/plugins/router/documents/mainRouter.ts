export default [
  {
    name: "homeview",
    path: "/",
    component: () => import("@/routes/mainRouter.vue"),
    children: [
      {
        path: "",
        components: {
          viewHero: () => import("@/views/viewHero.vue")
        }
      }
    ]
  }
]
