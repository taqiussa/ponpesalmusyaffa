import { useCallback, useEffect, useState } from 'react';
import { debounce, pickBy } from 'lodash';
import { router } from '@inertiajs/react';

export function useFilterDependOn({ route, values, only, depend = [], wait = 500 }) {

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

        useEffect(() => reload(values), depend);

        return { values, isProcessing };
}
