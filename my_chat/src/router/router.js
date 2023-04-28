import registrationForm from "@/components/registrationForm"
import signInForm from '@/components/signInForm';
import roomContainer from '@/components/roomContainer';
import { createRouter } from "vue-router"
import { createWebHistory } from "vue-router"

const routes = [
  { path: '/', redirect: '/login' },

  {
    path: '/registration',
    component: registrationForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: signInForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/rooms',
    component: roomContainer,
    meta: { requiresAuth: true }
  }

]
const router= createRouter(
    {
        routes,
        history:createWebHistory(process.env.BASE_URL)
    }
)
export default router