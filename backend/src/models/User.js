const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      category: String,
      price: Number,
      image: String,
    },
  ],
});

// module.exports = mongoose.model("User", userSchema);
    const User = mongoose.model("User", userSchema);

    module.exports = {User}


    