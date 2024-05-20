import React from 'react';
import './style.css';
import {Project} from "../../../interfaces/Project";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="project-card">
            <div className="project-header">
                <h3>{project?.title}</h3>
                <span>{project.category ? project?.category : 'Без категории'}</span> / <span>{project.duration ? project?.duration : 'Без длительности'}</span>
            </div>
            <div className="project-description">
                <p>{project?.body}</p>
            </div>
            <div>
                <a href={project?.link} className="project-link">Ссылка на проект</a>
                <span className={'vertical-line'}> | </span>
                <a href={project?.link} className="project-link approve">Откликнуться</a>
                <span className={'vertical-line'}> | </span>
                <a href={project?.link} className="project-link reject">Отказаться</a>
            </div>

        </div>
    );
};

export default ProjectCard;