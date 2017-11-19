var express = require('express');
var app = express();
var Router = express.Router();

var Item = require('../models/Item');

Router.post('/add/post', (req, res) => {
	var item = new Item(req.body);
		item.save()
	.then(item => {
		res.json('Item added successfully');
	}).catch(err => {
		res.status(400).send('Unable to save to database');
	});
});

// Defined get data(index or listing) route
Router.get('/', (req, res) => {
  Item.find(function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

Router.get('/edit/:id', (req, res) => {
	var id = req.params.id;
	Item.findById(id, (err, item) => {
		res.json(item);
	})
})


Router.post('/update/:id', (req, res) =>{
	Item.findById(req.params.id, (err, item) => {
		if (!item)
			return next(new Error('Could not load Document'));
		else {
			item.item = req.body.item;

			item.save().then(item => {
				res.json('update complete');
			}).catch(err => {
				res.status(400).send('unable to update the database');
			})
		}
	})
})

Router.get('/delete/:id', (req, res) => {
	Item.findByIdAndRemove({_id: req.params.id}, (err, item) => {
		if(err) res.json(err);
		else res.json('Successfully removed');
	});
});

module.exports = Router;