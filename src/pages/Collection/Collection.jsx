import { useEffect, useState } from 'react'
import PagesHeader from '../../components/Module/PagesHeader/PagesHeader'
import CollectionBox from '../../components/Template/Collection/CollectionBox/CollectionBox'
import './Collection.css'

function Collection() {

  const [categories , setCategories] = useState([])

  useEffect(() => {
   async function fetchData () {
     await fetch('https://wiko.pythonanywhere.com/content/categorys').then(res => {
      if(res.ok){
        return res.json().then(categories => setCategories(categories))
      }
      return res.text().then(err => console.error(err))
     })
    }

    fetchData()
    } , [])



  return (
    <>
     <PagesHeader currentRoute={'کالکشن '} bg={'/assets/images/bandeau-access-2021-desktop.jpg'} />
      <div className='container mx-auto px-20 my-24'>
      <div className='grid lg:grid-cols-4 justify-center gap-5'>
        {
          categories?.map(category => {
            if(!category.is_sub) {
              return  <CollectionBox key={category.id} {...category} />
            }
          })
        }
     </div>
      </div>
          
    </>
  )
}

export default Collection
