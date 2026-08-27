import { Chip } from '@mui/material';
import React from 'react';
import './ProjectCard.css';

type ProjectCardProps = {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, technologies, link }) => {
    return (
        <article className="project-card">
            <h2>
                {link ? (
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        {title}
                    </a>
                ) : (
                    title
                )}
            </h2>
            <p>{description}</p>
            <div className="technologies">
                {technologies.map((technology) => (
                    <Chip className="technology-chip"
                        key={technology}
                        label={technology}
                        size="small"
                        variant="outlined"
                    />
                ))}
            </div>
        </article>
    );
};

export default ProjectCard;
