import NextAuth from "next-auth"

import GitHub from "next-auth/providers/github"

import Google from "next-auth/providers/google"

import Twitter from "next-auth/providers/twitter"

import User2 from "./model/user.js"

import mongoose from "mongoose"

export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [GitHub({

      clientId: process.env.AUTH_ID,

      clientSecret: process.env.AUTH_SECRET,

    }),Google({

      clientId: process.env.AUTH_GOOGLE_ID,

      clientSecret: process.env.AUTH_GOOGLE_SECRET,

    }) ],

   

    callbacks: {

 async signIn({ user, account, profile }) {

  try {

    // 1. Ensure DB connection

    await mongoose.connect(process.env.MONGO_DB_URL);



    // 2. Check if user exists (searching by email is safer than name)

 // Add 'as any' to the object inside findOne
const existingUser2 = await User2.findOne({ email: user.email} as any);

const baseName = user.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');

  user.name = baseName;

    if (!existingUser2) {

      await User2.create({

        name: baseName,

        email: user.email,

        profilePic: user.image || "",

        coverPic: "pending setup",

        razorpay_id: "pending setup" ,

        razorpay_secret:"pending setup"

      });

      console.log("New user created in DB");

    } else {
user.name = existingUser2.name;
      console.log("Existing user signed in");

    }



    return true; // Allow sign in

  } catch (error) {

    console.error("Error during sign-in callback:", error);

    return false; // Refuse sign in if there's a DB error

  }

},

async jwt({ token, user, trigger, session }) {

    // This is the missing link!

    if (trigger === "update" && session?.name) {

      token.name = session.name;

    }

    return token;

  },

  async session({ session, token }) {

    session.user.name = token.name;

    return session;

  }

}

})
