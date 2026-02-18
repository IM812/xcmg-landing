'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Check, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function HeroSection() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contact: '',
    consent: false,
    honeypot: ''
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.honeypot) return

    setLoading(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          ...formData
        })
      })

      if (response.ok) {
        toast({
          title: 'Заявка отправлена',
          description: 'Мы свяжемся с вами в течение рабочего дня'
        })
        setFormData({ name: '', phone: '', contact: '', consent: false, honeypot: '' })
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Background excavator image */}
      <div className="absolute inset-0 bg-[url('/images/background-excavator-v2.jpg')] bg-cover bg-center opacity-40 animate-in fade-in duration-1000" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/60 to-background/70" />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Спецтехника XCMG — поставка, подбор и сервис
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-balance mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Поможем подобрать технику под задачу, организуем поставку и обслуживание.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-2.5 sm:gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-accent/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-accent shrink-0" />
                <span className="text-sm sm:text-base font-semibold">В наличии и под заказ</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-accent/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-accent shrink-0" />
                <span className="text-sm sm:text-base font-semibold">Сервис и ремонт</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-accent/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-accent shrink-0" />
                <span className="text-sm sm:text-base font-semibold">Помощь с лизингом</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="animate-in fade-in duration-700 delay-300 order-2">
            <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 max-w-md mx-auto lg:max-w-none">
              <div className="relative mb-4 sm:mb-5">
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-1.5">
                  Получить предложение
                </h2>
                <p className="text-[11px] sm:text-xs text-muted-foreground/80">
                  Оставьте контакты — отправим КП в течение дня
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="hero-name" className="text-xs font-medium text-muted-foreground">Имя *</Label>
                  <Input
                    id="hero-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="h-9 text-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)] focus:border-accent/70"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="hero-phone" className="text-xs font-medium text-muted-foreground">Телефон *</Label>
                  <Input
                    id="hero-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="h-9 text-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)] focus:border-accent/70"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="hero-contact" className="text-xs font-medium text-muted-foreground">Email или WhatsApp *</Label>
                  <Input
                    id="hero-contact"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="email@example.com"
                    className="h-9 text-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)] focus:border-accent/70"
                  />
                </div>

                <input
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="flex items-start gap-2 pt-1">
                  <Checkbox
                    id="hero-consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, consent: checked as boolean })
                    }
                    required
                    className="mt-0.5"
                  />
                  <Label htmlFor="hero-consent" className="text-[10px] leading-tight cursor-pointer text-muted-foreground">
                    Согласен на обработку персональных данных
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  size="sm"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-sm"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                  Отправить заявку
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
