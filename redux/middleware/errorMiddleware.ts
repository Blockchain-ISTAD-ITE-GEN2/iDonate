import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { setError } from '../features/auth/authSlice'; // Adjust to your slice location
import { ErrorPayload } from '@/lib/auth/type';

const errorMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    // Narrow the action type
    if (isPayloadAction<ErrorPayload>(action) && action.payload?.error) {
        const { status } = action.payload.error;

        switch (status) {
            case 400:
                console.warn('Bad Request: Check your input.');
                break;
            case 401:
                console.warn('Unauthorized: Redirecting to login...');
                break;
            case 403:
                console.warn('Forbidden: Access is denied.');
                break;
            case 404:
                console.warn('Not Found: The requested resource was not found.');
                break;
            case 500:
                console.error('Internal Server Error: Please try again later.');
                break;
            default:
                console.error('Unexpected error occurred.');
                break;
        }

        store.dispatch(
            setError({
                status,
                message: action.payload.error.message || 'An unexpected error occurred.',
            })
        );
    }

    return result;
};

// Helper type guard to narrow action to PayloadAction<ErrorPayload>
function isPayloadAction<T>(action: any): action is PayloadAction<T> {
    return action && typeof action === 'object' && 'payload' in action;
}

export default errorMiddleware;
