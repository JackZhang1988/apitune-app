import { supabase } from './auth'
import { ApiRules } from '@shared/contract'

export const getUserRules = async () => {
  const user = await supabase.auth.getUser()
  if (!user || !user.data.user?.id) {
    throw new Error('User not authenticated')
  }
  const userId = user.data.user.id
  const { data, error } = await supabase.from('rules').select('*').eq('user_id', userId).single()
  if (error) {
    throw error
  }
  return data
}

export const syncRuleData = async (rule_data: ApiRules) => {
  // Step 1: Get the authenticated user
  const user = await supabase.auth.getUser()
  if (!user || !user.data.user?.id) {
    throw new Error('User not authenticated')
  }

  if (!rule_data || rule_data.length === 0) {
    throw new Error('No rule data provided')
  }

  const userId = user.data.user.id

  const { data: existingRules, error: existingRulesError } = await supabase
    .from('rules')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (existingRulesError && existingRulesError.code !== 'PGRST116') {
    // PGRST116 is the code for "No rows found"
    throw existingRulesError
  }

  let result
  const updated_at = new Date().toISOString()
  if (existingRules) {
    // Step 3a: Update the existing row
    const { data, error } = await supabase
      .from('rules')
      .update({ rule_data: rule_data as any, updated_at: updated_at })
      .eq('user_id', userId)

    if (error) {
      throw error
    }
    result = data
  } else {
    // Step 3b: Insert new data
    const { data, error } = await supabase.from('rules').insert([
      {
        rule_data: rule_data as any,
        user_id: userId,
        updated_at: updated_at
      }
    ])

    if (error) {
      throw error
    }
    result = data
  }

  return {
    updated_at: updated_at,
    data: result
  }
}
