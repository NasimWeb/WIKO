import { Col, message, Row, Spin } from "antd";
import { useState } from "react";
import {  useParams } from "react-router-dom";


function AcountDetail() {

    const {userId} = useParams()
    const [loading , setLoading] = useState(false)
    
    const {username , phone  , is_admin , password , user_id} = JSON.parse(localStorage.getItem('userInfo'))
   

    const [usernamePanel , setUsernamePanel] = useState(username)
    const [phonePanel , setPhonePanel] = useState(phone)


      const editUser = async (e) => {
        setLoading(true)
        e.preventDefault()
        await fetch(`https://wiko.pythonanywhere.com/panel/update/user/${userId}/`,{
          method : 'PUT',
          headers : {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
          body :  JSON.stringify({
            phone : phonePanel,
            username : usernamePanel,
            is_admin : is_admin
          })
        }).then(res => {
          if(res.ok){
            setLoading(false)
            localStorage.setItem('userInfo',JSON.stringify({
              username : usernamePanel ,
              phone : phonePanel ,
              is_admin : is_admin,
              user_id : user_id
            }))
           return message.success('با موفقیت آپدیت شد ')
          }else {
            setLoading(false)
            res.text().then(err => console.log(err)
            )
          }
        })
      }

  return (

    <>
   {loading && (
        <div className="overlay">
          <Spin size="large" />
        </div>
      )}
    <div className="bg-white p-5 rounded-lg mt-10">
      <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-4.5 rounded-2xl">
        <div
          className="pb-4.5 text-right border-b border-b-gray-200 dark:border-b-slate-500"
          style={{ paddingBottom: "16px" }}
        >
          <span className="font-danaMedium  md:text-xl text-zinc-700 dark:text-white">
            جزییات حساب کاربری
          </span>
        </div>
        <form id="edit-account-info" className="p-3.5 pt-8">
          <Row>
            <Col span={24}>
              <Row className="gap-2">
                <Col span={11}>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="نام کاربری" style={{textWrap : 'nowrap'}}>نام کاربری</label>
                    <input
                      type="text"
                      id="نام کاربری"
                      name="نام کاربری"
                      value={usernamePanel}
                      onChange={e => setUsernamePanel(e.target.value)}
                      className="bg-gray-200 w-full p-3 rounded-xl border border-gray-200 fous:border-gray-100"
                    />
                  </div>
                </Col>

                <Col span={11}>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="تلفن" style={{textWrap : 'nowrap'}}>تلفن</label>
                    <input
                      type="text"
                      id=""
                      name="تلفن"
                      value={phonePanel}
                      onChange={e => setPhonePanel(e.target.value)}
                      className="bg-gray-200 w-full p-3 rounded-xl border border-gray-200 fous:border-gray-100"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
            <button onClick={editUser} className="p-4 mt-10 bg-main text-white rounded-lg text-lg">ثبت اطلاعات</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default AcountDetail;
