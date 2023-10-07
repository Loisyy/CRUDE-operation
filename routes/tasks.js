const express = require("express");
const router = express.Router();
const ShopItem = require("../models/shopitem");

// Retrieve a list of items in the shop
router.get("/shopitems", (req, res) => {
  ShopItem.find({}, (err, shopItems) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    res.send(shopItems);
  });
});

// Retrieve a single item by ID
router.get("/shopitems/:id", (req, res) => {
  const itemId = req.params.id;
  ShopItem.findById(itemId, (err, shopItem) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (!shopItem) {
      return res.status(404).send("Shop item not found");
    }
    res.send(shopItem);
  });
});

// Add a new shop item (only accessible to admins)
router.post("/shopitems", (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("action-not-allowed");
  }
  const newItem = req.body;
  ShopItem.create(newItem, (err, createdItem) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    res.send(createdItem);
  });
});

// Update a shop item (only accessible to admins)
router.put("/shopitems/:id", (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("action-not-allowed");
  }
  const itemId = req.params.id;
  const updatedItem = req.body;
  ShopItem.findByIdAndUpdate(
    itemId,
    updatedItem,
    { new: true },
    (err, updatedShopItem) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      if (!updatedShopItem) {
        return res.status(404).send("Shop item not found");
      }
      res.send(updatedShopItem);
    }
  );
});

// Delete a shop item (only accessible to admins)
router.delete("/shopitems/:id", (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("action-not-allowed");
  }
  const itemId = req.params.id;
  ShopItem.findByIdAndDelete(itemId, (err, deletedShopItem) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (!deletedShopItem) {
      return res.status(404).send("Shop item not found");
    }
    res.send(deletedShopItem);
  });
});


module.exports = router;
