import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Component } from "react";
class Nation extends Component {

    handleClick = () => {
        this.props.onClick(this.props.nationId);
    }

    render() {
        let imageLink =
        "https://cdn.futbin.com/content/fifa23/img/nation/" +
        this.props.nationId +
        ".png";
    return (
      <Card onClick={this.handleClick} elevation={0} style={{ width: "70px", height: "90px" }}>
        <div style={{ position: "relative" }}>
          <CardMedia
            style={{ width: "70px" }}
            component="img"
            image={imageLink}
          />
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "50px",
              left: "0px",
            }}
          >
            <Typography
              style={{
                color: "black",
                fontFamily: "UltimateTeamCondensed",
                fontSize: "2rem",
                fontWeight: 700,
              }}
              variant="h6"
              component="div"
              gutterBottom
            >
              {this.props.count}
            </Typography>
          </div>
        </div>
      </Card>
    );
  };
}
export default Nation;
  