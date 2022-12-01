import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Home: NextPage = () => {
  return (
    <>
      <div>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
    </>
  );
};

export default Home;