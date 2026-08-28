import { Chip, Tooltip } from '@mui/material';
import React from 'react';
import './ProjectCard.css';

type Technology = {
    name: string;
    description: string;
};

type ProjectCardProps = {
    title: string;
    description: string;
    technologies: Technology[];
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
                    <Tooltip key={technology.name} title={technology.description} arrow slotProps={{
                        tooltip: {
                            className: 'technology-tooltip',
                        },
                        arrow: {
                            className: 'tooltip-arrow',
                        }
                    }}>
                        <Chip className="technology-chip"
                            label={technology.name}
                            size="small"
                            variant="outlined"
                        />
                    </Tooltip>
                ))}
            </div>
        </article>
    );
};

export default ProjectCard;
