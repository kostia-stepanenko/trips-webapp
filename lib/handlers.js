const db = require("./db");
const auth = require('./authentication');


exports.home = async (req, res) => {

     let curUserWishSet = new Set([]);

    // for logged in user get wish list values
     if( req.session?.user?.loggedin ){
         const curUserData =
             await db.getUserWithWishList({username: req.session.user.username});

         curUserWishSet = new Set(curUserData.wishList);
     }

    const places = await db.getPlaces();

    const context = {
        places: places.map(singlePlace => {
            return {
                place_id: singlePlace._id.toString(),
                name : singlePlace.name,
                imgUrl: singlePlace.imgUrl,
                checked: curUserWishSet.has(singlePlace._id.toString())
            };
        })
    };

    res.render('home', context);
};

exports.login = async(req, res) => {
    res.render('login');
};

exports.logout = async(req, res) =>  {
    req.session.destroy();
    res.redirect('/');
}

exports.auth  = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const validUser = await auth.isValidUser(username, password);

    if (validUser) {
        req.session.user = {
            loggedin: true,
            username: username
        };
    }
    else {
        console.log("Invalid username/password");
    }

    res.redirect('/');
};

exports.help = async (req, res) => {
    res.render('help');
};

exports.notes = async (req, res) => {

    const placeId = req.query?.placeId;

    const allNotesForPlace = await db.getNotes(placeId);

    const context = {
        notes: allNotesForPlace.map(singleNote => {
            return  {
                placeId: singleNote.placeId,
                username: singleNote.username,
                noteText: singleNote.noteText
            }
        })
    };

    res.render('notes', context);
};

exports.wishList = async (req, res) => {

    const curUserName = req.session.user.username;

    console.log(`Getting user '${curUserName}' with WishList`);
    const curUserData = await db.getUserWithWishList({username: curUserName});

    //console.log(curUserData);

    // query places from user's wishList
    const placesFromWishlist = await db.getPlaces({ '_id': { $in: curUserData.wishList } });

    res.render('wishList', {
        placesFromWishlist: placesFromWishlist.map(singlePlace => {
            return {
                id: singlePlace._id?.toString(),
                name : singlePlace.name,
                imgUrl: singlePlace.imgUrl,
                price: `${singlePlace.price.toFixed(2)} RON`,
                season: singlePlace.season
            };
        })
    });
};

exports.addToWishList = async (req, res) => {

    if( req.session?.user?.loggedin ){
        const placeIdToAdd = req.body?.placeId;
        await db.addToWishList(req.session.user.username, placeIdToAdd);

        res.status(200).json({success: true});
    }
    else {
        res.status(500).json({success: false});
    }
};

exports.deleteFromWishList = async (req, res) => {

    if( req.session?.user?.loggedin ){
        const placeIdToDelete = req.body?.placeId;
        await db.deleteFromWishList(req.session.user.username, placeIdToDelete);

        res.status(200).json({success: true});
    }
    else {
        res.status(500).json({success: false});
    }
};

exports.addNote = async (req, res) => {

    const username = req.session.user.username;
    const placeId = req.body?.placeId;
    const noteText = req.body?.noteText;

    await db.addNewNote(username, placeId, noteText);

    // console.log(`placeId: ${placeId}`);
    // console.log(`noteText: ${noteText}`);

    res.status(200).json({success: true});
};

exports.notFound = async(req, res) => {
    res.status(404);
    res.render('404');
};

exports.serverError = async(err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
};