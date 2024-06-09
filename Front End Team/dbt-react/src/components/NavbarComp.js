import React from "react"
// import {Navbar, Nav, NavDropdown, Container, NavLink} from "react-bootstrap"
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const pages = ['Discover', 'Trips', 'Tickets'];
const settings = ['Login'];

const NavbarComp = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return ( 
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Link to={'/home'}>
                <img src={require("../images/LogoDBT.png")} alt="" className="navbar-logo"/>
            </Link>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color='#006400'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color: '#006400'}} to={`/${page}`}>
                        {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#006400', display: 'block', fontSize: '1.25rem' }}
              >
                <Link style={{textDecoration: "none", color: '#006400'}} to={`/${page}`}>
                    {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            
            <IconButton>
                <ShoppingCartCheckoutOutlinedIcon fontSize="large" sx={{ color: '#006400' }}/>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton>
                <PersonOutlineIcon fontSize="large" sx={{ color: '#006400', p: 0 }} onClick={handleOpenUserMenu}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link style={{textDecoration: "none", color: '#006400'}} to={`/${setting}`}>
                    {setting}
                </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

     );
}
 
export default NavbarComp;




//     <Router>
    //     <div>
    //         <Navbar expand="lg" className="bg-body-tertiary">
    //             <Container fluid>
    //                 <Navbar.Brand>
    //                     <Nav.Link as={Link} to={"/home"} >
    //                         <img src={require("../images/LogoDBT.png")} alt="" className="navbar-logo" />
    //                     </Nav.Link>
    //                 </Navbar.Brand>
    //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //                 <Navbar.Collapse id="basic-navbar-nav">
    //                     <Nav className="me-auto">
    //                         <Nav.Link as={Link} to={"/home"} >DISCOVER</Nav.Link>
    //                         <Nav.Link as={Link} to={"/your-trips"}>YOUR TRIPS</Nav.Link>
    //                         <Nav.Link as={Link} to={"/tickets"}>BUY TICKETS</Nav.Link>
    //                         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //                             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //                             <NavDropdown.Item href="#action/3.2">
    //                                 Another action
    //                             </NavDropdown.Item>
    //                             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //                             <NavDropdown.Divider />
    //                             <NavDropdown.Item href="#action/3.4">
    //                                 Separated link
    //                             </NavDropdown.Item>
    //                         </NavDropdown>
    //                     </Nav>
    //                     <Nav> {/* Elements on the right */}
    //                         <Nav.Link href="#link">Sign in/Sign up</Nav.Link>
    //                         <Nav.Link href="#link">Shopping chart</Nav.Link>
    //                     </Nav>
    //                 </Navbar.Collapse>
    //             </Container>
    //         </Navbar>
    //     </div>
    //     <div>
    //     <Routes>
    //       <Route path="/your-trips" element={<YourTrips />}/>
    //       <Route path="/home" element={<Home />}/>
    //       <Route path="/tickets" element={<Tickets />}/>
    //     </Routes>
    //     </div>
    //     </Router> 
