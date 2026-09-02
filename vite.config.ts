import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { existsSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProdBuild = mode === 'production'

  const clientsLocalPath = resolve(__dirname, './src/util/constants/clients.local.ts')
  const bankAccountsLocalPath = resolve(__dirname, './src/util/constants/bankAccounts.local.ts')
  const businessLocalPath = resolve(__dirname, './src/util/constants/business.local.ts')

  const alias: Array<{ find: string; replacement: string }> = []

  if (!isProdBuild) {
    if (existsSync(clientsLocalPath)) {
      alias.push({
        find: '@/util/constants/clients.public',
        replacement: clientsLocalPath
      })
    }

    if (existsSync(bankAccountsLocalPath)) {
      alias.push({
        find: '@/util/constants/bankAccounts.public',
        replacement: bankAccountsLocalPath
      })
    }

    if (existsSync(businessLocalPath)) {
      alias.push({
        find: '@/util/constants/business.public',
        replacement: businessLocalPath
      })
    }
  }

  alias.push({
    find: '@',
    replacement: resolve(__dirname, './src')
  })

  return {
    // GitHub Pages serves this app under /invoice-creator/
    base: '/invoice-creator/',
    plugins: react(),
    resolve: {
      alias
    }
  }
})
