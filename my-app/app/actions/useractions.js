// import connectDB from "../db"
"use server"
import Razorpay from "razorpay"
import User2 from "@/model/user"
import pay_mod2 from "@/model/payement"
import connectDB from "../db"
import { auth } from "@/auth"

let session ;

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();

    // 1. Fetch the CREATOR'S data from DB to get THEIR Razorpay keys
    const creator = await User2.findOne({ name: to_username });

    if (!creator || !creator.razorpay_id || !creator.razorpay_secret) {
        throw new Error("This creator hasn't set up their Razorpay credentials yet.");
    }

    // 2. Initialize Razorpay using the keys fetched from the DB
    const instance = new Razorpay({ 
        key_id: creator.razorpay_id, 
        key_secret: creator.razorpay_secret 
    });

    // 3. Create the order
    let orderOptions = {
        amount: Number.parseInt(amount) * 100, // Amount in paise
        currency: "INR"
    };

    let x = await instance.orders.create(orderOptions);

    // 4. Create the payment record in your database
    await pay_mod2.create({
        oid: x.id, 
        amount: amount, 
        paid_to: to_username,
        message: paymentform.message, 
        paid_from: paymentform.name, 
        done: false 
    });

    return x;
}

export async function fetch_pay(username) {
    await connectDB();
    const u = await pay_mod2.find({paid_to: username, done:true});

 return JSON.parse(JSON.stringify(u));
}

export async function fetch_user(username) {
    await connectDB();
    const u = await User2.find({name: username});

 return JSON.parse(JSON.stringify(u));
}


export async function updateUser(data, oldusername) {
    try {
        await connectDB();
        
        // Use a clean version of the data
        const updateData = { ...data };

        // 1. Fetch by EMAIL instead of name. 
        // Using 'oldusername' is risky because if the update partially worked, 
        // 'oldusername' won't find the record anymore.
        // We find the user by their unique email to ensure we hit the same document.
        const currentUser = await User2.findOne({ email: updateData.email });

        if (!currentUser) {
            return { error: "User record not found." };
        }

        // 2. Check for Username Conflicts
        if (updateData.name && updateData.name !== currentUser.name) {
            const conflictUser = await User2.findOne({ 
                name: updateData.name, 
                _id: { $ne: currentUser._id } 
            });

            if (conflictUser) {
                return { error: "Nice try! This username is already taken. Be a bit more original? 😉" };
            }
        }

        // 3. PERFORM THE UPDATE
        // We use the unique MongoDB _id to ensure NO new document is created.
        const updatedUser = await User2.findByIdAndUpdate(
            currentUser._id,
            { $set: updateData }, // Using $set ensures we only change the fields provided
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return { error: "Update failed. User disappeared." };
        }

        return { 
            success: true, 
            user: JSON.parse(JSON.stringify(updatedUser)) 
        };

    } catch (error) {
        console.error("Database Update Error:", error);
        return { error: "Failed to update profile." };
    }
}

export async function fetchAllCreators() {
    await connectDB();
    // Fetch users who have a name (and optionally check for profile pics)
    const users = await User2.find({}).lean();
    return JSON.parse(JSON.stringify(users));
}