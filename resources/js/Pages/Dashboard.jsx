import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
        <div className="py-12">
          <div className="mx-auto max-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900">
                      You're logged in!
                  </div>
              </div>
          </div>
        </div>
    </>
  );
}

Dashboard.layout = (page) => <Layout children={page} />;

export default Dashboard;
