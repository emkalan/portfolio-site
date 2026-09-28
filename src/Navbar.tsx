import './Navbar.css'

function Navbar() {
    return (
        <header className="site-header">
            <a className="brand-mark" href="#top" aria-label="Emma Kalantar, home">emma<span aria-hidden="true">✳</span></a>
            <nav className="navbar" aria-label="Main navigation">
                <a href="#about">about</a>
                <a href="#projects">projects</a>
                <a href="#focus">what i'm into</a>
                <a href="#skills">skills</a>
            </nav>
            <a className="nav-contact" href="#contact">say hello <span aria-hidden="true">↗</span></a>
        </header>
    )
}

export default Navbar;