import React from "react";

const Footer2 = () => {
    return (
        <div className="fixed bottom-2">
            <div className="flex items-center gap-1 whitespace-nowrap tracking-tighter text-[13px] leading-4 font-helvetica">
                <div className="hover:underline cursor-pointer">Privacy</div>
                <div>·</div>
                <div className="hover:underline cursor-pointer">Terms</div>
                <div>·</div>
                <div className="hover:underline cursor-pointer">Advertising</div>
                <div>·</div>
                <div className="hover:underline cursor-pointer">Ad Choices</div>
                <div>·</div>
                <div className="hover:underline cursor-pointer">Cookies</div>
                <div>·</div>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap tracking-tighter text-[13px] leading-4 font-helvetica">
                <div className="hover:underline cursor-pointer">More</div>
                <div>·</div>
                <div className="hover:underline cursor-pointer">Wesbook © 2023</div>
            </div>
        </div>
    );
};

export default Footer2;
