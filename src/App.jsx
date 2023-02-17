import { useState, useEffect } from "react";

import MobileDeviderImage from "/pattern-divider-mobile.svg";
import DesktopDeviderImage from "/pattern-divider-desktop.svg";
import DiceIcon from "/icon-dice.svg";

function App() {
  const [advice, setAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadRandomAdvice() {
    if (isLoading) return false;

    setIsLoading(true);
    const res = await fetch("https://api.adviceslip.com/advice").then((res) =>
      res.json()
    );

    setAdvice(res.slip);
    setIsLoading(false);
  }

  useEffect(() => {
    loadRandomAdvice();
  }, []);

  return (
    <div className="bg-dark-blue w-full h-screen flex justify-center items-center">
      {advice ? (
        <div className="bg-dark-grayish-blue text-center w-[90%] max-w-[550px] pt-[2.5rem] sm:pt-[3rem] pb-[4rem] sm:pb-[5rem] px-[1.5rem] sm:px-[2rem] flex flex-col gap-[1.5rem] rounded-xl relative">
          <p className="uppercase text-neon-green tracking-[0.3rem] font-manrope text-sm">
            Advice #{advice.id}
          </p>
          <p className="text-[28px] text-light-cyan font-manrope-bold">
            “{advice.advice}”
          </p>

          <img src={MobileDeviderImage} className="sm:hidden" alt="devider" />
          <img src={DesktopDeviderImage} className="hidden sm:block" alt="devider" />

          <div
            className={`absolute bottom-[-40px] left-[calc(50%_-_40px)] w-[80px] h-[80px] bg-neon-green rounded-full flex justify-center items-center cursor-pointer select-none hover:shadow-neon-green hover:shadow-[0_0_20px_0] transition-shadow ${
              isLoading && "animate-spin"
            }`}
            onClick={() => loadRandomAdvice()}
          >
            <img src={DiceIcon} className="w-[2rem]" alt="dice" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
