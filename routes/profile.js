const express = require("express");
const router = express.Router();
const passport = require("passport");

const { Profile } = require("../models/Profile");


router.post(
  "/add-profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role !== 0) {
      return res.send("you are not an admin");
    } else {
      const newProfile = new Profile({
        ...req.body,
        user:req.user.id
      }
        );
      newProfile.save().then(profile => res.json(profile));
    }
  }
);

router.get("/", (req, res) => {
  Profile.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(404).json({ noprofiles: "no profiles found" }));
});

router.post("/add-favourite",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      Profile.findById(req.body.profileId).then(profile => {
                if (
          profile.favouriteList.filter(item => item.product === req.body.productId)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyfavourite: "User already favourite this product" });
        }
    profile.favouriteList.unshift({product:req.body.productId,user:req.user.id});
    profile.save().then(profile => res.json(profile));
  })
})

router.post("/remove-favourite",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      User.findById(req.user.id).then(user => {
                if (
          user.favouriteList.filter(item => item.product === req.body.productId)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notfavourite: "User didn't favourite this product yet" });
        }

      const removeIndex =user.favouriteList
      .map(item => item.product)
      .indexOf(req.body.productId);
      user.favouriteList.splice(removeIndex, 1);
      user.save().then(user => res.json(user));
  })
})

module.exports = router;