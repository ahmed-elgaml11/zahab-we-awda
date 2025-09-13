export const imageSchema = new mongoose.Schema({
  url: { type: String },
  alt: { type: String }
}, { _id: false }); 
