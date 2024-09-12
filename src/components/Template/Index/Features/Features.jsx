import "./Features.css";

function Features() {
  return (
    <div className="container px-20 my-20 mx-auto">
      <div className="grid  lg:grid-cols-3 gap-5">
        <div className="features">
          <div className="flex justify-center mb-3">
            <img src="./src/assets/images/ourservice-1_180x.png" alt="" />
          </div>
          <div className="featuretitle">ارسال رایگان به سراسر جهان</div>
          <div className="featuredesc">ارسال رایگان در سراسر جهان</div>
        </div>
        <div className="features">
          <div className="flex justify-center mb-3">
            <img src="./src/assets/images/ourservice-2_180x.png" alt="" />
          </div>

          <div className="featuretitle">پشتیبانی 24/7 ساعته</div>
          <div className="featuredesc">پشتیابی 24 ساعته از سرویس ها</div>
        </div>
        <div className="features">
          <div className="flex justify-center mb-3">
            <img src="./src/assets/images/ourservice-3_180x.png" alt="" />
          </div>

          <div className="featuretitle">ضمانت بازگشت وجه</div>
          <div className="featuredesc">بازگشت وجه 31 روزه</div>
        </div>
      </div>
    </div>
  );
}

export default Features;
