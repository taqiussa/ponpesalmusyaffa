import React, { useEffect, useState } from 'react';

const Loading = ({ isProcessing }) => {
    const [loadingWidth, setLoadingWidth] = useState(0);

    useEffect(() => {
        let interval;
        if (isProcessing) {
            interval = setInterval(() => {
                setLoadingWidth((prevWidth) => (prevWidth >= 100 ? 0 : prevWidth + 10));
            }, 100);
        } else {
            setLoadingWidth(0);
        }
        return () => clearInterval(interval);
    }, [isProcessing]);

    if (!isProcessing) return null;

    return (
        <div className="relative w-full h-24 flex items-center justify-center">
            <div className="relative h-2 my-auto w-1/2 bg-gray-200 rounded-lg">
                <div
                    style={{
                        width: `${loadingWidth}%`,
                        height: '100%',
                        backgroundColor: 'blue',
                        borderRadius: 10,
                        transition: 'width 0.1s ease-in-out'
                    }}
                />
            </div>
            <div className="absolute top-[60%] text-sm text-center font-semibold text-gray-700">
                Loading...
            </div>
        </div>
    );
};

export default Loading;
