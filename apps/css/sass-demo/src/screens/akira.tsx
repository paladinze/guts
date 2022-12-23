import './akira.scss';

export default function() {
  return (
    <>
      <div className='header'>
        <div className='logo-container'>
          <img className='logo' src='/assets/img/logo2.png' alt='logo' />
        </div>

        <div className='text-container'>
          <h1 className='heading-primary'>
            <span className='heading-primary--main'>AKIRA</span>
            <span className='heading-primary--sub'>A New Tokyo</span>
          </h1>
          <a href='' className='btn btn--white btn--animated'>Discover More</a>
        </div>
      </div>
      <main>
        <section className='section-about'>
          <div className='center-text margin-bottom-8'>
            <h2 className='heading-secondary'>
              “You called for me, didn't you?”
            </h2>
          </div>

          <div className='row'>
            <div className='col-1-of-2'>
              <h3 className='heading-3 margin-bottom-4'>Tetsuo Shima</h3>
              <p className='paragraph margin-bottom-4'>
                "Why do you always have to try and save me? I could have handled it on my own. Yeah, I admit I've gotten beaten before, but I won't always be on the receiving end, you hear that? You understand?"
              </p>
              <a href="#" className="btn-text">Learn more &rarr;</a>
            </div>
            <div className='col-1-of-2'>
              <div className='gallery'>
                <img src='/assets/img/tetsuo.png' alt='' className='gallery__img gallery__img--p1' />
                <img src='/assets/img/tetsuo2.png' alt='' className='gallery__img gallery__img--p2' />
                <img src='/assets/img/tetsuo3.jpeg' alt='' className='gallery__img gallery__img--p3' />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
