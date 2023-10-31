const express = require("express");
const router = express.Router();
const passport = require("passport");
const playlist = require("../models/Playlist");
const Song =require("../models/Song")
const User=require('../models/User')
const mongoose= require("mongoose");
const playlistModal = require("../models/Playlist");

router.post(
  "/create/playlist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { playlistName, thumbnail, songs,tags,description } = req.body;
    if (!playlistName || !thumbnail || !songs) {
      return res
        .status(301)
        .json({ err: "Insufficeint data to create playlist" });
    }
    const owner = req.user._id;
    const details = {
      playlistName,
      thumbnail,
      songs,
      description,
      tags,
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
    var playlistData=await playlist.findOne({_id:playlistId})
    var songData=playlistData
    if (!playlistData)
    {
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
      const artist = await User.findOne({_id:artistId})
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

  router.get(
    "/get/myplaylists",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const artistId = req.user._id;
      const artist = await User.findOne({_id:artistId})
      console.log(artist)
      if(!artist){
        return res.status(301).json({err:"Artist dose not exist"})
      }
      const playlistData=await playlist.find({owner:artistId})
      console.log(playlistData)
      if(!playlistData){
          return res.status(301).json({err:"Playlist by the user does not exist"})
      }else{
          return res.status(200).json({data:playlistData})
      }
    }
  );

  router.get(
    "/get/all/playlists",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const playlistData=await playlist.find()
      if(!playlistData){
          return res.status(301).json({err:"Playlists does not exist"})
      }else{
          return res.status(200).json(playlistData)
      }
    }
  );
  router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser = req.user
    const {playlistId,songId}=req.body
    const playlists=await playlist.findOne({_id:playlistId})
    // if(currentUser!==playlists.owner && currentUser!==playlists.collaborators){
    //     return res.status(405).json({err:"Not Allowed"})
    // }
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
