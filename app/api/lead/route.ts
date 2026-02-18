import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Получатели писем (замените на реальные адреса)
const RECIPIENTS = [
  'info@xcmg-ce.com',
  'pe@texbaza.com', 
  'mkn@texbaza.com'
]

// Fallback: если SMTP не настроен, используем console.log
const USE_EMAIL = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, honeypot, ...data } = body

    // Anti-spam: проверка honeypot поля
    if (honeypot) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    // Базовая валидация
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      )
    }

    // Если SMTP не настроен, выводим в консоль (для разработки)
    if (!USE_EMAIL) {
      console.log('[v0] Email would be sent:', {
        type,
        recipients: RECIPIENTS,
        data
      })
      return NextResponse.json({ 
        success: true,
        message: 'Заявка получена (тестовый режим - настройте SMTP для реальной отправки)'
      })
    }

    // Создание транспорта для отправки email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Формирование темы и тела письма в зависимости от типа формы
    let subject = ''
    let htmlContent = ''
    const currentDate = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow'
    })

    switch (type) {
      case 'callback':
        subject = 'Новая заявка: Заказ звонка'
        htmlContent = `
          <h2>Заявка на обратный звонок</h2>
          <p><strong>Дата:</strong> ${currentDate}</p>
          <p><strong>Имя:</strong> ${data.name}</p>
          <p><strong>Телефон:</strong> ${data.phone}</p>
        `
        break

      case 'quote':
        subject = 'Новая заявка: Запрос КП'
        htmlContent = `
          <h2>Запрос коммерческого предложения</h2>
          <p><strong>Дата:</strong> ${currentDate}</p>
          <p><strong>Имя:</strong> ${data.name}</p>
          <p><strong>Телефон:</strong> ${data.phone}</p>
          <p><strong>Email/WhatsApp:</strong> ${data.contact}</p>
        `
        break

      case 'price_request':
        subject = `Новая заявка: Запрос стоимости - ${data.category}`
        htmlContent = `
          <h2>Запрос стоимости техники</h2>
          <p><strong>Дата:</strong> ${currentDate}</p>
          <p><strong>Категория:</strong> ${data.category}</p>
          <p><strong>Имя:</strong> ${data.name}</p>
          <p><strong>Телефон:</strong> ${data.phone}</p>
          <p><strong>Email/WhatsApp:</strong> ${data.contact}</p>
        `
        break

      case 'repair':
        subject = `Новая заявка: Ремонт - ${data.category}`
        htmlContent = `
          <h2>Запрос на ремонт спецтехники</h2>
          <p><strong>Дата:</strong> ${currentDate}</p>
          <p><strong>Имя:</strong> ${data.name}</p>
          <p><strong>Телефон:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Категория/модель:</strong> ${data.category}</p>
          <p><strong>Город/регион:</strong> ${data.city}</p>
          <p><strong>Описание неисправности:</strong></p>
          <p>${data.description}</p>
        `
        break

      default:
        return NextResponse.json(
          { error: 'Неизвестный тип заявки' },
          { status: 400 }
        )
    }

    // Отправка писем на все адреса
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENTS.join(', '),
      subject,
      html: htmlContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Ошибка отправки заявки' },
      { status: 500 }
    )
  }
}
