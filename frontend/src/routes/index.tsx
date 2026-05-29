import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from '@/layouts/main-layout'
import LandingPage from '@/pages/landing'
import LearningJourneyPage from '@/pages/features/learning_journey'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={'/'} element={<LandingPage />} />
                    <Route path={'/learning-journey'} element={<LearningJourneyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;