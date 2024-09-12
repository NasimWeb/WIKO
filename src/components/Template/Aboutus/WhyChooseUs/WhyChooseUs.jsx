import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import './WhyChooseUs.css'

function WhyChooseUs() {
  return (
    
    <div className='container px-20  mx-auto my-10 mt-20'>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="why-choose-us-content flex flex-col gap-5 justify-center items-center bg-why">
               <p className="text-3xl font-bold text-white">چرا ما را انتخاب کنید ؟</p>
               <ul className="flex p-5 gap-20">
                <div className='flex flex-col gap-5'>
                <div>
                <li className='text-white text-xl font-bold'> <LocalShippingIcon className='mr-5'/>  ارسال رایگان</li>
                <p className='text-white '>ارسال رایگان به تمام نقاط جهان </p>
                </div>
                <div>
                <li className='text-white text-xl font-bold'> <AcUnitIcon className='mr-5' />  ضمانت دو ساله </li>
                <p className='text-white '>دارای ضمامنت دو ساله</p>
                </div>
                </div>
                <div className='flex flex-col gap-5'>
                <div className='flexflex-col gap-4'>
                <li className='text-white text-xl font-bold'> <ElectricBoltIcon className='mr-5' /> انتقال سریع</li>
                <p  className='text-white '>انتقال سریع و مناسب</p>
                </div>
                <div className='flexflex-col gap-4'>
                <li className='text-white text-xl font-bold'> <CardGiftcardIcon className='mr-5' /> هدیه بهاره </li>
                <p className='text-white '>هدیه بهاره مناسب</p>
                </div>
                </div>
               </ul>
            </div>
            <div className="why-choose-us-img">
                <img src="/src/assets/images/about4_900x.webp" alt="" />
            </div>
          </div>
    </div>
   
  )
}

export default WhyChooseUs
