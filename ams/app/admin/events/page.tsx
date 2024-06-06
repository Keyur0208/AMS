"use client"
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../componets/breadcrumbs";
import { Button, Input, Textarea, DatePicker } from "@nextui-org/react";
import { Modal, ModalContent, useDisclosure,Tooltip } from "@nextui-org/react";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { PdfIcon } from "../../../style/icon/pdficon";

export default function page() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                <div className="text-end">
                    <Button
                        color="success"
                        size="md"
                        onPress={onOpen}
                        className="text-white"
                    >
                        Create Events
                    </Button>
                </div>

                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="center"
                    backdrop="transparent"
                    size="2xl" >
                    <ModalContent >
                        {(onClose) => (
                            <form autoComplete="off">
                                <div className="w-full flex flex-col justify-center items-center">
                                    <div className="w-11/12 lg:w-full flex flex-col justify-center items-center gap-5  p-0 lg:p-5">
                                        <div className="w-full text-start">
                                            <h1 className="text-2xl font-semibold pt-3">
                                                Create Events
                                            </h1>
                                        </div>
                                        <div className="w-full flex flex-wrap lg:flex-nowrap justify-between  gap-4  ">
                                            <div className="w-full lg:w-6/12" >
                                                <DatePicker
                                                    label="Event Date"
                                                    id="event_date"
                                                    name="event_date"
                                                    variant="bordered"
                                                />
                                            </div>
                                            <div className="w-full lg:w-6/12" >
                                                <Input
                                                    label="Event Name"
                                                    id="event_name"
                                                    name="event_name"
                                                    type="text"
                                                    required={true}
                                                    variant="bordered"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-wrap lg:flex-nowrap justify-between  gap-4  ">
                                            <div className="w-full " >
                                                <Textarea
                                                    label="Events Des"
                                                    id="event_des"
                                                    name="event_des"
                                                    type="text"
                                                    required={true}
                                                    variant="bordered"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-5 text-center pb-5">
                                            <Button
                                                type="submit"
                                                color="primary"
                                                id="btn1"
                                            >
                                                Submit
                                            </Button>
                                            <Button
                                                color="danger"
                                                onPress={onClose}
                                                id="btn2"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </ModalContent>
                </Modal>

                <div>
                    <div
                        className="flex justify-between items-center bg-white rounded-lg p-5 mt-4 overflow-scroll lg:overflow-hidden"
                    >
                        <div className="pr-5 lg:pr-0">
                            <div className="border-1 rounded-full w-48 p-2">
                                <div>
                                    <p className="px-1 lg:px-3 text-xs">Date</p>
                                </div>
                                <div className="text-center text-sm">
                                    <h1>25/05/2024</h1>
                                </div>
                            </div>
                        </div>
                        <div className="pr-5 lg:pr-0">
                            <div className="border-1 rounded-full  w-48 p-2">
                                <div>
                                    <p className="px-1 lg:px-3 text-xs">Events Name</p>
                                </div>
                                <div className="text-center text-sm">
                                    <h1>Krishna Janmashmi</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4  " >
                            <Tooltip color="foreground" content="Edit user" >
                                <span className="text-lg  cursor-pointer active:opacity-50" onClick={onOpen}>
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                <span className="text-lg  cursor-pointer active:opacity-50"  >
                                    <RemoveCircleOutlineIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="primary" content="Dowlond PDF">
                                <span className="text-lg  cursor-pointer active:opacity-50"  >
                                    <PdfIcon/>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </div>
    )
}