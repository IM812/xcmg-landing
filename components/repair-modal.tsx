'use client'

import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface RepairModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RepairModal({ open, onOpenChange }: RepairModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    description: '',
    city: '',
    consent: false,
    honeypot: ''
  })
  const { toast } = useToast()

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
          type: 'repair',
          ...formData
        })
      })

      if (response.ok) {
        toast({
          title: 'Запрос отправлен',
          description: 'Мы свяжемся с вами для уточнения деталей ремонта'
        })
        setFormData({ 
          name: '', 
          phone: '', 
          email: '', 
          category: '', 
          description: '', 
          city: '', 
          consent: false, 
          honeypot: '' 
        })
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Запрос на ремонт спецтехники XCMG</DialogTitle>
          <DialogDescription>
            Опишите проблему и мы свяжемся с вами для организации ремонта
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repair-name">Имя *</Label>
            <Input
              id="repair-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ваше имя"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repair-phone">Телефон *</Label>
            <Input
              id="repair-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repair-email">Email *</Label>
            <Input
              id="repair-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repair-category">Категория/модель техники *</Label>
            <Input
              id="repair-category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Например: Экскаватор XCMG XE215C"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repair-description">Описание неисправности *</Label>
            <Textarea
              id="repair-description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Опишите проблему с техникой..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repair-city">Город/регион *</Label>
            <Input
              id="repair-city"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Москва"
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
              id="repair-consent"
              checked={formData.consent}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, consent: checked as boolean })
              }
              required
            />
            <Label htmlFor="repair-consent" className="text-sm leading-relaxed cursor-pointer">
              Согласен на обработку персональных данных
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Отправить запрос на ремонт
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
