import type { NextPage } from "next";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
const Home: NextPage = () => {
  return (
    <>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locales={[jaLocale]}         // 追加
          locale='ja'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
          events={[
            { title: 'e1', start: '2022-12-14' },
            { title: 'e2', start: '2022-12-14', end: '2022-12-27' },
            { title: 'e3', start: '2022-12-12', end: '2022-12-17' },
            { title: 'e4', start: '2022-12-1', end: '2022-12-28' },
            { title: 'e5', start: '2022-12-24', end: '2022-12-29' },
          ]}
        />
    </>
  );
};

export default Home;