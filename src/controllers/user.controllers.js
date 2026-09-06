import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    //get user details from frontend at this time we are getting it from postman.

    const { full_name, email, password, profile, username } = req.body;

    console.log(email, password);

    // for validation is there any space which is left empty.

    if (
        [full_name, email, password, username].some((fields) => fields?.trim() === "")
    ) {
        throw new ApiError(406, "All fields are required");
    }


    // check if the user already exists.

    const existedUser = User.findOne({
        $or: [{ email }, { username }]

    })

    if (existedUser) {
        throw new ApiError(404, "user and email already exists");
    }

    // avatar and cover image local path.

    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImagepath = req.files?.coverImage[0].path;

    if (!avatarLocalPath) {

        throw new ApiError(400, "Avatar is required to login")

    }

    //uploading image on cloudinary.

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const cover = await uploadOnCloudinary(coverImagepath)

    if (!avatar) {
        throw new ApiError(401, "Avatar is required");
    }

    //create user object and create entry in database.

    const user = User.create({
        full_name,
        avatar: avatar.url,
        cover: cover?.url || " ",
        email,
        password,
        username: username.toLowerCase()

    })

    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {

        throw new ApiError(501, "User is failed to register sucesfully")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered sucesfully")
    )
})


export { registerUser };