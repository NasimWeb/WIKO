import "./Blog.css";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import BlogBox from "../../components/Template/Blog/BlogBox/BlogBox";
import {  useState } from "react";
import { useQuery } from "react-query";


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



  return (
    <div>
      <PagesHeader currentRoute={"بلاگ"} />
      <div className="container mx-auto px-5 my-24">
        <div className="grid lg:grid-cols-3 gap-5">
          {blogs &&
            blogs.map((blog) => {
              return (
                <div key={blog.id}>
                  <BlogBox {...blog} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
