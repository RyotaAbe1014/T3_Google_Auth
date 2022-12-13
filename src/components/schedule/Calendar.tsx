import React, { FC, useEffect, useState } from 'react'
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { trpc } from '../../utils/trpc';

export const Calendar: FC = () => {
  const { data, isLoading, error } = trpc.schedule.getSchedules.useQuery();
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
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
      events={data?.map((schedule) => ({
        title: schedule.title,
        start: schedule.start,
        end: schedule.end,
      }))}
    />
  )
}