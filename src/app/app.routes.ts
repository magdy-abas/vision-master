import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { dashGuard } from './core/guard/dash.guard';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent, title: "Home" },
    { 
        path: "events", 
        loadComponent: () => import('./components/events/events.component').then(m => m.EventsComponent), 
        title: "Events" 
    },
    { 
        path: "products", 
        loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent), 
        title: "Products" 
    },
    { 
        path: "contact", 
        component: ContactusComponent, 
        title: "Contact Us" 
    },
    { 
        path: "dashboard", 
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        title: "Dashboard", 
        canActivate: [dashGuard] 
    },
    { 
        path: "aboutus", 
        component: AboutusComponent, 
        title: "About Us" 
    },
    { 
        path: "prodcutDetails/:id", 
        loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent), 
        title: "Product Details" 
    },
    { 
        path: "**", 
        component: NotfoundComponent, 
        title: "Not Found" 
    }
];
