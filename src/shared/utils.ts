import { ApiRules, RuleData, RuleGroup } from './contract'

export function isURL(url: string): boolean {
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  const regex = new RegExp(expression)
  return regex.test(url)
}

export function findGroupOrRule(
  rules: ApiRules,
  id: string | undefined
): RuleData | RuleGroup | null {
  if (!id) {
    return null
  }
  for (const item of rules) {
    if (item.id === id) return item
    if ((item as RuleGroup).ruleList) {
      const rule = findGroupOrRule((item as RuleGroup).ruleList, id)
      if (rule) return rule
    }
  }
  return null
}

export function findParentGroup(rules: ApiRules, id: string): RuleGroup | null {
  for (const item of rules) {
    if ((item as RuleGroup).ruleList) {
      if ((item as RuleGroup).ruleList.some((rule) => rule.id === id)) {
        return item as RuleGroup
      }
      const group = findParentGroup((item as RuleGroup).ruleList, id)
      if (group) return group
    }
  }
  return null
}

export function IsJsonString(str: string) {
  try {
    const json = JSON.parse(str)
    return typeof json === 'object'
  } catch (e) {
    return false
  }
}
