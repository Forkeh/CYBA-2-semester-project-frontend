import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchRegistrationNumber from './SearchRegistrationNumber.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormLayout from '../Form/FormLayout.tsx';

interface IAPICar {
	registrationNumber: string,
	vinNumber: string,
	brand: string,
	model: string,
	modelVariant: string,
	firstRegistration: string,
	lastInspectionDate: string,
	lastInspectionResult: string,
	lastInspectionKind: string,
}

interface INewCar extends IAPICar {
	customerId: string,
	mileage: number,
}

type inputs = {
	mileage: string
	vinNumber: string,
	brand: string,
	model: string,
	modelVariant: string,
	firstRegistration: string,
	lastInspectionDate: string,
	lastInspectionResult: string,
	lastInspectionKind: string,
}

async function createCar(newCar: INewCar) {
	return await fetch(`http://localhost:3000/cars`, {
		method: 'POST',
		body: JSON.stringify(newCar),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export default function CreateCarForm({ customer }: { customer: ICustomer }) {
	const [APIResult, setAPIResult] = useState<IAPICar | null>(null);
	const [registrationNumber, setRegistrationNumber] = useState('');
	const navigate = useNavigate();

	const values = APIResult;


	const {
		register,
		handleSubmit,
		formState: { errors },

	} = useForm<inputs>({
			values
	});

	async function onSubmit(data: inputs) {
		console.log("Submit");
		console.log(APIResult?.vinNumber);

		const newCar: INewCar = {
			...data,
			customerId: customer.id,
			registrationNumber: registrationNumber,
			mileage: parseInt(data.mileage),
		};

		console.log(newCar);

		try {
			const res = await createCar(newCar);
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				navigate('/redirect');
			}
		} catch (error) {
			console.log((error as Error).message);
		}
	}onSubmit as SubmitHandler<inputs>;


	return (
		<>
			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<SearchRegistrationNumber
					setAPIResult={setAPIResult}
					setRegistrationNumber={setRegistrationNumber}
					registrationNumber={registrationNumber}
				/>

				<label htmlFor='mileage'>K/m kørt</label>
				<input type='tel' placeholder='Maks 6 cifre' pattern='[0-9]{0,6}' {...register('mileage', { required: true })} />
				{errors.mileage && <span>Km/t kørt skal udfyldes</span>}

				<label htmlFor='vinNumber'>STEL-nr</label>
				<input disabled={true}   {...register('vinNumber', { required: true })} />
				{errors.vinNumber && <span>STEL-nr skal udfyldes</span>}

				<label htmlFor='brand'>Mærke</label>
				<input disabled={true}  {...register('brand', { required: true })} />
				{errors.brand && <span>Mærke skal udfyldes</span>}

				<label htmlFor='model'>Model</label>
				<input disabled={true}  {...register('model', { required: true })} />
				{errors.model && <span>Model skal udfyldes</span>}

				<label htmlFor='modelVariant'>Variant</label>
				<input pattern='[0-9]{4}' disabled={true}  {...register('modelVariant', { required: true })} />
				{errors.modelVariant && <span>Variant skal udfyldes</span>}

				<label htmlFor='firstRegistration'>Første registreringsdato</label>
				<input disabled={true} {...register('firstRegistration', { required: true })} />
				{errors.firstRegistration && <span>Første registreringsdato skal udfyldes</span>}

				<label htmlFor='lastInspectionDate'>Sidste inspektionsdato</label>
				<input disabled={true}  {...register('lastInspectionDate', { required: true })} />
				{errors.lastInspectionDate && <span>Sidste inspektionsdato skal udfyldes</span>}

				<label htmlFor='lastInspectionResult'>Sidste inspektionsresultat</label>
				<input disabled={true} {...register('lastInspectionResult', { required: true })} />
				{errors.lastInspectionResult && <span>Sidste inspektionsresultat skal udfyldes</span>}

				<label htmlFor='lastInspectionKind'>Sidste inspektionstype</label>
				<input disabled={true}  {...register('lastInspectionKind', { required: true })} />
				{errors.lastInspectionKind && <span>Sidste inspektionstype skal udfyldes</span>}

				<div className='form-btn-wrapper'>
					<button type='submit'> Opret konto</button>
				</div>
			</FormLayout>
		</>
	);
}