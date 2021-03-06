import { epilog, tryCatchWrap } from '../../lib'
import { getCurrentDirectoryPackageName } from './utils'
import { packageLinksConfig, log } from 'ern-core'
import { Argv } from 'yargs'

export const command = 'add'
export const desc = 'Link a package to its local directory'

export const builder = (argv: Argv) => {
  return argv.epilog(epilog(exports))
}
export const commandHandler = async () => {
  const packageName = await getCurrentDirectoryPackageName()

  if (packageLinksConfig.has(packageName)) {
    throw new Error(`A link already exist for ${packageName} package.
[${packageName} => ${packageLinksConfig.get(packageName).localPath}].
The 'ern link update' command can be used to update an existing link.`)
  }

  packageLinksConfig.add(packageName, process.cwd())

  log.info(`Link to ${packageName} successfuly added.
[${packageName} => ${process.cwd()}].`)
}

export const handler = tryCatchWrap(commandHandler)
