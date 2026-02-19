'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { CategoryModal } from '@/components/category-modal'
import { PriceRequestModal } from '@/components/price-request-modal'
import Image from 'next/image'

const categories = [
  {
    id: 'excavator-loaders',
    name: 'Экскаваторы-погрузчики XCMG',
    image: '/images/e1.jpg',
    specs: ['Подбор комплектации', 'Поставка и лизинг', 'Сервис и запчасти']
  },
  {
    id: 'wheel-excavators',
    name: 'Колесные экскаваторы XCMG',
    image: '/images/e2.jpg',
    specs: ['Подбор комплектации', 'Поставка и лизинг', 'Сервис и запчасти']
  },
  {
    id: 'track-excavators',
    name: 'Гусеничные экскаваторы XCMG',
    image: '/images/e3.jpg',
    specs: ['Подбор комплектации', 'Поставка и лизинг', 'Сервис и запчасти']
  },
  {
    id: 'mini-loaders',
    name: 'Мини-погрузчики XCMG',
    image: '/images/e4.jpg',
    specs: ['Подбор комплектации', 'Поставка и лизинг', 'Сервис и запчасти']
  },
  {
    id: 'wheel-loaders',
    name: 'Фронтальные погрузчики XCMG',
    image: '/images/e5.jpg',
    specs: ['Подбор комплектации', 'Поставка и лизинг', 'Сервис и запчасти']
  },
  {
    id: 'rollers',
    name: 'Катки XCMG',
    image: '/images/e6.jpg',
    specs: ['Подбор комплектации', 'Поставка и лизинг', 'Сервис и запчасти']
  },
  {
    id: 'graders',
    name: 'Грейдеры XCMG',
    image: '/images/e7.jpg',
    specs: ['Подбор комплектации', 'Поставка и лизинг', 'Сервис и запчасти']
  }
]
export function CatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRequestCategory, setPriceRequestCategory] = useState<string | null>(null)

  return (
    <>
      <section id="categories" className="py-16 md:py-24 relative overflow-hidden">
        {/* Background excavator image */}
        <div className="absolute inset-0 bg-[url('/images/background-excavator-v2.jpg')] bg-cover bg-right opacity-30 animate-in fade-in duration-1500" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/70 to-background" />
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
              Категории техники XCMG
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Анализируем потребности и рекомендуем оптимальную комплектацию
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {categories.map((category, idx) => {
              const isLast = idx === categories.length - 1
              return (
              <Card 
                key={category.id} 
                className={`overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:border-accent/50 group animate-in fade-in slide-in-from-bottom-8 duration-700 cursor-pointer ${isLast ? 'col-span-2 lg:col-span-1' : ''}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
                  <Image 
                    src={category.image} 
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>
                
                <CardContent className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-accent min-h-[32px] sm:min-h-[40px] md:min-h-[56px]">{category.name}</h3>
                  
                  <ul className="space-y-1 sm:space-y-2 hidden sm:block">
                    {category.specs.slice(0, 2).map((spec, specIdx) => (
                      <li 
                        key={specIdx} 
                        className="flex items-start gap-1.5 text-xs md:text-sm opacity-70 group-hover:opacity-100 transition-all duration-300"
                        style={{ transitionDelay: `${specIdx * 50}ms` }}
                      >
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-accent shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="transition-transform duration-300 group-hover:translate-x-1 line-clamp-1">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4 md:p-5 pt-0">
                  <Button 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs md:text-sm"
                    onClick={() => setPriceRequestCategory(category.name)}
                  >
                    Узнать цену
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full transition-all duration-300 hover:scale-105 hover:border-accent text-xs md:text-sm [&:hover]:text-foreground"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    Подробнее
                  </Button>
                </CardFooter>
              </Card>
              )
            })}
          </div>
        </div>
      </section>

      <CategoryModal
        open={selectedCategory !== null}
        onOpenChange={(open) => !open && setSelectedCategory(null)}
        categoryId={selectedCategory || ''}
        onRequestPrice={(categoryName) => {
          setSelectedCategory(null)
          setPriceRequestCategory(categoryName)
        }}
      />

      <PriceRequestModal
        open={priceRequestCategory !== null}
        onOpenChange={(open) => !open && setPriceRequestCategory(null)}
        category={priceRequestCategory || ''}
      />
    </>
  )
}
