import { UserProvider } from './context/UserProvider.tsx';
import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Toaster from './components/Toaster/Toaster.tsx';
import '@mantine/core/styles.css';

// Pages
import {
	Homepage,
	PageNotFound,
	About,
	Contact,
	CreateProfile,
	Redirect,
	OrderOverview,
	CarOverview,
	CustomerProfile,
	EmployeeOverview,
	CustomerOverview,
	CreateOrder,
	CreateCar,
	UpdateProfile,
} from './pages';

function App() {
	return (
		<UserProvider>
			<MantineProvider>
				<Toaster />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/redirect' element={<Redirect />} />

					{/* Protected Routes */}
					<Route path='/profile' element={<CustomerProfile />} />
					<Route path='/profile/create' element={<CreateProfile />} />
					<Route path='/profile/update' element={<UpdateProfile />} />
					<Route path='/orders/create' element={<CreateOrder />} />
					<Route path='/cars/create' element={<CreateCar />} />
					<Route path='/employee/orders' element={<OrderOverview />} />
					<Route path='/employee/cars' element={<CarOverview />} />
					<Route path='/employee/employees' element={<EmployeeOverview />} />
					<Route path='/employee/customers' element={<CustomerOverview />} />

					{/* Catch-all Route */}
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</MantineProvider>
		</UserProvider>
	);
}

export default App;
