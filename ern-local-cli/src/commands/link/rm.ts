import { epilog, tryCatchWrap } from '../../lib'
import { getCurrentDirectoryPackageName } from './utils'
import { packageLinksConfig, log } from 'ern-core'
import { Argv } from 'yargs'

export const command = 'rm [packageName]'
export const desc = 'Remove an existing package link'

export const builder = (argv: Argv) => {
  return argv
    .example(
      '$0 link rm',
      'Remove the link associated to the package present in current directory'
    )
    .example(
      '$0 link rm foo',
      `Remove the link associated to the 'foo' package`
    )
    .positional('packageName', {
      describe: 'Name of the package to remove link of',
      type: 'string',
    })
    .epilog(epilog(exports))
}

export const commandHandler = async ({
  packageName,
}: { packageName?: string } = {}) => {
  packageName = packageName || (await getCurrentDirectoryPackageName())

  if (!packageLinksConfig.has(packageName!)) {
    throw new Error(`No link exist for ${packageName} package.`)
  }

  packageLinksConfig.remove(packageName!)

  log.info(`Link to ${packageName} package successfuly removed.`)
}

export const handler = tryCatchWrap(commandHandler)
