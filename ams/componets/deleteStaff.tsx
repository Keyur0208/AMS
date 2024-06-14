"use client"
import { Tooltip } from "@nextui-org/react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { DeleteUserData, getuserAllData } from "../src/store/auth/Authslice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../src/store/store";

export function DeleteStaff({ userid }: any) {

    const dispatch = useDispatch<AppDispatch>();

    function DeleteUser() {
        dispatch(DeleteUserData(userid));
        dispatch(getuserAllData("",""));
    }

    return (
        <Tooltip color="danger" content="Delete user">
            <span className="text-lg cursor-pointer active:opacity-50" onClick={DeleteUser}  >
                <RemoveCircleOutlineIcon />
            </span>
        </Tooltip>
    )
}