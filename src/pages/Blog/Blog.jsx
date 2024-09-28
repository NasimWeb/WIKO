import "./Blog.css";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import BlogBox from "../../components/Template/Blog/BlogBox/BlogBox";
import {  useState } from "react";
import { useQuery } from "react-query";
import Pagination from "../../Hooks/pagination";


function Blog() {
  const [blogs, setBlogs] = useState([]);
  

  const allBlogs = async () => {
    await fetch("https://wiko.pythonanywhere.com/content/blogs").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setBlogs(data);
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };

 
  useQuery("Blogs", allBlogs);

  const [currentPage , setCurrentPage] = useState(1)

  const getCurrentPageItems = () => {
   const startIndex = (currentPage - 1) * 6
   const endIndex = startIndex + 6
   const items = blogs?.slice(startIndex,endIndex)
   return items
  }

 
  


  return (
    <div>
      <PagesHeader currentRoute={"بلاگ"}   bg={'/assets/images/0ba3d60362c7e6d256cfc1f37156bad9.jpg'}/>
      <div className="container mx-auto px-5  my-24">
        <div className="grid lg:grid-cols-3 gap-5">
          {getCurrentPageItems()?.length > 0 &&
            getCurrentPageItems().map((blog) => {
              return (
                <div key={blog.id}>
                  <BlogBox {...blog} />
                </div>
              );
            })}
        </div>
        {
        getCurrentPageItems()?.length > 0 && 
       <div className="flex justify-center mt-5">
       <Pagination totalItems={blogs.length - 1} itemsPerPage={6} pagesPerGroup={5} currentPage={currentPage} setCurrentPage={setCurrentPage} />
       </div>
        }
      </div>
    </div>
  );
}

export default Blog;
