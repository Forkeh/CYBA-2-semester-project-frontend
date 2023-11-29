import './CustomerProfile.css';

export default function CustomerProfileGrid({ children }: { children: React.ReactNode }) {
	return <section className='customer-view-grid'>{children}</section>;
}
