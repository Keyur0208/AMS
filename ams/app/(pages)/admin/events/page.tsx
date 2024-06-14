"use client"
import DefaultLayout from "../../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../../componets/breadcrumbs";
import { CreateEventButton } from "../../../../componets/crearedEvent";
import { DisplayEvent } from "../../../../src/store/auth/EventSlice";
import { RootState } from "../../../../src/store/store";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { AppDispatch } from "../../../../src/store/store";
import { DeleteEvent_data } from "../../../../componets/deletedEvent";
import { PdfEvent } from "../../../../componets/pdfEvent";
import { EditEvent_data } from "../../../../componets/editEvent";

export default function page() {

    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.event.ShowEvent);

    useEffect(() => {
        const fetchEvent = async () => {
            await dispatch(DisplayEvent());
        };
        fetchEvent();
    }, [dispatch]);


    return (
        <div className="bg-light-blue-bg">

            <DefaultLayout>

                {/* Page Title  */}

                <div>
                    <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl ">Events</h1>
                </div>

                {/* Breadcrumbs  */}

                <BreadCrumb name="Events" first_name="Manage" />

                {/* Main Part */}

                {/* Create Event Data  */}
                <CreateEventButton />

                {/* Display Event Data  */}

                <div>
                    {data && data.length > 0 ? (
                        data.map((event: any, index: number) => (
                            <div key={index}>
                                <div className="flex justify-between items-center bg-white rounded-lg p-5 mt-4 overflow-scroll lg:overflow-hidden">
                                    <div className="pr-5 lg:pr-0">
                                        <div className="border-1 rounded-full w-48 p-2">
                                            <div>
                                                <p className="px-1 lg:px-3 text-xs">Date</p>
                                            </div>
                                            <div className="text-center text-sm">
                                                <h1>{event.event_date}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pr-5 lg:pr-0">
                                        <div className="border-1 rounded-full w-48 p-2">
                                            <div>
                                                <p className="px-1 lg:px-3 text-xs">Events Name</p>
                                            </div>
                                            <div className="text-center text-sm">
                                                <h1>{event.event_name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">

                                        <EditEvent_data />

                                        <DeleteEvent_data event_id={event._id} event_name={event.event_name} />

                                        <PdfEvent event_name={event.event_name}/>

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-lg p-5">
                            
                        </div>
                    )}
                </div>



            </DefaultLayout>
        </div>
    )
}