

export function ContactsSection() {
  return (
    <section id="contacts" className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_60%)]" />
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Контакты
            </h2>
          </div>

          <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6 sm:p-8 shadow-lg animate-in fade-in zoom-in duration-700 delay-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-6">
              <a 
                href="mailto:info@xcmg-ce.com"
                className="flex flex-col items-center gap-1 group hover:scale-105 transition-all duration-300"
              >
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium group-hover:text-accent transition-colors">info@xcmg-ce.com</p>
              </a>

              <a 
                href="tel:+74952265585"
                className="flex flex-col items-center gap-1 group hover:scale-105 transition-all duration-300"
              >
                <p className="text-xs text-muted-foreground">Телефон</p>
                <p className="text-sm font-medium group-hover:text-accent transition-colors">8 (495) 226-55-85</p>
              </a>
            </div>

            <div className="text-center pt-6 border-t border-border/50">
              <p className="text-xs sm:text-sm text-muted-foreground">
                © {new Date().getFullYear()} XCMG CE. Все права защищены.
                <span className="hidden sm:inline">
                  {' · '}
                  <a href="#" className="hover:text-accent transition-colors duration-300">
                    Политика конфиденциальности
                  </a>
                  {' · '}
                  <a href="#" className="hover:text-accent transition-colors duration-300">
                    Согласие на обработку данных
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
