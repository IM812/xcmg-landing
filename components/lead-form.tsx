'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function LeadForm() {
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
    
    // Anti-spam honeypot check
    if (formData.honeypot) {
      return
    }

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
    <section id="lead-form" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="container mx-auto max-w-2xl relative z-10 px-4 md:px-6">
        <div className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:border-accent/50 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8 duration-700 hover:scale-[1.02]">
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-balance relative animate-in fade-in slide-in-from-top-4 duration-700 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text">
              Получить предложение по категориям техники
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground relative animate-in fade-in slide-in-from-top-4 duration-700 delay-150">
              Оставьте контакты — отправим КП в течение рабочего дня.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group/field animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
              <Label htmlFor="name" className="transition-all duration-300 group-focus-within/field:text-accent group-focus-within/field:translate-x-1 font-medium">Имя *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ваше имя"
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:border-accent hover:border-accent/50"
              />
            </div>

            <div className="space-y-2 group/field animate-in fade-in slide-in-from-left-4 duration-700 delay-500">
              <Label htmlFor="phone" className="transition-all duration-300 group-focus-within/field:text-accent group-focus-within/field:translate-x-1 font-medium">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:border-accent hover:border-accent/50"
              />
            </div>

            <div className="space-y-2 group/field animate-in fade-in slide-in-from-left-4 duration-700 delay-700">
              <Label htmlFor="contact" className="transition-all duration-300 group-focus-within/field:text-accent group-focus-within/field:translate-x-1 font-medium">Email или WhatsApp *</Label>
              <Input
                id="contact"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="email@example.com или номер WhatsApp"
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:border-accent hover:border-accent/50"
              />
            </div>

            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              style={{ position: 'absolute', left: '-9999px' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="flex items-start gap-2 animate-in fade-in duration-700 delay-1000">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, consent: checked as boolean })
                }
                required
                className="transition-all duration-300 data-[state=checked]:scale-110"
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer transition-colors duration-300 hover:text-accent">
                Согласен на обработку персональных данных и с{' '}
                <a href="#" className="text-accent hover:underline transition-all duration-300 hover:translate-x-1 inline-block">
                  политикой конфиденциальности
                </a>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-accent via-accent to-accent bg-[length:200%_100%] hover:bg-right text-accent-foreground transition-all duration-700 hover:scale-105 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] animate-in fade-in zoom-in duration-700 delay-1000 relative overflow-hidden group"
              disabled={loading}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Отправить заявку
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
