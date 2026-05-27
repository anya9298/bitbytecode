import samsungData from '../../../data/samsung-school.json';
import type { HighlightData, SamsungSchoolFileData } from '../../../data/types';
import styles from './SamsungSegment.module.css';

const data = samsungData as SamsungSchoolFileData;

function HighlightCard({ item }: { item: HighlightData }) {
  return (
    <article className={styles.highlightCard}>
      <span className={styles.highlightIcon} aria-hidden="true">
        {item.icon}
      </span>
      <h3 className={styles.highlightTitle}>{item.title}</h3>
      <p className={styles.highlightText}>{item.text}</p>
    </article>
  );
}

export const SamsungSegment = () => {
  return (
    <section id="samsung" className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Партнёрская программа</p>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </header>

        <div className={styles.highlights}>
          {data.highlights.map((item) => (
            <HighlightCard key={item.title} item={item} />
          ))}
        </div>

        <div className={styles.contentPanel}>
          <div className={styles.contentMain}>
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </div>
          <blockquote className={styles.callout}>{data.callout}</blockquote>
        </div>

        <div className={styles.footer}>
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
    </section>
  );
};
