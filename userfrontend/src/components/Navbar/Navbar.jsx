function Navbar({ currentPage }) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#/" className="brand" aria-label="SupaCloud home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>SupaCloud<span className="brand-dot">.</span></span>
        </a>
        <div className="nav-links">
          <a href="#/" aria-current={currentPage === "home" ? "page" : undefined}>Home</a>
          <a href="#/about" aria-current={currentPage === "about" ? "page" : undefined}>About</a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

