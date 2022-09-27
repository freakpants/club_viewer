import {BronzeCommon, GoldRare, GoldCommon, Conmebol, Totw} from "./CardBackgrounds";
import Star from "./assets/star.png";
const PlayerCard = (props) => {
    const {
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
    } = props.player;
    let badge =
      "https://cdn.futbin.com/content/fifa23/img/clubs/" + teamId + ".png";
    let cardImage = BronzeCommon;
    if (parseInt(rating) > 74) {
      if (rareflag === 1) {
        cardImage = GoldRare;
      } else {
        cardImage = GoldCommon;
      }
    }
    let rarityClass = 'gold';
  
    if (rareflag === "53") {
      cardImage = Conmebol;
    }
    if(rareflag === "3"){
      rarityClass = "totw";
      cardImage = Totw;
    }
  
    const nationflag =
      "https://www.futwiz.com/assets/img/fifa22/flags/" + nationId + ".png";
  
    let original =
      "https://static.wefut.com/assets/images/fut23/playeravatars/" +
      playerId +
      ".png";
    /* let dynamic = "https://static.wefut.com/assets/images/fut23/playeravatars/" + definitionId + ".png";
    let dynamic_custom = "https://static.wefut.com/assets/images/fut23/playeravatars/custom/" + definitionId + ".png"; */
  
    let cardClass = '';
    cardClass = "card fifa22 " + rarityClass;
  
    let formatted_console_price = console_price;
    if(parseInt(console_price) > 999){
      formatted_console_price = (parseInt(console_price) / 1000).toFixed(0) + "K";
    }
    if(parseInt(console_price) > 999999){
      formatted_console_price = (parseInt(console_price) / 1000000).toFixed(0) + "M";
    }
  
    return (
      <div className={cardClass}>
        <div className={"scard"}>
          <img alt="player-card" className={"player-card"} src={cardImage} />
          <a href="http://localhost">
            <img alt="club-badge" src={badge} className="clubbadge" />
          </a>
          <div className={"avatarholder"}>
            <img alt="avatar" className={"dynamic avatar original"} src={original} />
          </div>
          <a href="http://localhost">
            <img alt="nationflag" src={nationflag} className={"nationflag"} />
          </a>
          <div className={"attributes"}>
            <div className={"middle-border"}></div>
            <span className={"pace"}>{pac}</span>
            <span className={"shooting"}>{sho}</span>
            <span className={"passing"}>{pas}</span>
            <span className={"dribbling"}>{dri}</span>
            <span className={"defending"}>{def}</span>
            <span className={"heading"}>{phy}</span>
          </div>
          <div className={"ratingholder"}>
            <span className={"rating"}>{rating}</span>
          </div>
          <div className={"positions"}>
            <div className={"main_position"}></div>
            <div className="alt_positions">
              <span className="alt_position single"></span>
            </div>
          </div>
          <div className="name darken">
            <span className="marquee ">{knownAs !== "" && knownAs !== "---" ? knownAs : lastName}</span>
          </div>
          <div className="name-border"></div>
          <div className="bottom-border"></div>
          <div className="position-border"></div>
          <div className="region-border"></div>
          <div className="skill-container-wrapper no-promo">
            <div className="skill-container work">
              <span className="skillvalue"></span>
              <span className="skilllabel">WR</span>
            </div>
            <div className="skill-container skill">
              <span className="skillvalue"></span>
              <img alt="star" src={Star} className="star" />
              <span className="skilllabel">SM</span>
            </div>
  
            <div className="skill-container weak">
              <span className="skillvalue"></span>
              <img alt="star" src={Star} className="star" />
              <span className="skilllabel">WF</span>
            </div>
            <div className="skill-container price-range"></div>
            <div className={"skill-container price"}>{formatted_console_price}</div>
            <div className="price-range"></div>
          </div>
        </div>
      </div>
    );
  };
  export default PlayerCard;