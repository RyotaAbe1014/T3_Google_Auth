import React, { FC, useEffect, useState } from 'react'
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { trpc } from '../../utils/trpc';

export const Calendar: FC = () => {
  const { data, isLoading, error } = trpc.schedule.getSchedules.useQuery();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (data) {
      setEvents(
        data?.map((schedule) => ({
          title: schedule.title,
          start: schedule.start,
          end: schedule.end,
        }))
      );
    }
  }, [data, events]);

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <div className="w-full max-w-screen-sm hidden lg:block bg-white border rounded-lg shadow-sm overflow-hidden -mt-4 mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={{
          left: 'prev,next today title',
          center: '',
          right: ''
        }}
        events={events}
      />
    </div>
  )
}