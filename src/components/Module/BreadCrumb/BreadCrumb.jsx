import { Link } from "react-router-dom";
import './BreadCrumb.css'

function BreadCrumb({ currentRoute, prevRoute , prevRouteLink }) {
  return (
    <div className="flex justify-center gap-3 breadcrumb flex-wrap">
      <Link to={"/"} >خانه</Link> <span >/</span>
      {prevRoute && <Link  to={prevRouteLink}>{prevRoute}  / </Link>}
      <p  className="active">{currentRoute}</p>
    </div>
  );
}

export default BreadCrumb;
