import React from 'react';
import { Button, Input, Textarea, DatePicker, RadioGroup, Radio, ButtonGroup, cn } from "@nextui-org/react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../src/store/store";
import { CreateEvent } from "../src/store/auth/EventSlice";
import { DateValue, today, getLocalTimeZone, startOfWeek, startOfMonth } from "@internationalized/date";
import { useLocale, useDateFormatter } from "@react-aria/i18n";

export function CreateEventButton() {

    const dispatch: AppDispatch = useDispatch();

    interface FormValues {
        event_date: DateValue | null;
        event_name: string;
        event_des: string;
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let defaultDate = today(getLocalTimeZone());
    let { locale } = useLocale();
    let formatter = useDateFormatter({ dateStyle: "full" });

    let now = today(getLocalTimeZone());
    let nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
    let nextMonth = startOfMonth(now.add({ months: 1 }));

    const formik = useFormik<FormValues>({
        initialValues: {
            event_date: defaultDate,
            event_name: '',
            event_des: '',
        },
        validationSchema: Yup.object({
            event_date: Yup.date().nullable().required('Event Date is required'),
            event_name: Yup.string().required('Event Name is required'),
            event_des: Yup.string().required('Event Description is required'),
        }),
        onSubmit: values => {
            const formattedValues = {
                ...values,
                event_date: values.event_date ? values.event_date.toString() : null,
            };
            dispatch(CreateEvent(formattedValues));
            onOpenChange();
            formik.resetForm();
        },
    });

    const handleDateChange = (date: DateValue | undefined) => {
        formik.setFieldValue('event_date', date);
    };

    const CustomRadio = (props:any) => {
        const { children, ...otherProps } = props;

        return (
            <Radio
                {...otherProps}
                classNames={{
                    base: cn(
                        "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
                        "cursor-pointer rounded-full border-2 border-default-200/60",
                        "data-[selected=true]:border-primary",
                    ),
                    label: "text-tiny text-default-500",
                    labelWrapper: "px-1 m-0",
                    wrapper: "hidden",
                }}
            >
                {children}
            </Radio>
        );
    };

    return (
        <>
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
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <div className="w-full flex flex-col justify-center items-center">
                                <div className="w-11/12 lg:w-full flex flex-col justify-center items-center gap-5 p-0 lg:p-5">
                                    <div className="w-full text-start">
                                        <h1 className="text-2xl font-semibold pt-3">
                                            Create Events
                                        </h1>
                                    </div>
                                    <div className="w-full flex flex-wrap lg:flex-nowrap justify-between gap-4">
                                        <div className="w-full lg:w-6/12">
                                            <DatePicker
                                                CalendarBottomContent={
                                                    <RadioGroup
                                                        aria-label="Date precision"
                                                        classNames={{
                                                            base: "w-full pb-2",
                                                            wrapper: "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[380px] overflow-x-scroll",
                                                        }}
                                                        defaultValue="exact_dates"
                                                        orientation="horizontal"
                                                    >
                                                        <CustomRadio value="exact_dates">Exact dates</CustomRadio>
                                                        <CustomRadio value="1_day">1 day</CustomRadio>
                                                        <CustomRadio value="2_days">2 days</CustomRadio>
                                                        <CustomRadio value="3_days">3 days</CustomRadio>
                                                        <CustomRadio value="7_days">7 days</CustomRadio>
                                                        <CustomRadio value="14_days">14 days</CustomRadio>
                                                    </RadioGroup>
                                                }
                                                CalendarTopContent={
                                                    <ButtonGroup
                                                        fullWidth
                                                        className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                                                        radius="full"
                                                        size="sm"
                                                        variant="bordered"
                                                    >
                                                        <Button onPress={() => handleDateChange(now)}>Today</Button>
                                                        <Button onPress={() => handleDateChange(nextWeek)}>Next week</Button>
                                                        <Button onPress={() => handleDateChange(nextMonth)}>Next month</Button>
                                                    </ButtonGroup>
                                                }
                                                calendarProps={{
                                                    onFocusChange: handleDateChange,
                                                    nextButtonProps: {
                                                        variant: "bordered",
                                                    },
                                                    prevButtonProps: {
                                                        variant: "bordered",
                                                    },
                                                }}
                                                value={formik.values.event_date}
                                                onChange={handleDateChange}
                                                label="Event date"
                                            />
                                            {formik.touched.event_date && formik.errors.event_date ? (
                                                <div className="text-error-color text-xs">{formik.errors.event_date}</div>
                                            ) : null}
                                        </div>
                                        <div className="w-full lg:w-6/12">
                                            <Input
                                                label="Event Name"
                                                id="event_name"
                                                name="event_name"
                                                type="text"
                                                required={true}
                                                variant="bordered"
                                                value={formik.values.event_name}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.event_name && formik.errors.event_name ? (
                                                <div className="text-error-color text-xs">{formik.errors.event_name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-wrap lg:flex-nowrap justify-between gap-4">
                                        <div className="w-full">
                                            <Textarea
                                                label="Events Des"
                                                id="event_des"
                                                name="event_des"
                                                type="text"
                                                required={true}
                                                variant="bordered"
                                                value={formik.values.event_des}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.event_des && formik.errors.event_des ? (
                                                <div className="text-error-color text-xs">{formik.errors.event_des}</div>
                                            ) : null}
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
        </>
    );
}
