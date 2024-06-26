import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cibAboutMe,
  cibAdguard,
  cilLockLocked,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom';
import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch } from 'react-redux';
import { logout } from '../../endpoints';
import { useState } from 'react'
const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout endpoint
      await navigate('/login'); // Navigate to the login page after logout
    } catch (error) {
      console.error(error); // Handle any errors that occur during logout
    }
  };
// const handleProfile = async () => {
//   // window.location = "/user-profile";
//   await navigate('/user-profile');

// }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        {window.isAuthenticated ? (
      <CDropdownItem style={{ cursor: "pointer" }} onClick={handleLogin}>
        <CIcon icon={cilLockLocked} className="me-2" />
        Logged-in
      </CDropdownItem>
    ):(
      <>
      {/* <CDropdownItem style={{ cursor: "pointer" }} onClick={handleProfile}>
      <CIcon icon={cibAdguard} className="me-2" />
       Profile
    </CDropdownItem> */}

    <CDropdownItem style={{ cursor: "pointer" }} onClick={handleLogout}>
    <CIcon icon={cilLockLocked} className="me-2" />
    Log out
  </CDropdownItem>
  </>
    )}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
