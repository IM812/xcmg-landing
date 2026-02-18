import { Award, Wrench, Package, CreditCard, Target } from 'lucide-react'

const advantages = [
  {
    icon: Award,
    title: 'Опыт',
    description: 'Многолетний опыт работы с техникой XCMG и глубокие знания продукта'
  },
  {
    icon: Wrench,
    title: 'Сервис',
    description: 'Выездные бригады, квалифицированные специалисты, срочный ремонт'
  },
  {
    icon: Package,
    title: 'Запчасти',
    description: 'Оригинальные запчасти XCMG в наличии и под заказ с гарантией'
  },
  {
    icon: CreditCard,
    title: 'Финансирование',
    description: 'Помощь в оформлении лизинга и выгодные условия приобретения'
  },
  {
    icon: Target,
    title: 'Подбор под задачу',
    description: 'Анализируем потребности и рекомендуем оптимальную комплектацию'
  }
]

export function AdvantagesSection() {
  return (
    <section id="advantages" className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Наши преимущества
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
          {advantages.map((advantage, idx) => {
            const Icon = advantage.icon
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center group p-3 sm:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-lg hover:shadow-accent/20 animate-in fade-in zoom-in duration-700"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 mb-2 sm:mb-3 transition-all duration-500 group-hover:bg-accent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/50">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent transition-colors duration-500 group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1 transition-colors duration-300 group-hover:text-accent">{advantage.title}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground/80 leading-tight">
                  {advantage.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
