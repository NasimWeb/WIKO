import { Link } from "react-router-dom";
import './BreadCrumb.css'

function BreadCrumb({ currentRoute, prevRoute , prevRouteLink }) {
  return (
    <div className="flex justify-center gap-3 text-lg breadcrumb flex-wrap">
      <Link style={{color : '#fff', fontWeight : 800}} to={"/"} >خانه</Link> <span className="text-white" >/</span>
      {prevRoute && <Link className="text-white"  to={prevRouteLink}>{prevRoute}  / </Link>}
      <p  className="active">{currentRoute}</p>
    </div>
  );
}

export default BreadCrumb;
