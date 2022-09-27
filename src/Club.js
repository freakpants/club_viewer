import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const Club = (props) => {
    let imageLink =
      "https://cdn.futbin.com/content/fifa23/img/clubs/" +
      props.teamId +
      ".png";
    return (
      <Card
        elevation={0}
        style={{
          width: "70px",
          height: "110px",
          background: "#202020",
          marginBottom: "10px",
        }}
      >
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
              top: "60px",
              left: "0px",
            }}
          >
            <Typography
              style={{
                color: "white",
                fontFamily: "UltimateTeamCondensed",
                fontSize: "2rem",
                fontWeight: 700,
              }}
              variant="h6"
              component="div"
              gutterBottom
            >
              {props.count}
            </Typography>
          </div>
        </div>
      </Card>
    );
  };
  export default Club;