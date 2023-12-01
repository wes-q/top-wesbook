import GithubLogo from "../icons/githublogo2.svg?react";

const Sidebar2 = () => (
    <div className="group flex flex-col justify-center text-xs sm:text-base items-center text-white bg-gray-800 p-4 text-center rounded-lg">
        <div className="flex sm:text-sm items-center">
            <GithubLogo className="w-6 h-6 sm:w-8 sm:h-8 mr-2 fill-current cursor-pointer group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out"></GithubLogo>
            <a className="" href="https://github.com/iamwesofph/top-wesbook" target="_blank">
                <span className="mr-6">© Wes Q. 2023</span>
            </a>
        </div>
        <div className="flex items-center sm:text-base">
            <a className="text-cyan-400 underline" href="https://github.com/iamwesofph/top-wesbook" target="_blank">
                <span className="text-xs hover:text-cyan-600 transition-colors">https://github.com/iamwesofph/top-wesbook</span>
            </a>
        </div>
    </div>
);

export default Sidebar2;
