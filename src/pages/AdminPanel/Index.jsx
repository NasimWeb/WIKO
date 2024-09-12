import { Link, Outlet } from "react-router-dom";
import "./Index.css";
import { useContext, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DotChartOutlined,
  SearchOutlined,
  BellOutlined,
  GlobalOutlined,
  SettingOutlined,
  BorderBottomOutlined,
  ProductOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
  AppstoreOutlined,
  MessageOutlined,
  BorderVerticleOutlined,
  DribbbleOutlined,
  PictureOutlined,
  LogoutOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Input } from "antd";
import { Badge } from "antd";
import authContext from "../../Contexts/authContext";




function Index() {

  const { logout , userInfo} = useContext(authContext)

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


 
 


  return (
    <>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center">
            <div
              className={`logo ${collapsed ? "ml-0" : "ml-7"} hidden lg:block`}
            >
              <Link to={"/p-admin/"}>
                <img
                  src={
                    collapsed
                      ? "assets/images/Screenshot 2024-07-13 142957.png"
                      : "assets/logo.svg"
                  }
                  className={`${collapsed ? "w-12 pl-5" : " w-16"}`}
                  alt=""
                />
              </Link>
            </div>
            <div
              className={` ml-0 xl:ml-16 ${
                collapsed ? "ml-0" : "ml-16"
              } hidden lg:block `}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Input
                size="meduim"
                placeholder="search"
                prefix={<SearchOutlined />}
                style={{ width: "280px", paddingBlock: "7px" }}
                variant="filled"
              />
   
            </div>
            <div className="lg:hidden ml-5">
              {/* <AlignLeftOutlined  /> */}
              <div className="menuButton">
                <input
                  type="checkbox"
                  id="navcheck"
                  role="button"
                  title="menu"
                />
                <label htmlFor="navcheck" aria-hidden="true" title="menu">
                  <span className="burger">
                    <span className="bar">
                      <span className="visuallyhidden">Wiko</span>
                    </span>
                  </span>
                </label>
                <ul id="menu" className="menuNav">
                  <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                      {
                        key: "1",
                        icon: <DotChartOutlined />,
                        label: <Link to={"Analytic"}>Analytic</Link>,
                      },
                      {
                        key: "2",
                        icon: <BorderBottomOutlined />,
                        label: <Link to={"categories"}>Categories</Link>,
                        children: [
                          {
                            key: "sub",
                            label: (
                              <Link to={"categories/subCategories"}>
                                sub Category
                              </Link>
                            ),
                          },
                        ],
                      },
                      {
                        key: "3",
                        icon: <ProductOutlined />,
                        label: <Link to={"productsList"}>Products</Link>,
                      },
                      {
                        key: "4",
                        icon: <BookOutlined />,
                        label: <Link to={"blogsList"}>Blogs</Link>,
                      },
                      {
                        key: "5",
                        icon: <BorderVerticleOutlined />,
                        label: <Link to={"keywords"}>Keywords</Link>,
                      },
                      {
                        key: "6",
                        icon: <UsergroupAddOutlined />,
                        label: <Link to={"users"}>Users</Link>,
                      },
                      {
                        key: "7",
                        icon: <CommentOutlined />,
                        label: <Link to={"comments"}>Comments</Link>,
                      },
                      {
                        key: "8",
                        icon: <AppstoreOutlined />,
                        label: <Link to={"menus"}>Menus</Link>,
                      },
                      {
                        key: "9",
                        icon: <PictureOutlined />,
                        label: <Link to={"stories"}>Story</Link>,
                      },
                      {
                        key: "10",
                        icon: <PictureOutlined />,
                        label: <Link to={"faqs"}>Faqs</Link>,
                      },
                      {
                        key: "11",
                        icon: <MessageOutlined />,
                        label: (
                          <Link to={"contactus/messages"}>Contact Us</Link>
                        ),
                      },
                      {
                        key: "12",
                        icon: <LogoutOutlined />,
                        label: (
                          <Link onClick={() => logout()}>
                            Log Out
                          </Link>
                        ),
                      },
                      {
                        key: "13",
                        icon: <DribbbleOutlined />,
                        label: <Link to={"/"}>Show Site</Link>,
                      },
                    ]}
                  ></Menu>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5" style={{ height: "100%" }}>
            <Link to="#">
              <Badge count={5}>
                <BellOutlined style={{ fontSize: "18px" }} />
              </Badge>
            </Link>

            <GlobalOutlined style={{ fontSize: "18px" }} />
            <SettingOutlined style={{ fontSize: "18px" }} />
            <div className="flex items-center mr-6">
              <div className="profile flex items-center gap-3">
                <img
                  src="/assets/images/thumb-1.jpg"
                  className="rounded-full"
                  style={{ width: "40px" }}
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="name font-bold">{userInfo?.username}</span>
                  <span className="role">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            className="hidden lg:block"
            trigger={null}
            theme="light"
            collapsible
            collapsed={collapsed}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <DotChartOutlined />,
                  label: <Link to={"Analytic"}>Analytic</Link>,
                },
                {
                  key: "2",
                  icon: <BorderBottomOutlined />,
                  label: <Link to={"categories"}>Categories</Link>,
                  children: [
                    {
                      key: "sub",
                      label: (
                        <Link to={"categories/subCategories"}>
                          sub Category
                        </Link>
                      ),
                    },
                  ],
                },
                {
                  key: "3",
                  icon: <ProductOutlined />,
                  label: <Link to={"productsList"}>Products</Link>,
                },
                {
                  key: "4",
                  icon: <BookOutlined />,
                  label: <Link to={"blogsList"}>Blogs</Link>,
                },
                {
                  key: "5",
                  icon: <BorderVerticleOutlined />,
                  label: <Link to={"keywords"}>Keywords</Link>,
                },
                {
                  key: "6",
                  icon: <UsergroupAddOutlined />,
                  label: <Link to={"users"}>Users</Link>,
                },
                {
                  key: "7",
                  icon: <CommentOutlined />,
                  label: <Link to={"comments"}>Comments</Link>,
                },
                {
                  key: "8",
                  icon: <AppstoreOutlined />,
                  label: <Link to={"menus"}>Menus</Link>,
                },
                {
                  key: "9",
                  icon: <PictureOutlined />,
                  label: <Link to={"stories"}>Story</Link>,
                },
                {
                  key: "10",
                  icon: <HolderOutlined />,
                  label: <Link to={"faqs"}>Faqs</Link>,
                },
                {
                  key: "11",
                  icon: <MessageOutlined />,
                  label: <Link to={"contactus/messages"}>Contact Us</Link>,
                },
                {
                  key: "12",
                  icon: <LogoutOutlined />,
                  label: (
                    <Link onClick={() => logout()}>Log Out</Link>
                  ),
                },
                {
                  key: "13",
                  icon: <DribbbleOutlined />,
                  label: <Link to={"/"}>Show Site</Link>,
                },
              ]}
            ></Menu>
          </Sider>
          <Content
            style={{
              margin: "10px 10px",
              maxWidth: "100%",
              overflowX: "hidden",
              minHeight: 580,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Index;
