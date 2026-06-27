import http from "k6/http";

export const options = {

  vus: 300,

  duration: "2m",

};

export default function () {

  http.get(
    "http://localhost:3000/health"
  );

}