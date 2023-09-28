import { useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const newValue = (theme === "light") ? "dark" : "light"
        document.documentElement.setAttribute("data-theme", newValue);
        setTheme(newValue)
    };

    const style = {
        display: 'flex',
        gap: '8px',
        margin: '16px 8px'
    }

    return (
        <div style={style}>
            <input
                type="checkbox"
                checked={theme === "light"}
                onChange={toggleTheme}
            />
            <label htmlFor="theme">
                {theme === "light" ? "Light mode" : "Dark mode"}
            </label>
        </div>
    );
};