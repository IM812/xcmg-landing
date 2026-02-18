'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoryId: string
  onRequestPrice: (categoryName: string) => void
}

const categoryDetails: Record<string, { name: string; description: string }> = {
  'excavator-loaders': {
    name: 'Экскаваторы-погрузчики XCMG',
    description: 'Универсальная техника для земляных работ, погрузки и разгрузки материалов. Высокая производительность, надежность и экономичность. Идеально подходит для строительства, коммунальных служб и сельского хозяйства.'
  },
  'wheel-excavators': {
    name: 'Колесные экскаваторы XCMG',
    description: 'Мобильная техника для городского строительства и дорожных работ. Быстрое перемещение между объектами без транспортировки на трале. Высокая маневренность и производительность.'
  },
  'track-excavators': {
    name: 'Гусеничные экскаваторы XCMG',
    description: 'Мощная техника для сложных грунтов и больших объемов работ. Различные весовые категории от 1 до 90 тонн. Высокая устойчивость и проходимость на любых грунтах.'
  },
  'mini-loaders': {
    name: 'Мини-погрузчики XCMG',
    description: 'Компактная маневренная техника для работы в стесненных условиях. Широкий выбор навесного оборудования. Идеально для складов, строительных площадок и благоустройства.'
  },
  'wheel-loaders': {
    name: 'Фронтальные погрузчики XCMG',
    description: 'Производительная техника для перемещения больших объемов материалов. Грузоподъемность от 1 до 12 тонн. Экономичные двигатели и высокая надежность конструкции.'
  },
  'rollers': {
    name: 'Катки XCMG',
    description: 'Дорожно-строительная техника для уплотнения грунта и асфальта. Вибрационные и статические модели различного веса. Эффективное уплотнение и высокое качество дорожного полотна.'
  },
  'graders': {
    name: 'Грейдеры XCMG',
    description: 'Специализированная техника для планировки и профилирования дорог. Мощные двигатели и точная система управления отвалом. Высокая производительность при строительстве и ремонте дорог.'
  }
}

export function CategoryModal({ open, onOpenChange, categoryId, onRequestPrice }: CategoryModalProps) {
  const category = categoryDetails[categoryId]

  if (!category) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{category.name}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">
            {category.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <Button 
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => {
              onRequestPrice(category.name)
            }}
          >
            Запросить стоимость
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
