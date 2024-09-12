import { Link, useParams } from "react-router-dom";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import "./SingleBlog.css";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import extractPlainText from "../../Hooks/extractPlainText";
import { getAccessToken } from "../../Funcs/getCookie";
import getTokenLocal from "../../Funcs/getTokenLocal";

function SingleBlog() {
  const [allBlog, setAllBlog] = useState([]);
  const [mainBlog, setMainBlog] = useState();
  const [keywords, setKeywords] = useState([]);
  const [mainTags, setMainTags] = useState([]);

  const { blogTitle } = useParams();

  const allBlogs = async () => {
    await fetch("http://127.0.0.1:8000/content/blogs").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setAllBlog(data);
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };

   useQuery("Blogs", allBlogs);

  useEffect(() => {
    const mainBlog = allBlog?.find((blog) => blog.title == blogTitle);
    setMainBlog(mainBlog);
  }, [allBlog , blogTitle]);



  const fetchTags = async () => {
    await fetch("http://127.0.0.1:8000/panel/tags/", {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setKeywords(data);
          return data;
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };

  useQuery("Keywords", fetchTags);

  useEffect(() => {
    const blogTags = [];

    mainBlog?.tags.map((tag) => {
      const filterTags = keywords.find((keyword) => {
        return keyword.id == tag;
      });
      blogTags.push(filterTags);
    });
    setMainTags([...blogTags]);
  }, [keywords, mainBlog?.tags]);

  

  return (
    <>
      <PagesHeader currentRoute={mainBlog?.title} prevRoute={'بلاگ'} prevRouteLink={'/blog'}/>
      <div className="container mx-auto px-10 my-20">
        <div className="grid xl:grid-cols-blog gap-10">
          <div className="contant">
            <div>
              <img className="w-full h-auto" src={mainBlog?.image} alt="" />
            </div>
            <div className="blog-title">
              <h2 className="font-bold text-3xl my-3">{mainBlog?.title}</h2>
              <p className="date-blog mb-2">
                {mainBlog?.publish_date.slice(0, 10)}
              </p>
              <p className="mb-2">{extractPlainText(mainBlog?.content)}</p>
              <hr />
              <div className="share flex gap-2 my-5">
                <p>share:</p>
                <div className="share-icon flex gap-2">
                  <Link>
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link>
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link>
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            <div className="keywordsWrapp mt-5">
              {mainTags?.map((tag) => {
                return <Link key={tag.id}>{tag.name}</Link>;
              })}
            </div>
          </div>
          <div className="sidebar px-5 hidden xl:block">
            <div className="searchbox relative">
              <input
                type="text"
                className="form-control form-blog"
                placeholder="بلاگ مورد نظر را سرچ کنید"
                name=""
                id=""
              />
              <i className="fa fa-search absolute top-4 left-3 cursor-pointer"></i>
            </div>
            <div className="recent-blogs mt-10 text-end">
              <p className="font-bold side-title text-2xl relative">
                آخرین بلاگ ها
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {allBlog &&
                  allBlog
                    .slice()
                    .reverse()
                    .map((blog) => {
                      return (
                        <div
                          key={blog.id}
                          className="flex gap-3 items-center justify-between"
                        >
                          <img
                            style={{ width: "84px", maxWidth: "100%" }}
                            src={blog.image}
                            alt=""
                          />
                          <div>
                            <li>
                              <Link to={`/blog/${blog?.title}`} className="font-bold ">{blog.title}</Link>
                            </li>
                            <p className="blog-date">
                              {blog.publish_date.slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </ul>
            </div>

            <div className="advertisment effectOne mt-5 relative">
              <Link to="/products">
                <img
                  className="advertisement-img w-full"
                  src="/src/assets/images/5b09038687d6de399b41804875daf588.jpg"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
