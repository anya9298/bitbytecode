import eduProcessData from '../../../data/edu-process.json';
import type { EduProcessFileData, EduProcessSectionData } from '../../../data/types';
import styles from './EduProcessSegment.module.css';

const { title, subtitle, sections } = eduProcessData as EduProcessFileData;

function SectionCard({ section }: { section: EduProcessSectionData }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.cardTitle}>{section.title}</h3>
      <div className={styles.cardBody}>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

export const EduProcessSegment = () => {
  return (
    <section id="eduprocess" className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.grid}>
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
};
