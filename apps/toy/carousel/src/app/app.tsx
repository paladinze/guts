import { MouseEventHandler, useEffect } from 'react';

export function App() {

  const clickHandler: MouseEventHandler  = (event) => {
    const button = event.target as HTMLButtonElement;
    const delta = button.dataset['buttonType'] === 'prev' ? -1 : 1;

    const list = document.querySelector('.carousel-list') as HTMLUListElement;
    const elementList = Array.from(list.children) as HTMLElement[];
    const activeIndex = elementList.findIndex((item) => item.dataset['active'] === 'true');

    const nextActiveIndex = (activeIndex + delta) < 0
      ? elementList.length -1
      : (activeIndex + delta) % elementList.length;

    const currActiveItem = elementList[activeIndex];
    const nextActiveItem = elementList[nextActiveIndex];

    delete currActiveItem.dataset['active'];
    nextActiveItem.dataset['active'] = 'true';

  }


  return (
    <>
      <section aria-label="architecture photos">
        <div className="carousel-container">
          <button onClick={clickHandler} className="carousel-button prev" data-button-type='prev'>&lt;</button>
          <button onClick={clickHandler} className="carousel-button next" data-button-type='next'>&gt;</button>
          <ul className="carousel-list">
            <li className="carousel-item" data-active="true">
              <img src={"assets/image5.jpeg"} alt="image1" />
            </li>
            <li className="carousel-item">
              <img src={"assets/image2.jpeg"} alt="image1" />
            </li>
            <li className="carousel-item">
              <img src={"assets/image3.jpeg"} alt="image1" />
            </li>
            <li className="carousel-item">
              <img src={"assets/image4.jpeg"} alt="image1" />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
