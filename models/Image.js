export const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    description: { type: String }
}, { _id: false }); 
