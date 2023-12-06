export default function setDarkModeOnPreference() {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkModeQuery.matches) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}
