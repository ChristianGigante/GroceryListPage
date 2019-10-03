const Item = require('./model.js');

// Create and Save a newItem
module.exports.create = (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Item content can not be empty"
    //     });
    // }

    // Create a new Item
    const newItem = new Item({
        item: req.body.item, 
        quantity: req.body.quantity,
        priority: req.body.priority
    });

    // Save Item in the database
    newItem.save()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Item."
        });
    });
};


// Retrieve and return all items from the database.
exports.findAll = (req, res) => {
    Item.find()
    .then(items => {
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Items."
        });
    });
};

// Find a single item with a itemId
exports.findOne = (req, res, id) => {
    Item.findById(id)
    .then(items => {
        if(!items) {
            return res.status(404).send({
                message: "Item not found with id " + id
            });            
        }
        res.send(items);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + id
        });
    });
};

// Update a Item identified by the ItemId in the request
exports.update = (req, res, id) => {
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Item content can not be empty"
    //     });
    // }

    // Find Item and update it with the request body
    Item.findOneAndUpdate(id, {
        item: req.body.item, 
        quatity: req.body.quatity,
        priority: req.body.priority
    }, {new: true})
    .then(items => {
        if(!items) {
            return res.status(404).send({
                message: "Item not found with id " + id
            });
        }
        res.send(items);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Error updating Item with id " + id
        });
    });
};

// Delete a item with the specified ItemId in the request
exports.delete = (req, res, id) => {
    Item.findByIdAndRemove(id)
    .then(items=> {
        if(!items) {
            return res.status(404).send({
                message: "Item not found with id " + id
            });
        }
        res.send({message: "Item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Item with id " + id
        });
    });
};
