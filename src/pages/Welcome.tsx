import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Dumbbell, Gem, HeartPulse, Utensils } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import harvestPhoto from '../assets/hallmark/woman-harvesting-wheat-raisen-district-madhya-pradesh-india--1920.jpg';

const ricePhoto = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=85&w=1800&auto=format&fit=crop';

const preferences = [
  { label: 'Protein', icon: Dumbbell },
  { label: 'Minerals', icon: Gem },
  { label: 'Blood sugar response', icon: Activity },
  { label: 'Taste and texture', icon: Utensils },
  { label: 'Nutritional', icon: HeartPulse },
] as const;

const levels = [
  { level: 'Level 1', polish: '25% polishing', note: 'Nutrition preference leads', tone: 'bg-leaf text-paper' },
  { level: 'Level 2', polish: '50% polishing', note: 'Preferences are balanced', tone: 'bg-harvest text-ink' },
  { level: 'Level 3', polish: '75% polishing', note: 'Soft texture preference leads', tone: 'bg-sky text-ink' },
] as const;

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => navigate(user ? '/priority' : '/auth');

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="bg-ink text-paper">
        <div className="container flex h-20 items-center justify-between">
          <button type="button" onClick={() => navigate('/')} className="font-display text-3xl font-extrabold" aria-label="Nutrifibe home">
            Nutrifibe
          </button>
          <nav className="flex items-center gap-4 sm:gap-7" aria-label="Welcome navigation">
            <button type="button" onClick={() => navigate('/how-it-works')} className="hidden text-sm font-bold text-paper-2 hover:text-paper sm:block">
              How it works
            </button>
            <button type="button" onClick={() => navigate(user ? '/match' : '/auth')} className="rounded-pill bg-harvest px-5 py-2.5 text-sm font-bold text-ink hover:bg-paper">
              {user ? 'My match' : 'Sign in'}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-harvest">
          <div className="container grid min-h-[calc(100dvh-var(--nav-height))] items-center gap-10 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-14">
            <div className="min-w-0 py-5">
              <h1 className="text-display font-extrabold">Protein rice, matched to your table.</h1>
              <p className="lead mt-6 max-w-[48ch]">Five answers balance nutrition preferences with the texture your family likes.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={handleStart} className="editorial-action bg-ink text-paper" id="get-started-button">
                  Find my rice level
                </button>
                <button type="button" onClick={() => navigate('/how-it-works')} className="editorial-action editorial-action--quiet">
                  See how matching works
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2" aria-label="Questionnaire topics">
                {preferences.map(({ label, icon: Icon }) => (
                  <span key={label} className="flex items-center gap-2 rounded-pill border border-ink/20 bg-paper/55 px-3 py-2 text-sm font-bold">
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <figure className="min-w-0">
              <div className="relative min-h-[440px] overflow-hidden rounded-[3rem] border-[10px] border-paper shadow-card lg:min-h-[650px]" data-slot="hero-rice" data-alt="A close photograph of cooked Nutriweave protein rice">
                <img src={ricePhoto} width="1800" height="1200" alt="A bowl filled with cooked rice" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
                <span data-keep className="absolute bottom-5 left-5 z-10 rounded-pill bg-paper px-4 py-2 text-sm font-bold text-ink">Five-question match</span>
              </div>
            </figure>
          </div>
        </section>

        <section className="container py-[var(--section-gap)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-16">
            <div>
              <h2>One quiz. Three rice levels.</h2>
              <p className="lead mt-5">The workbook compares your strongest nutrition preference with taste and texture.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {levels.map((item) => (
                <article key={item.level} className={`${item.tone} min-h-64 rounded-card p-6 shadow-card`}>
                  <span className="font-outlier text-sm tabular-nums">{item.polish}</span>
                  <h3 className="mt-8 text-3xl">{item.level}</h3>
                  <p className="mt-3 text-base">{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-leaf text-paper">
          <div className="container grid items-center gap-10 py-[var(--section-gap-s)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <figure className="min-w-0">
              <div className="relative min-h-[360px] overflow-hidden rounded-card border-8 border-paper/15 lg:min-h-[500px]" data-slot="harvest" data-alt="Nutriweave rice cultivation or harvest in India">
                <img src={harvestPhoto} width="1920" height="1344" alt="A woman carrying harvested grain in Raisen district, Madhya Pradesh" className="absolute inset-0 h-full w-full object-cover object-[25%_55%]" loading="lazy" />
              </div>
              <figcaption className="mt-3 text-sm text-paper-2">Harvest work in Raisen district, Madhya Pradesh.</figcaption>
            </figure>
            <div>
              <h2 className="text-paper">Preference first. Evidence kept separate.</h2>
              <p className="lead mt-6 text-paper-2">Your answers guide the polishing-level comparison. They never stand in for measured product nutrition.</p>
              <button type="button" onClick={() => navigate('/impact')} className="mt-8 rounded-pill bg-paper px-6 py-3 font-bold text-ink hover:bg-harvest">
                Read the evidence status
              </button>
            </div>
          </div>
        </section>

        <section className="bg-sky">
          <div className="container flex flex-col items-start justify-between gap-7 py-[var(--section-gap-s)] lg:flex-row lg:items-center">
            <div>
              <h2>Ready to find your level?</h2>
              <p className="lead mt-4">Five clear answers. One provisional match.</p>
            </div>
            <button type="button" onClick={handleStart} className="editorial-action bg-ink text-paper">
              Start the recommender
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-ink py-12 text-paper">
        <div className="container grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <p className="font-display text-3xl font-extrabold">Nutrifibe</p>
            <p className="mt-2 text-sm text-paper-2">Protein rice by Arnatattva LLP.</p>
          </div>
          <p className="max-w-xl text-sm text-paper-2" data-credits>
            Harvest photograph: <a className="underline" href="https://commons.wikimedia.org/wiki/File:Woman_harvesting_wheat,_Raisen_district,_Madhya_Pradesh,_India_ggia_version.jpg" target="_blank" rel="noreferrer">Yann Forget</a>, CC BY-SA 3.0. Rice image is a replaceable stand-in.
          </p>
        </div>
      </footer>
    </div>
  );
}
