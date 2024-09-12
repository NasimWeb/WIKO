import { Link } from "react-router-dom";
import "./Advertisment.css";

function Advertisment() {
  return (
    <div className="container px-5 my-10 mx-auto">
      <div className="effectFour relative">
        <Link href="/" className='flex justify-center'>
          <img
            src="/assets/images/original-77b5fc543a1d9235b36fdf372bd9dba9.jpg"
            alt=""
            style={{width:'700px' , maxWidth: '100%'}}
          />
        </Link>
      </div>
    </div>
  );
}

export default Advertisment;
