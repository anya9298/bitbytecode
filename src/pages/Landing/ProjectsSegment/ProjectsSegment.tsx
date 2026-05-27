import hiWorkLogo from '../../../assets/HiWork_Large_logo.png';
import projectsData from '../../../data/projects.json';
import type { ProjectData, ProjectLinkData } from '../../../data/types';
import styles from './ProjectsSegment.module.css';

const PROJECT_LOGOS: Record<string, string> = {
  hiWork: hiWorkLogo,
};

type Project = ProjectData & {
  logoSrc?: string;
};

const PROJECTS: Project[] = (projectsData as ProjectData[]).map((project) => ({
  ...project,
  logoSrc: project.logoKey ? PROJECT_LOGOS[project.logoKey] : undefined,
}));

function DevelopersList({ developers, leader }: { developers: string[]; leader?: string }) {
  return (
    <div className={styles.block}>
      <p className={styles.blockTitle}>Разработчики</p>
      <ul className={styles.peopleList}>
        {developers.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      {leader && (
        <p className={styles.leader}>
          Руководитель: <span>{leader}</span>
        </p>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardClass = [
    styles.card,
    project.featured ? styles.cardFeatured : '',
    project.id === 'test-service' ? styles.cardCompact : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClass}>
      <header className={styles.cardHeader}>
        {project.logoSrc && (
          <img className={styles.projectLogo} src={project.logoSrc} alt={`Логотип ${project.title}`} />
        )}
        <div className={styles.cardTitleWrap}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <span className={styles.typePill}>{project.typeTag}</span>
          </div>
          <p className={styles.cardTagline}>{project.tagline}</p>
          {project.relatedTo && (
            <p className={styles.relatedBadge}>Часть экосистемы {project.relatedTo}</p>
          )}
        </div>
      </header>

      <div className={styles.cardBody}>
        <DevelopersList developers={project.developers} leader={project.leader} />

        {project.paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className={styles.text}>
            {p}
          </p>
        ))}

        {(project.employeeBenefits || project.hrBenefits) && (
          <div className={styles.benefits}>
            <p className={styles.benefitsHeading}>Чем поможет Hi.Work?</p>
            {project.employeeBenefits && (
              <div className={styles.benefitGroup}>
                <p className={styles.benefitGroupTitle}>Для сотрудников</p>
                <ul className={styles.benefitList}>
                  {project.employeeBenefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.hrBenefits && (
              <div className={styles.benefitGroup}>
                <p className={styles.benefitGroupTitle}>Для HR-специалистов</p>
                <ul className={styles.benefitList}>
                  {project.hrBenefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className={styles.links}>
            {project.links.map((link: ProjectLinkData) => (
              <a
                key={link.label}
                className={styles.linkBtn}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export const ProjectsSegment = () => {
  return (
    <section id="projects" className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <h2 className={styles.title}>Реестр проектов</h2>
          <p className={styles.subtitle}>
            Наиболее отличившиеся проекты учеников: от веб-платформ и тестирования до мобильных
            приложений в RuStore.
          </p>
        </header>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
