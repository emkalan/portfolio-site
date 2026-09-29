import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import './ProjectGraveyard.css'
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

const graveyardProjects = [
  {
    name: "Stagehand",
    what: 'a character-inspired desktop agent with a custom LM frontend: part useful assistant, part bespoke lab partner. the fun would be shaping the interface, character, and boundaries around the model',
    tools: 'React · Electron · local or hosted LMs · an aggressively dramatic UI',
    whyDead: 'what should it actually do? i haven\'t figured that out yet, or how to make it useful without being creepy, or how the pipeline between model and desktop would work. maybe one day, but not right now',
  },
  {
    name: 'Blawg',
    what: 'a Unity dog simulator where little virtual dogs learn to explore, chase toys, and generally be a dog using reinforcement learning',
    tools: 'Unity · C# · reinforcement learning · tiny virtual tennis balls',
    whyDead: 'RL is a lot of work, not to mention making a game people can play. also i have a real dog, and she is a lot of work too',
  },
  {
    name: 'A Penny for Your Thoughts',
    what: '“a penny for your thoughts” as a tiny web experiment: simple models pay 2 cents to post, and make 1 cent for every reply',
    tools: 'React · TypeScript · simple language models · a very small pile of pennies',
    whyDead: 'the idea is cute, but the implementation is a lot of work for a small payoff. i don\'t know how to make it work without being super computationally expensive, maybe a simpler version could be fun, but i want to focus on other things right now',
  },
  {
    name: 'The Card-Holding Dottore Case',
    what: 'a decora phone case with an actual slot for all the cards i carry around, so they don\'t fall out when i drop my phone. the case would be a little shrine to my favourite character from genshin impact, and the cards would be a little shrine to my favourite character from real life: me',
    tools: '3D modeling · my little brother\'s 3D printer · fit tests · a card that I can sacrifice to prototyping',
    whyDead: 'phone dimensions and print tolerances are unforgiving, and a case that drops my cards is not a case. also PLA would suck for this, and i don\'t have a good way to print in TPU',
  },
  {
    name: 'Noobberg Terminal',
    what: 'trading model that just barely breaks even sometimes hopefully, making predictions and piping them into LMs to generate an almost coherent narrative about the market',
    tools: 'Python · PyTorch · LLMs · a lot of money that i don\'t have',
    whyDead: 'it would take a lot of time and data to train a trading model also i am lazy',
  },
]

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typedText, setTypedText] = useState(phrases[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState<(typeof graveyardProjects)[number] | null>(null)
  const modalRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement>(null)

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

  useEffect(() => {
    if (!selectedIdea) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedIdea])

  const closeGraveyardModal = () => {
    setSelectedIdea(null)
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0)
  }

  const trapModalFocus = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeGraveyardModal()
      return
    }

    if (event.key !== 'Tab') return

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    )
    if (!focusableElements?.length) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

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
              i'm a third-year computer science student at UBC. i'm into swe, webdev, machine learning, and HCI, basically building cool things and thinking about the humans using them. use your code-fu for good, not evil
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
            <figcaption>my favourite coworker is very good at taking breaks. (pet her with your cursor)</figcaption>
          </figure>

          <a className="scroll-cue" href="#about"><span aria-hidden="true">↓</span> a little more about me</a>
        </section>

        <section className="content-section section-wrap" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">01 / the about-me bit</p>
            <h2 id="about-title">a bit about me.<br /><span>and what i'm into.</span></h2>
          </div>
          <div className="about-copy">
            <p className="lead-copy">i'm in my third year of computer science + life sciences + physics at UBC. i like web development, machine learning, human-computer interaction, and a lot of other things, which is a long way of saying i care about both how things work and how they feel to use.</p>
            <p>i've been playing with language models (see: emCyclopedia) and making little tools like subsense. still figuring out what i want to build when i grow up. probably something useful, hopefully something fun</p>
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
                description="this very site! a place to put my projects, a few thoughts, and one dog that doesn't have much to do with any of it"
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
              <p>i like thinking about the whole thing: what you see, what happens behind the scenes, and how the two fit together</p>
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
          <p className="contact-copy">internship lead? fun project? excellent boba recommendation? my GitHub is the best place to find me</p>
          <a className="button button-light" href="https://github.com/emkalan" target="_blank" rel="noreferrer noopener">
            come say hi on GitHub <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="graveyard-section" id="graveyard" aria-labelledby="graveyard-title">
          <div className="section-wrap">
            <div className="section-heading projects-heading graveyard-heading">
              <div>
                <p className="eyebrow">06 / gone, but not forgotten</p>
                <h2 id="graveyard-title">the project <span>graveyard.</span></h2>
              </div>
              <p className="graveyard-intro">little ideas that didn't make it out of the notes app (yet). hover for the name; click to dig up the skeleton</p>
            </div>

            <div className="graveyard-grid">
              {graveyardProjects.map((idea) => (
                <button
                  className="grave-marker"
                  key={idea.name}
                  type="button"
                  aria-label={`Open ${idea.name} project idea details`}
                  onClick={(event) => {
                    lastTriggerRef.current = event.currentTarget
                    setSelectedIdea(idea)
                  }}
                >
                  <span className="grave-marker-cross" aria-hidden="true">✳</span>
                  <span className="grave-marker-rip" aria-hidden="true">RIP</span>
                  <span className="grave-marker-name">{idea.name}</span>
                  <span className="grave-marker-date" aria-hidden="true">yet unborn</span>
                </button>
              ))}
            </div>
            <p className="graveyard-footnote"><span aria-hidden="true">✳</span> some day, perhaps.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-mark" href="#top">emma<span>✳</span></a>
        <p>made with ❤️ in Coquitlam, BC.</p>
        <a href="https://github.com/emkalan" target="_blank" rel="noreferrer noopener">GitHub ↗</a>
        <span>© {new Date().getFullYear()} Emma Kalantar</span>
      </footer>

      {selectedIdea && createPortal(
        <div
          className="graveyard-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeGraveyardModal()
          }}
        >
          <section
            className="graveyard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="graveyard-dialog-title"
            ref={modalRef}
            onKeyDown={trapModalFocus}
          >
            <div className="graveyard-modal-topline">
              <p className="eyebrow">here lies:</p>
              <button className="graveyard-close" ref={closeButtonRef} type="button" onClick={closeGraveyardModal} aria-label="Close project details">×</button>
            </div>
            <h2 id="graveyard-dialog-title">{selectedIdea.name}<span>.</span></h2>
            <div className="graveyard-detail">
              <h3>the idea</h3>
              <p>{selectedIdea.what}</p>
            </div>
            <div className="graveyard-detail">
              <h3>possible tools / materials</h3>
              <p>{selectedIdea.tools}</p>
            </div>
            <div className="graveyard-detail">
              <h3>why it's resting</h3>
              <p>{selectedIdea.whyDead}</p>
            </div>
            <p className="graveyard-modal-signoff">not abandoned. just... aggressively deprioritized <span aria-hidden="true">✳</span></p>
          </section>
        </div>,
        document.body,
      )}
    </div>
  )
}

export default App
