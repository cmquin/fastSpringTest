var http = require('http');
var fs = require('fs');
var path = require('path');

var date = new Date();

http.createServer(function (req, res) {
  let headers = {};
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Request-Headers"]="*";
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS, PATCH";
  headers["Access-Control-Allow-Credentials"] = true;
  headers["Access-Control-Max-Age"] = '86400'; // 24 hours
  headers["Access-Control-Allow-Headers"] = "*";

  if (req.url == "/user"){
    if (req.method == "OPTIONS"){
      res.writeHead(200, headers);
      res.end();
    }
    else if (req.method == "POST"){
      let data = [];
      req.on('data', chunk => {
        data.push(chunk);
      })
      let jData;
      req.on('end', () => {
        jData = JSON.parse(data);
        jData['id'] = date.getTime().toString();

        let fileName = 'node/user-info/' + jData['id'] + ".json";
        fs.writeFileSync(fileName, JSON.stringify(jData));

      });

      headers["Content-Type"] = "application/json"
      res.writeHead(200, headers);
      res.write(JSON.stringify({message: "success"}));
      res.end();
    }
    else if (req.method == "PATCH"){
      let data = [];
      req.on('data', chunk => {
        data.push(chunk);
      })
      let jData;
      req.on('end', () => {
        jData = JSON.parse(data);

        let fileName = 'node/user-info/' + jData['id'] + ".json";
        fs.writeFileSync(fileName, JSON.stringify(jData));

      });

      headers["Content-Type"] = "application/json"
      res.writeHead(200, headers);
      res.write(JSON.stringify({message: "success"}));
      res.end();
    }

  }
  else if (req.url.indexOf('/user/') > -1){
    if (req.method == "OPTIONS"){
      res.writeHead(200, headers);
      res.end();
    }
    else if(req.method == "DELETE"){
      let substr = req.url.split("/");

      let filename = 'node/user-info/' + substr[2] + ".json";
      fs.unlinkSync(filename);
      
      headers["Content-Type"] = "application/json"
      res.writeHead(200, headers);
      res.write(JSON.stringify({message: "success"}));
      res.end();
    }
  }
  else if(req.url == "/user-list" && req.method == "GET"){
    const dirPath = path.join(__dirname, 'user-info');
    let list = [];
    fs.readdir(dirPath, function(err, files){
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({message: err}));
        res.end();;
      }

      console.log(files);
      let waiting = files.length;
      files.forEach(function(file, index){
        fs.readFile(dirPath + "/" + file, 'utf-8', function(err, data){
          if (err) console.log(err);
          list.push(JSON.parse(data));
          waiting--;
          if (waiting == 0){
            res.statusCode = 200;
            headers["Content-Type"] = "application/json"
            res.writeHead(200, headers);
            res.write(JSON.stringify(list));
            res.end();
          }
        });
      });
    });


  }else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({message: "no such url"}));
    res.end();
  }
}).listen(8080);

console.log("server running locally");
