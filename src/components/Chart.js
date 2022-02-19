import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import loadingImg from "../MEBIB.gif";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const MyChart = () => {
  const [userData, setUserData] = useState({
    labels: [],
    data: [],
  });
  const { response, error } = useFetch(
    "https://imdb8.p.rapidapi.com/actors/get-awards?nconst=nm0001667",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "e8633f18f8msh9336361ccb43246p1da803jsnbc6c1a3a7684",
      },
    }
  );

  useEffect(() => {
    // extract all years
    if (response) {
      console.log("here");
      const years = response?.resource?.awards?.map((item) => item.year);
      // count the number of times a year occurs, storing them in key(year) value(count) pair
      const yearsObj = years?.reduce(function (obj, b) {
        obj[b] = ++obj[b] || 1;
        return obj;
      }, {});
      let data = [];

      //convert to an array of objects with year and count as fields
      for (let item in yearsObj) {
        let oneYear = {
          year: item,
          count: yearsObj[item],
        };
        data.push(oneYear);
      }

      setUserData({
        labels: data?.map((item) => item?.year),
        datasets: [
          {
            label: `Count`,
            data: data?.map((data) => data?.count),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
              "#bb3e03",
              "#333d29",
              "#0077b6",
              "#e5989b",
              "#14213d",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [response]);

  if (!response) {
    return (
      <div className="loading">
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }

  if (error) {
    return <div>An error occurred while fetching the posts</div>;
  }

  return (
    <div>{userData.labels.length > 0 && <BarChart chartData={userData} />}</div>
  );
};

export default MyChart;

function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}
