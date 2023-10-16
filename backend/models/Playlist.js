const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({

    playlistName:{
        type:String,
        require:true
    },
    thumnail:{
        type:String,
        require:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    songs:[{
        type:mongoose.Types.ObjectId,
        ref:"song"
    }],
})

const playlistModal = mongoose.model("playlist",Playlist)

module.exports=playlistModal