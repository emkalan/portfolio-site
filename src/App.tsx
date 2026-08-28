import { useEffect, useState } from 'react'
import './App.css'
import Pettable from './Pettable'
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
            <p className="hero-kicker">hi, I'm</p>
            <h1>emma kalantar</h1>
            <p className="typewriter-line" aria-live="polite">
              {typedText}<span className="typewriter-cursor" aria-hidden="true">|</span>
            </p>
            <p className="hero-intro">
              i'm a third-year computer science student at UBC, interested in full stack development, machine learning, and human-computer interaction. use your code-fu for good, not evil
            </p>
            <div className="hero-links">
              <a href="#featured-projects">see my work <span aria-hidden="true">-&gt;</span></a>
              <a href="#contact">say hello <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <Pettable>
            <img
              className="image-placeholder"
              src="/emma.jpg"
              alt="Emma Kalantar"
            />
          </Pettable>

          <div className="quick-facts">
            <div className="quick-facts-heading">
              <span className="quick-facts-number">01</span>
              <h4>quick facts</h4>
            </div>
            <ul className="quick-facts-list">
              <li>Coquitlam, BC</li>
              <li>UBC CS+biology+physics, class of 2028*</li>
              <li>stack: Python, Java, React, TypeScript, Tailwind CSS</li>
              <li>boba order: iced matcha with brown sugar pearls, 70% sugar</li>
            </ul>
            <p style={{ fontSize: '0.8rem', opacity: 0.75 }}>
              *we hope
            </p>
          </div>
        </section>

        <section id="featured-projects">
          <h4>the favourite children</h4>
          <div className="featured-projects">
            <ProjectCard
              title="this site!"
              description="the portfolio you're looking at right now, with a modern stack and reactive design"
              technologies={[
                { name: 'React', description: 'powers the interactive interface and reusable project cards' },
                { name: 'TypeScript', description: 'keeps component props and project data predictable and type-safe' },
                { name: 'Tailwind CSS', description: 'provides the responsive layout and utility-first styling' },
              ]}
              link="https://github.com/emkalan/" /* todo: make a repo */
            />
            <ProjectCard
              title="emCyclopedia"
              description="a proof of concept LSTM model trained on wikitext-2 to generate text in the style of Wikipedia articles"
              technologies={[
                { name: 'Python', description: 'handles data preparation and the text-generation pipeline' },
                { name: 'PyTorch', description: 'trains the LSTM model to produce Wikipedia-style text' },
                { name: 'NLP', description: 'shapes raw language into learnable, article-like patterns' },
                { name: 'Jupyter Notebook', description: 'supports experiments, training runs, and result inspection' },
              ]}
              link="https://github.com/emkalan/emcyclopedia"
            />
            <ProjectCard
              title="subsense"
              description="a general-purpose sentiment mapper for .srt files over the runtime of a video, via VADER sentiment analysis"
              technologies={[
                { name: 'Python', description: 'parses subtitle files and maps sentiment across a video timeline' },
                { name: 'NLP', description: 'turns subtitle language into a readable emotional signal' },
                { name: 'NLTK', description: 'provides VADER scoring for each subtitle segment' },
              ]}
              link="https://github.com/emkalan/subsense"
            />
          </div>
        </section>

        <section id="about">
          <div className="about">
            <h4>more, longer about me</h4>
            <p>
              ⚠️⚠️⚠️⚠️⚠️⚠️ hi i'm some placeholder text ⚠️⚠️⚠️⚠️⚠️⚠️
            </p>
          </div>
        </section>

        <section id="experience">
          <div className="experience">
            <h4>experience</h4>
            <p>
              ⚠️⚠️⚠️⚠️⚠️⚠️ as a child i yearned for the placeholder text ⚠️⚠️⚠️⚠️⚠️⚠️
            </p>
          </div>
        </section>

        <section id="skills">
          <div className="skills">
            <h4>skills</h4>
            <p>
              ⚠️⚠️⚠️⚠️⚠️⚠️ good at making placeholder text ⚠️⚠️⚠️⚠️⚠️⚠️
            </p>
          </div>
        </section>

        <section id="contact">
          <div className="contact">
            <h4>contact</h4>
            <p>
              ⚠️⚠️⚠️⚠️⚠️⚠️ talk to me with placeholder text ⚠️⚠️⚠️⚠️⚠️⚠️
            </p>
          </div>
        </section>


      </div>


    </>
  )
}

export default App
