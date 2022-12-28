import './dashboard.scss';

export default function() {


  return <div className='container'>
    <header className='header'>
      <img src='/assets/img/logo.png' alt='logo' className='logo' />
      <form action='#' className='search'>
        <input type='text' className='search__input' placeholder='search anything' />
        <button className='search__button'>
          <svg className="search__icon">
            <use xlinkHref="assets/dashboard/spritesheet.svg#icon-cw"></use>
          </svg>
        </button>
      </form>
      <nav className='nav'>
        <div className='nav__icon-box'>
          <svg className={"nav__icon"}>
            <use xlinkHref="assets/dashboard/spritesheet.svg#icon-power-plug"></use>
          </svg>
        </div>
        <div className='nav__icon-box'>
          <svg className={"nav__icon"}>
            <use xlinkHref="assets/dashboard/spritesheet.svg#icon-rocket"></use>
          </svg>
          <span className='nav__notification'>5</span>
        </div>
        <div className="nav__avatar">
          <img src="assets/img/kaneda3.jpeg" alt="user photo" className="nav__avatar-img" />
          <span className="nav__name">Kaneda</span>
        </div>
      </nav>
    </header>
    <div className='content'>
      <nav className='sidebar'>
        navigation
      </nav>
      <main className='details'>
        details
      </main>
    </div>
  </div>;
}
