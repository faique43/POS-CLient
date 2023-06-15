import * as React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const mainListItems = (

    <React.Fragment>
        <Link to='/'>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link to='inventory'>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
            </ListItemButton>
        </Link>

        <Link to='addInventory'>
            <ListItemButton>
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Inventory" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);