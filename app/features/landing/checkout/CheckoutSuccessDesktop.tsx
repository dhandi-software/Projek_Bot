import { CheckCircle2, PackageCheck, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function CheckoutSuccessDesktop() {
    const orderId = "#DH-" + Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="w-full bg-white py-16 px-4">
            <div className="max-w-xl mx-auto border border-zinc-200 rounded-xl p-8 bg-white shadow-md text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-8 ring-emerald-50/50 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-[#191C1F]">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-sm text-zinc-500 max-w-md mx-auto">
                        Thank you for shopping with Dhandi Ecommerce. Your order has been confirmed and is being processed.
                    </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 grid grid-cols-2 gap-4 text-left text-xs">
                    <div>
                        <span className="text-zinc-500 block">Order Number</span>
                        <span className="font-bold text-[#191C1F] text-sm">{orderId}</span>
                    </div>
                    <div>
                        <span className="text-zinc-500 block">Estimated Delivery</span>
                        <span className="font-bold text-emerald-600 text-sm">2 - 4 Work Days</span>
                    </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                    <Button
                        asChild
                        variant="outline"
                        className="border-zinc-300 hover:bg-zinc-50 text-xs font-semibold h-11 px-5"
                    >
                        <Link to="/" className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-zinc-600" />
                            <span>Return to Home</span>
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="bg-[#FA8232] hover:bg-[#E07026] text-white text-xs font-bold h-11 px-6 shadow-xs"
                    >
                        <Link to="/track-order" className="flex items-center gap-2">
                            <PackageCheck className="w-4 h-4" />
                            <span>Track Order</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
