import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../helpers/checkUser';
import { isAdmin } from './checkAdmin';
// import { useAuthStore,useUsersStore } from '../stores';
import {
  HomeView, 
  TripListView, TripInfoView, SavedTripListView,PrivacyView,
  
} from '../views';


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: HomeView },
        { path: '/trips', component: TripListView ,meta: { requiresAuth: true }},
        { path: '/savedTrips', component: SavedTripListView ,meta: { requiresAuth: true }},
        { path: '/tripinfo/:id',name:"tripinfo", component: TripInfoView,meta: { showFooter: false }  },
        { path: '/privacy', component: PrivacyView,  },





        // { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    console.log("authRequired",authRequired)



    // let a_token=null
    // let r_token=null
    //  a_token=localStorage.getItem("a_token")
    //  r_token=localStorage.getItem("r_token")
    //  const authenticated = isAuthenticated();
    console.log("issadddminnn",isAdmin())
    console.log("isAuthenticatedisAuthenticated",isAuthenticated())

     if (to.meta.requiresAuth && !isAuthenticated()) {
      next('/login');
    } else if (to.meta.requiresGuest && isAuthenticated()) {
      router.push('/');
    } else {
      next();
    }

});
