

import { Mail, Phone } from 'lucide-react'

export function ContactsSection() {
  return (
    <section id="contacts" className="pt-12 pb-0 md:pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/20 to-background" />
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto">

          {/* Contacts card */}
          <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6 sm:p-8 shadow-lg animate-in fade-in zoom-in duration-700 delay-300">
            <h2 className="text-base sm:text-lg font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Контакты
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Email */}
              <a
                href="mailto:info@xcmg-ce.com"
                className="flex items-center gap-4 group p-4 rounded-xl border border-border/40 bg-background/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm font-medium truncate group-hover:text-accent transition-colors duration-300">info@xcmg-ce.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+74952265585"
                className="flex items-center gap-4 group p-4 rounded-xl border border-border/40 bg-background/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">Телефон</p>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors duration-300">8 (495) 226-55-85</p>
                </div>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-border/30 mt-6">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} XCMG CE. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors duration-300">
                Политика конфиденциальности
              </a>
              <span className="text-border/60 text-xs">·</span>
              <a href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors duration-300">
                Согласие на обработку данных
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
