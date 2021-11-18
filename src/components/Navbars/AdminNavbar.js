/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { authAxios } from "app/services/httpServices";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react"
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const [profile, setProfile] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    async function getData(){

      try{
        const dp = localStorage.getItem('profile')
        const use = localStorage.getItem('user')
        if(dp && use) {
          setProfile(dp)
          setUser(use)
        }else{
          const {data} = await authAxios.get(`marketing/dashboard`) 
          localStorage.setItem('profile', data.profile)
          localStorage.setItem('user', data.user)
          const dp = localStorage.getItem('profile')
          const use = localStorage.getItem('user')
          setProfile(dp)
          setUser(use)
        }
      }catch(e){}   
    }
    getData();
  }, [])

  const logout=()=>{
    authAxios.post("token/blacklist/", {
      refresh_token: localStorage.getItem('refresh_token'),
  })
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("user")
  localStorage.removeItem("profile")
  authAxios.defaults.headers['Authorization'] = null;
  window.location = '/auth/login';
  }
  return (
    
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {/* {props.brandText} */}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      height='100%'
                      width='100%'
                      alt="..."
                      src={profile ? profile : require("../../assets/img/theme/team-4-800x800.jpg").default}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} onClick={logout}>
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
