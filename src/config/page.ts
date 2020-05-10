type PageRoute = { path: string; name: string, isAuth: boolean; children?: PageRoute[] };

const pages: PageRoute[] = [
  { path: '/', name: 'home', isAuth: false },
  { path: '/users', name: 'users', isAuth: false },
]

export default pages

// export default [
//   {
//     path: '/manage', name: 'manage', isAuth: true,
//     children: [
//       { path: "picture", name: "picture", isAuth: true },
//       { path: "article", name: "article", isAuth: true },
//       { path: "category", name: "category", isAuth: true },
//       { path: "apply", name: "apply", isAuth: true },
//     ]
//   },
//   { path: '/login', name: 'login', isAuth: false },
// ]