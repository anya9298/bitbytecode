import techEquipmentData from '../../../data/tech-equipment.json';
import type { ContentSectionData, TechEquipmentFileData } from '../../../data/types';
import styles from './TechEquipmentSegment.module.css';

const { title, subtitle, sections } = techEquipmentData as TechEquipmentFileData;

function SectionCard({ section }: { section: ContentSectionData }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTitleRow}>
        <h3 className={styles.cardTitle}>{section.title}</h3>
        {section.badge && <span className={styles.badge}>{section.badge}</span>}
      </div>
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

export const TechEquipmentSegment = () => {
  return (
    <section id="techs" className={styles.root}>
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
