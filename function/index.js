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
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const tailwindcss = require('tailwindcss');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  let params = JSON.parse(event.body); 
  
  const css = params.css;
  const config = params.config;

//   fs.writeFile('/tmp/tailwind.js', config, { flag: 'w' }, function(err){
//       if (err) {
//           return console.error(err);
//       }
//   });
    // console.log(css);
   const output = await postcss([tailwindcss])
    .process(css)
    .then(result => {
        // return result.css;
        // fs.unlinkSync('/tmp/tailwind.js')
        return result.css;
    });

    return {
        statusCode:200,
        body: output
    };

  
};

  