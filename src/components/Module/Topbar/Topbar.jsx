import { Link } from 'react-router-dom'
import './Topbar.css'


function Topbar() {

  

  return (
    <div className='bg-topbar py-2 hidden xl:block'>
        <div className="container px-5 mx-auto">
              <div className="flex justify-between items-center">
                <div className="infos flex gap-2">
                      <div className="phone"><i className="fa-solid fa-phone"></i> <Link to={'tel:+391 (0)35 2568 4593'}>+391 (0)35 2568 4593</Link></div>
                      <div className="line mx-2">|</div>
                      <div className="email"><i className="fa-solid fa-envelope"></i>    <Link to={'mailto:velatheme@gmail.com'}>velatheme@gmail.com</Link></div>
                </div>
                <div className="flex gap-2 items-center">همین حالا با تخفیفات ما خرید کنید <button className='read-more'>همین حالا خرید کن</button></div>
                <div className="media">
                    <ul className='flex gap-3'>
                        <li><Link to={'/'}><i className="fa-brands fa-facebook-f"></i></Link></li>
                        <li><Link to={'/'}><i className="fa-brands fa-twitter"></i></Link></li>
                        <li><Link to={'/'}><i className="fa-brands fa-instagram"></i></Link></li>
                        <li><Link to={'/'}><i className="fa-brands fa-pinterest"></i></Link></li>
                        <li><Link to={'/'}><i className="fa-brands fa-youtube"></i></Link></li>
                    </ul>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Topbar
