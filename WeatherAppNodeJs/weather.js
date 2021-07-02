const http = require('http');
 const fs = require('fs');
 var requests =require("requests");
 const homeFile = fs.readFileSync("home.html", "utf-8");

 const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("40", orgVal.main.temp);
    temperature = temperature.replace("40", orgVal.main.temp_min);
    temperature = temperature.replace("41", orgVal.main.temp_max);
    temperature = temperature.replace("New Delhi", orgVal.name);
    temperature = temperature.replace("Ind", orgVal.sys.country);
    temperature = temperature.replace("Sunny", orgVal.weather[0].main);
  
    return temperature;
  };
  

 const server = http.createServer((req, res) => {
    if (req.url == "/") {
      requests(
        `https//api.openweathermap.org/data/2.5/weather?q=delhi&appid==c1ac0e5951ed5585a1da605731b3d36b`
      )
        .on("data", (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          // console.log(arrData[0].main.temp);
          const realTimeData = arrData
            .map((val) => replaceVal(homeFile, val))
            .join("");
          res.write(realTimeData);
          // console.log(realTimeData);
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
    } else {
      res.end("File not found");
    }
  });
  
  server.listen(1000, "127.0.0.1");

