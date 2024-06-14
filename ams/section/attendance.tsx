"use client"
import { ArrowRightFormIcon } from '../style/icon/arrow-right-from-bracket';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { HappyIcon } from "../style/icon/happyIcon";
import { Button, TimeInput } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";
import { ArrowRightIcon } from '../style/icon/arrow-right-to-bracket';



export function AttdanceModule() {

    const [Checkin, setCheckIn] = useState(null);
    const [Checkout, setCheckOut] = useState(null);
    const [Onbreak, setOnBreak] = useState(null);
    const [Endbreak, setEndBreak] = useState(null);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [hasCheckedOut, setHasCheckedOut] = useState(false);
    const [hasonBreak, setHasOnBreak] = useState(false);
    const [hasendBreak, setHasEndBreak] = useState(false);



    return (
        <div className="flex justify-center" >

            <div className="flex flex-wrap  flex-row justify-center items-center gap-x-5 gap-y-5 lg:gap-y-5 mt-5  w-full md:w-8/12 ">

                {/* <div className="flex flex-wrap  lg:flex-nowrap w-full gap-5 " >
                <TimeInput
                    label="Check in Time"
                    color="primary"
                    hourCycle={24}
                />
                <TimeInput
                    label="Break-Start Time"
                    color="success"
                    hourCycle={24}
                />
            </div> */}
                {/* <div className="flex  flex-col-reverse lg:flex-row  flex-wrap  lg:flex-nowrap w-full gap-5 " >
                <TimeInput
                    label="Check Out Time"
                    color="primary"
                    hourCycle={24}
                />
                <TimeInput
                    label="Break-Stop Time"
                    color="success"
                    hourCycle={24}
                />
            </div> */}
                {/* <div className="flex flex-wrap  lg:flex-nowrap w-full gap-5 " >
                <TimeInput
                    label="Total Work Time"
                    isReadOnly
                    color="secondary"
                    hourCycle={24}
                />
                <TimeInput
                    label="Total Break Time"
                    isReadOnly
                    color="secondary"
                    hourCycle={24}
                />
            </div>
            <Button className="w-full" color="primary"  >
                Submit
            </Button> */}

                <Button
                    className="bg-green-400  h-40  w-32 "
                // onClick={handleCheckInClick}
                >
                    <div className="flex flex-col gap-2 justify-center items-start h-40 " >
                        <ArrowRightIcon />
                        {/* <h1 className="text-xl text-white font-semibold ">{checkInTime}</h1> */}
                        <p className="text-white font-semibold ">Check in</p>
                    </div>
                </Button>

                <Button
                    // onClick={handleBreakStartClick}
                    className="bg-yellow-200 h-40 w-32"
                >
                    <div className="flex flex-col gap-2 justify-center items-start h-40" >
                        <EmojiFoodBeverageIcon className="size-10" />
                        {/* <h1 className="text-xl text-black font-semibold ">{breakStartTime}</h1> */}
                        <p className="text-black font-semibold ">On Break</p>
                    </div>
                </Button>

                <Button
                    className="bg-yellow-200 h-40  w-32 "
                // onClick={handleBreakStopClick}
                >
                    <div className="flex flex-col gap-2 justify-center items-start h-40" >
                        <HappyIcon />
                        {/* <h1 className="text-xl text-black font-semibold ">{breakStopTime}</h1> */}
                        <p className="text-black font-semibold">End Break</p>
                    </div>
                </Button>

                <Button
                    className="bg-green-400  h-40 w-32"
                // onClick={handleCheckOutClick}
                >
                    <div className="flex flex-col gap-2 justify-center items-start h-40 " >
                        <ArrowRightFormIcon />
                        {/* <h1 className="text-xl text-white font-semibold ">{checkOutTime}</h1> */}
                        <p className="text-white font-semibold ">Check out</p>
                    </div>
                </Button>
            </div>
        </div>
    )
}