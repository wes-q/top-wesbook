import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent"

const ChartPage = ( ) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <>
        <div className="p-4">This is Chart Page</div>
        <div className="flex flex-col w-[800px] mx-auto gap-2">
            <div className="flex justify-center">
                <ChartComponent />
            </div>
            <div className="flex gap-2">
                <div className="grow bg-blue-500 text-black h-40"></div>
                <div className="grow bg-blue-500 text-black h-40"></div>
                <div className="grow bg-blue-500 text-black h-40"></div>
                <div className="grow bg-blue-500 text-black h-40"></div>
            </div>
            <div className="flex gap-2">
                <div className="grow bg-blue-500 text-black h-40"></div>
                <div className="grow bg-blue-500 text-black h-40"></div>
                <div className="grow bg-blue-500 text-black h-40"></div>
                <div className="grow bg-blue-500 text-black h-40"></div>
            </div>
        </div>
        </>
    )

};

export default ChartPage;
            // <div className="grid grid-cols-4 gap-3 w-[800px] border border-white">
            //     <div className="bg-white w-full text-black">SSS</div>
            //     <div className="bg-white w-full text-black">SSS</div>
            //     <div className="bg-white w-full text-black">SSS</div>
            //     <div className="bg-white w-full text-black">SSS</div>
            // </div>