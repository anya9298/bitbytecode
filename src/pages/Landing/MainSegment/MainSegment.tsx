import { useEffect, useRef } from 'react';
import styles from './MainSegment.module.css';

const TECH_SYMBOLS = ['{','}','[',']','(',')',  '<','>','/','\\','|','&','%','#','@','!','?','*','+','-','=','~','`','^','0','1'];
const MATRIX_CHARS = '01{}[]()<>/\\|&%#@!?*+-=~`^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const MainSegment = () => {
    const matrixRef = useRef<HTMLDivElement>(null);

    // Logo scramble animation
    useEffect(() => {
        const logoTexts = document.querySelectorAll<SVGTextElement>('#bitbytecode-logo .logo-text');
        if (!logoTexts.length) return;

        const duration = 500;
        const interval = 30;
        let count = 0;
        const total = duration / interval;

        const id = setInterval(() => {
            logoTexts.forEach(el => {
                const tspan = el.querySelector('tspan');
                if (tspan) tspan.textContent = TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)];
            });
            count++;
            if (count >= total) {
                clearInterval(id);
                logoTexts.forEach(el => {
                    const tspan = el.querySelector('tspan');
                    const final = el.getAttribute('data-final');
                    if (tspan && final) tspan.textContent = final;
                });
            }
        }, interval);

        return () => clearInterval(id);
    }, []);

    // Matrix rain animation
    useEffect(() => {
        const container = matrixRef.current;
        if (!container) return;

        const columns = Math.floor(window.innerWidth / 20);
        const columnEls: HTMLDivElement[] = [];

        for (let i = 0; i < columns; i++) {
            const col = document.createElement('div');
            col.className = styles.matrixColumn;
            col.style.left = `${(i * 100) / columns}%`;
            col.style.animationDuration = `${5 + Math.random() * 10}s`;
            col.style.animationDelay = `${Math.random() * 5}s`;

            const count = 30 + Math.floor(Math.random() * 20);
            col.innerHTML = Array.from({ length: count }, () =>
                MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
            ).join('<br>');

            container.appendChild(col);
            columnEls.push(col);
        }

        const updateId = setInterval(() => {
            columnEls.forEach(col => {
                if (Math.random() > 0.7) {
                    const lines = col.innerHTML.split('<br>');
                    const idx = Math.floor(Math.random() * lines.length);
                    lines[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
                    col.innerHTML = lines.join('<br>');
                }
            });
        }, 200);

        const onIteration = (col: HTMLDivElement) => () => {
            const lines = col.innerHTML.split('<br>');
            col.innerHTML = lines.map(() =>
                MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
            ).join('<br>');
        };

        columnEls.forEach(col => {
            col.addEventListener('animationiteration', onIteration(col));
        });

        return () => {
            clearInterval(updateId);
            container.innerHTML = '';
        };
    }, []);

    const scrollToStack = () => {
        const el = document.getElementById('stack');
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <div id="main" className={styles.mainSegment}>
            {/* Animated background */}
            <div ref={matrixRef} className={styles.matrixBackground} />
            <div className={styles.animatedLight1} />
            <div className={styles.animatedLight2} />
            <div className={styles.animatedLight3} />

            <div className={styles.container}>
                <div className={styles.heroContent}>

                    {/* Top: logo + tagline */}
                    <div className={styles.heroTopSection}>
                        <svg
                            id="bitbytecode-logo"
                            className={styles.heroLogoImg}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1000 1000"
                        >
                            <defs>
                                <style>{`
                                    .logo-cls-1 { font-size:148.06px; letter-spacing:.06em; }
                                    .logo-cls-1, .logo-cls-2 { fill:#fff; font-weight:700; }
                                    .logo-cls-2  { font-size:119.78px; letter-spacing:.06em; }
                                    .logo-cls-3  { fill:#3e924b; }
                                    .logo-cls-4  { fill:#3939a1; }
                                    .logo-cls-5  { fill:#6161bd; }
                                    .logo-cls-6  { fill:#75b17b; }
                                    .logo-cls-7  { fill:#d9d9d9; }
                                    .logo-cls-8  { fill:#8b8bba; }
                                    .logo-cls-9  { fill:#8a8ad1; }
                                    .logo-cls-10 { fill:#70b77b; }
                                    .logo-cls-11 { fill:#be4444; }
                                    .logo-cls-12 { fill:#c15151; }
                                    .logo-cls-13 { fill:#4a9355; }
                                    .logo-cls-14 { fill:#d18d8d; }
                                    .logo-text { transition: opacity 0.1s ease; }
                                `}</style>
                            </defs>
                            <rect className="logo-cls-12" x="322.55" y="132.62" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-14" x="503.12" y="132.62" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-7"  x="683.70" y="132.62" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-3"  x="141.97" y="374.19" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-13" x="322.55" y="374.19" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-10" x="503.12" y="374.19" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-6"  x="683.70" y="374.19" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-4"  x="141.97" y="615.75" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-5"  x="322.55" y="615.75" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-9"  x="503.12" y="615.75" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-8"  x="683.70" y="615.75" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <rect className="logo-cls-11" x="141.97" y="132.62" width="174.33" height="233.21" rx="5.67" ry="5.67"/>
                            <text className="logo-cls-1 logo-text" data-final="B" transform="translate(182.44 302.63)"><tspan x="0" y="0">B</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="I" transform="translate(399.51 291.29)"><tspan x="0" y="0">I</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="T" transform="translate(561.31 291.29)"><tspan x="0" y="0">T</tspan></text>
                            <text className="logo-cls-1 logo-text" data-final="B" transform="translate(182.44 543.10)"><tspan x="0" y="0">B</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="Y" transform="translate(378.07 531.77)"><tspan x="0" y="0">Y</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="T" transform="translate(561.31 531.77)"><tspan x="0" y="0">T</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="E" transform="translate(737.90 534.43)"><tspan x="0" y="0">E</tspan></text>
                            <text className="logo-cls-1 logo-text" data-final="C" transform="translate(182.44 783.58)"><tspan x="0" y="0">C</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="O" transform="translate(374.11 772.24)"><tspan x="0" y="0">O</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="D" transform="translate(555.08 772.24)"><tspan x="0" y="0">D</tspan></text>
                            <text className="logo-cls-2 logo-text" data-final="E" transform="translate(737.90 772.24)"><tspan x="0" y="0">E</tspan></text>
                        </svg>

                        <div className={styles.heroTextSection}>
                            <div className={styles.heroDivider} />
                            <p className={styles.heroTechText}>Современные программные решения для бизнеса</p>
                            <div className={styles.heroDivider} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.heroDescription}>
                        <p>Приветствую на портале для учеников преподавателя Васильевой А. С.!</p>
                        <p>Мы специализируемся на разработке современных программных решений для бизнеса, используя передовые технологии и лучшие практики разработки.</p>
                        <p><strong>BitByteCode</strong> - это ученики, которые создают уникальные и интересные приложения, которые в дальнейшем показывают свою эффективность и получают признание на различных конкурсах!</p>
                    </div>

                    {/* Scroll button */}
                    <button className={styles.scrollDown} onClick={scrollToStack}>
                        <span>Узнать больше</span>
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    );
};