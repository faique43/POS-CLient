import React from 'react'
import { Link } from 'react-router-dom';

// MU
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// icons
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function MyNavbar() {
    return (
        <>
            <Toolbar className={`tw-flex tw-items-center tw-justify-between tw-mt-2`}>
                <div className="tw-flex tw-flex-col">
                    <Typography variant='h4'>Welcome</Typography>
                    <Typography variant='body1'>Discover whatever you need easily</Typography>
                </div>

                <div></div>
                <div></div>
                <div></div>
                <div></div>

                {/* <div className="tw-flex tw-items-center tw-bg-red-300 tw-justify-between"> */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <FilterAltIcon/>
                {/* </div> */}

            </Toolbar>
            <Toolbar className='tw-flex tw-w-full tw-items-center tw-justify-between tw-text-center'>
                <Link style={{ textDecoration: 'none', color: 'white' }} to="kitchen1Home" className='tw-mx-[10px] tw-bg-blue-500 tw-p-2 tw-text-white hover:tw-bg-blue-600 tw-duration-200 tw-ease-in-out tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-rounded-lg tw-w-full'><HomeIcon/>Kitchen 1 Products</Link>

                <Link style={{ textDecoration: 'none', color: 'white' }} to="kitchen2Home" className='tw-mx-[10px] tw-bg-blue-500 tw-p-2 tw-text-white hover:tw-bg-blue-600 tw-duration-200 tw-ease-in-out tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-rounded-lg tw-w-full'><HomeIcon/>Kitchen 2 Products</Link>

                <Link style={{ textDecoration: 'none', color: 'white' }} to="inventory" className='tw-mx-[10px] tw-bg-blue-500 tw-p-2 tw-text-white hover:tw-bg-blue-600 tw-duration-200 tw-ease-in-out tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-rounded-lg tw-w-full'><InventoryIcon/> Inventory</Link>

                <Link style={{ textDecoration: 'none', color: 'white' }} to="addProduct" className='tw-mx-[10px] tw-bg-blue-500 tw-p-2 tw-text-white hover:tw-bg-blue-600 tw-duration-200 tw-ease-in-out tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-rounded-lg tw-w-full'><AddCircleIcon/> Add Product</Link>

                <Link style={{ textDecoration: 'none', color: 'white' }} to="kitchen1" className='tw-mx-[10px] tw-bg-blue-500 tw-p-2 tw-text-white hover:tw-bg-blue-600 tw-duration-200 tw-ease-in-out tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-rounded-lg tw-w-full'><ShoppingCartIcon/> Kitchen 1 Orders</Link>

                <Link style={{ textDecoration: 'none', color: 'white' }} to="kitchen2" className='tw-mx-[10px] tw-bg-blue-500 tw-p-2 tw-text-white hover:tw-bg-blue-600 tw-duration-200 tw-ease-in-out tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-rounded-lg tw-w-full'><ShoppingCartIcon/> Kitchen 2 Orders</Link>
            </Toolbar>
        </>
    )
}
