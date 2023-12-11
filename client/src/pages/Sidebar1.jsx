import { NavLink, Link } from "react-router-dom";
import noProfilePhoto from "../icons/noprofile.jpg";

const Sidebar1 = ({ currentUser }) => {
    const imageUrl = "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/A5UbHHnDt8X.png?_nc_eui2=AeHSL0Q4tGlL21d52WMHwPvtSHvZZLqYliNIe9lkupiWI12POmLNqk1BRNvTzpPYIdY";
    const imageUrl2 = "https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/jZrrNiQ6uUi.png?_nc_eui2=AeETgSekBuq7dxcXZK6LlqNiLDD_-cPEkoMsMP_5w8SSg81rqtMjA51Y80AvU2-sQI4";

    return (
        <div className="flex flex-col justify-center rounded-lg bg-transparent mb-4">
            <NavLink to={`/profile/${currentUser.id}`}>
                <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md">
                    <img className="rounded-full w-9 h-9 object-cover" src={currentUser.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                    <span>{currentUser.firstName}</span>
                </button>
            </NavLink>
            <NavLink to={"/friends-page/suggestions"}>
                <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md">
                    <i
                        className="block bg-cover bg-no-repeat w-9 h-9"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: "0 -296px",
                            backgroundSize: "37px 555px",
                        }}
                    ></i>
                    <span>Friends</span>
                </button>
            </NavLink>
            <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md" onClick={() => setNotification({ message: "Feature ongoing development.", type: "info" })}>
                <i
                    className="block bg-cover bg-no-repeat w-9 h-9"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: "0 -444px",
                        backgroundSize: "37px 555px",
                    }}
                ></i>
                <span>Memories</span>
            </button>
            <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md" onClick={() => setNotification({ message: "Feature ongoing development.", type: "info" })}>
                <i
                    className="block bg-cover bg-no-repeat w-9 h-9"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: "0 -185px",
                        backgroundSize: "37px 555px",
                    }}
                ></i>
                <span>Saved</span>
            </button>

            <Link to={"/messenger"}>
                <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md">
                    <i
                        className="block bg-cover bg-no-repeat w-9 h-9"
                        style={{
                            backgroundImage: `url(${imageUrl2})`,
                            backgroundPosition: "0 0px",
                            backgroundSize: "37px 251px",
                        }}
                    ></i>
                    <span>Messenger</span>
                </button>
            </Link>
            <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md" onClick={() => setNotification({ message: "Feature ongoing development.", type: "info" })}>
                <i
                    className="block bg-cover bg-no-repeat w-9 h-9"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: "0 -407px",
                        backgroundSize: "37px 555px",
                    }}
                ></i>
                <span>Marketplace</span>
            </button>
            <NavLink to={"/play"}>
                <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md">
                    <i
                        className="block bg-cover bg-no-repeat w-9 h-9"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: "0 -74px",
                            backgroundSize: "37px 555px",
                        }}
                    ></i>
                    <span>Play Games</span>
                </button>
            </NavLink>

            <NavLink to={"/leaderboard"}>
                <button className="flex items-center gap-2 p-2 hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full transition-colors rounded-md">
                    <i
                        className="block bg-cover bg-no-repeat w-9 h-9"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: "0 -111px",
                            backgroundSize: "37px 555px",
                        }}
                    ></i>
                    <span>Leaderboard</span>
                </button>
            </NavLink>
        </div>
    );
};

export default Sidebar1;
