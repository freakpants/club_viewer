import React, { Component, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import BronzeCommon from "./cards/cards_bg_e_1_0_1.png";
import BronzeRare from "./cards/cards_bg_e_1_1_1.png";
import SilverCommon from "./cards/cards_bg_e_1_0_2.png";
import SilverRare from "./cards/cards_bg_e_1_1_2.png";
import GoldCommon from "./cards/cards_bg_e_1_0_3.png";
import GoldRare from "./cards/cards_bg_e_1_1_3.png";
import Conmebol from "./cards/cards_bg_e_1_53_0.png";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Star from "./assets/star.png";

/* https://cdn.futbin.com/content/fifa23/img/nation/38.png */
const Nation = (props) => {
  let imageLink =
    "https://cdn.futbin.com/content/fifa23/img/nation/" +
    props.nationId +
    ".png";
  return (
    <Card elevation={0} style={{ width: "70px", height: "90px" }}>
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
            {props.count}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

const League = (props) => {
  let imageLink =
    "https://cdn.futbin.com/content/fifa23/img/league/" +
    props.leagueId +
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

const PlayerCard = (props) => {
  const {
    definitionId,
    firstName,
    lastName,
    knownAs,
    console_price,
    rating,
    rareflag,
    teamId,
    playerId,
    nationId,
    pac,
    pas,
    phy,
    sho,
    dri,
    def,
    preferredPosition
  } = props.player;
  let imageLink =
    "https://cdn.futbin.com/content/fifa23/img/players/" +
    definitionId +
    ".png";
  let badge =
    "https://cdn.futbin.com/content/fifa23/img/clubs/" + teamId + ".png";
  let cardImage = BronzeCommon;
  if (parseInt(rating) > 74 ) {
    if(rareflag == 1) {
      cardImage = GoldRare;
    } else {
      cardImage = GoldCommon;
    }
  }

  if(rareflag === "53"){
    cardImage = Conmebol;
  }

  const nationflag = "https://www.futwiz.com/assets/img/fifa22/flags/" + nationId + ".png";

  let original = "https://static.wefut.com/assets/images/fut23/playeravatars/" + playerId +  ".png";
  /* let dynamic = "https://static.wefut.com/assets/images/fut23/playeravatars/" + definitionId + ".png";
  let dynamic_custom = "https://static.wefut.com/assets/images/fut23/playeravatars/custom/" + definitionId + ".png"; */

  return ( 
    <div class={"card fifa22 gold"}>
      <div class={"scard"}>
        <img class={"player-card"} src={cardImage} />
        <a href="">
          <img src={badge} class="clubbadge" />
        </a>
        <div class={"avatarholder"}>
            <img class={"dynamic avatar original"} src={original} /> 
        </div>
        <a href="">
            <img src={nationflag} class={"nationflag"} />
         </a>
         <div class={"attributes"}>
        <div class={"middle-border"}></div>
        <span class={"pace"}>{pac}</span>
        <span class={"shooting"}>{sho}</span>
        <span class={"passing"}>{pas}</span>
        <span class={"dribbling"}>{dri}</span>
        <span class={"defending"}>{def}</span>
        <span class={"heading"}>{phy}</span>
    </div>
    <div class={"ratingholder"} ><span class={"rating"} >{rating}</span></div>
    <div class={"positions"}><div class={"main_position"}></div>
      <div class="alt_positions">
        <span class="alt_position single"></span>
      </div>
    </div>
    <div class="name darken">
            <span class="marquee ">{knownAs !== "" ? knownAs : lastName}</span>
        </div>
        <div class="name-border"></div>
        <div class="bottom-border"></div>
        <div class="position-border"></div>
        <div class="region-border"></div>
        <div class="skill-container-wrapper no-promo">
            <div class="skill-container work">
                <span class="skillvalue"></span>
                <span class="skilllabel">WR</span>
            </div>
            <div class="skill-container skill">
            <span class="skillvalue"></span>
            <img src={Star} class="star" />
                <span class="skilllabel">SM</span>
                
                
            </div>

            <div class="skill-container weak">
            <span class="skillvalue"></span>
            <img src={Star} class="star" />
                <span class="skilllabel">WF</span>

            </div>
            <div class="skill-container price-range"></div><div class={"skill-container price"}>{console_price}</div><div class="price-range"></div>
        </div>
      </div>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      bronze: 0,
      bronzeCommon: 0,
      bronzeRare: 0,
      silver: 0,
      silverCommon: 0,
      silverRare: 0,
      gold: 0,
      goldCommon: 0,
      goldRare: 0,
      untradeable: 0,
      tradeable: 0,
      nationsCount: [],
      leaguesCount: [],
      mostExpensiveTradeablePlayer: "",
      mostExpensiveUntradeablePlayer: "",
      mostExpensiveLoanPlayer: "",
    };

    axios.post("http://localhost/fut/getOwnedPlayers.php").then((response) => {
      // manipulate the response here
      let players = response.data;
      console.log(players);
      let nationsCount = [];
      let leaguesCount = [];
      this.setState({ players: players });
      let mostExpensiveTradeablePlayer = "";
      let mostExpensiveLoanPlayer = "";
      let mostExpensiveUntradeablePlayer = "";
      players.forEach((player) => {
        if (mostExpensiveTradeablePlayer === "") {
          mostExpensiveTradeablePlayer = player;
          mostExpensiveLoanPlayer = player;
          mostExpensiveUntradeablePlayer = player;
        } else {
          let current_price = parseInt(player.console_price);
          if (
            player.loaned === "1" &&
            current_price > parseInt(mostExpensiveLoanPlayer.console_price)
          ) {
            mostExpensiveLoanPlayer = player;
          }

          if (
            player.untradeable === "1" &&
            player.loaned === "0" &&
            current_price >
              parseInt(mostExpensiveUntradeablePlayer.console_price)
          ) {
            mostExpensiveUntradeablePlayer = player;
          }

          if (
            player.untradeable === "0" &&
            current_price > parseInt(mostExpensiveTradeablePlayer.console_price)
          ) {
            mostExpensiveTradeablePlayer = player;
          }
        }

        if (player.rating < 65) {
          if (player.rareflag == 0) {
            this.setState((prevState) => ({
              bronzeCommon: prevState.bronzeCommon + 1,
            }));
          } else {
            this.setState((prevState) => ({
              bronzeRare: prevState.bronzeRare + 1,
            }));
          }
          this.setState((prevState) => ({
            bronze: prevState.bronze + 1,
          }));
        } else if (player.rating < 75) {
          if (player.rareflag == 0) {
            this.setState((prevState) => ({
              silverCommon: prevState.silverCommon + 1,
            }));
          } else {
            this.setState((prevState) => ({
              silverRare: prevState.silverRare + 1,
            }));
          }
          this.setState((prevState) => ({
            silver: prevState.silver + 1,
          }));
        } else {
          if (player.rareflag == 0) {
            this.setState((prevState) => ({
              goldCommon: prevState.goldCommon + 1,
            }));
          } else {
            this.setState((prevState) => ({
              goldRare: prevState.goldRare + 1,
            }));
          }
          this.setState((prevState) => ({
            gold: prevState.gold + 1,
          }));
        }
        if (player.untradeable === "1") {
          this.setState((prevState) => ({
            untradeable: prevState.untradeable + 1,
          }));
        } else {
          this.setState((prevState) => ({
            tradeable: prevState.tradeable + 1,
          }));
        }
        // if nation id already exists in array, increment count
        if (nationsCount[player.nationId]) {
          nationsCount[player.nationId] += 1;
        } else {
          // else create new object with nation id and count
          nationsCount[player.nationId] = 1;
        }

        // if league id already exists in array, increment count
        if (leaguesCount[player.leagueId]) {
          leaguesCount[player.leagueId] += 1;
        } else {
          // else create new object with league id and count
          leaguesCount[player.leagueId] = 1;
        }
      });

      // go through each nation and add it to a new array
      let nations = [];
      for (let nation in nationsCount) {
        nations.push({
          nationId: nation,
          count: nationsCount[nation],
        });
      }
      // sort array by count
      nations.sort((a, b) => b.count - a.count);
      this.setState({ nationsCount: nations });

      // go through each league and add it to a new array
      let leagues = [];
      for (let league in leaguesCount) {
        leagues.push({
          leagueId: league,
          count: leaguesCount[league],
        });
      }
      // sort array by count
      leagues.sort((a, b) => b.count - a.count);
      this.setState({ leaguesCount: leagues });

      this.setState({
        mostExpensiveTradeablePlayer: mostExpensiveTradeablePlayer,
        mostExpensiveUntradeablePlayer: mostExpensiveUntradeablePlayer,
        mostExpensiveLoanPlayer: mostExpensiveLoanPlayer,
      });
    });
  }

  render() {
    const theme = createTheme({
      typography: {
        fontFamily: "Matroska",
        fontSize: 12,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <div id="top" ></div>
        <div id="bottom"></div>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h1" gutterBottom>
            FUTCoder's
            <br />
            Club
          </Typography>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                {this.state.nationsCount.map((nation) => (
                  <Grid item xs={1}>
                    <Nation nationId={nation.nationId} count={nation.count} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                {this.state.leaguesCount.map((league) => (
                  <Grid item xs={1}>
                    <League leagueId={league.leagueId} count={league.count} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={BronzeCommon}
                        cardAmount={this.state.bronzeCommon}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={BronzeRare}
                        cardAmount={this.state.bronzeRare}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={BronzeCommon}
                        cardAmount={this.state.bronze}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={SilverCommon}
                        cardAmount={this.state.silverCommon}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={SilverRare}
                        cardAmount={this.state.silverRare}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={SilverCommon}
                        cardAmount={this.state.silver}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={GoldCommon}
                        cardAmount={this.state.goldCommon}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={GoldRare}
                        cardAmount={this.state.goldRare}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={GoldCommon}
                        cardAmount={this.state.gold}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Most expensive tradeable player
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PlayerCard player={this.state.mostExpensiveTradeablePlayer} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Most expensive untradeable player
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PlayerCard player={this.state.mostExpensiveUntradeablePlayer} />
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Most expensive loan player
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PlayerCard player={this.state.mostExpensiveLoanPlayer} />
          </Box>
        </Box>

      </ThemeProvider>
    );
  }
}
export default App;
