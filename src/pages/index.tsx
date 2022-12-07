import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Login } from '../components/Login';
import { signOut } from 'next-auth/react';
import { Calendar } from "../components/schedule/Calendar";
import { useMutateSchedule } from "../hooks/useMutateSchedule";
import { FormEvent } from "react";
import { useState } from "react";
import { parse } from 'date-fns/fp';


const Home: NextPage = () => {
  // セッション情報を取得
  const { data: session } = useSession();
  const { createScheduleMutation } = useMutateSchedule();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      return false
    }
    const parseString = parse(new Date(), 'yyyy-MM-dd HH:mm:ss');
    //parse実行
    console.log(startDate)
    console.log(startTime)
    const dateFromStartDate = parseString(`${startDate} ${startTime}:00`);
    const dateFromEndDate = parseString(`${endDate} ${endTime}:00`);

    console.log(dateFromEndDate)
    createScheduleMutation.mutate({
      title: title,
      start: dateFromStartDate,
      end: dateFromEndDate,
    })
  };
  // セッションが取得できない場合
  if (!session) {
    return (
      <>
        <Login />
      </>
    );
  }
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
          <Calendar />
          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
              <form onSubmit={handleSubmit} className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
                <div className="sm:col-span-2">
                  <label for="title" className="inline-block text-gray-800 text-sm sm:text-base mb-2">名前</label>
                  <input name="title" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label for="start-date" className="inline-block text-gray-800 text-sm sm:text-base mb-2">開始日</label>
                  <input name="start-date" type="date" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    onChange={(e) => setStartDate((e.target.value))} />
                  <label for="start-time" className="inline-block text-gray-800 text-sm sm:text-base mb-2">開始時間</label>
                  <input name="start-time" type="time" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    onChange={(e) => setStartTime((e.target.value))} />
                </div>

                <div>
                  <label for="end-date" className="inline-block text-gray-800 text-sm sm:text-base mb-2">終了日</label>
                  <input name="end-date" type="date" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    onChange={(e) => setEndDate((e.target.value))}
                  />
                  <label for="end-time" className="inline-block text-gray-800 text-sm sm:text-base mb-2">終了時間</label>
                  <input name="end-time" type="time" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    onChange={(e) => setEndTime((e.target.value))}
                  />
                </div>

                <div className="sm:col-span-2 flex justify-between items-center">
                  <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3" type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;