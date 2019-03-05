import * as os from 'os'
import * as path from 'path'
import * as hashToPort from 'hash-to-port'

/**
 * Create a socket address or port in a deterministic way for a given absolute directory path
 *
 * @param     {Object}    options           Function options
 * @param     {String}    options.root      Absolute path to the directory
 * @param     {String}    options.mode      Interface mode. Either `unix` or `ip`.
 * @return    {String}                      A full path to the socket
 */
function mkaddress({ root, mode = 'unix' }) {
  const name = path.basename(root)

  switch (mode) {
    case 'unix':
      return path.resolve(os.tmpdir(), `ide-mocha-${name}.sock`)
    case 'IP':
    case 'ip':
      return hashToPort(name)
    default:
      throw new Error(`Unknown address interface mode: ${mode}`)
  }
}

export {
  mkaddress,
}