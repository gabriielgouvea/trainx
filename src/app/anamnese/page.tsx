'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CustomSelect, CustomCombobox } from "@/components/ui/custom-select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { submitApplicationJson } from "../actions"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { formSchema, type FormSchema } from '@/lib/schemas'

const BRAZIL_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function AnamnesePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cities, setCities] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routineType: "",
      workType: "",
      energyDrain: "",
      familyFeeling: "",
      trainingFeeling: "",
      state: "",
      city: "",
      civilStatus: ""
    },
  })

  // Watch for state changes to fetch cities
  const selectedState = form.watch("state")

  useEffect(() => {
    if (selectedState && selectedState.length === 2) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
        .then(res => res.json())
        .then(data => {
          const cityNames = data.map((city: any) => city.nome).sort()
           setCities(cityNames)
        })
        .catch(err => console.error("Error fetching cities:", err))
    } else {
      setCities([])
    }
  }, [selectedState])

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2 ') // (11) 9...
        .replace(/(\d)(\d{4})$/, '$1-$2') // ...1234-5678
    }
    return value.slice(0, 15)
  }

  async function onSubmit(values: FormSchema) {
    setIsSubmitting(true)
    const result = await submitApplicationJson(values)
    setIsSubmitting(false)
    
    if (result.success) {
      alert("Diagnóstico enviado com sucesso! Nosso time entrará em contato.")
      router.push('/')
    } else {
      alert("Erro ao enviar: " + (result.error || "Tente novamente."))
    }
  }

  return (
    <div className="min-h-screen bg-tx-black text-white py-12 px-4 selection:bg-tx-red selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-neutral-400 hover:text-white pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold flex-1 text-center pr-12">Diagnóstico de Performance</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <Card className="bg-tx-dark border-neutral-800">
              <CardHeader>
                <CardTitle className="text-tx-red">Dados do Mentorado</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Nome Completo</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Email</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">WhatsApp</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="(11) 9 9999-9999" 
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value)
                          field.onChange(formatted)
                        }}
                        maxLength={15}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="profession" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Profissão / Cargo</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="civilStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Estado Civil</FormLabel>
                    <FormControl>
                       <CustomSelect 
                         options={["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável"]}
                         value={field.value}
                         onChange={field.onChange}
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="children" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Filhos (Quantos/Idades)</FormLabel>
                    <FormControl><Input placeholder="Ex: 2 filhos, 5 e 8 anos" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <div className="grid gap-4">
                  <div>
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-200">Estado</FormLabel>
                        <FormControl>
                          <CustomSelect 
                            options={BRAZIL_STATES}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="UF"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div>
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-200">Cidade</FormLabel>
                        <FormControl>
                          <CustomCombobox
                            options={cities}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={selectedState ? "Digite ou selecione..." : "Selecione o estado primeiro"} 
                            disabled={!selectedState}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

              </CardContent>
            </Card>

            <Card className="bg-tx-dark border-neutral-800">
              <CardHeader>
                <CardTitle className="text-tx-red">Rotina & Energia</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                
                <div>
                  <FormField control={form.control} name="routineType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-200 text-base">Conte um pouco da sua rotina, conte detalhes...</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ex: Acordo as 6h, levo as crianças na escola, trabalho até as 18h..." 
                          className="min-h-[120px] resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="workHours" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Horas de trabalho/dia</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="wakeUpTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Que hrs acorda?</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sleepTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Que hrs dorme?</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div>
                  <FormField control={form.control} name="energyDrain" render={({ field }) => (
                    <FormItem>
                       <FormLabel className="text-neutral-200">Onde sente mais desgaste hoje?</FormLabel>
                       <div className="flex gap-4 mt-2">
                         {['Mental', 'Físico', 'Emocional'].map((opt) => (
                           <label key={opt} className="flex items-center space-x-2 text-neutral-300">
                             <input type="radio" value={opt} checked={field.value === opt} onChange={field.onChange} className="accent-tx-red" />
                             <span>{opt}</span>
                           </label>
                         ))}
                       </div>
                       <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-tx-dark border-neutral-800">
              <CardHeader>
                <CardTitle className="text-tx-red">Objetivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="mainGoal" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">O que você mais quer melhorar hoje?</FormLabel>
                    <FormControl>
                       <CustomSelect 
                         options={["Energia", "Foco", "Corpo", "Constância", "Organização Geral"]}
                         value={field.value}
                         onChange={field.onChange}
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="whyNow" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Por que isso é importante agora?</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="mainObstacle" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">O que mais te impede de manter a constância hoje?</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

             <Card className="bg-tx-dark border-neutral-800">
              <CardHeader>
                <CardTitle className="text-tx-red">Estilo de Vida</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                 <FormField control={form.control} name="familyTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Horários dedicados à família</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="familyFeeling" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Sentimento com a família</FormLabel>
                     <FormControl>
                        <CustomSelect 
                          options={["Presente", "Culpa", "Falta de tempo"]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                 <FormField control={form.control} name="workType" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Tipo de Trabalho</FormLabel>
                     <FormControl>
                        <CustomSelect 
                          options={["Mental", "Físico", "Ambos"]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                 <FormField control={form.control} name="mealsPerDay" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Refeições/dia</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                 <FormField control={form.control} name="eatingDifficulty" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Maior dificuldade na dieta</FormLabel>
                     <FormControl>
                        <CustomSelect 
                         options={["Falta de tempo", "Falta de organização", "Falta de opções"]}
                         value={field.value}
                         onChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                  <FormField control={form.control} name="trainingFreq" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Frequência REAL de treino</FormLabel>
                    <FormControl><Input placeholder="Ex: 3x na semana" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="trainingTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Tempo disponível p/ treino</FormLabel>
                    <FormControl><Input placeholder="Ex: 45 min" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="trainingFeeling" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Treino hoje é...</FormLabel>
                     <FormControl>
                        <CustomSelect 
                         options={["Prazer", "Obrigação", "Culpa"]}
                         value={field.value}
                         onChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full bg-tx-red text-white hover:bg-red-700 font-bold text-lg" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : "Enviar Diagnóstico"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

