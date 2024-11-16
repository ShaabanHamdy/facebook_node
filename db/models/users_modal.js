// import parsePhoneNumberFromString from 'libphonenumber-js';
import bcrypt from 'bcryptjs';
import { mongoose } from 'mongoose';

// Declare the Schema of the Mongo model

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be less than 50 characters long'],
        lowercase: true,
        trim: true,
        text: true

    },
    lastName: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be less than 50 characters long'],
        lowercase: true,
        trim: true,
        text: true

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'email must be unique'],
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function (v) {
                return /(?=.*[!@#$%^&*])(?=.*[A-Z].*[A-Z])/.test(v);
            },
            message:
                'Password must contain at least one special character and two capital letters',
        },
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        match: [/^\d{10,15}$/, 'Please fill a valid mobile number'],
    },
    gender: {
        type: String,
        default: "male",
        enum: ["male", "female"]
    },
    bDay: {
        type: String,
        required: [true, 'Birth of Date is required'],

    },
    bMonth: {
        type: String,
        required: [true, 'Birth of Date is required'],

    },
    bYear: {
        type: String,
        required: [true, 'Birth of Date is required'],

    },
    // birthOfDate: {
    //     type: String,
    //     required: [true, 'Birth of Date is required'],

    // },
    status: {
        type: String,
        default: "offline",
        enum: ["offline", "online"]
    },
    role: {
        type: String,
        default: "User",
        enum: ['User', 'Admin']
    },
    forgetCode: {
        type: Number,
        default: 0
    },
    changePasswordTime: {
        type: Date
    },
    profileImage: { type: [Object], default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" },
    cover: { type: [Object], default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" },
    myFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friend: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    requests: {
        type: Array,
        default: []
    },
    search: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        }
    ],
    details: {
        bio: String,
        otherName: String,
        job: String,
        workPlace: String,
        highSchool: String,
        college: String,
        currentCity: String,
        hometown: String,
        instagram: String,
        relationship: {
            type: String,
            enum: ["single", "in a relation", "Married", "divorced"]
        },
    },
    savePosts: [{

        post: {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        },
        saveAt: {
            type: Date,
            default: new Date()
        }
    }]




    // country: {
    //     type: String,
    //     required: [true, 'Country is required'],
    //   },
    //   mobile: {
    //     type: String,
    //     required: [true, 'Mobile number is required'],
    //     validate: {
    //       validator: function (v) {
    //         const phoneNumber = parsePhoneNumberFromString(v, this.country);
    //         return phoneNumber ? phoneNumber.isValid() : false;
    //       },
    //       message: props => `${props.value} is not a valid mobile number!`,
    //     },
    //   },
}, {
    timestamps: true
});



// hook to hash password 
userSchema.pre("save", function (next, doc) {
    this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS)
    next()
})


//Export the model

const userModal = mongoose.model.User || mongoose.model('User', userSchema);

export default userModal

