import chef_claude_logo from "../chef-claude-icon.png"

export default function Header() {
    return (
        <header className="header">
            <img className="header-logo" src={chef_claude_logo} alt="chef logo" />
            <h1 className="header-title">AI Chef</h1>
        </header>
    )
}