import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ForgotPassword from './Auth/ForgotPassword';
// import Success from './Auth/Success';

import ResetPassword from './Auth/ResetPassword';
import TwoFactor from './Auth/TwoFactor';
import AccountActivation from './Auth/AccountActivation';
import AdminDashboard from './Admin/AdminDashboard';


import NotFound from './NotFound';
import Users from './Admin/Users';
import Tickets from './Admin/Tickets';
import TicketDetails from './Admin/TicketDetails';
import UserDetails from './Admin/UserDetails';

import Currencies from './Admin/Currencies';
import CreateCurrency from './Admin/CreateCurrency';
import AdminResetPassword from './Admin/AdminResetPassword';


import EditCurrency from './Admin/EditCurrency';

import Kycs from './Admin/Kycs';
import KycDetails from './Admin/KycDetails';

import PaymentGateways from './Admin/PaymentGateways';
import EditPaymentGateway from './Admin/EditPaymentGateway';
import CreatePaymentGateway from './Admin/CreatePaymentGateway';

import Orders from './Admin/Orders';
import OrderDetails from './Admin/OrderDetails';
import Referrals from './Admin/Referrals';
import Reports from './Admin/Reports';
import Notifications from './Admin/Notifications';

import TransactionDetails from './Admin/TransactionDetails';
import Transactions from './Admin/Transactions';
import CurrencyDetails from './Admin/CurrencyDetails';


const App = () => {

  const navigateTo = (path) => {
    window.location.href = path;
  };



  return (
    <Router>
      <Routes>
 
        {/* Auth routes go here */}
        <Route path={'/'} element={<Login navigate={navigateTo} />}/>
        <Route path={'/login'} element={<Login navigate={navigateTo} />}/>
        <Route path={'/signup'} element={<Signup navigate={navigateTo} />} />
        <Route path={'/forgot-password'} element={<ForgotPassword navigate={navigateTo} />} />
        <Route path={'/login/mfa'} element={<TwoFactor navigate={navigateTo} />} />
        <Route path={'/account-activation/:activationToken'} element={<AccountActivation />} />
        <Route path={'/reset-password/:resetToken'} element={<ResetPassword />} />

        {/* Admin routes go here */}

        <Route path={'/admin/dashboard'} element={<AdminDashboard />} />
        <Route path={'/admin/reset-password'} element={<AdminResetPassword />} />

        <Route path={'/admin/users'} element={<Users />} />
        <Route path={'/admin/users/details/:userId'} element={<UserDetails />} />

        <Route path={'/admin/kycs'} element={<Kycs />} />
        <Route path={'/admin/kycs/details/:kycId'} element={<KycDetails />} />


        <Route path={'/admin/tickets'} element={<Tickets />} />
        <Route path={'/admin/tickets/details/:ticketId'} element={<TicketDetails />} />


        <Route path={'/admin/currencies'} element={<Currencies />} />
        <Route path={'/admin/currencies/create-currency'} element={<CreateCurrency />} />
        <Route path={'/admin/currencies/edit-currency/:currencyId'} element={<EditCurrency />} />
        <Route path={'/admin/currencies/details/:currencyId'} element={<CurrencyDetails />} />


        <Route path={'/admin/transactions'} element={<Transactions />} />
        <Route path={'/admin/transactions/details/:transactionId'} element={<TransactionDetails />} />


        <Route path={'/admin/payment-gateways'} element={<PaymentGateways />} />
        <Route path={'/admin/payment-gateways/create-gateway'} element={<CreatePaymentGateway />} />
        <Route path={'/admin/payment-gateways/edit-gateway/:gatewayId'} element={<EditPaymentGateway />} />


        <Route path={'/admin/orders'} element={<Orders />} />
        <Route path={'/admin/orders/details/:orderId'} element={<OrderDetails />} />


        <Route path={'/admin/referrals'} element={<Referrals />} />

        <Route path={'/admin/reports'} element={<Reports />} />


        <Route path={'/admin/notifications'} element={<Notifications />} />

        <Route path={'/*'} element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
