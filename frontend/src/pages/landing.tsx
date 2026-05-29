import styles from '@/styles/landing.module.css'

import { Link } from 'react-router-dom'
import { ExternalLink, Calendar } from 'lucide-react'

const LandingPage = () => {
    const projects = [
        {
            title: 'Pangan Pintar',
            description: 'Platform berbasis web dan AI yang dirancang untuk meningkatkan akses terhadap informasi harga bahan pangan yang transparan. Membantu UMKM dan masyarakat mengantisipasi fluktuasi harga melalui prediksi berbasis machine learning.',
            tech: ['NodeJS', 'Vite', 'React', 'Express', 'Typescript', 'Python'],
            link: 'https://github.com/kitsumyuzu/panganpintar.id',
        },
    ]

    const experiences = [
        {
            title: 'Information Systems',
            company: 'Institut Teknologi dan Bisnis Indobaru Nasional',
            year: '2024 - Present',
            description: 'Studying Information Systems focusing on software development, databases, and business technology.',
        },
        {
            title: 'Independent Internship Program',
            company: 'Infinite Learning',
            year: '2026 - Present',
            description: 'Participating in hands-on practical tech applications with real-world projects and mentorship.',
        }
    ]

    return (
        <>
            <section id='hero' className={styles.hero__section}>
                <div className={styles.hero__header}>
                    <span>Fransisco Fu</span>
                    <h2>Full-stack Developer & Game Developer</h2>
                    
                    <div className={styles.divider}></div>
                    <p>
                        Hi! I'm a passionate software engineering enthusiast. With roots in coding from high school, I love building tech solutions that bridge software and business. Explore my repos for projects on development, systems, and innovation!
                    </p>
                </div>

                <div className={styles.hero__actions}>
                    <Link to='#projects'>View Projects</Link>
                    <Link to='#contact'>Contact Me</Link>
                </div>
            </section>

            <section id='projects' className={styles.project__section}>
                <div className={styles.project__header}>
                    <span>Portfolio</span>
                    <h2>Featured Projects</h2>
                </div>

                <div className={styles.project__grid}>
                    {projects.map((project, index) => (
                        <div key={index} className={styles.project__card}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                            <div className={styles.project__tech_stack}>
                                {project.tech.map((tech, i) => (
                                    <span key={i} className={styles.tech_badge}>{tech}</span>
                                ))}
                            </div>
                            
                            <div className={styles.project__cta}>
                                <Link to={project.link} target='_blank' rel="noopener noreferrer">
                                    View GitHub <ExternalLink size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id='experience' className={styles.experience__section}>
                <div className={styles.experience__header}>
                    <span>Journey</span>
                    <h2>My Experience</h2>
                </div>

                <div className={styles.experience__timeline}>
                    {experiences.map((exp, index) => (
                        <div key={index} className={styles.experience__card}>
                            <div className={styles.experience__year}>
                                <Calendar size={16} />
                                <span>{exp.year}</span>
                            </div>
                            <h3>{exp.title}</h3>
                            <span className={styles.experience__company}>{exp.company}</span>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id='contact' className={styles.contact__section}>
                <div className={styles.contact__card}>
                    <span>Contact</span>
                    <h2>Let's Build Something Great</h2>

                    <p>
                        Available for freelance projects, 
                        collaborations, and full-stack 
                        development opportunities.
                    </p>

                    <form>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <textarea rows={4} placeholder="Message" />
                        <button type="submit" className={styles.submit__btn}>Send Message</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LandingPage