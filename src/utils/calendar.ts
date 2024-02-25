import dayjs from "dayjs"

export interface ICalendar {
    date: number,
    currentMonth: boolean,
    today?: boolean
}
export const generateCalendar = (
    month = dayjs().month(),
    year = dayjs().year()
) => {
    const arrayOfDates: Array<ICalendar> = []

    const firstDateOfMonth = dayjs().year(year).month(month).startOf('month')
    const lastDateOfMonth = dayjs().year(year).month(month).endOf('month')

    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        arrayOfDates.push({
            date: firstDateOfMonth.day(i).date(),
            currentMonth: false,
        }

        )
    }


    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDates.push({
            date: firstDateOfMonth.date(i).date(),
            currentMonth: true,
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
        })
    }

    const remainingDate = 42 - arrayOfDates.length

    for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remainingDate; i++) {
        arrayOfDates.push({
            date: lastDateOfMonth.date(i).date(),
            currentMonth: false
        })
    }

    return arrayOfDates
}