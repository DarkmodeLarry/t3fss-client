import { useState, type FC } from 'react'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { add, format } from 'date-fns'
import {
  INTERVAL,
  STORE_CLOSING_TIME,
  STORE_OPENING_TIME
} from '@/constants/config'

interface CalendarProps {}
interface DateType {
  justDate: Date | null
  dateTime: Date | null
}

export const Calendar: FC<CalendarProps> = ({}) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null
  })

  console.log(date.dateTime)

  const getTimes = () => {
    if (!date.justDate) return

    const { justDate } = date

    const start = add(justDate, { hours: STORE_OPENING_TIME })
    const end = add(justDate, { hours: STORE_CLOSING_TIME })
    const interval = INTERVAL

    const times = []

    for (let i = start; i <= end; i = add(i, { minutes: interval })) {
      times.push(i)
    }

    return times
  }

  const times = getTimes()

  return (
    <>
      <div className='flex flex-col w-full py-10 border-2 rounded-lg border-slate-200 lg:container md:flex-row'>
        <div className='container flex items-center justify-center w-full rounded-lg '>
          <ReactCalendar
            minDate={new Date()}
            className='react-calendar !bg-transparent'
            view='month'
            onClickDay={(date) =>
              setDate((prev) => ({ ...prev, justDate: date }))
            }
          />
        </div>

        {date.justDate && (
          <div className='container flex justify-center w-full'>
            <div className='flex flex-wrap items-center w-full rounded-lg '>
              {times?.map((time, i) => (
                <div
                  key={`${time}-${i}`}
                  className='flex items-center justify-center'
                >
                  <button
                    type='button'
                    className='flex flex-col items-center justify-center w-24 h-10 m-2 text-sm text-gray-100 border-2 border-gray-400 rounded-lg bg-slate-600'
                    onClick={() =>
                      setDate((prev) => ({ ...prev, dateTime: time }))
                    }
                  >
                    {format(time, 'hh:mm a')}{' '}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Calendar
