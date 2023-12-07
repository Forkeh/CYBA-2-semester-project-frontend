import { Status } from '../utility/enums.ts';

const API_URL = import.meta.env.VITE_API_URL as string || 'http://localhost:3000';

// Customers

export const getSingleCustomer = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/customers/${id}`);

		if (!response.ok) {
			throw new Error('Error fetching data');
		}

		return await response.json();

	} catch (error: unknown) {
		console.error(error);
	}
}

export const updateOrderStatus = async (id: number, status: Status) => {
	try {
	const response = await fetch(`${API_URL}/orders/${id}/status`, {
		method: 'PATCH',
		headers: {
		'Content-Type': 'application/json'
		},
		body: JSON.stringify({ status })
	});

	if (!response.ok) {
		throw new Error('Error fetching data');
	}

	return await response.json();

	} catch (error: unknown) {
		console.error(error);
	}
}

export const initiateTaskInstance = async (id: number, employeeId: string) => {
    try {
        
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employeeId: employeeId })
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

        const data = await response.json();
        console.log(data);
    
        return data;

    } catch (error: unknown) {
        console.error(error);
    }
}

export const completeSubtaskInstance = async (id: number) => {
    try {
        
    const response = await fetch(`${API_URL}/subtasks/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

        const data = await response.json();
        console.log(data);
    
        return data;

    } catch (error: unknown) {
        console.error(error);
    }
}

