import React from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import WorkIcon from "../icons/work-google.svg?react";
import GenderIcon from "../icons/gender-google.svg?react";
import MailIcon from "../icons/mail-google.svg?react";
import EarthIcon from "../icons/public-earth-google.svg?react";
import ClockIcon from "../icons/clock-google.svg?react";

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-1">
        {icon && React.createElement(icon, { className: "w-4 h-4 flex-shrink-0 fill-current" })}
        {/* {icon && <span className="flex-shrink-0">{React.createElement(icon, { className: "w-4 h-4" })}</span>} */}

        <span className="whitespace-nowrap">{label}:</span>
        <span className="font-bold truncate">{value || "No information"}</span>
    </div>
);

const AboutUser = ({ userToDisplay }) => {
    if (!userToDisplay.memberSince) {
        return;
    }

    const jsDate = parseISO(userToDisplay.memberSince);
    const formattedDate = format(jsDate, "MMM dd, yyyy");

    console.log(userToDisplay);
    return (
        <div className="w-full shadow-md bg-light-b dark:bg-dark-b rounded-md mb-4 p-3">
            <div className="flex justify-between mb-3">
                <div className="flex flex-col">
                    <div className="text-xl font-extrabold">About</div>
                </div>
                {userToDisplay.status === "self" && (
                    <Link to={"/update-profile"}>
                        <div className="text-primary dark:text-primaryDark hover:underline cursor-pointer h-min">Edit info</div>
                    </Link>
                )}
            </div>
            <div className="flex flex-col">
                <InfoItem icon={GenderIcon} label="Gender" value={userToDisplay.gender} />
                <InfoItem icon={EarthIcon} label="Lives in" value={userToDisplay.livesIn} />
                <InfoItem icon={WorkIcon} label="Works at" value={userToDisplay.worksAt} />
                <InfoItem icon={WorkIcon} label="Job Title" value={userToDisplay.jobTitle} />
                <InfoItem icon={MailIcon} label="Email" value={userToDisplay.email} />
                <InfoItem icon={ClockIcon} label="Member Since" value={formattedDate} />
            </div>
        </div>
    );
};

export default AboutUser;
