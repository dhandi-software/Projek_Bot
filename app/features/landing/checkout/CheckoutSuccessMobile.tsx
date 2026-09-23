import { CheckCircle2, PackageCheck, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function CheckoutSuccessMobile() {
    const orderId = "#DH-" + Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="w-full bg-white py-10 px-4">
            <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-xs text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-6 ring-emerald-50/50">
                    <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-lg font-bold text-[#191C1F]">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-xs text-zinc-500">
                        Thank you for shopping with Dhandi Ecommerce. Your order has been confirmed.
                    </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 grid grid-cols-2 gap-2 text-left text-xs">
                    <div>
                        <span className="text-zinc-500 block text-[11px]">Order Number</span>
                        <span className="font-bold text-[#191C1F]">{orderId}</span>
                    </div>
                    <div>
                        <span className="text-zinc-500 block text-[11px]">Est. Delivery</span>
                        <span className="font-bold text-emerald-600">2 - 4 Days</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                    <Button
                        asChild
                        className="w-full bg-[#FA8232] hover:bg-[#E07026] text-white text-xs font-bold min-h-[44px]"
                    >
                        <Link to="/track-order" className="flex items-center justify-center gap-2">
                            <PackageCheck className="w-4 h-4" />
                            <span>Track Order</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="w-full border-zinc-300 text-xs font-semibold min-h-[44px]"
                    >
                        <Link to="/" className="flex items-center justify-center gap-2">
                            <Home className="w-4 h-4 text-zinc-600" />
                            <span>Return to Home</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
