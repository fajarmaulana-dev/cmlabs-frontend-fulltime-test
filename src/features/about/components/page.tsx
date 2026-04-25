import { ArrowRight, ChefHat, Code2 } from 'lucide-react'
import Link from 'next/link'

import { FEATURES, FLOWS, TECH_STACK } from '../constants'

export function Page() {
  return (
    <div className="py-8 md:py-16">
      <div className="mb-20 flex flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-4xl bg-orange-50">
          <ChefHat className="text-orange-500" size={48} />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">
          About <span className="text-orange-500">TastiFy</span>
        </h1>
        <p className="mx-auto max-w-2xl px-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
          A recipe discovery platform that starts with your ingredients, not the other way around. Open your fridge,
          pick what you have, and find something amazing to cook.
        </p>
        <Link
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
          href="/"
        >
          Start Exploring
          <ArrowRight size={18} />
        </Link>
      </div>
      <section className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">What TastiFy Offers</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="shadow-blur-y-4 rounded-3xl border border-orange-100 bg-white p-8 shadow-black/5 transition-transform hover:-translate-y-1"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
                <Icon className="text-orange-500" size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
              <p className="leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">How It Works</h2>
        <ol className="relative mx-auto ml-6 max-w-3xl space-y-10 border-l-2 border-orange-100 md:mr-auto md:ml-auto">
          {FLOWS.map(({ step, title, desc }) => (
            <li key={step} className="relative pl-10">
              <span className="absolute -left-5.25 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-lg font-bold text-white shadow-md">
                {step}
              </span>
              <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
              <p className="text-slate-600">{desc}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mb-16">
        <h2 className="mb-10 flex items-center justify-center gap-3 text-center text-3xl font-bold text-slate-900">
          <Code2 className="text-orange-500" size={32} />
          Built With
        </h2>
        <div className="xs:grid xs:grid-cols-2 flex flex-wrap gap-4 sm:grid-cols-3 lg:gap-6">
          {TECH_STACK.map(({ name, description }) => (
            <div key={name} className="grow rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <p className="text-lg font-bold text-slate-900">{name}</p>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="font-medium text-slate-600">
          Recipe data provided by{' '}
          <a
            className="font-bold text-orange-500 hover:text-orange-600"
            href="https://www.themealdb.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            TheMealDB
          </a>
          , a free, open community-contributed recipe database.
        </p>
      </section>
    </div>
  )
}
