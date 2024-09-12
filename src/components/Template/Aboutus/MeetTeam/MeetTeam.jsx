import "./MeetTeam.css";
import Heading from "../../../Module/Heading/Heading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function MeetTeam() {
  return (
    <div className="container mx-auto px-20 my-10 meet-team">
      <Heading title={"تیم ما"} desc={" تیم متخصص ما در همه ی امور شما را راهنمایی میکنند "} />
      <div className="flex gap-5 flex-wrap lg:flex-nowrap justify-center">
        <Card sx={{ maxWidth: 345, width: "100%" }}>
          <CardMedia
            sx={{ height: 240 }}
            image="/assets/images/images.jfif"
            title="green iguana"
          />
          <CardContent className="flex flex-col justify-center text-center">
            <Typography gutterBottom variant="h5" component="div">
              پرسنل
            </Typography>
            <Typography variant="body2" color="text.secondary">
              مدیریت
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
            <div className="medias flex gap-4 ">
              <Link>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-pinterest"></i>
              </Link>
            </div>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, width: "100%" }}>
          <CardMedia
            sx={{ height: 240 }}
            image="/assets/images/images.jfif"
            title="green iguana"
          />
          <CardContent className="text-center">
            <Typography gutterBottom variant="h5" component="div">
              پرسنل
            </Typography>
            <Typography variant="body2" color="text.secondary">
              مدیریت
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
          <div className="medias flex gap-4 ">
              <Link>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-pinterest"></i>
              </Link>
            </div>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, width: "100%" }}>
          <CardMedia
            sx={{ height: 240 }}
            image="/assets/images/images.jfif"
            title="green iguana"
          />
          <CardContent className="text-center">
            <Typography gutterBottom variant="h5" component="div">
              پرسنل
            </Typography>
            <Typography variant="body2" color="text.secondary">
              مدیریت
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
          <div className="medias flex gap-4 ">
              <Link>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-pinterest"></i>
              </Link>
            </div>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, width: "100%" }}>
          <CardMedia
            sx={{ height: 240 }}
            image="/assets/images/images.jfif"
            title="green iguana"
          />
          <CardContent className="text-center">
            <Typography gutterBottom variant="h5" component="div">
              پرسنل
            </Typography>
            <Typography variant="body2" color="text.secondary">
              مدیریت
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
          <div className="medias flex gap-4 ">
              <Link>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-pinterest"></i>
              </Link>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default MeetTeam;
