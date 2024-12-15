const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Title must be provided']
    },
    description:{
        type:String,
        required: [true, 'Description must be provided'],
        trim: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps:true });



module.exports = mongoose.model('Post', postSchema);