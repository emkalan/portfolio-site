import { useEffect, useState } from 'react'
import './App.css'
import Pettable from './Pettable'
import Navbar from './Navbar'
import ProjectCard from './ProjectCard'

const phrases = [
  'a third-year CS student at UBC',
  'into web dev, ML, and HCI',
  'looking for a summer 2027 internship',
  'a big fan of the Oxford comma',
]

const skillGroups = [
  { title: 'Languages', skills: ['Python', 'Java', 'TypeScript'] },
  { title: 'Web', skills: ['React', 'HTML', 'CSS'] },
  { title: 'Interests', skills: ['Machine learning', 'Human-computer interaction', 'Full-stack development'] },
]

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typedText, setTypedText] = useState(phrases[0])
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const phrase = phrases[phraseIndex]
    const isComplete = typedText === phrase
    const isEmpty = typedText === ''
    const delay = isComplete ? 1800 : isDeleting ? 28 : 65

    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true)
      } else if (isDeleting && isEmpty) {
        setPhraseIndex((index) => (index + 1) % phrases.length)
        setIsDeleting(false)
      } else {
        const nextLength = isDeleting ? typedText.length - 1 : typedText.length + 1
        setTypedText(phrase.slice(0, nextLength))
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [phraseIndex, typedText, isDeleting])

  return (
    <div className="site-shell" id="top">
      <Navbar />

      <main>
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> hi, i'm emma · Coquitlam, BC</p>
            <h1 id="hero-title">Emma<br /><span>Kalantar.</span></h1>
            <p className="typewriter-line" aria-hidden="true">
              {typedText}<span className="typewriter-cursor">|</span>
            </p>
            <p className="hero-intro">
              i'm a third-year computer science student at UBC. i'm into web development, machine learning, and HCI—basically, building cool things and thinking about the humans using them. use your code-fu for good, not evil.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">see what i've made <span aria-hidden="true">↘</span></a>
              <a className="text-link" href="#contact">say hello <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-note">
              <span className="note-star" aria-hidden="true">✳</span>
              <p>looking for a summer 2027 internship</p>
            </div>
          </div>

          <figure className="hero-portrait">
            <div className="portrait-frame">
              <Pettable>
                <img className="portrait-image" src="/emma.jpg" alt="A happy Shiba Inu" />
              </Pettable>
              <span className="portrait-sticker" aria-hidden="true">a very good<br />code buddy</span>
            </div>
            <figcaption>my favorite coworker is very good at taking breaks. (pet her with your cursor)</figcaption>
          </figure>

          <a className="scroll-cue" href="#about"><span aria-hidden="true">↓</span> a little more about me</a>
        </section>

        <section className="content-section section-wrap" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">01 / the about-me bit</p>
            <h2 id="about-title">a bit about me.<br /><span>and what i'm into.</span></h2>
          </div>
          <div className="about-copy">
            <p className="lead-copy">i'm in my third year of computer science at UBC. i like web development, machine learning, and human-computer interaction—which is a long way of saying i care about both how things work and how they feel to use.</p>
            <p>i've been playing with language models (see: emCyclopedia) and making little tools like subsense. still figuring out what i want to build when i grow up. probably something useful, hopefully something fun.</p>
            <p className="personal-note"><span aria-hidden="true">✳</span> current boba order: iced matcha, brown sugar pearls, 70% sugar</p>
          </div>
        </section>

        <section className="projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-wrap">
            <div className="section-heading projects-heading">
              <div>
                <p className="eyebrow">02 / some things i've made</p>
                <h2 id="projects-title">the favourite <span>children.</span></h2>
              </div>
              <a className="text-link" href="https://github.com/emkalan" target="_blank" rel="noreferrer noopener">the rest is on GitHub <span aria-hidden="true">↗</span></a>
            </div>
            <div className="featured-projects">
              <ProjectCard
                number="01"
                title="emCyclopedia"
                description="i trained an LSTM on WikiText-2 and let it have a go at writing Wikipedia-style articles."
                technologies={['Python', 'PyTorch', 'NLP', 'Jupyter']}
                link="https://github.com/emkalan/emcyclopedia"
              />
              <ProjectCard
                number="02"
                title="subsense"
                description="give it an .srt file and it maps VADER sentiment across the video. basically: how does the mood change as you watch?"
                technologies={['Python', 'NLTK', 'VADER', 'Data visualization']}
                link="https://github.com/emkalan/subsense"
              />
              <ProjectCard
                number="03"
                title="this portfolio"
                description="this very site! a place to put my projects, a few thoughts, and one moral support dog."
                technologies={['React', 'TypeScript', 'Vite', 'CSS']}
              />
            </div>
          </div>
        </section>

        <section className="content-section focus-section section-wrap" id="focus" aria-labelledby="focus-title">
          <div className="section-heading">
            <p className="eyebrow">03 / what's next?</p>
            <h2 id="focus-title">things i'd <span>love to do.</span></h2>
          </div>
          <div className="focus-grid">
            <article className="focus-card focus-card-featured">
              <span className="focus-number">01</span>
              <h3>summer 2027</h3>
              <p>i'm looking for an internship where i can learn a lot, be useful, and work with kind, clever people. know a place? tell me about it.</p>
              <a href="#contact" className="text-link">let's talk <span aria-hidden="true">↗</span></a>
            </article>
            <article className="focus-card">
              <span className="focus-number">02</span>
              <h3>full-stack development</h3>
              <p>i like thinking about the whole thing: what you see, what happens behind the scenes, and how the two fit together.</p>
            </article>
            <article className="focus-card">
              <span className="focus-number">03</span>
              <h3>ML + HCI</h3>
              <p>curious about how machine learning can be genuinely useful, and what it feels like for people to use it.</p>
            </article>
          </div>
        </section>

        <section className="skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-wrap skills-layout">
            <div className="section-heading">
              <p className="eyebrow">04 / things i use</p>
              <h2 id="skills-title">the current<br /><span>toolkit.</span></h2>
            </div>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">05 / your turn</p>
          <h2 id="contact-title">got something<br />good in <span>mind?</span></h2>
          <p className="contact-copy">internship lead? fun project? excellent boba recommendation? my GitHub is the best place to find me.</p>
          <a className="button button-light" href="https://github.com/emkalan" target="_blank" rel="noreferrer noopener">
            come say hi on GitHub <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-mark" href="#top">emma<span>✳</span></a>
        <p>made with ❤️ in Coquitlam, BC.</p>
        <a href="https://github.com/emkalan" target="_blank" rel="noreferrer noopener">GitHub ↗</a>
        <span>© {new Date().getFullYear()} Emma Kalantar</span>
      </footer>
    </div>
  )
}

export default App
