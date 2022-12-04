import type { NextPage } from "next";
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { Login } from '../components/Login';
import { signOut } from 'next-auth/react';


const Home: NextPage = () => {
  // セッション情報を取得
  const { data: session } = useSession();
  const { data, isLoading, error } = trpc.schedule.getSchedules.useQuery();
  // const events: { [key: string]: string } = {}

  const events: EventInput[] = []


  // セッションが取得できない場合
  if (!session) {
    return (
      <>
        <Login />
      </>
    );
  }
  if (isLoading) {
    return <p>Loading task list...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  data?.forEach((schedule) => {
    events.push({
      title: schedule.title,
      start: schedule.start,
      end: schedule.end
    })
  })
  return (
    <>
      <div className="bg-white lg:pb-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <header className="flex justify-between items-center py-4 md:py-8">
            {/* <!-- logo - start --> */}
            <a href="/" className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
              TESTAPP
            </a>
            {/* <!-- logo - end --> */}

            {/* <!-- nav - start --> */}
            <nav className="hidden lg:flex gap-12">
              <a href="/" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">Home</a>
            </nav>
            {/* <!-- nav - end -->

            <!-- buttons - start --> */}
            <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
              <p className="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-indigo-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3">{session.user?.name}</p>

              <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                onClick={() => { signOut() }}
              >Logout</button>
            </div>

            <button type="button" className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>

              Menu
            </button>
            {/* <!-- buttons - end --> */}
          </header>

          {/* <!-- menu - start --> */}
          <div className="w-full max-w-screen-sm hidden lg:block bg-white border rounded-lg shadow-sm overflow-hidden -mt-4 mx-auto">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locales={[jaLocale]}         // 追加
              locale='ja'
              headerToolbar={{
                left: 'prev,next today title',
                center: '',
                right: ''
              }}
              events={events}
            />
          </div>
          {/* <!-- menu - end --> */}
        </div>
      </div>
    </>
  );
};

export default Home;