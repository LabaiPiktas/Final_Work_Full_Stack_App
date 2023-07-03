import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import LoginLayout from "../layouts/LoginLayout";
import Main from "../pages/Main/Main";
import Contacts from "../pages/Contacts/Contacts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Projects from "../pages/Projects/Projects";
import NewProject from "../pages/NewProject/NewProject";
import Project from "../pages/Project/Project";
import EditProject from "../pages/EditProject/EditProject";
import UserMenagement from "../pages/UserMenagement/UserMenagement";

export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/";
export const MAIN_ROUTE = "/";
export const CONTACTS_ROUTE = "/contacts";
export const PROFILE_ROUTE = "/profile";
export const PROJECTS_ROUTE = "/projects";
export const NEW_PROJECT_ROUTE = `${PROJECTS_ROUTE}/new`;
export const PROJECT_ROUTE = `${PROJECTS_ROUTE}/:id`;
export const EDIT_PROJECT_ROUTE = `${PROJECT_ROUTE}/edit`;
export const USERMENAGEMENT_ROUTE = `${PROJECTS_ROUTE}/usermenagement`;

// kol neesu prisijnugęs
export const loginRoutes = {
  Layout: LoginLayout,
  routes: [
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
  ],
};

// kai esu prisijungęs
export const authenticatedRoutes = {
  Layout: AuthenticatedLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: CONTACTS_ROUTE,
      Component: Contacts,
    },
    {
      path: PROFILE_ROUTE,
      Component: Profile,
    },
    {
      path: PROJECTS_ROUTE,
      Component: Projects,
    },
    {
      path: NEW_PROJECT_ROUTE,
      Component: NewProject,
    },
    {
      path: PROJECT_ROUTE,
      Component: Project,
    },
    {
      path: EDIT_PROJECT_ROUTE,
      Component: EditProject,
    },
    {
      path: USERMENAGEMENT_ROUTE,
      Component: UserMenagement,
    },
  ],
};

export const topbarNavigationItems = [
  { route: MAIN_ROUTE, title: "Home" },
  { route: PROJECTS_ROUTE, title: "Projects" },
  { route: CONTACTS_ROUTE, title: "Contacts" },
];
