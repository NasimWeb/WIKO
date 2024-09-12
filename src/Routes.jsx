import About from './pages/About/About'
import Blog from './pages/Blog/Blog'
import Collection from './pages/Collection/Collection'
import ContactUs from './pages/ContactUs/ContactUs'
import Faq from './pages/Faq/Faq'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import Products from './pages/Products/Products'
import SingleProduct from './pages/singleProduct/SingleProduct'
import SingleBlog from './pages/SingleBlog/SingleBlog'
import AdminPanel from './pages/AdminPanel/Index'
import LoginAdmin from './pages/AdminPanel/Login/LoginAdmin'
import ProductsList from './pages/AdminPanel/Products/ProductsList'
import Categories from './pages/AdminPanel/Categories/Categories'
import SubCategories from './pages/AdminPanel/SubCategories/SubCategories'
import BlogsList from './pages/AdminPanel/Blogs/BlogsList'
import Users from './pages/AdminPanel/Users/Users'
import Comments from './pages/AdminPanel/Comments/Comments'
import Menus from './pages/AdminPanel/Menus/Menus'
import ContactUsMessages from './pages/AdminPanel/ContactUsMessages/ContactUsMessages'
import Analytic from './pages/AdminPanel/Analytic/Analytic'
import ProductsEdit from './pages/AdminPanel/ProductEdit/ProductsEdit'
import Defualt from './pages/AdminPanel/Defualt/Defualt'
import AddProduct from './pages/AdminPanel/AddProduct/AddProduct'
import AddCategory from './pages/AdminPanel/Add Category/AddCategory'
import AddSubCategory from './pages/AdminPanel/AddSubCategory/AddSubCategory'
import AddBlog from './pages/AdminPanel/AddBlog/AddBlog'
import Keywords from './pages/AdminPanel/Keywords/Keywords'
import AddKeywords from './pages/AdminPanel/AddKeywords/AddKeywords'
import BlogEdit from './pages/AdminPanel/BlogEdit/BlogEdit'
import ProductGallery from './pages/AdminPanel/ProductGallery/ProductGallery'
import EditKeyword from './pages/AdminPanel/EditKeyword/EditKeyword'
import EditUser from './pages/AdminPanel/EditUser/EditUser'
import EditGallery from './pages/AdminPanel/EditGallery/EditGallery'
import Story from './pages/AdminPanel/Story/Story'
import AddStory from './pages/AdminPanel/AddStory/AddStory'
import EditCategory from './pages/AdminPanel/EditCategory/EditCategory'
import EditSubCategory from './pages/AdminPanel/EditSubCategory/EditSubCategory'
import ReplyContactMessage from './pages/AdminPanel/ReplyContactMessage/ReplyContactMessage'
import UserPanel from './pages/UserPanel/UserPanel'
import Orders from './pages/UserPanel/Orders/Orders'
import AcountDetail from './pages/UserPanel/AcountDetail/AcountDetail'
import BasketCard from './pages/BasketCard/BasketCard'
import AddMenu from './pages/AdminPanel/AddMenu/AddMenu'
import EditMenu from './pages/AdminPanel/EditMenu/EditMenu'
import Faqs from './pages/AdminPanel/Faqs/Faqs'
import AddFaq from './pages/AdminPanel/AddFaq/AddFaq'
import EditFaq from './pages/AdminPanel/EditFaq/EditFaq'
import ReplyComment from './pages/AdminPanel/ReplyComment/ReplyComment'

const router = [
     {path : '*' , element: <NotFound />},
     {path : '/' , element : <Home/>},
     {path : '/userPanel/:userId/*' , element : <UserPanel/> , children : [
          {path : 'orders' , element : <Orders/>},
          {path : '' , element : <AcountDetail />}
     ]},
     {path : '/basketCard' , element : <BasketCard />},
     {path : '/login' , element : <Login />},
     {path : '/faq' , element : <Faq />},
     {path : '/about' , element : <About />},
     {path : '/collection' , element : <Collection />},
     {path : '/blog' , element : <Blog />},
     {path : '/products' , element : <Products />},
     {path : '/contact' , element : <ContactUs />},
     {path : '/products/:productSlug' , element : <SingleProduct />},
     {path : '/blog/:blogTitle' , element : <SingleBlog />},
     {path : '/p-admin/*' ,  element :<LoginAdmin><AdminPanel /></LoginAdmin> , children : [
          {path : '' , element : <Defualt />},
          {path : 'productsList' , element : <ProductsList />},
          {path : 'productsList/addProduct' , element : <AddProduct /> },
          {path : `productsList/Gallery/:productSlug` , element : <ProductGallery />},
          {path : 'productsList/Gallery/:productSlug/editGallery/:galleryId' , element : <EditGallery />},
          {path : 'productsList/productsListEdit/:productSlug' , element : <ProductsEdit />},
          {path : 'categories', element : <Categories />},
          {path : 'categories/editCategory/:categoryId', element : <EditCategory />},
          {path : 'categories/addCaregory', element : <AddCategory />},
          {path : 'categories/subCategories', element : <SubCategories />},
          {path : 'categories/subCategories/addSubCategory', element : <AddSubCategory />},
          {path : 'categories/subCategories/editSubCategory/:subId', element : <EditSubCategory />},
          {path : 'blogsList', element : <BlogsList />},
          {path : 'blogsList/editBlog/:blogSlug', element : <BlogEdit />},
          {path : 'blogsList/addBlog', element : <AddBlog />},
          {path : 'users', element : <Users />},
          {path : 'faqs', element : <Faqs />},
          {path : 'faqs/addFaq', element : <AddFaq />},
          {path : 'faqs/editFaq/:faqId', element : <EditFaq />},
          {path : 'users/:userId', element : <EditUser />},
          {path : 'comments', element : <Comments />},
          {path : 'comments/reply/:productId/:commentId', element : <ReplyComment />},
          {path : 'stories' , element : <Story />},
          {path : 'stories/addStory' , element : <AddStory />},
          {path : 'menus', element : <Menus />},
          {path : 'menus/addMenu', element : <AddMenu />},
          {path : 'menus/editMenu/:menuId', element : <EditMenu />},
          {path : 'contactus/messages', element : <ContactUsMessages />},
          {path : 'contactus/messages/reply/:messageId', element : <ReplyContactMessage />},
          {path : 'Analytic', element : <Analytic />},
          {path : 'keywords', element : <Keywords />},
          {path : 'keywords/addKeywords', element : <AddKeywords />},
          {path : 'keywords/:keywordId', element : <EditKeyword />},
     ]},
]




export default router