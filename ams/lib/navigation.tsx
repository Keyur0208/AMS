import { EventIcon } from "../style/icon/eventicon"
import { HomeIcon } from "../style/icon/homeicon"
import { LeaveIcon } from "../style/icon/leaveicon"
import { ReportIcon } from "../style/icon/reporticon"
import { StaffIcon } from "../style/icon/stafficon"

export const Navigation_lib = [
    {
        name:'Dashboard',
        link:'dashboard',
        icon:<HomeIcon/>
    },
    {
        name:'Report',
        link:'report',
        icon:<ReportIcon/>
    },
    {
        name:'Events',
        link:'events',
        icon:<EventIcon/>
    },
    {
        name:'Leave',
        link:'leave',
        icon:<LeaveIcon/>
    }
]

export const Admin_Main_Navigation=[
    {
        name:'Dashboard',
        link:'dashboard',
        icon:<HomeIcon/>
    },
    {
        name:'Staff',
        link:'staff',
        icon:<StaffIcon/>
    }
]

export const Admin_Manage_Navigation=[
    {
        name:'Report',
        link:'report',
        icon:<ReportIcon/>
    },
    {
        name:'Events',
        link:'events',
        icon:<EventIcon/>
    },
    {
        name:'Leave Report',
        link:'leave_data',
        icon:<LeaveIcon/>
    }
]