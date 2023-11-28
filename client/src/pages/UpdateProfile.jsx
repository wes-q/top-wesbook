import { useState, useEffect } from "react";
import userService from "../services/users";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import getUserHeaders from "../helpers/getUserHeaders";
import InputField from "./InputField";

const UpdateProfile = ({ user, setNotification, setUser }) => {
    const [reset, setReset] = useState(false);

    const [formData, setFormData] = useState({
        displayName: user.displayName,
        email: user.email,
        bio: user.bio,
        gender: user.gender,
        worksAt: user.worksAt,
        livesIn: user.livesIn,
        jobTitle: user.jobTitle,
    });

    // const [formData, setFormData] = useState({
    //     displayName: "",
    //     email: "",
    //     bio: "",
    //     gender: "",
    //     worksAt: "",
    //     livesIn: "",
    //     worksAt: "",
    //     jobTitle: "",
    // });

    // useEffect(() => {
    //     // Set the initial values of email and displayName from the user object
    //     if (user) {
    //         setFormData({
    //             displayName: user.displayName,
    //             email: user.email,
    //             profilePhoto: user.profilePhoto,
    //             firstName: user.firstName,
    //             lastName: user.lastName,
    //             bio: user.bio,
    //             gender: user.gender,
    //         });
    //     }
    // }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setReset(true);
        const headers = getUserHeaders();
        try {
            const userData = await userService.update(user.id, formData, { headers });
            setUser(userData);
            setNotification({ message: `User profile updated`, type: "success" });
            setTimeout(() => {
                setNotification(false);
            }, 5000);
        } catch (error) {
            if (error.response.data.error) {
                const firstError = error.response.data.error;
                setNotification({ message: firstError, type: "error" });
                setTimeout(() => {
                    setNotification(false);
                }, 5000);
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-8 text-white text-center">Update Profile</h2>
            <div className="flex flex-col sm:flex-row justify-center sm:gap-12">
                {user && <ProfilePhotoUpload user={user} profilePhoto={user.profilePhoto} setNotification={setNotification} setUser={setUser} />}

                <form className="sm:w-[400px] h-auto" onSubmit={handleSubmit}>
                    <InputField label="Display Name" name="displayName" value={formData.displayName || ""} placeholder="John Wick" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />
                    <InputField label="First Name" name="firstName" value={formData.firstName || ""} placeholder="John" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />
                    <InputField label="Last Name" name="lastName" value={formData.lastName || ""} placeholder="Wick" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />
                    <InputField label="Bio (Best 3 words that describe you)" name="bio" value={formData.bio || ""} placeholder="motivated, focused, unwavering" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />
                    <InputField label="Gender" name="gender" value={formData.gender || ""} placeholder="Male" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />
                    <InputField label="Lives In" name="livesIn" value={formData.livesIn || ""} placeholder="Philippines" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />
                    <InputField label="Works At" name="worksAt" value={formData.worksAt || ""} placeholder="Apple" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />
                    <InputField label="Job Title" name="jobTitle" value={formData.jobTitle || ""} placeholder="Apple" setFormData={setFormData} formData={formData} reset={reset} setReset={setReset} />

                    <div className="flex justify-end">
                        <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none mt-4" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
