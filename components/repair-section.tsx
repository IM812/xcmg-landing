'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RepairModal } from '@/components/repair-modal'
import { Wrench } from 'lucide-react'

export function RepairSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section id="repair" className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Ремонт спецтехники XCMG
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center group p-4 sm:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-lg hover:shadow-accent/20 animate-in fade-in zoom-in duration-700">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent/10 mb-3 sm:mb-4 transition-all duration-500 group-hover:bg-accent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/50">
                <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-accent transition-colors duration-500 group-hover:text-accent-foreground" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-accent">
                Профессиональный ремонт и обслуживание
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed mb-4 sm:mb-6 max-w-2xl">
                Выездные бригады, оригинальные запчасти, быстрое восстановление работоспособности
              </p>
              <Button 
                size="sm"
                onClick={() => setIsOpen(true)}
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm px-4 sm:px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Заявка на ремонт
              </Button>
            </div>
          </div>
        </div>
      </section>

      <RepairModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
