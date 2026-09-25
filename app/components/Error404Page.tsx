import { Link, useNavigate } from "react-router";
import { ArrowLeft, Home } from "lucide-react";

export default function Error404Page() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="w-full min-h-[75vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 bg-white font-geist">
            <div className="w-full max-w-[1320px] mx-auto flex flex-col items-center justify-center">
                {/* 404 Robot SVG Illustration */}
                <div className="w-full max-w-[380px] sm:max-w-[440px] md:max-w-[500px] mb-8 md:mb-10 flex items-center justify-center">
                    <img
                        src="/images/404_ErorPage.svg"
                        alt="404 Error Page"
                        className="w-full h-auto max-h-[360px] md:max-h-[420px] object-contain select-none pointer-events-none"
                    />
                </div>

                {/* Content Details */}
                <div className="w-full max-w-[536px] text-center flex flex-col items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl md:text-[36px] font-semibold md:font-bold text-[#191C1F] leading-tight md:leading-[44px] tracking-tight">
                        404, Page not founds
                    </h1>

                    <p className="text-sm md:text-[16px] text-[#475156] leading-relaxed md:leading-[24px] font-normal px-2">
                        Something went wrong. It’s look that your requested could not be found. It’s look like the link is broken or the page is removed.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mt-4 md:mt-6">
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FA8232] hover:bg-[#e27329] active:bg-[#c9601a] text-white px-6 h-12 rounded-[2px] font-bold text-[14px] uppercase tracking-[0.168px] transition-all cursor-pointer shadow-xs"
                        >
                            <ArrowLeft className="w-5 h-5 shrink-0" />
                            <span>GO BACK</span>
                        </button>

                        <Link
                            to="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-[#FFE7D6] hover:bg-[#FFE7D6]/40 active:bg-[#FFE7D6] text-[#FA8232] px-6 h-12 rounded-[2px] font-bold text-[14px] uppercase tracking-[0.168px] transition-all cursor-pointer"
                        >
                            <Home className="w-5 h-5 shrink-0 text-[#FA8232]" />
                            <span>GO TO HOME</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
