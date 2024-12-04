import Image from 'next/image';
import cimol from '../public/assets/cimol.png';
import info from '../public/assets/info.png';

const Header = () => {
  return (
    <div className='header header-armarios'>
        <Image src={cimol} alt="header" style={{height: "90px", width: "auto"}}></Image>
        <Image src={info} alt="header" style={{height: "60px", width: "auto"}}></Image>
    </div>
  )
}

export default Header;
