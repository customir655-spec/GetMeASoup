import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import pay_mod from "@/model/payement";
import connectDB from "../../db";


console.log("this file is running")
export const POST = async (req) => {
    await connectDB();
    
    // Parse the form data from Razorpay
    
    const body = await req.json();

    // 1. Find the pending order in your database
    const p = await pay_mod.findOne({ oid: body.razorpay_order_id });

    if (!p) {
        return NextResponse.json({ success: false, message: "Order ID not found" }, { status: 404 });
    }

    // 2. Verify the payment signature
    // The secret here should be your Razorpay Key Secret
    const isValid = validatePaymentVerification(
        {
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id,
        },
        body.razorpay_signature,"DG0G6h4HqMubp3WCGaDozkPA"
        
    );

    if (isValid) {
        // 3. Update the payment status to "done" or "success"
        await pay_mod.findOneAndUpdate(
            { oid: body.razorpay_order_id },{done: true}
          
        );

       
        return NextResponse.json({ success: true, message: "done" }, { status: 200 });
    } else {
        // 4. Handle failed verification
        return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
    }
};