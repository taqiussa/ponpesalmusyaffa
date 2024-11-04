import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import Logo from './img/logo.png';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const appName = import.meta.env.VITE_APP_NAME || '';

createInertiaApp({
    title: (title) => `${title} ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <HelmetProvider>
                <Helmet>
                    <link rel="icon" href={Logo} type="image/x-icon" />
                </Helmet>
                <App {...props} />
            </HelmetProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
