import { Link } from "react-router-dom";
import "./CollectionBox.css";

function CollectionBox({title , baner}) {
  return (
    <div>
      <div className="collection-img">
        <img src={baner} className="category-baner"  />
      </div>
      <div className="collection-title mt-4 mb-3">
        <p className="font-bold text-xl text-center">{title}</p>
      </div>
      {/* <p className="collection-categories-product text-center mb-3">8 products</p> */}
      <div className="collectionButtonDetail text-center">
        <Link to="/products" >
          خرید از کالکشن
        </Link>
      </div>
    </div>
  );
}

export default CollectionBox;
