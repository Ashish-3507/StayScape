const Listing = require("../models/listing");



module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.json({ success: true, data: allListings });
}




module.exports.create = async (req, res) => {

    const newListing = new Listing(req.body.listing);

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { url, filename };
    }

    newListing.owner = req.user._id;

    await newListing.save();

    return res.json({ success: true, message: "New listing created successfully", data: newListing });
};

module.exports.show = async (req, res) => {

let { id } = req.params;

const listing = await Listing.findById(id)
    .populate({
    path:"reviews" , 
    populate:{
        path: "author",
    },
    })
    .populate("owner");

if(!listing){
    return res.status(404).json({ success: false, error: "Listing not found" });
}

res.json({ success: true, data: listing });

}

module.exports.update = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };

        await listing.save();
    }

    return res.json({ success: true, message: "Listing updated", data: listing });
}

module.exports.delete = async (req,res)=>{

    let {id} = req.params;

    await Listing.findByIdAndDelete(id);

    return res.json({ success: true, message: "Listing Deleted successfully" });

}