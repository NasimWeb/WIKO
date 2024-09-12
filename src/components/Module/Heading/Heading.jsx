import './Heading.css'

function Heading({title , desc}) {
  return (
    <div className='text-center my-10'>
        <h3 className='title-heading'>{title}</h3>
        <p className='desc-heading'>{desc}</p>
    </div>
  )
}

export default Heading
