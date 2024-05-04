import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import { AdminPanelSettings, AdminPanelSettingsOutlined, DashboardCustomizeOutlined, Logout, PeopleAltOutlined } from '@mui/icons-material';
import AddAdmin from '../AdminPage/AddAdmin';

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardCustomizeOutlined />,
    link: "/dashboard_data"
  },
  {
    title: "Add User",
    icon: <PeopleAltOutlined />,
    link: "/adduser"
  },
  {
    title: "Add Admin",
    icon: <AdminPanelSettingsOutlined />,
    link: "/addadmin"
  },
  {
    title: "Logout",
    icon: <Logout />,
    link: "/"
  }
];
