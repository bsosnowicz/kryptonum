import { useState } from 'react';
import './Acordion.scss';
import { questions } from '../data/questions';

const Acordion = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(10);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const progressPercentage = (visibleItems / questions.length) * 100;

  return (
    <div className="container">
      <ol className="item-list">
        {questions.slice(0, visibleItems).map((question, index) => (
          <li className={`item ${openIndex === index && 'active'}`}>
            <div className="list-container">
              <h2 className="title">{question.title}</h2>
              <button onClick={() => handleToggle(index)}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use
                    href={
                      openIndex === index
                        ? '../../public/minuscircle.svg#icon'
                        : '../../public/addcircle.svg#icon'
                    }
                  ></use>
                </svg>
              </button>
            </div>
            {openIndex === index && <p className="text">{question.body}</p>}
          </li>
        ))}
      </ol>
      {visibleItems < questions.length && (
        <div className="pagination-container">
          <p className="pagination-counter">
            {visibleItems}/{questions.length}
            <span />
          </p>
          <div className="progression-bar">
            <p
              className="progression-status"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <button className="pagination-button" onClick={loadMore}>
            Wczytaj więcej
            <svg width="16" height="17" viewBox="0 0 16 17">
              <use href="../../public/arrowdown.svg#icon"></use>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Acordion;
