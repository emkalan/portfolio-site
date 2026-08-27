import './Navbar.css'

function Navbar() {
    return (
        <>
        
            <nav className="navbar">
                <h4>✦ emma</h4>
                <a href="/">0. home</a>
                <a href="#about">1. about</a>
                <a href="#projects">2. projects</a>
                <a href="#experience">3. experience</a>
                <a href="#skills">4. skills</a>
                <a href="#contact">5. contact</a>

                <div className="nav-bottom">
                    {/* put social icons here later */}
                    <p>© 2026 emma kalantar</p>
                </div>

            </nav>
        </>
    )
}

export default Navbar;