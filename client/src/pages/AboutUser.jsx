import React from "react";
import { format, parseISO } from "date-fns";
import WorkIcon from "../icons/work-google.svg?react";
import GenderIcon from "../icons/gender-google.svg?react";
import MailIcon from "../icons/mail-google.svg?react";
import EarthIcon from "../icons/public-earth-google.svg?react";
import ClockIcon from "../icons/clock-google.svg?react";

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-1">
        {icon && React.createElement(icon, { className: "w-4 h-4" })}
        <span>{label}:</span>
        <span className="font-bold">{value || "No information"}</span>
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
        <div className="w-full ring-1 bg-slate-200 rounded-md mb-4 text-black p-3">
            <div className="text-xl font-extrabold mb-3">About</div>
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
