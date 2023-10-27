const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res.status(301).json({ err: "Insufficeint data to create song" });
    }
    const artist = req.user._id;
    const details = { name, thumbnail, track, artist };
    const createSong = await Song.create(details);
    return res.status(200).json(createSong);
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find({artist: req.user._id}).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/gets/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params.artistId;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songsByArtist = await Song.find({ _id: artistId });
    return res.status(200).json({ data: songsByArtist });
  }
);

router.get(
  "/get/song/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    const song = await Song.find({ name: songName }).populate("artist");
    if (!song) {
      res.status(404).json({ err: "Cannot find the requested song" });
    }
    return res.status(200).json({ data: song });
  }
);

router.get(
  "/get/songid/:songId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songId } = req.params;
    const songIds=songId.split(',')
    const songData=[]
    for(var i=0;i<songIds.length;i++){
      const song = await Song.findOne({ _id: songIds[i] }).populate("artist");
      if (!song) {
        res.status(404).json({ err: "Cannot find the requested song" });
      }
      songData[i]=(song)
    }
    return res.status(200).json({ data:songData });
  }
);

module.exports = router;
