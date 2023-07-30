import * as React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

import DoneIcon from '@mui/icons-material/Done';

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

        <Link to='/'>
            <ListItemButton>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
            </ListItemButton>
        </Link>

        <Link to='inventory'>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Request Inventory" />
            </ListItemButton>
        </Link>

        <Link to='createItem'>
            <ListItemButton>
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Create Item" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);

export const layer1List = (
    <React.Fragment>
        <Link to='/layer'>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link to='layerInventory'>
            <ListItemButton>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Raw Inventory" />
            </ListItemButton>
        </Link>

        <Link to='addLayerInventory'>
            <ListItemButton>
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Raw Inventory" />
            </ListItemButton>
        </Link>

        <Link to='approveLayerRequest'>
            <ListItemButton>
                <ListItemIcon>
                    <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Approve Request" />
            </ListItemButton>
        </Link>
    </React.Fragment>
)

export const layer2List = (
    <React.Fragment>
        <Link to='/layer'>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link to='layerInventory'>
            <ListItemButton>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
            </ListItemButton>
        </Link>

        <Link to='requestLayerInventory'>
            <ListItemButton>
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Request Inventory" />
            </ListItemButton>
        </Link>

        <Link to='approveLayerRequest'>
            <ListItemButton>
                <ListItemIcon>
                    <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Approve Request" />
            </ListItemButton>
        </Link>
    </React.Fragment>
)