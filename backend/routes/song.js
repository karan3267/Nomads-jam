const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res.status(301).json({ err: "Insufficeint data to create song" });
    }
    const artist = req.user._Id;
    const details = { name, thumbnail, track, artist };
    const createSong = await Song.create(details);
    return res.status(200).json(createSong);
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find({artist: req.user._Id});
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/gets/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params.artistId;
    const artist = await User.findOne({ _Id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songsByArtist = await Song.find({ _Id: artistId });
    return res.status(200).json({ data: songsByArtist });
  }
);

router.get(
  "/get/song/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params.songName;
    const song = await Song.find({ name: songName });
    if (!song) {
      res.status(404).json({ err: "Cannot find the requested song" });
    }
    return res.status(200).json({ data: songName });
  }
);

module.exports = router;
