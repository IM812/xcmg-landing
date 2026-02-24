'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CallbackModal } from '@/components/callback-modal'

import Image from 'next/image'

export function Header() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-8">
            <a href="/" className="relative h-8 w-24 sm:h-10 sm:w-32 md:h-12 md:w-40 transition-transform hover:scale-105 cursor-pointer">
              <Image 
                src="/images/logo.png" 
                alt="XCMG CE" 
                fill
                className="object-contain"
                priority
              />
            </a>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('categories')}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Категории
              </button>
              <button
                onClick={() => scrollToSection('advantages')}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Преимущества
              </button>
              <button
                onClick={() => scrollToSection('repair')}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Сервис
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Контакты
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex flex-col items-end gap-0.5">
              <a href="tel:+74952265585" className="text-xs sm:text-sm font-medium hover:text-accent transition-colors duration-300">
                8 (495) 226-55-85
              </a>
              <a href="mailto:info@xcmg-ce.com" className="text-xs text-muted-foreground hover:text-accent transition-colors duration-300">
                info@xcmg-ce.com
              </a>
            </div>
            <Button 
              onClick={() => setIsCallbackOpen(true)} 
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs sm:text-sm px-3 sm:px-4 hidden sm:flex"
            >
              Заказать звонок
            </Button>
          </div>
        </div>
      </header>

      <CallbackModal open={isCallbackOpen} onOpenChange={setIsCallbackOpen} />
    </>
  )
}
