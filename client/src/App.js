import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './Pages/User/logIn';
import SignUp from './Pages/User/signUp';
import Home from './Pages/User/home';
import { Toaster } from 'react-hot-toast';
import '../src/Pages/coman.css'
import { useSelector } from 'react-redux';
import ProtectedRoute from './publicAndProtect/protectedRoute';
import PublicRoute from './publicAndProtect/publicRoute';
import Forgotpassword from './Pages/User/forgotPassword';
import SetPassword from './Pages/User/setPassword';
import ArtistProtectedRoute from './publicAndProtect/Artist/protectedRoute';
import AritstPublicRoute from './publicAndProtect/Artist/publicRoute'
import AdminPublicroute from './publicAndProtect/admin/adminPublicroute'
import AdminProtectedRoute from './publicAndProtect/admin/adminProtectedRoute';
import AdminSetPassword from './Pages/Admin/setPassword'
import ArtistLogin from './Pages/Aritst/logIn';
import ArtistSignup from './Pages/Aritst/signUp';
import AristsetPassword from './Pages/Aritst/setPassword'
import OtpValidationForm from './Pages/Aritst/otpvalidation';
import ArtistHome from './Pages/Aritst/home';
import ArtistforgotPassword from './Pages/Aritst/forgotPassword';
import Adminlogin from './Pages/Admin/logIn';
import AdminHome from './Pages/Admin/home';
import ForgotPasswordAdmin from './Pages/Admin/forgotPassword';
import Otp from './Pages/User/otp';
import UserList from './Pages/Admin/userList';
import ArtistList from './Pages/Admin/artistList';
import ListBanner from './Pages/Admin/listBanner';
import AddBanner from './Pages/Admin/addBanner';
import Category from './Pages/Admin/category';
import AddCategory from './Pages/Admin/addCategory';
import ArtistDetailsForm from './Pages/Aritst/artistDetailsForm';
import Artist from './Pages/User/artist';
import ArtistView from './Pages/User/artistView';
import BookArist from './Pages/User/bookArist';
import Notification from './Pages/Aritst/notification';
import ViewBooking from './Pages/Aritst/viewBooking';
import Bookings from './Pages/Aritst/bookings';
import ArtistAdminView from './Pages/Admin/artistView';
import UserProfile from './Pages/User/userProfile';
import EditProfile from './Pages/User/editProfile';
import ArtistProfile from './Pages/Aritst/artistProfile';
import AritistEditProfile from './Pages/Aritst/editProfile';
import UserNotification from './Pages/User/userNotification';


function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    < BrowserRouter >
      {loading && (< div className='spinner' >
        <div class="spinner-border" role="status">
        </div>
      </div>)}
      <Toaster
        position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute>< LogIn /></PublicRoute>} />
        <Route path='/signUp' element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path='/otp' element={<PublicRoute><Otp /></PublicRoute>} />
        <Route path='/forgot' element={<PublicRoute><Forgotpassword /></PublicRoute>} />
        <Route path='/setpassword' element={<PublicRoute><SetPassword /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute>< Home /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute>< UserProfile /></ProtectedRoute>} />
        <Route path='/editprofile' element={<ProtectedRoute>< EditProfile /></ProtectedRoute>} />
        <Route path='/artist-show' element={<ProtectedRoute>< Artist /></ProtectedRoute>} />
        <Route path='/artist-single-show' element={<ProtectedRoute>< ArtistView /></ProtectedRoute>} />
        <Route path='/book-artist' element={<ProtectedRoute>< BookArist /></ProtectedRoute>} />
        <Route path='/notification' element={<ProtectedRoute>< UserNotification /></ProtectedRoute>} />
        {/* Artist Side */}
        <Route path='/artist/login' element={<AritstPublicRoute>< ArtistLogin /></AritstPublicRoute>} />
        <Route path='/artist/signUp' element={<AritstPublicRoute><ArtistSignup /></AritstPublicRoute>} />
        <Route path='/artist/forgot' element={<ArtistforgotPassword />} />
        <Route path='/artist/setpassword' element={<AristsetPassword />} />
        <Route path='/artist/otvalidation' element={<OtpValidationForm />} />
        <Route path='/artist' element={<ArtistProtectedRoute>< ArtistHome /></ArtistProtectedRoute >} />
        <Route path='/artist/profile' element={<ArtistProtectedRoute>< ArtistProfile /></ArtistProtectedRoute >} />
        <Route path='/artist/edit-profile' element={<ArtistProtectedRoute>< AritistEditProfile /></ArtistProtectedRoute >} />
        <Route path='/artist/artistdetailsform' element={<ArtistProtectedRoute><ArtistDetailsForm /></ArtistProtectedRoute >} />
        <Route path='/artist/notification' element={<ArtistProtectedRoute><Notification /></ArtistProtectedRoute >} />
        <Route path='/artist/viewbooking' element={<ArtistProtectedRoute><  ViewBooking /></ArtistProtectedRoute >} />
        <Route path='/artist/bookings' element={<ArtistProtectedRoute><  Bookings /></ArtistProtectedRoute >} />

        {/* Admin Side */}
        <Route path='/admin/login' element={<AdminPublicroute>< Adminlogin /></AdminPublicroute >} />
        <Route path='/admin/forgotpassword' element={<ForgotPasswordAdmin />} />
        <Route path='/admin/setpassword' element={<AdminSetPassword />} />
        <Route path='/admin' element={<AdminProtectedRoute>< AdminHome /></AdminProtectedRoute>} />
        <Route path='/admin/userlist' element={<AdminProtectedRoute><UserList /></AdminProtectedRoute>} />
        <Route path='/admin/artistList' element={<AdminProtectedRoute><ArtistList /></AdminProtectedRoute >} />
        <Route path='/admin/banner' element={<AdminProtectedRoute><ListBanner /></AdminProtectedRoute >} />
        <Route path='/admin/artistdetails' element={<AdminProtectedRoute><ArtistAdminView /></AdminProtectedRoute >} />
        <Route path='/admin/Addbanner' element={<AdminProtectedRoute><AddBanner /></AdminProtectedRoute >} />
        <Route path='/admin/category' element={<AdminProtectedRoute><Category /></AdminProtectedRoute >} />
        <Route path='/admin/addcategory' element={<AdminProtectedRoute><AddCategory /></AdminProtectedRoute >} />
      </Routes>
    </BrowserRouter >
  );
}
export default App;
