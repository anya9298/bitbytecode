import teacherData from '../../../data/teacher-contacts.json';
import type { EducationItemData, TeacherContactsFileData } from '../../../data/types';
import styles from './ContactsSegment.module.css';
import { formatTeachingExperienceLine } from './teachingExperience';

const data = teacherData as TeacherContactsFileData;

function EducationCard({ item }: { item: EducationItemData }) {
  return (
    <li className={styles.eduItem}>
      <p className={styles.eduInstitution}>{item.institution}</p>
      <p className={styles.eduMeta}>
        <span className={styles.eduCode}>{item.code}</span>
        <span className={styles.eduDot}>—</span>
        <span>{item.specialty}</span>
      </p>
    </li>
  );
}

export const ContactsSegment = () => {
  const experienceLine = formatTeachingExperienceLine(data.teachingStartDate);

  return (
    <section id="contacts" className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </header>

        <div className={styles.profile}>

          <div className={styles.teacherSummary}>
            
            <div className={styles.photoWrap}>
              <img
                className={styles.photo}
                src={data.photoUrl}
                alt={data.name}
                loading="lazy"
              />
            </div>

            <div className={styles.shortInfo}>
            <h3 className={styles.name}>{data.name}</h3>
            <p className={styles.role}>{data.role}</p>
            <div className={styles.contactBar}>
              <div className={styles.contactText}>
                <p className={styles.contactLabel}>Связь и сотрудничество</p>
                <a className={styles.email} href={`mailto:${data.email}`}>
                  {data.email}
                </a>
              </div>
              <a className={styles.emailBtn} href={`mailto:${data.email}`}>
                Написать письмо
              </a>
            </div>
          </div>
          </div>

          <div className={styles.info}>
            <div className={styles.stats}>
              <p className={styles.statLine}>{experienceLine}</p>
              <p className={styles.statLineMuted}>{data.totalExperienceNote}</p>
            </div>

            <div className={styles.block}>
              <p className={styles.blockTitle}>Образование</p>
              <ul className={styles.eduList}>
                {data.education.map((item) => (
                  <EducationCard key={item.code + item.institution} item={item} />
                ))}
              </ul>
            </div>

            {data.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.text}>
                {paragraph}
              </p>
            ))}

            <div className={styles.focus}>
              <p className={styles.focusTitle}>{data.focusTitle}</p>
              <p className={styles.focusText}>{data.focusText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
