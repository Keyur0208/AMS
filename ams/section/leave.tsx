"use client";
import clsx from "clsx";
import { BreadCrumb } from "../componets/breadcrumbs";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import DefaultLayout from "../componets/Layouts/DefaultLayout";

export function Leave() {

    const validationSchema = Yup.object({
        leave_date: Yup.object({
            start: Yup.mixed().required("Start date is required"),
            end: Yup.mixed().required("End date is required"),
        }).required("Date range is required"),
        reason: Yup.string().required("Reason is required"),
        reason_des: Yup.string().required("Reason description is required"),
    });

    const formik = useFormik({
        initialValues: {
            leave_date: { start: null, end: null },
            reason: "",
            reason_des: "",
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            onOpenChange();
            formik.resetForm();
        }
    });


    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className={clsx("bg-light-blue-bg")}>
                <DefaultLayout>
                    {/* Page Title */}
                    <div>
                        <h1 className="text-navigation-subitem font-semibold text-2xl lg:text-3xl">
                            Leave Letter
                        </h1>
                    </div>

                    {/* BreadCrumbs */}
                    <BreadCrumb name="Leave" />

                    {/* Main Part */}
                    <div className="text-end">
                        <Button
                            color="success"
                            size="md"
                            onPress={onOpen}
                            className="text-white"
                        >
                            Create Leave
                        </Button>
                    </div>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="transparent">
                        <ModalContent>
                            {(onClose) => (
                                <form onSubmit={formik.handleSubmit} autoComplete="off">
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <div className="w-11/12 lg:w-10/12 flex flex-col justify-center items-center gap-5">
                                            <div className="w-full text-start">
                                                <h1 className="text-xl font-semibold pt-5">
                                                    Create Leave Letter
                                                </h1>
                                            </div>
                                            <div className="w-full">
                                                {/* <DateRangePicker
                                                    label="Date"
                                                    variant="bordered"
                                                    value={
                                                        formik.values.leave_date
                                                    }
                                                    onChange={(value) =>
                                                        formik.setFieldValue("leave_date", value)
                                                    }
                                                /> */}
                                                {formik.touched.leave_date &&
                                                    formik.errors.leave_date ? (
                                                    <div className="text-error-color text-xs">
                                                        {formik.errors.leave_date.start ||
                                                            formik.errors.leave_date.end}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="w-full">
                                                <Input
                                                    label="Reason Name"
                                                    id="reason"
                                                    name="reason"
                                                    type="text"
                                                    required={true}
                                                    variant="bordered"
                                                    value={formik.values.reason}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.reason &&
                                                    formik.errors.reason ? (
                                                    <div className="text-error-color text-xs">
                                                        {formik.errors.reason}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="w-full">
                                                <Textarea
                                                    name="reason_des"
                                                    id="reason_des"
                                                    label="Reason Description"
                                                    variant="bordered"
                                                    value={formik.values.reason_des}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.reason_des &&
                                                    formik.errors.reason_des ? (
                                                    <div className="text-error-color text-xs">
                                                        {formik.errors.reason_des}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="flex flex-row gap-5 text-center pb-5">
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                >
                                                    Submit
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    onPress={onClose}
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

                    {/* <div>
                        {submissions.map((submission, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white rounded-lg p-5 mt-4 overflow-scroll lg:overflow-hidden"
                            >
                                <div className="pr-5 lg:pr-0">
                                    <div className="border-1 rounded-full w-full p-2">
                                        <div>
                                            <p className="px-1 lg:px-3 text-xs">Date</p>
                                        </div>
                                        <div className="text-center text-sm">
                                            <h1>{`${submission.date.start} - ${submission.date.end}`}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="pr-5 lg:pr-0">
                                    <div className="border-1 rounded-full  w-full p-2">
                                        <div>
                                            <p className="px-1 lg:px-3 text-xs">Reason</p>
                                        </div>
                                        <div className="text-center text-sm">
                                            <h1>{submission.reason}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        color="primary"
                                        className="w-10/12 lg:w-full"
                                    >
                                        Full Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </DefaultLayout>
            </div>
        </>
    );
}
