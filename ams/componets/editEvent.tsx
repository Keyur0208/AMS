import { Tooltip } from "@nextui-org/react";
import EditIcon from '@mui/icons-material/Edit';
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Button, Input, Textarea, DatePicker, RadioGroup, Radio, ButtonGroup, cn } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from 'yup';

interface FormValues {
    event_name: string;
    event_des: string;
}

export function EditEvent_data() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const formik = useFormik<FormValues>({
        initialValues: {
            event_name: '',
            event_des: '',
        },
        validationSchema: Yup.object({
            event_date: Yup.date().nullable().required('Event Date is required'),
            event_name: Yup.string().required('Event Name is required'),
            event_des: Yup.string().required('Event Description is required'),
        }),
        onSubmit: values => {
            onOpenChange();
            formik.resetForm();
        },
    });

    return (
        <>
            <Tooltip color="foreground" content="Edit event">
                <span className="text-lg cursor-pointer active:opacity-50" onClick={onOpen} >
                    <EditIcon />
                </span>
            </Tooltip> 
            
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
    )
}