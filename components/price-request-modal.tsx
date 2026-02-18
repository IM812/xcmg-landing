'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PriceRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: string
}

export function PriceRequestModal({ open, onOpenChange, category }: PriceRequestModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contact: '',
    category: '',
    consent: false,
    honeypot: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    setFormData(prev => ({ ...prev, category }))
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.honeypot) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'price_request',
          ...formData
        })
      })

      if (response.ok) {
        toast({
          title: 'Запрос отправлен',
          description: 'Мы вышлем вам стоимость в ближайшее время'
        })
        setFormData({ name: '', phone: '', contact: '', category: '', consent: false, honeypot: '' })
        onOpenChange(false)
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить запрос. Попробуйте позже.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Запросить стоимость</DialogTitle>
          <DialogDescription>
            {category && `Категория: ${category}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price-name">Имя *</Label>
            <Input
              id="price-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ваше имя"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price-phone">Телефон *</Label>
            <Input
              id="price-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price-contact">Email или WhatsApp *</Label>
            <Input
              id="price-contact"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="email@example.com"
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

          <div className="flex items-start gap-2">
            <Checkbox
              id="price-consent"
              checked={formData.consent}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, consent: checked as boolean })
              }
              required
            />
            <Label htmlFor="price-consent" className="text-sm leading-relaxed cursor-pointer">
              Согласен на обработку персональных данных
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Отправить запрос
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
