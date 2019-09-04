const express = require("express");
const router = express.Router();
const passport = require("passport");

const { Product } = require("../models/Product");

router.post(
  "/add-product",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role !== 0) {
      return res.send("you are not an admin");
    } else {
      const newProduct = new Product(req.body);
      newProduct.save().then(product => res.json(product));
    }
  }
);

router.get("/product/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res
          .status(404)
          .json({ noproductfound: "No product found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ noproductfound: "No product found with that ID" })
    );
});

router.get("/", (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ noproducts: "no products found" }));
});

router.post(
  "/review/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        const newReview = {
          text: req.body.text,
          user: req.user.id,
          name: req.user.name
        };
        product.reviews.unshift(newReview);
        product.save().then(product => res.json(product));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

router.delete(
  "/review/:id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        if (
          product.reviews.filter(
            review => review._id.toString() === req.params.review_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ reviewnotexists: "Review does not exist" });
        }
        const removeIndex = product.reviews
          .map(item => item._id.toString())
          .indexOf(req.params.review_id);
        product.reviews.splice(removeIndex, 1);
        product.save().then(product => res.json(product));
      })
      .catch(err =>
        res.status(404).json({ reviewnotfound: "No Review found" })
      );
  }
);

router.post(
  "/review/:id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findOneAndUpdate(
      { _id: req.params.id, "reviews._id": req.params.review_id },
      { $set: { "reviews.$.text": req.body.reviewData } },
      { new: true }
    )
      .then(product => res.json(product))
      .catch(err => res.status(404).json({ nouser: "No user found" }));
  }
);

router.post(
  "/add-likes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.body.productId).then(product => {
      let reviews = product.reviews.filter(
        item => item.id === req.body.reviewsId
      )[0];
      if (
        reviews.likes.filter(like => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: "User already liked this post" });
      }
      reviews.likes.unshift({ user: req.user.id });
      product.save().then(product => res.json(product));
    });
  }
);

router.post(
  "/remove-likes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.body.productId).then(product => {
      let reviews = product.reviews.filter(
        item => item.id === req.body.reviewsId
      )[0];
      if (
        reviews.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: "You have not yet liked this post" });
      }

      const removeIndex = reviews.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);
      reviews.likes.splice(removeIndex, 1);
      product.save().then(product => res.json(product));
    });
  }
);

router.post(
  "/update-rating",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.body.productId).then(product => {
      if (
        product.rating.filter(rating => rating.user.toString() === req.user.id)
          .length === 0
      ) {
        product.rating.unshift({
          user: req.user.id,
          dynamicValue: req.body.value
        });
        product.save().then(product => res.json(product));
      }else{
        Product.findOneAndUpdate(
          { _id: req.body.productId, "rating._id": req.body.ratingId },
          { $set: { "rating.$.dynamicValue": req.body.value } },
          { new: true }
        )
          .then(product => res.json(product))
          .catch(err => res.status(404).json({ nouser: "No user found" }));
      }
    });
  }
);

module.exports = router;
