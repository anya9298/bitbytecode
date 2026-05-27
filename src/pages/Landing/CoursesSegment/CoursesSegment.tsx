import coursesFile from '../../../data/courses.json';
import type { CourseData, CoursesFileData } from '../../../data/types';
import styles from './CoursesSegment.module.css';

const { ageRangeText: AGE_RANGE_TEXT, courses: COURSES } = coursesFile as CoursesFileData;

function CourseCard({ course }: { course: CourseData }) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <div className={styles.cardTitleRow}>
          <h3 className={styles.cardTitle}>{course.title}</h3>
          <span className={styles.levelPill}>{course.levelTag}</span>
        </div>
        <p className={styles.cardMeta}>
          <span className={styles.metaItem}>{course.duration}</span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaItem}>{course.schedule}</span>
        </p>
      </header>

      <div className={styles.cardBody}>
        <div className={styles.block}>
          <p className={styles.blockTitle}>Требования к кандидату</p>
          <p className={styles.text}>{course.candidateRequirements}</p>
        </div>

        {(course.admission || course.note) && (
          <div className={styles.block}>
            {course.admission && (
              <>
                <p className={styles.blockTitle}>Поступление</p>
                <p className={styles.text}>{course.admission}</p>
              </>
            )}
            {course.note && <p className={styles.note}>{course.note}</p>}
          </div>
        )}

        <details className={styles.details}>
          <summary className={styles.summary}>
            <span>Темы курса</span>
            <span className={styles.chevron} aria-hidden="true">
              ▼
            </span>
          </summary>
          <ul className={styles.topicList}>
            {course.topics.map((t) => (
              <li key={t} className={styles.topicItem}>
                {t}
              </li>
            ))}
          </ul>
        </details>

        <div className={styles.finalProject}>
          <p className={styles.blockTitle}>Итог</p>
          <p className={styles.text}>{course.finalProject}</p>
        </div>
      </div>

      <div style={{flexGrow: 1}}></div>

      <footer className={styles.cardFooter}>
        <a className={styles.cta} href="#itcube">
          Как поступить
        </a>
      </footer>
    </article>
  );
}

export const CoursesSegment = () => {
  return (
    <section id="courses" className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <h2 className={styles.title}>Треки курсов</h2>
          <p className={styles.subtitle}>
            На базе IT-Cube.Рязань. 
            {AGE_RANGE_TEXT} Формат большинства треков — 2 занятия в неделю.
          </p>
        </header>

        <div className={styles.grid}>
          {COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
};
