require('babel-core/register')

var express = require('express'),
    app = express(),
    React = require('react'),
    ReactDOM = require('react-dom/server'),
    components = require('./components.js');
    
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
    
app.use(function(req, res, next){
    res.contentType('image/svg+xml');
    next();
});

app.get('/:icon', function(req, res){
    
    var icon = req.params.icon.replace('.svg',''),
        component_name = icon.capitalizeFirstLetter();
        
    var width = req.query.width,
        height = req.query.height;
        
    var opts = {};
    
    if(width) opts.width = width;
    if(height) opts.height = height;
    
    var component = React.createFactory(components[component_name]);
    res.send( ReactDOM.renderToString( component(opts) ).replace('data-xmlns','xmlns') );
});

app.listen(3000, 'localhost', function(err) {
    
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
  
});
