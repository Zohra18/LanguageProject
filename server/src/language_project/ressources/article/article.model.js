import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const { Schema } = mongoose

const articleSchema = new Schema({
  title:{
    type: String,
     required: true
   },
  text:{
    type:String,
    required: true
  }
/*  img:{
    type:String
  },
  author:{
  type:mongoose.Schema.Types.ObjectId, ref:'User'}*/
})

articleSchema.plugin(mongoosePaginate);
export default mongoose.model('Article', articleSchema)
