import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Library from './pages/Library'
import SeafoodDetail from './pages/SeafoodDetail'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import SearchResults from './pages/SearchResults'
import Camera from './pages/Camera'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/seafood/:id" element={<SeafoodDetail />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
