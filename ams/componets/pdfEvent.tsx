import { PdfIcon } from "../style/icon/pdficon";
import { Tooltip } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../src/store/store";
import { DownloadPdf } from "../src/store/auth/EventSlice";

export function PdfEvent({ event_name }: any) {

    const dispatch = useDispatch<AppDispatch>();

    function DownlondEvent() 
    {
        dispatch(DownloadPdf(event_name));
    }


    return (
        <Tooltip color="primary" content="Download PDF">
            <span className="text-lg cursor-pointer active:opacity-50" onClick={DownlondEvent} >
                <PdfIcon />
            </span>
        </Tooltip>
    )
}