'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CallbackModal } from '@/components/callback-modal'
import { Phone, Mail } from 'lucide-react'
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
            <a 
              href="mailto:info@xcmg-ce.com" 
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-accent/10 transition-all duration-300"
            >
              <Mail className="h-5 w-5 text-accent" />
            </a>
            <a 
              href="tel:+74952265585" 
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-accent/10 transition-all duration-300"
            >
              <Phone className="h-5 w-5 text-accent" />
            </a>
            <a href="mailto:info@xcmg-ce.com" className="hidden lg:flex items-center gap-2 text-xs font-medium hover:text-accent transition-colors duration-300">
              <span>info@xcmg-ce.com</span>
            </a>
            <a href="tel:+74952265585" className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors duration-300">
              <Phone className="h-4 w-4" />
              <span>8 (495) 226-55-85</span>
            </a>
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
