const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({

    playlistName:{
        type:String,
        require:true
    },
    tags:[{
        type:String,
    }],
    thumbnail:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    songs:[{
        type:mongoose.Types.ObjectId,
        ref:"song"
    }],
    collaborators:[]
})

const playlistModal = mongoose.model("playlist",Playlist)

module.exports=playlistModal