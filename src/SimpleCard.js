import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const SimpleCard = (props) => {
    return (
      <Card elevation={0} style={{ width: "175px" }}>
        <div style={{ position: "relative" }}>
          <CardMedia
            style={{ width: "175px" }}
            component="img"
            image={props.cardType}
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
                color: props.textColor,
                fontFamily: "UltimateTeamCondensed",
                fontSize: "4rem",
                fontWeight: 700,
              }}
              variant="h6"
              component="div"
              gutterBottom
            >
              {props.cardAmount}
            </Typography>
          </div>
        </div>
      </Card>
    );
  };
  export default SimpleCard;