import { useCallback, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash'
export function useFilter({ route, values, only, wait = 500 }) {
 
    const [isProcessing, setIsProcessing] = useState(false);
 
    const reload = useCallback(
        debounce((query) => {
            router.get(route, pickBy(query), {
                only: only,
                onStart: () => {
                    setIsProcessing(true)
                },
                onProgress: () => {
                    setIsProcessing(true)
                },
                onSuccess: () => {
                    setIsProcessing(false)
                },
                onFinish: () => {
                    setIsProcessing(false)
                },
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, wait),
        [],
    );
 
    useEffect(() => reload(values), [values, reload]);
 
    return { values, isProcessing };
}