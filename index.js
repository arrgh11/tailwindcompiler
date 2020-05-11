const express = require('express')
const app = express();
const postcss = require('postcss');
const fs = require('fs')
// const tailwindcss = ;

app.use(express.json())

app.post('/', (req, res) => {
    // console.log(req.body);
    let css = req.body.css;
    let config = req.body.config;
    fs.writeFile('./tailwind.js', config, () => true)
    // console.log(css);
    postcss([
        require('tailwindcss')('./tailwind.js')
    ])
    .process(css).then(result => {
        fs.unlinkSync('./tailwind.js')
        console.log('done');
        res.send(result.css)
    })
  
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


  