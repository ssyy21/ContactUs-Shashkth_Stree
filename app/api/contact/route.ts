import mongoose from "mongoose";
import Contact from '@/model/contact';
import db from '@/lib/mongoose';
import { NextResponse } from "next/server";

export const POST = async (req:Request)=>{
    try {
        const {fullname, email, phone, message} = await req.json();
        await db.connect();
        await Contact.create({fullname, email, phone, message})
        return NextResponse.json({
            message:"Form submitted successfully"
        },
        {
            status:201
        })
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errorList = [];
            for (const e in error.errors) {
              errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({ msg: errorList });
          } else {
            return NextResponse.json({ msg: ["Unable to send message."] });
          }
    }
}
