import React, { useState, useEffect } from 'react'
import moment from "moment"
import { Icon } from '@iconify/react';

function App() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())

  const [calendar, setCalendar] = useState([])

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const target = moment()
      .year(year)
      .month(month)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);

    const firstDayofMonth = target.startOf("month").day();
    const totalDateofMonth = target.endOf("month").date();

    const newCalendar = [[]];

    for (let i = 0; i < firstDayofMonth; i++) {
      newCalendar[newCalendar.length - 1].push(0);
    }

    for (let date = 1; date <= totalDateofMonth; date++) {
      if (newCalendar[newCalendar.length - 1].length === 7) {
        newCalendar.push([]);
      }

      newCalendar[newCalendar.length - 1].push(date);
    }

    setCalendar(newCalendar);
  }, [year, month])

  return (
    <div className='flex flex-col select-none gap-4 items-center justify-center w-full h-screen bg-stone-600'>

      <div className="text-4xl font-bold text-rose-300">
        Calendar
      </div>

      <div className="flex items-center gap-6 text-2xl bg-yellow-300 p-3 rounded">
        <button onClick={() => {
          if (month === 0) {
            setMonth(11);
            setYear(year - 1);
            return;
          }

          setMonth(month - 1);
        }}>
          <Icon icon="fa-solid:angle-left" />
        </button>
        <div className="font-semibold">
          {moment().month(month).format("MMMM")} {year}
        </div>
        <button onClick={() => {
          if (month === 11) {
            setMonth(0);
            setYear(year + 1);
            return;
          }

          setMonth(month + 1);
        }}>
          <Icon icon="fa-solid:angle-right" />
        </button>
      </div>
      <table>
        <thead>
          <tr className="text-stone-100">
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        <tbody className="text-stone-100 font-medium text-lg">
          {calendar.map((week) => (
            <tr>
              {week.map((date) => (
                <td>
                  {date || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
export default App