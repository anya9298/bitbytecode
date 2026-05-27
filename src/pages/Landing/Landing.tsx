import { useEffect, useState } from 'react';
import styles from './Landing.module.css'
import bbc_logo from '../../assets/BitByteCode_Logo.png'
import navItemsData from '../../data/navigation.json';
import type { NavItemData } from '../../data/types';
import { MainSegment } from './MainSegment/MainSegment';
import { StackSegment } from './StackSegment/StackSegment';
import { CoursesSegment } from './CoursesSegment/CoursesSegment';
import { ProjectsSegment } from './ProjectsSegment/ProjectsSegment';
import { EduProcessSegment } from './EduProcessSegment/EduProcessSegment';
import { TechEquipmentSegment } from './TechEquipmentSegment/TechEquipmentSegment';
import { SamsungSegment } from './SamsungSegment/SamsungSegment';
import { ItcubeSegment } from './ItcubeSegment/ItcubeSegment';
import { ContactsSegment } from './ContactsSegment/ContactsSegment';

const Landing = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = navItemsData as NavItemData[];

    useEffect(() => {
        if (document.getElementById('rocket-chat-script')) return;
    
        const loadChat = () => {
            const script = document.createElement('script');
    
            script.id = 'rocket-chat-script';
    
            script.src =
                'https://chat.bitbytecode.ru/livechat/rocketchat-livechat.min.js?_=201903270000';
    
            script.async = true;
    
            document.body.appendChild(script);
        };
    
        if (document.readyState === 'complete') {
            loadChat();
        } else {
            window.addEventListener('load', loadChat);
    
            return () => {
                window.removeEventListener('load', loadChat);
            };
        }
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isMenuOpen]);

    return (<div className={styles.root}>

        <div className={styles.navBar}>
            <img className={styles.logo} src={bbc_logo}></img>
            <h1 className={styles.logoTitle}>BitByteCode</h1>
            <div className={styles.space}></div>

            <nav className={styles.navLinks} aria-label="Навигация по странице">
                {navItems.map((item) => (
                    <a key={item.href + item.label} className={styles.navItem} href={item.href}>
                        {item.label}
                    </a>
                ))}
            </nav>

            <button
                type="button"
                className={styles.menuButton}
                aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen((v) => !v)}
            >
                <span className={styles.menuIcon} aria-hidden="true">
                    {isMenuOpen ? '✕' : '☰'}
                </span>
            </button>
        </div>

        <div
            className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.mobileMenuOverlayOpen : ''}`}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden={!isMenuOpen}
        />
        <aside
            id="mobile-menu"
            className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
            aria-hidden={!isMenuOpen}
        >
            <div className={styles.mobileMenuHeader}>
                <p className={styles.mobileMenuTitle}>Меню</p>
            </div>
            <div className={styles.mobileMenuLinks}>
                {navItems.map((item) => (
                    <a
                        key={'m-' + item.href + item.label}
                        className={styles.mobileNavItem}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </aside>

        <MainSegment />

        <StackSegment />

        <CoursesSegment />

        <ProjectsSegment />

        <EduProcessSegment />

        <TechEquipmentSegment />

        <SamsungSegment />

        <ItcubeSegment />

        <ContactsSegment />

        <footer>
            <p>&copy; 2025-2026 "BitByteCode". Все права защищены.</p>
        </footer>

        
    </div>)
}

export default Landing;