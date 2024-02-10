import React, { useState } from 'react';
import './D20-Styles.scss';

const D20 = () => {
  const [face, setFace] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const sides = 20;

  const randomFace = (): number => {
    let newFace = Math.floor(Math.random() * sides) + 1;
    if (newFace === face) {
      return randomFace();
    }
    return newFace;
  };

  const rollTo = (newFace: number) => {
    setIsRolling(false);
    setFace(newFace);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsRolling(true);
    setTimeout(() => {
      rollTo(randomFace());
    }, 3000);
  };

  return (
    <>
      <div className="content">
        <div className={`die ${isRolling ? 'rolling' : ''}`} data-face={face} onClick={handleClick}>
          {[...Array(sides)].map((_, i) => (
            <figure key={i} className={`face face-${i + 1}`}></figure>
          ))}
        </div>
      </div>
    </>
  );
};

export default D20;
