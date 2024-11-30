import Image from 'next/image';
import cimol from '../public/assets/cimol.png';
import info from '../public/assets/info.png';

export default function Header() {
  return (
    <div className='header'>
        <Image src={cimol} alt="header"></Image>
        <div className="header-selection">
            <div>Armários</div>
            <div>Turmas</div>
        </div>
        <Image src={info} alt="header"></Image>
    </div>
  )
}
