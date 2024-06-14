"use client"
import { Tooltip } from "@nextui-org/react"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { DeleteEvent, DisplayEvent } from "../src/store/auth/EventSlice";
import { AppDispatch } from "../src/store/store";
import { useDispatch } from "react-redux";

export function DeleteEvent_data({ event_id, event_name }: any) {

    const dispatch = useDispatch<AppDispatch>();

    const { isOpen, onOpen, onClose } = useDisclosure();

    function myfun()
    {
        dispatch(DeleteEvent(event_id));
        dispatch(DisplayEvent());
        onClose();
    }

    return (
        <>
            <Tooltip color="danger" content="Delete user">
                <span className="text-lg  cursor-pointer active:opacity-50" onClick={onOpen}  >
                    <RemoveCircleOutlineIcon />
                </span>
            </Tooltip>

            <Modal
                size="xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Delete Event
                            </ModalHeader>
                            <ModalBody>
                                <h1>Are You Sure Delete {event_name} Event? </h1>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={myfun}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}