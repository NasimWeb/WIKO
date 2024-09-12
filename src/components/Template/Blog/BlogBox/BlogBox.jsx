import './BlogBox.css'
import { Link } from 'react-router-dom'

function BlogBox({title , image}) {
  return (
    <div className="flex justify-center flex-wrap">
    <div className="wrapper-slid relative flex flex-wrap items-center justify-center gap-5">
      <div className="blogimg relative">
        <Link to={`/blog/${title}`}>
          <img
            src={image}
            className=""
            alt=""
            style={{width: '300px' , maxWidth : '100%'}}
          />
        </Link>
      </div>
     
      <div className="content-slid">
        <div className="font-bold" style={{maxWidth:' 128px'}}>  {title} </div>
        {/* <p>
          در این مقاله پیراهن های دخترانه مناسب فصل بهار را مشاهده میکنید
        </p> */}
        <div className="collectionButtonDetail mt-3"><Link to={`/blog/${title}`} >بیشتر بدانید</Link></div>
      </div>
    </div>
  </div>
  )
}

export default BlogBox
