// const express = require('express')
// const app = express();
// const postcss = require('postcss');
// const fs = require('fs')
// // const tailwindcss = ;

// app.use(express.json())

// app.post('/', (req, res) => {
//     // console.log(req.body);
//     let css = req.body.css;
//     let config = req.body.config;
//     fs.writeFile('./tailwind.js', config, () => true)
//     // console.log(css);
//     postcss([
//         require('tailwindcss')('./tailwind.js')
//     ])
//     .process(css).then(result => {
//         fs.unlinkSync('./tailwind.js')
//         console.log('done');
//         res.send(result.css)
//     })
  
// });

// app.listen(8000, () => {
//   console.log('Example app listening on port 8000!')
// });

import querystring from "querystring";

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const postcss = require('postcss');
  const fs = require('fs');

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const css = params.css;
  const config = params.config;

  fs.writeFile('./tailwind.js', config, () => true)
    // console.log(css);
    postcss([
        require('tailwindcss')('./tailwind.js')
    ])
    .process(css).then(result => {
        fs.unlinkSync('./tailwind.js')
        console.log('done');
        return {
            statusCode: 200,
            body: result.css
        };
    })

  
};

  