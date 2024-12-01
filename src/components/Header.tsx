import Image from 'next/image';
import cimol from '../public/assets/cimol.png';
import info from '../public/assets/info.png';

const Header = () => {
  return (
    <div className='header header-armarios'>
        <Image src={cimol} alt="header" style={{height: "90px", width: "auto"}}></Image>
        <div className="header-selection">
            <button className="selection-armarios">Armários</button>
            <button className="selection-turmas">Turmas</button>
        </div>
        <Image src={info} alt="header" style={{height: "60px", width: "auto"}}></Image>
    </div>
  )
}

export default Header;
