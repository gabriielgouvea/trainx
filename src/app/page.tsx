"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, X, Zap, Clock, TrendingUp, Brain, Shield, ArrowRight, BadgeCheck } from "lucide-react"

export default function Home() {
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false)
  const avatars = [
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=32",
    "https://i.pravatar.cc/80?img=45",
    "https://i.pravatar.cc/80?img=68",
  ]
  const faqItems = [
    {
      question: "O que recebo após a compra?",
      answer:
        "Você recebe acesso imediato à plataforma, materiais principais e o calendário de acompanhamento. Detalhes completos chegam por e-mail.",
    },
    {
      question: "Quais formas de pagamento estão disponíveis?",
      answer:
        "Cartão de crédito, Pix e boleto. Em caso de parcelamento, as opções aparecem no checkout.",
    },
    {
      question: "As aulas e encontros ficam gravados?",
      answer:
        "Sim. Caso não possa assistir ao vivo, as gravações ficam disponíveis na área do aluno.",
    },
    {
      question: "Por quanto tempo tenho acesso?",
      answer:
        "O acesso é válido por todo o período da mentoria e inclui atualizações dos materiais liberados.",
    },
    {
      question: "Existe suporte ou comunidade exclusiva?",
      answer:
        "Sim. Você entra em um grupo fechado de alunos e conta com suporte direto da equipe.",
    },
  ]

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-animate]"))

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-tx-black text-white selection:bg-tx-red selection:text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-tx-black/90 backdrop-blur-md border-b border-neutral-800 transition-all duration-300">
        <div className="mx-auto w-full px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
               <Image 
                 src="/logo.png" 
                 alt="Rotina de Performance Logo" 
                 width={180} 
                 height={60} 
                 className="h-12 w-auto object-contain"
                 priority
               />
          </div>
          <Link href="/anamnese">
            <Button variant="outline" className="text-white border-tx-red bg-transparent hover:bg-tx-red hover:text-white font-bold transition-all px-6">
              Aplicar Agora
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Background Elements - Lightning/Glow Gradient Effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tx-red/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-tx-red/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="relative flex flex-col items-start text-left space-y-8">
            <div className="absolute -top-16 right-0 left-0 h-[460px] md:h-[560px] lg:hidden pointer-events-none opacity-40 rotate-[-12deg] translate-x-6 z-0">
              <Image
                src="/logo.png"
                alt="Rotina de Performance Logo"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-tx-black/10 via-tx-black/75 to-tx-black"></div>
            </div>
            <div data-animate className="relative z-10 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase bg-gradient-to-r from-tx-red to-red-900 rounded-full shadow-[0_0_15px_rgba(185,28,28,0.5)] border border-red-500/30 reveal-up">
              <Zap className="w-3 h-3 fill-white" /> Mentoria Premium
            </div>
            
            <h1 data-animate className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] reveal-up">
              CONQUISTE A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">ORGANIZAÇÃO</span> <br />
              QUE SUSTENTA O <br />
              <span className="text-tx-red drop-shadow-[0_0_25px_rgba(185,28,28,0.6)]">RESULTADO.</span>
            </h1>
            
            <p data-animate className="relative z-10 text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed border-l-2 border-tx-red/50 pl-6 reveal-up">
              Um sistema de organização pessoal desenhado para quem não pode perder tempo. Estruture sua vida a partir da realidade, não de um plano idealizado.
            </p>
            
            <div data-animate className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto reveal-up">
              <Link href="/anamnese" className="w-full sm:w-auto">
                <Button data-animate size="lg" className="w-full sm:w-auto bg-tx-red text-white hover:bg-red-700 font-bold px-8 py-7 text-lg shadow-[0_0_30px_rgba(185,28,28,0.4)] hover:shadow-[0_0_40px_rgba(185,28,28,0.6)] transition-all duration-300 border border-red-500/20 reveal-up btn-pop">
                  Iniciar Acompanhamento <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div data-animate className="relative z-10 pt-8 flex items-center gap-4 text-sm text-neutral-500 reveal-up">
               <div className="flex -space-x-3">
                  {avatars.map((src, index) => (
                    <div key={src} className="w-10 h-10 rounded-full border-2 border-tx-black overflow-hidden bg-neutral-800">
                      <Image
                        src={src}
                        alt={`Avatar ${index + 1}`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
               </div>
               <p>Mais de <span className="text-white font-bold">500+</span> vidas transformadas.</p>
            </div>
          </div>

           {/* Hero Visual Area */}
          <div className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center hidden lg:flex">
             <div className="relative w-full h-full max-w-[760px] mx-auto flex items-center justify-center">
                <div className="absolute -inset-10 bg-tx-red/25 blur-[150px] rounded-full"></div>
                <div className="absolute top-8 right-6 w-[240px] h-[560px] bg-gradient-to-b from-transparent via-tx-red/20 to-transparent rotate-12 blur-2xl"></div>

                <div className="relative w-full max-w-[520px] aspect-square">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-tx-red/25 to-transparent blur-2xl"></div>
                  <div className="absolute inset-6 rounded-full border border-red-500/30 shadow-[0_0_60px_rgba(185,28,28,0.5)]"></div>
                  <div className="absolute inset-0 rounded-full border border-white/10"></div>
                  <Image 
                    src="/logo.png" 
                    alt="Rotina de Performance Logo" 
                    fill
                    className="object-contain drop-shadow-[0_0_55px_rgba(185,28,28,0.7)]"
                    priority
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-tx-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-tx-black border-y border-tx-red/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-center gap-4">
          <Link data-animate href="#pilares" className="flex items-center gap-3 text-white text-sm font-semibold tracking-widest uppercase reveal-up">
            Continue navegando
            <span className="w-7 h-7 rounded-full bg-tx-red text-white flex items-center justify-center">↓</span>
          </Link>
        </div>
      </div>

      {/* Pillars Section with Darker/Pro feel */}
      <section id="pilares" className="py-24 bg-tx-dark relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tx-red/50 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
              POR ESTES MOTIVOS VOCÊ <br/>
              <span className="text-tx-red">DEVE INGRESSAR.</span>
            </h2>
            <p className="text-neutral-400">Não é autoajuda. É método validado em campo de batalha.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PillarCard 
              index={0}
              icon={<Zap className="w-8 h-8 text-tx-red" />}
              title="Organização Radical" 
              description="Elimine o caos mental. Saiba exatamente o que fazer, quando fazer e como fazer."
            />
            <PillarCard 
              index={1}
              icon={<Clock className="w-8 h-8 text-tx-red" />}
              title="Gestão de Tempo Real" 
              description="Aprenda a dobrar sua produtividade sem precisar trabalhar mais horas por dia."
            />
            <PillarCard 
              index={2}
              icon={<TrendingUp className="w-8 h-8 text-tx-red" />}
              title="Energia & Performance" 
              description="Protocolos para manter sua energia alta do momento que acorda até a hora de dormir."
            />
            <PillarCard 
              index={3}
              icon={<Brain className="w-8 h-8 text-tx-red" />}
              title="Clareza Mental" 
              description="Tome decisões melhores eliminando o ruído e focando no que realmente move o ponteiro."
            />
             <PillarCard 
              index={4}
              icon={<Shield className="w-8 h-8 text-tx-red" />}
              title="Blindagem de Rotina" 
              description="Como proteger sua agenda de interrupções e urgências que sabotam seu dia."
            />
             <PillarCard 
              index={5}
              icon={<Shield className="w-8 h-8 text-tx-red" />}
              title="Acompanhamento VIP" 
              description="Você não estará sozinho. Suporte próximo para garantir que você não desista."
            />
          </div>
        </div>
      </section>

      {/* Target Audience Section - Industrial Look */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* For Whom */}
          <div data-animate className="relative group reveal-left">
            <div className="absolute -inset-1 bg-gradient-to-r from-tx-red to-red-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-8 rounded-2xl border border-neutral-800 bg-tx-black h-full">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-white">PARA QUEM É A <span className="text-tx-red">MENTORIA</span></span>
              </h3>
              <ul className="space-y-4">
                <ListItem icon={<div className="bg-green-500/10 p-1 rounded"><Check className="text-green-500 w-4 h-4" /></div>}>Empresários e Gestores que precisam de tempo.</ListItem>
                <ListItem icon={<div className="bg-green-500/10 p-1 rounded"><Check className="text-green-500 w-4 h-4" /></div>}>Líderes que sentem o peso da responsabilidade.</ListItem>
                <ListItem icon={<div className="bg-green-500/10 p-1 rounded"><Check className="text-green-500 w-4 h-4" /></div>}>Profissionais ambiciosos com rotina caótica.</ListItem>
                <div className="pt-6 border-t border-neutral-800 mt-6">
                  <p className="font-semibold mb-4 text-neutral-300 text-sm uppercase tracking-wider">Resultados Esperados:</p>
                  <div className="grid grid-cols-2 gap-3">
                      <div className="bg-neutral-900/50 p-3 rounded border border-neutral-800 text-sm text-neutral-300 flex items-center gap-2"><Zap className="w-3 h-3 text-tx-red"/> Energia Alta</div>
                      <div className="bg-neutral-900/50 p-3 rounded border border-neutral-800 text-sm text-neutral-300 flex items-center gap-2"><Brain className="w-3 h-3 text-tx-red"/> Foco Total</div>
                      <div className="bg-neutral-900/50 p-3 rounded border border-neutral-800 text-sm text-neutral-300 flex items-center gap-2"><Clock className="w-3 h-3 text-tx-red"/> Tempo Livre</div>
                      <div className="bg-neutral-900/50 p-3 rounded border border-neutral-800 text-sm text-neutral-300 flex items-center gap-2"><TrendingUp className="w-3 h-3 text-tx-red"/> Lucro</div>
                  </div>
                </div>
              </ul>
            </div>
          </div>

          {/* Not For Whom */}
          <div data-animate className="relative group reveal-left" style={{ animationDelay: "120ms" }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-tx-red to-red-900 rounded-2xl blur opacity-20 group-hover:opacity-45 transition duration-1000"></div>
            <div className="relative p-8 rounded-2xl border border-neutral-800 bg-tx-black h-full">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              PARA QUEM <span className="text-tx-red line-through decoration-2">NÃO É</span>
            </h3>
            <ul className="space-y-6 text-neutral-300">
               <li className="flex gap-4">
                  <X className="w-6 h-6 text-tx-red shrink-0" />
                  <div>
                    <strong className="block text-white">Quem busca atalhos mágicos</strong>
                    <span className="text-sm">Não há pílula mágica. Há processo e trabalho.</span>
                  </div>
               </li>
               <li className="flex gap-4">
                  <X className="w-6 h-6 text-tx-red shrink-0" />
                   <div>
                    <strong className="block text-white">Vitimização</strong>
                    <span className="text-sm">Se a culpa é sempre do mundo, eu não posso te ajudar.</span>
                  </div>
               </li>
               <li className="flex gap-4">
                  <X className="w-6 h-6 text-tx-red shrink-0" />
                   <div>
                    <strong className="block text-white">Curiosos</strong>
                    <span className="text-sm">A mentoria é para quem está decidido a mudar o jogo.</span>
                  </div>
               </li>
            </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-tx-black border-y border-neutral-900/50">
        <div className="container mx-auto px-6 py-6 flex items-center justify-center">
          <Link
            data-animate
            href="#vinicius"
            className="group flex items-center gap-4 text-white text-sm font-semibold tracking-widest uppercase reveal-up"
          >
            Continue navegando
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-tx-red text-white">
              <span className="absolute inset-0 rounded-full ring-2 ring-tx-red/40 pulse-ring"></span>
              <span className="float-bounce">↓</span>
            </span>
          </Link>
        </div>
      </div>

      <section id="vinicius" className="py-24 bg-tx-black relative overflow-hidden border-t border-neutral-900/50">
         {/* Background Glows (Lightning effect replacement) */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tx-red/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen opacity-60"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tx-red/5 blur-[80px] rounded-full pointer-events-none opacity-40"></div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
               {/* Image Column (moved hero photo here) */}
               <div className="relative w-full max-w-[520px] lg:w-[45%] aspect-[3/4] flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-tx-black via-transparent to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-tx-red/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[65%] bg-red-600/30 blur-[70px] rounded-full mix-blend-screen pointer-events-none"></div>
                  <div className="absolute top-8 right-6 w-[180px] h-[420px] bg-gradient-to-b from-transparent via-tx-red/10 to-transparent rotate-12 blur-2xl mix-blend-plus-lighter pointer-events-none"></div>

                  <div className="relative h-full w-full">
                    <Image 
                      src="/hero-image.png" 
                      alt="Vinicius Batista" 
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      quality={100}
                      className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(185,28,28,0.5)]"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-tx-black to-transparent pointer-events-none"></div>
                  </div>

                  <a 
                    href="https://www.instagram.com/viniciusbatista.performance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-white hover:bg-black/80 transition-all hover:scale-105 w-max"
                  >
                    <span className="text-sm font-medium tracking-wide">@viniciusbatista.performance</span>
                    <BadgeCheck className="w-5 h-5 text-[#3897f0] fill-white/10" /> 
                  </a>
               </div>

               {/* Text Column */}
               <div className="flex-1 space-y-8 text-left">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none text-white">
                       Quem é o <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-tx-red to-red-500 drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]">Vinicius Batista?</span>
                    </h2>
                  </div>

                  <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-light">
                     <p>
                        <strong className="text-white font-bold">VINICIUS BATISTA</strong> é estrategista de produtividade, especialista em alta performance e mentor de rotinas de elite.
                     </p>
                     <p>
                        Ele não entrega apenas cronogramas; ele entrega a chave para o máximo potencial humano. Com o propósito inabalável de transformar indivíduos comuns em máquinas de execução, o <strong className="text-white font-bold">ROTINA DE PERFORMANCE</strong> guia pessoas que buscam o equilíbrio perfeito entre o sucesso profissional, a vitalidade física e a clareza mental necessária para dominar o seu mercado.
                     </p>
                     <p>
                        Através de uma metodologia validada, ele já impactou diretamente a vida de <strong className="text-white">mais de 300 mentorados</strong>, que deixaram o ciclo da procrastinação para viverem uma rotina de resultados exponenciais e clareza de propósito.
                     </p>
                     <p>
                        Todo o seu arsenal de técnicas neurocientíficas, biohacking e gestão estratégica de tempo foi condensado para garantir que você, ao entrar para o ROTINA DE PERFOMANCE alcance a sua melhor versão com o menor gasto de energia desnecessária possível.
                     </p>
                     <div className="pt-4">
                        <p className="border-l-4 border-tx-red pl-6 text-xl text-white italic font-medium">
                            "Prepare-se para performar onde outros apenas sobrevivem."
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

       {/* Differential Section */}
       <section className="py-24 bg-gradient-to-b from-tx-red to-red-900 text-white text-center relative overflow-hidden">
        {/* Texture/Pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-12">DIFERENCIAL COMPETITIVO</h2>
          <div className="grid md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
            <div data-animate className="p-8 bg-black/20 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-black/30 transition-all reveal-up">
              <div className="font-bold text-2xl mb-4 text-white">Sistema, não Planilha</div>
              <p className="opacity-90 leading-relaxed">A maioria entrega um papel com tarefas. Eu entrego um sistema operacional para sua vida rodar no automático.</p>
            </div>
            <div data-animate className="p-8 bg-black/20 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-black/30 transition-all reveal-up" style={{ animationDelay: "120ms" }}>
              <div className="font-bold text-2xl mb-4 text-white">Energia como Ativo</div>
              <p className="opacity-90 leading-relaxed">Não adianta ter tempo se você não tem energia. Seu corpo é a máquina que alavanca seu negócio.</p>
            </div>
             <div data-animate className="p-8 bg-black/20 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-black/30 transition-all reveal-up" style={{ animationDelay: "240ms" }}>
              <div className="font-bold text-2xl mb-4 text-white">Mentalidade de Guerra</div>
              <p className="opacity-90 leading-relaxed">Técnicas de controle emocional e foco usadas por atletas de elite adaptadas para o mundo business.</p>
            </div>
          </div>
          
          <div data-animate className="mt-16 reveal-up">
            <Link href="/anamnese">
              <Button data-animate size="lg" className="bg-white text-tx-red hover:bg-neutral-100 font-extrabold px-10 py-8 text-xl shadow-xl hover:scale-105 transition-transform duration-300 reveal-up btn-pop">
                QUERO ME TORNAR ELITE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-tx-black border-t border-neutral-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Perguntas Frequentes</h2>
            <span className="text-tx-red font-bold tracking-widest">F.A.Q</span>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                data-animate
                className="group rounded-2xl border border-neutral-800 bg-[#0f1b16]/60 p-6 text-left reveal-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-neutral-200">
                  <span>{item.question}</span>
                  <span className="text-tx-red transition-transform duration-300 group-open:rotate-180">⌄</span>
                </summary>
                <div className="mt-4 text-neutral-400 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        <div
          className={`mb-3 w-[280px] max-w-[80vw] rounded-2xl bg-[#0f1b16] border border-[#1f3b2d] shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-300 ${
            isWhatsappOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a5f3a] text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1fa855]">
                <svg viewBox="0 0 32 32" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M19.1 17.6c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.6.1-.2.2-.7.7-.9.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.4-1.2-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.8.3 1.5.2 2.1.1.6-.1 1.2-.5 1.4-1 .2-.5.2-1 .2-1.1 0-.2-.2-.3-.4-.4zM16 4c-6.6 0-12 5.2-12 11.6 0 2 .6 4 1.6 5.7L4 28l6.8-1.8c1.6.9 3.4 1.4 5.2 1.4 6.6 0 12-5.2 12-11.6S22.6 4 16 4zm0 21.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-4 1 1.1-3.8-.2-.3c-.9-1.4-1.4-3-1.4-4.7C6.8 10.1 11 6 16 6s9.2 4.1 9.2 9.1S21 25.1 16 25.1z"
                  />
                </svg>
              </span>
              WhatsApp
            </div>
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setIsWhatsappOpen(false)}
              className="h-7 w-7 rounded-full bg-[#0f3d25] text-white hover:bg-[#0b2a1a]"
            >
              ×
            </button>
          </div>
          <div className="p-4 text-sm text-neutral-200">
            <div className="mb-4 inline-block rounded-2xl bg-[#2a3430] px-4 py-3">
              Ola<br />
              Podemos ajudar-lo?
            </div>
            <a
              href="https://wa.me/5511947821557"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#1fa855] px-4 py-2.5 text-white font-semibold hover:bg-[#1c9a4e] transition"
            >
              Abrir bate-papo
              <span className="text-lg">➜</span>
            </a>
          </div>
        </div>

        <button
          type="button"
          aria-label="Abrir WhatsApp"
          onClick={() => setIsWhatsappOpen((prev) => !prev)}
          className="h-14 w-14 rounded-full bg-[#1fa855] text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)] hover:bg-[#1c9a4e] transition flex items-center justify-center"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
            <path
              fill="currentColor"
              d="M19.1 17.6c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.6.1-.2.2-.7.7-.9.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.4-1.2-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.8.3 1.5.2 2.1.1.6-.1 1.2-.5 1.4-1 .2-.5.2-1 .2-1.1 0-.2-.2-.3-.4-.4zM16 4c-6.6 0-12 5.2-12 11.6 0 2 .6 4 1.6 5.7L4 28l6.8-1.8c1.6.9 3.4 1.4 5.2 1.4 6.6 0 12-5.2 12-11.6S22.6 4 16 4zm0 21.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-4 1 1.1-3.8-.2-.3c-.9-1.4-1.4-3-1.4-4.7C6.8 10.1 11 6 16 6s9.2 4.1 9.2 9.1S21 25.1 16 25.1z"
            />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-tx-black text-neutral-600 border-t border-neutral-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
             <div className="h-6 w-1 bg-neutral-800 rounded-full"></div>
             <span className="text-neutral-500">ROTINA DE <span className="text-neutral-300">PERFORMANCE</span></span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

function PillarCard({ title, description, icon, index = 0 }: { title: string, description: string, icon: React.ReactNode, index?: number }) {
  return (
    <div
      data-animate
      className="group p-6 bg-tx-black border border-neutral-800 rounded-xl hover:border-tx-red/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(185,28,28,0.1)] relative overflow-hidden reveal-left"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
         {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-24 h-24 text-tx-red" })}
      </div>
      <div className="relative z-10">
        <div className="mb-6 p-3 bg-tx-dark w-fit rounded-lg border border-neutral-800 group-hover:border-tx-red/30 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-tx-red transition-colors">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function ListItem({ children, icon }: { children: React.ReactNode, icon: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <div className="mt-1 shrink-0">{icon}</div>
      <span className="text-neutral-200">{children}</span>
    </li>
  )
}
