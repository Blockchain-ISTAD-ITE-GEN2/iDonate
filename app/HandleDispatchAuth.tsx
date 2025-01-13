
'use client'

import { useHandleDispatchAuth } from '@/hooks/useHandleDispatchNextAuth';

/* Create a function to use the handleDispatch function 
from the useHandleDispatchNextAuth hook.*/
export function HandleDispatchAuth(res: any) {
    /* Call the useHandleDispatchNextAuth hook to get 
    the handleDispatch function. */
    const handleDispatch = useHandleDispatchAuth();
    /* return the handleDispatch function with the res 
    parameter */
    return handleDispatch(res);
}