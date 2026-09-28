import './ProjectCard.css';

type ProjectCardProps = {
    number: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
};

function ProjectCard({ number, title, description, technologies, link }: ProjectCardProps) {
    return (
        <article className="project-card">
            <div className="project-card-top">
                <span className="project-number">{number}</span>
                <span className="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>
                {link ? (
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        {title}
                    </a>
                ) : (
                    title
                )}
            </h3>
            <p>{description}</p>
            <div className="technologies">
                {technologies.map((technology) => (
                    <span className="technology-chip" key={technology}>
                        {technology}
                    </span>
                ))}
            </div>
            {link && <a className="project-link" href={link} target="_blank" rel="noreferrer noopener">View project <span aria-hidden="true">↗</span></a>}
        </article>
    );
}

export default ProjectCard;
