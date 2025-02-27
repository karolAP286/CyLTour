import "./HeaderComponent.css";
function HeaderComponent () {
    return (
        <header className="header">
            <h1 className="title">Bienveidos</h1>
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">News</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderComponent;