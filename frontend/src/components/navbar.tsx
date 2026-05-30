import styles from '@/styles/navbar.module.css'

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { Moon, Sun, ChevronDown, Menu, X } from 'lucide-react'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const [dark, setDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme')
        if (saved) return saved === 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })
    const [featureOpen, setFeatureOpen] = useState<boolean>(false)
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const [mobileFeatureOpen, setMobileFeatureOpen] = useState<boolean>(false)
    
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.setAttribute('data-theme', dark ? 'dark' : 'light')
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }, [dark])

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [location])

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    const handleMouseEnter = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current)
        setFeatureOpen(true)
    }

    const handleMouseLeave = () => {
        setFeatureOpen(false)
    }

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault()
        setFeatureOpen(false)
        setMobileMenuOpen(false)
        
        if (path.startsWith('#')) {
            const id = path.replace('#', '')
            
            if (location.pathname !== '/') {
                navigate('/')
                
                setTimeout(() => {
                    const element = document.getElementById(id)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 100)
            } else {
                const element = document.getElementById(id)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }
        } else {
            navigate(path)
        }
    }

    const handleLogoClick = () => {
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 100)
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <nav className={styles.navbar}>
                <Link to={'/'} className={styles.nav__logo} onClick={handleLogoClick}>
                    Fransisco Fu
                </Link>

                <ul className={styles.nav__links}>
                    <li className={styles.nav__list}>
                        <a href='#hero' onClick={(e) => handleLinkClick(e, '#hero')}>About</a>
                    </li>
                    <li className={styles.nav__list}>
                        <a href='#projects' onClick={(e) => handleLinkClick(e, '#projects')}>Projects</a>
                    </li>
                    <li className={styles.nav__list}>
                        <a href='#contact' onClick={(e) => handleLinkClick(e, '#contact')}>Contact</a>
                    </li>

                    <li 
                        className={styles.nav__list_dropdown} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className={styles.dropdownBtn}>
                            Features <ChevronDown size={16} />
                        </span>
                        
                        <div className={`${styles.dropdownMenu} ${featureOpen ? styles.dropdownMenu_open : ''}`}>
                            <Link 
                                to={'/learning-journey'} 
                                onClick={() => setFeatureOpen(false)}
                            >
                                Learning Journey
                            </Link>
                            <button disabled>Coming Soon</button>
                        </div>
                    </li>
                </ul>

                <div className={styles.actions}>
                    <button
                        className={styles.themeBtn}
                        onClick={() => setDark(!dark)}
                        aria-label="Toggle theme"
                    >
                        {dark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    
                    <button 
                        className={styles.hamburger} 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenu_open : ''}`}>
                    <ul className={styles.mobileNav__links}>
                        <li className={styles.mobileNav__list}>
                            <a href='#hero' onClick={(e) => handleLinkClick(e, '#hero')}>About</a>
                        </li>
                        <li className={styles.mobileNav__list}>
                            <a href='#projects' onClick={(e) => handleLinkClick(e, '#projects')}>Projects</a>
                        </li>
                        <li className={styles.mobileNav__list}>
                            <a href='#contact' onClick={(e) => handleLinkClick(e, '#contact')}>Contact</a>
                        </li>
                        <li className={styles.mobileNav__list}>
                            <button 
                                className={styles.mobileDropdownBtn} 
                                onClick={() => setMobileFeatureOpen(!mobileFeatureOpen)}
                            >
                                Features 
                                <ChevronDown 
                                    size={16} 
                                    className={mobileFeatureOpen ? styles.chevronRotated : ''} 
                                />
                            </button>
                            <div className={`${styles.mobileDropdownMenu} ${mobileFeatureOpen ? styles.mobileDropdownMenu_open : ''}`}>
                                <Link 
                                    to={'/learning-journey'}
                                    onClick={() => {
                                        setMobileFeatureOpen(false)
                                        setMobileMenuOpen(false)
                                    }}
                                >
                                    Learning Journey
                                </Link>
                                <button disabled>Coming Soon</button>
                            </div>
                        </li>
                    </ul>

                    <div className={styles.mobileActions}>
                        <button
                            className={styles.themeBtn}
                            onClick={() => setDark(!dark)}
                            aria-label="Toggle theme"
                        >
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar