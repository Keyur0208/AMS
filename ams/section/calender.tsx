"use client"
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import Clock from "../componets/clock/clock";

export function CalendarModule() {
    return (
        <div className="flex justify-center" >
            <div className="flex flex-wrap  flex-row justify-center  items-center gap-x-14 gap-y-5 lg:gap-y-5  mt-5 bg-white p-5  lg:p-10  w-full md:w-8/12  border-2  rounded-2xl " >
                <div>
                    <h1 className="text-light-black text-start font-semibold " >Work Date And Time</h1>
                    <Calendar
                        aria-label="Date (Show Month and Year Picker)"
                        value={today(getLocalTimeZone())}
                        showMonthAndYearPickers
                    />
                </div>
                <div>
                    <Clock />
                </div>
            </div>
        </div>
    )
}