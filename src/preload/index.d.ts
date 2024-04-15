import { ElectronAPI } from '@electron-toolkit/preload'
import { MainEvent, StorageDataParams, AddRuleResult } from 'src/shared/contract'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      onProxyLog: (callback) => void
      clearupMainEvent: (event: MainEvent) => void
      addRule: (ruleStr: string, storageKey?: string) => Promise<AddRuleResult>
    }
  }
}
