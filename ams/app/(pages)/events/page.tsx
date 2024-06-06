"use client"
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import clsx from "clsx";
import { BreadCrumb } from "../../../componets/breadcrumbs";
import { Button } from "@nextui-org/react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function page() {

    const events = [
        {
            date: "15/08/2024",
            name: "independence day",
            des :"15th August every year is a very auspicious day for the Indians who will get an opportunity to pay homage to all freedom fighters. Since it is a national holiday, all regional-level, state-level and national-level government offices will remain shut after the flag-hoisting ceremony. Commercial outlets may also remain closed. Or, operating hours may be lessened. Schools and colleges across the country will organise various types of competitions for students and award winners Special contests and programs are organised by online, print and broadcast channels. Cinemas related to Indian freedom fighters may be shown on television. On the eve of Independence Day, the Indian President will address the country. In Delhi, the Indian Prime Minister will attend the flag-hoisting ceremony and also address the nation at the Red Fort. Cultural programs and events are held at both the state and national levels. Artists will capture this opportunity to exhibit their hidden talent and get recognised and awarded. In some places, the families of freedom fighters are honored on Independence Day."
        },
        {
            date: "26/08/2024",
            name: "Krishna Janmashtami",
            des:"Lord Krishna Lord Krishna was born on the 8th day of Dark Fortnight in the month of Bhadon. Bhadon is a month in the Hindu calendar. Moreover, he was born around 5,200 years ago approximately. Because he was one of the most powerful Gods. He was born for a special purpose on Earth. Lord Krishna was born to free the world from evil.As a result, he played an important role in the book of Mahabharata. Also, Lord Krishna preached about good karma and the theory of Bhakti.Lord Krishna was born in a prison. He was in the clutches if Kansa. But his father Vasudev gave him to his friend Nand to save him. Because he knew that Kansa was evil-minded. Furthermore after getting saved the upbringing of Sri Krishna was in a Gokul family. Sri Krishna after some time became strong. As a result, he was able to kill Kansa.When I was a child I used to watch many shows on Sri Krishna. As a result, I know many things about him. First of all, Sri Krishna was very fond of eating Makhan. Because of that he always used to steal it from his mothers’ kitchen. Therefore his name was ‘Natkahat Nand Lal’. Sri Krishna was dark-colored. So he was always worried about his color. Moreover, Sri Krishna had a friend named Radha. Radha was of great importance to Krishna. So he always spent time with her. Radha was very beautiful and fair so Lord Krishna always feels color complex."
        }
    ]

    const generatePDF = async (event:any) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        page.drawText(`Date: ${event.date}`, {
            x: 50,
            y: height - 100,
            size: 30,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: rgb(0, 0, 0),
        });

        page.drawText(`Event: ${event.name}`, {
            x: 50,
            y: height - 150,
            size: 30,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: rgb(0, 0, 0),
        });

        page.drawText(`Event Description : ${event.des}`, {
            x: 50,
            y: height - 200,
            size: 10,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${event.name}.pdf`;
        link.click();

    };
    return (
        <>
            <div className={clsx("bg-light-blue-bg  ")}  >
                <DefaultLayout>

                    {/* Page Title  */}

                    <div>
                        <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl ">Events News</h1>
                    </div>

                    {/* Breadcrumbs  */}

                    <BreadCrumb name="Events" />

                    {/* Main part  */}

                    {
                        events.map((event: any, index: any) => {
                            return (
                                <div key={index} className="flex  justify-between items-center  bg-white rounded-lg p-5  mt-2  overflow-scroll  lg:overflow-hidden"  >
                                    <div className="pr-5 lg:pr-0"  >
                                        <div className="border-1 rounded-full w-48 p-2 " >
                                            <div>
                                                <p className="px-1 lg:px-3 text-xs " >Date</p>
                                            </div>
                                            <div className="text-center text-sm" >
                                                <h1>{event.date}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pr-5 lg:pr-0">
                                        <div className="border-1 rounded-full w-48 p-2 " >
                                            <div>
                                                <p className="px-1 lg:px-3 text-xs " >Events</p>
                                            </div>
                                            <div className="text-center text-sm" >
                                                <h1>{event.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Button
                                            color="primary"
                                            className="w-10/12 lg:w-full"
                                            onClick={() => generatePDF(event)}
                                        >
                                            Download PDF
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </DefaultLayout>
            </div>

        </>
    )
}