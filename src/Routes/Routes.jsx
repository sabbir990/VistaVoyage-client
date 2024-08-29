import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import AllPackages from "../Pages/All Packages/AllPackages";
import PackageDetails from "../Pages/Package Details/PackageDetails";
import SpecifiedTypedTours from "../Pages/Specified typed tour/SpecifiedTypedTours";
import StoryDetails from "../Pages/Story Details Page/StoryDetails";
import AllStories from "../Pages/All Stories/AllStories";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/My Profile/MyProfile";
import InitialPage from "../Pages/Initial Dashboard Page/InitialPage";
import UpdateProfile from "../Pages/Update profile/UpdateProfile";
import AddPackage from "../Pages/Add Package/AddPackage";
import ManageUsers from "../Pages/Manage users/ManageUsers";
import MyWishlist from "../Pages/My wishlist/MyWishlist";
import WishlistedPackageDetails from "../Pages/Wishlisted Package Details/WishlistedPackageDetails";
import WishlistedCheckout from "../Pages/Wishlisted checkout/WishlistedCheckout";
import Checkout from "../Pages/Checkout package/CheckoutPage";
import Invoice from "../Pages/Invoice/Invoice";
import GuidesProfile from "../Pages/Guide Profile/GuidesProfile";
import AllGuide from "../Pages/All Guides/AllGuide";
import MyBookings from "../Pages/My Bookings/MyBookings";
import MyAssignedTour from "../Pages/My Assigned Tour/MyAssignedTour";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import GuideRoute from "./GuideRoute";
import UserRoute from "./UserRoute";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/all-packages',
                element: <AllPackages />
            },
            {
                path: '/package-details/:id',
                element: <PackageDetails />
            },
            {
                path: '/specified-typed-tour/:type',
                element: <SpecifiedTypedTours />
            },
            {
                path: '/story-details/:id',
                element: <StoryDetails />
            },
            {
                path: '/all-stories',
                element: <AllStories />
            },
            {
                path: '/wishlisted-package-details/:id',
                element: <WishlistedPackageDetails />
            },
            {
                path: '/guide-profile/:id',
                element: <GuidesProfile />
            },
            {
                path: '/all-guides',
                element: <AllGuide />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/wishlisted-checkout/:id',
        element: <WishlistedCheckout />
    },
    {
        path: '/checkout/:id',
        element: <Checkout />
    },
    {
        path: '/invoice/:id',
        element: <PrivateRoute>
            <UserRoute>
                <Invoice />
            </UserRoute>
        </PrivateRoute>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <PrivateRoute>
                    <InitialPage />
                </PrivateRoute>
            },
            {
                path: '/dashboard/my-profile',
                element: <PrivateRoute>
                    <MyProfile />
                </PrivateRoute>
            },
            {
                path: '/dashboard/update-profile',
                element: <PrivateRoute>
                    <UpdateProfile />
                </PrivateRoute>
            },
            {
                path: '/dashboard/add-package',
                element: <PrivateRoute>
                    <AdminRoute>
                        <AddPackage />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: '/dashboard/manage-users',
                element: <PrivateRoute>
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: '/dashboard/my-wishlist',
                element: <PrivateRoute>
                    <UserRoute>
                        <MyWishlist />
                    </UserRoute>
                </PrivateRoute>
            },
            {
                path: '/dashboard/my-bookings',
                element: <PrivateRoute>
                    <UserRoute>
                        <MyBookings />
                    </UserRoute>
                </PrivateRoute>
            },
            {
                path: '/dashboard/my-assigned-tour',
                element: <PrivateRoute>
                    <GuideRoute>
                        <MyAssignedTour />
                    </GuideRoute>
                </PrivateRoute>
            }
        ]
    }
])

export default routes