const mongoose=require('mongoose');

const FileSchema=mongoose.Schema({
    _id:{
        file:{
            required:true,
            type:Number,
            min:1
        },
        language:{
            required:true,
            type:String,
            uppercase:true,
            min:2,
            max:2,
            enum:['IT','EN']
        }
    },
    description:{
        type:String,
        required:true
    },
    contributors:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }]
});

module.exports=mongoose.model('File',FileSchema);