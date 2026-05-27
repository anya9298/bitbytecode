import itcubeData from '../../../data/itcube.json';
import type { HighlightData, ItcubeFileData } from '../../../data/types';
import styles from './ItcubeSegment.module.css';

const data = itcubeData as ItcubeFileData;

function HighlightCard({ item }: { item: HighlightData }) {
  return (
    <article className={styles.highlightCard}>
      <span className={styles.highlightIcon} aria-hidden="true">
        {item.icon}
      </span>
      <div>
        <h3 className={styles.highlightTitle}>{item.title}</h3>
        <p className={styles.highlightText}>{item.text}</p>
      </div>
    </article>
  );
}

export const ItcubeSegment = () => {
  return (
    <section id="itcube" className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div className={styles.photoWrap}>
            <img
              className={styles.photo}
              src={data.photoUrl}
              alt={data.name}
              loading="lazy"
            />
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.leadBlock}>
              <h3 className={styles.leadTitle}>{data.leadTitle}</h3>
              {data.leadParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={styles.text}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.highlights}>
              {data.highlights.map((item) => (
                <HighlightCard key={item.title} item={item} />
              ))}
            </div>

            {data.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.text}>
                {paragraph}
              </p>
            ))}

            <p className={styles.coursesNote}>{data.coursesNote}</p>

            <div className={styles.enrollment}>
              <p className={styles.enrollmentText}>{data.enrollmentText}</p>
              <a
                className={styles.cta}
                href={data.websiteLink.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.websiteLink.label} ↗
              </a>
            </div>
          </div>

          <aside className={styles.mapAside}>
            <p className={styles.address}>{data.address}</p>
            <div className={styles.mapWrap}>
              <iframe
                className={styles.map}
                src={data.mapEmbedUrl}
                title="Карта IT-Cube.Рязань"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
