import React, { useEffect, useState } from 'react';
import FormLayout from '../Form/FormLayout.tsx';
import CarSelect from './CarSelect.tsx';
import DatePicker from './DatePicker.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox.tsx';

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece]
interface newOrder {
	orderStartDate: string,
	carId: number,
	customerId: string,
	tasks: { id: number }[]
}

async function createOrder(newOrder: newOrder) {
	return await fetch(`http://localhost:3000/orders`, {
		method: 'POST',
		body: JSON.stringify(newOrder),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export default function CreateOrderForm({customer}: {customer: ICustomer}) {
	const [tasks, setTasks] = useState<null | IAPITask[]>(null);
	const [cars, setCars] = useState<null | ICar[]>(null);
	const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
	const [date, setDate] = useState<null | TDate>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({

	});

	useEffect(() => {
		async function getTasksAndCars() {
			try {
				const promiseTasks = await fetch('http://localhost:3000/tasks');
				const promiseCars = await fetch(`http://localhost:3000/customers/${customer.id}/cars`);
				const promiseBookedDates = await fetch('http://localhost:3000/orders/dates');

				promiseTasks.ok ? setTasks(await promiseTasks.json()) : console.log('Promise Tasks is nok ok');
				promiseCars.ok ? setCars(await promiseCars.json()) : console.log('Promise Cars is nok ok');
				promiseBookedDates.ok ? setUnavailableDates(await promiseBookedDates.json()) : console.log('Promise unavailableDates is nok ok');
			} catch (error: unknown) {
				console.log((error as Error).message);
			}
		}

		getTasksAndCars();
	}, []);

	async function onSubmit(data) {
		console.log("SUBMIT");
	}onSubmit as SubmitHandler<any>

	return(
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{tasks?.map((task) => (
					<TaskCheckbox
						key={task.id}
						task={task}
					/>
				))}

				<CarSelect cars={cars} register={register} errors={errors}/>
				<DatePicker unavailableDates={unavailableDates} date={date} setDate={setDate}/>

				<div className='form-btn-wrapper'>
					<button type='submit'> Opret konto</button>
				</div>
			</form>
		</div>
	)
}