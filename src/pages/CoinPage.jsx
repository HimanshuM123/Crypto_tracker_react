import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "./../components/banner/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  console.log("id...." + id);
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log(coin);
  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
    );
  return (
    <div className="coinPageContainer">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="heading">
          {coin?.name}{" "}
        </Typography>
        <Typography variant="subtitle1" className="description">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography className="heading" variant="h5">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography style={{ fontFamily: "Montserrat" }} variant="h5">
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className="heading" variant="h5">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography style={{ fontFamily: "Montserrat" }} variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className="heading" variant="h5">
              Matket Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography style={{ fontFamily: "Montserrat" }} variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
