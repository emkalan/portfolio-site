import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';

const phrases = [
  'a third-year computer science student at UBC',
  'a lover of all things tech and design',
  'interested in web development, machine learning, and human-computer interaction',
  'looking for a summer internship for 2027',
  'open to new opportunities and collaborations',
  'chillin\' like a villain',
  'eating sushy 🤤',
  'a big fan of the Oxford comma',
];

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setTypedText(phrases[0]);
      return;
    }

    const phrase = phrases[phraseIndex];
    const isComplete = typedText === phrase;
    const isEmpty = typedText === '';
    const delay = isComplete ? 1400 : isDeleting ? 25 : 90;

    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      } else {
        const nextLength = isDeleting ? typedText.length - 1 : typedText.length + 1;
        setTypedText(phrase.slice(0, nextLength));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [phraseIndex, typedText, isDeleting]);

  return (
    <>
      <div className="container">
        <Navbar />
        <section id="hero">
          <div className="hero-copy">
            <p>hi, I'm</p>
            <h1>emma kalantar</h1>
            <p className="typewriter-line" aria-live="polite">
              {typedText}<span className="typewriter-cursor" aria-hidden="true">|</span>
            </p>
          </div>
          <img
            className="image-placeholder"
            src="/emma.jpg"
            alt="Emma Kalantar"
          />
          <div className="quick-facts">
            <h4>quick facts</h4>
            <ul className="quick-facts-list">
              <li>✦ Coquitlam, BC</li>
              <li>✦ UBC CS+biology+physics, Class of 2028</li>
              <li>✦ fullstack development, machine learning, HCI</li>
              <li>✦ stack: Python, Java, React, TypeScript, Tailwind CSS</li>
              <li>✦ boba order: iced matcha with brown sugar pearls, 70% sugar</li>
            </ul>
          </div>
        </section>

        <section id="featured-projects">
          <div className="featured-projects">
            <ProjectCard
              title="this site!"
              description="the portfolio you're looking at right now, with a modern stack and reactive design"
              technologies={['React', 'TypeScript', 'Tailwind CSS']}
              link="https://github.com/emkalan/" /* todo: make a repo */
            />
            <ProjectCard
              title="emCyclopedia"
              description="a proof of concept LSTM model trained on wikitext-2 to generate text in the style of Wikipedia articles"
              technologies={['Python', 'PyTorch', 'NLP', 'Jupyter Notebook']}
              link="https://github.com/emkalan/emcyclopedia"
            />
            <ProjectCard
              title="subsense"
              description="a general-purpose sentiment mapper for .srt files over the runtime of a video, via VADER sentiment analysis"
              technologies={['Python', 'NLP', 'NLTK']}
              link="https://github.com/emkalan/subsense"
            />
          </div>
        </section>


      </div>


    </>
  )
}

export default App
