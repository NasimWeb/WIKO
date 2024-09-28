import BreadCrumb from '../BreadCrumb/BreadCrumb'
import './PagesHeader.css'

function PagesHeader({currentRoute , prevRoute , prevRouteLink , bg}) {
  return (
    <div className='bg-header-page relative' style={{backgroundImage :`linear-gradient(#0000004d,#0000004d) ,url(${bg})`}}>
        <div className="container mx-auto">
            <div className="flex flex-col gap-5 justify-center items-center header-page">
                <h1 className='page-title font-bold text-3xl text-white'>{currentRoute}</h1>
               <BreadCrumb currentRoute={currentRoute} prevRoute={prevRoute ? prevRoute : ''} prevRouteLink={prevRouteLink ? prevRouteLink : ''} />
            </div>
        </div>
    </div>
  )
}

export default PagesHeader
