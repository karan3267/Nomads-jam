const express = require("express");
const router = express.Router();
const passport = require("passport");
const playlist = require("../models/Playlist");
const Song =require("../models/song")
const mongoose= require("mongoose");
const { route } = require("./auth");

router.post(
  "/create/playlist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { playlistName, thumbnail, songs } = req.body;
    if (!playlistName || !thumbnail || !songs) {
      return res
        .status(301)
        .json({ err: "Insufficeint data to create playlist" });
    }
    const owner = req.user._Id;
    const details = {
      playlistName,
      thumbnail,
      songs,
      owner,
      collaborators: [],
    };
    const createSong = await playlist.create(details);
    return res.status(200).json(createSong);
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlistData=await playlist.findOne({_id:playlistId})
    if(!playlistData){
        return res.status(301).json({err:"Invalid Id"})
    }else{
        return res.status(200).json({playlistData})
    }
  }
);

router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const artistId = req.params.aritstId;
      const artist = await mongoose.findOne({_id:artistId})
      if(!artist){
        return res.status(301).json({err:"Artist dose not exist"})
      }
      const playlistData=await playlist.find({owner:artistId})
      if(!playlistData){
          return res.status(301).json({err:"Playlist by the user does not exist"})
      }else{
          return res.status(200).json({playlistData})
      }
    }
  );

  router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser = req.user
    if(currentUser!==owner && currentUser!==collaborators){
        return res.status(405).json({err:"Not Allowed"})
    }
    const {playlistId,songId}=req.body
    const playlists=await playlist.findOne({_id:playlistId})
    if(!playlistId){
        return res.status(301).json({err:"Playlist doesn't exists"})
    }
    const song = await Song.findOne({_id:songId})
    if(!playlistId){
        return res.status(301).json({err:"Song doesn't exists"})
    }
    playlists.songs.push(songId)
    await playlists.save()
    return res.status(200).json(playlists)
  })

module.exports=router
