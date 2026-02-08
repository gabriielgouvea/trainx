'use server'

import { prisma } from '@/lib/db'
import { formSchema, type FormSchema } from '@/lib/schemas'

export async function submitApplication(prevState: any, formData: FormData) {
  return { error: "Use submitApplicationJson instead" }
}

export async function submitApplicationJson(data: FormSchema) {
  const result = formSchema.safeParse(data)
  
  if (!result.success) {
    return { success: false, error: "Validation failed", issues: result.error.issues }
  }

  try {
    const { state, city, ...rest } = result.data
    
    await prisma.lead.create({
      data: {
        ...rest,
        location: state + ' - ' + city,
        mealsSkipped: rest.mealsSkipped || null,
        photoUrl: rest.photoUrl || null
      }
    })
    return { success: true }
  } catch (err: any) {
    console.error("Database error:", err)
    return { success: false, error: err.message || "Erro ao salvar no banco de dados" }
  }
}
