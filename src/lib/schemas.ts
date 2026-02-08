import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  profession: z.string().min(2, "Profissão é obrigatória"),
  routineType: z.string().min(1, "Tipo de rotina é obrigatório"),
  civilStatus: z.string().min(1, "Estado civil é obrigatório"),
  children: z.string().min(1, "Informação sobre filhos é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  mainGoal: z.string().min(1, "Objetivo principal é obrigatório"),
  whyNow: z.string().min(1, "Motivo é obrigatório"),
  wakeUpTime: z.string().min(1, "Horário de acordar é obrigatório"),
  sleepTime: z.string().min(1, "Horário de dormir é obrigatório"),
  workHours: z.string().min(1, "Horas de trabalho é obrigatório"),
  workType: z.string().min(1, "Tipo de trabalho é obrigatório"),
  energyPeak: z.string().min(1, "Pico de energia é obrigatório"),
  energyLow: z.string().min(1, "Baixa de energia é obrigatório"),
  energyDrain: z.string().min(1, "Dreno de energia é obrigatório"),
  familyTime: z.string().min(1, "Tempo com família é obrigatório"),
  familyFeeling: z.string().min(1, "Sentimento familiar é obrigatório"),
  mealsPerDay: z.string().min(1, "Refeições por dia é obrigatório"),
  mealsSkipped: z.string().optional(),
  eatingDifficulty: z.string().min(1, "Dificuldade alimentar é obrigatória"),
  trainingFreq: z.string().min(1, "Frequência de treino é obrigatória"),
  trainingTime: z.string().min(1, "Tempo de treino é obrigatório"),
  trainingFeeling: z.string().min(1, "Sentimento sobre treino é obrigatório"),
  mainObstacle: z.string().min(1, "Principal trava é obrigatória"),
  photoUrl: z.string().optional()
})

export type FormSchema = z.infer<typeof formSchema>
