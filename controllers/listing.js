const Listing = require("../models/listing");



module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index', { allListings });
}


module.exports.renderNewForm = (req, res)=>{
res.render("listings/new");
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

    req.flash("success", "New listing created successfully");

    return res.redirect("/listing");
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
    req.flash("error", "Listing not found");
    return res.redirect('/listing');
}

res.render('listings/show', { listing });

}

module.exports.edit = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listing");
    }

    res.render("listings/edit", { listing });
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

    req.flash("success", "Listing updated");

    return res.redirect(`/listing/${id}`);
}

module.exports.delete = async (req,res)=>{

    let {id} = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted successfully");

    return res.redirect("/listing");

}