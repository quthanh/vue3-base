export interface Router {
  name: string;
  query?: { [key: string]: string };
  params?: { [key: string]: string };
}

export interface SidebarRouter {
  id?: string;
  name: string;
  icon?: string;
  iconClass?: string;
  permissions: string[]; // use fetch me return permission
  router: Router;
  isChildren?: boolean;
  children?: SidebarRouter[];
  allowView?: string[]; // active menu when link another route name ex: ['user_edit']
}

const sidebar: SidebarRouter[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "dashboard",
    iconClass: "svg-line",
    permissions: [],
    router: {
      name: "dashboard",
    },
  },
  // {
  //   id: "admin",
  //   name: "Admin",
  //   icon: "user-octagon",
  //   router: {
  //     name: "user",
  //   },
  //   permissions: [],
  //   children: [
  //     {
  //       name: "User",
  //       permissions: ["users.index"],
  //       router: {
  //         name: "user",
  //       },
  //     },
  //     {
  //       name: "Role",
  //       permissions: ["roles.index"],
  //       router: {
  //         name: "role",
  //       },
  //     },
  //   ],
  // },
];

export default sidebar;
