import { useState, type FC } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  INTERVAL,
  STORE_CLOSING_TIME,
  STORE_OPENING_TIME
} from '@/constants/config'
import { add, format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { DateFormatter } from 'react-day-picker'

interface DateType {
  justDate: Date | null
  dateTime: Date | null
}

export const RadCalendar: FC = ({}) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null
  })
  console.log(date)

  const seasonEmoji: Record<string, string> = {
    winter: '⛄️',
    spring: '🌸',
    summer: '🌻',
    autumn: '🍂'
  }

  const getSeason = (month: Date): string => {
    const monthNumber = month.getMonth()
    if (monthNumber >= 0 && monthNumber < 3) return 'winter'
    if (monthNumber >= 3 && monthNumber < 6) return 'spring'
    if (monthNumber >= 6 && monthNumber < 9) return 'summer'
    else return 'fall'
  }

  const formatCaption: DateFormatter = (month, options) => {
    const season = getSeason(month)
    return (
      <>
        <span role='img' aria-label={season}>
          {seasonEmoji[season]}
        </span>{' '}
        {format(month, 'LLLL', { locale: options?.locale })}
      </>
    )
  }

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

  const pastDays = { before: new Date() }
  const disabledDays = [pastDays]

  return (
    <Card className='container '>
      <CardContent className='container border-2 border-slate-500'>
        <CardTitle className='flex items-center justify-center border-2 border-slate-500'>
          {!date.justDate ? (
            <>
              <p>Select a date</p>
            </>
          ) : (
            <>
              <p>Training session selected for : </p>
              <span className='ml-6 text-sm text-gray-500'>
                {format(date.justDate, 'MMM dd yyyy')}
              </span>
            </>
          )}
        </CardTitle>
        <div className='flex flex-col place-items-center md:flex-row '>
          <Calendar
            mode='single'
            formatters={{ formatCaption }}
            disabled={disabledDays}
            selected={date.justDate}
            onSelect={(date) =>
              setDate((prev) => ({ ...prev, justDate: date }))
            }
            view='month'
            modifiersStyles={{ disabled: { color: 'cyan' } }}
            className='border-2 rounded-md rdp border-slate-500'
          />

          {date.justDate && (
            <div className='container p-2 border-2 border-slate-500'>
              <CardTitle className='p-2 text-center border-2 md:text-left'>
                Select a time Slot
              </CardTitle>
              <CardDescription className='border-2 place-items-center border-slate-500'>
                {times?.map((time) => (
                  <Badge key={time.toString()} className='m-2 md:m-3'>
                    {format(time, 'hh:mm a')}
                  </Badge>
                ))}
              </CardDescription>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default RadCalendar
