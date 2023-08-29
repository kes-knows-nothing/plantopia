import './progress.scss';

const Progress = () => {
  return (
    <div className="progress_container">
      <main className="progress_wrapper">
        <section className="ball_wrapper">
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
        </section>
        <section className="letter_wrapper">
          <div className="l-1 letter">L</div>
          <div className="l-2 letter">o</div>
          <div className="l-3 letter">a</div>
          <div className="l-4 letter">d</div>
          <div className="l-5 letter">i</div>
          <div className="l-6 letter">n</div>
          <div className="l-7 letter">g</div>
          <div className="l-8 letter">.</div>
          <div className="l-9 letter">.</div>
          <div className="l-10 letter">.</div>
        </section>
      </main>
    </div>
  );
};

export default Progress;
