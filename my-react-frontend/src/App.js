import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import SignupPage from './signup/signuppage'; 
import LoginPage from './login/loginpage';
import LogOutPage from './logout/logoutpage';
import Listings from './listings/listingspage';
import LandListingForm from './listings/components/landlistingform';
import LandEntries from './listings/components/landentries';
import UpdateListing from './listings/components/updateentries';
import DeleteListing from './listings/components/deleteentries';
import ImageAndMapManagement from './listings/components/updateimageand map';
import AddLandMapAndImage from './listings/components/addimagesnmap';
import DeleteImageAndMapManagement from './listings/components/deleteimageormap';
import AddParcel from './listings/components/addparcels';
import UpdateEntries from './listings/profile/profile';
import Parcels from './listings/components/parcelentries';
import ParcelsDetails from './listings/components/fetchParcelDetails';
import ParcelUpdateComponent from './listings/updateparcelentry';
import UserBids from './landbids/components/deletenupdatebid';
import LeaseListings from './lease/lease';
import SalesListings from './listings/sale/sale';
import UserNotifications from './notications/notifications';
import LawyerProfileCreation from './profiles/components/LawyerProfileCreation';
import SurveyorProfileCreation from './profiles/SurveyorProfileCreation';
import BuyerProfileCreation from './profiles/components/BuyerProfileCreation';
import SellerProfileCreation from './profiles/components/SellerProfileCreation';
import SurveyorList from './surveyors/SurveyorsList';
import LawyerList from './lawyers/LawyersList';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';




function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOutPage/>} />
        <Route path="/lands" element={<LandEntries />} />
        <Route path="/sell" element={< LandListingForm/>} />
        <Route path="/listings" element={< Listings/>} />
        <Route path="/my-notifs" element={<UserNotifications/>}/>
        <Route path="/update-listing/:id" element={<UpdateListing />} />
        <Route path="/delete-listing/:id" element={<DeleteListing />} />
        <Route path="/update-image-map/:landListingId" element={<ImageAndMapManagement/>} />
        <Route path="/add-image-map/:land_listing_id" element={<AddLandMapAndImage/>} />
        <Route path="/delete-image/:landListingId" element={<DeleteImageAndMapManagement/>}></Route>
        <Route path="/add-land-parcel/:landListingId" element={<AddParcel/>}></Route>
        <Route path="/profile" element={<UpdateEntries/>}></Route>
        <Route path="/my-bids" element={<UserBids/>}></Route>
        <Route path="/parcel/:landListingId" element={<Parcels/>}></Route>
        <Route path="/update-parcel-details/:landListingId" element={<ParcelsDetails/>}/>
        <Route path="/update-parcel-entry/:parcelId" element={<ParcelUpdateComponent/>}/>       
        <Route path="/make-bid" element={<Parcels/>}/>
        <Route path="/sales" element={<SalesListings/>}/>
        <Route path="/lease" element={<LeaseListings/>}/>
        <Route path="/buyer-profile" element={<BuyerProfileCreation/>}/>
        <Route path="/seller-profile" element={<SellerProfileCreation/>}/>
        <Route path="/lawyer-profile" element={<LawyerProfileCreation/>}/>
        <Route path="/surveyor-profile" element={<SurveyorProfileCreation/>}/>
        <Route path="/lawyer-list" element={<LawyerList/>}/>
        <Route path="/surveyor-list" element={<SurveyorList/>}/>
        </Routes>
    </Router>
    
  );
}

export default App;
