import LatLngLogo from '#components/TopBar/LatLngLogo'
import { NavMenuVariant } from '#lib/AppConfig'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link } from '@nextui-org/react'


const BottomBar = () => (
  <div className='absolute bottom-0 w-full z-40'>
  <Navbar  isBlurred={true} isBordered={true}>
      <NavbarBrand>
        <p className="font-bold text-inherit">KEWL</p>
      </NavbarBrand>
    </Navbar>
  </div>
)

export default BottomBar
