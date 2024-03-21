
require('module-alias/register')
import { utils } from "ethers"
import {
  db, merkleTreeRepository
} from '@model/index'

async function main() {
  await db.sync({ force: true })

  const users = [
    '0x5b4ff8c8e27f83a808465b5ee09610737b53abe9',
    '0x777add3378b999235cce77f71292dac1e8095ffc',
    '0x246785e9155ef62d5843fe7c56e449ce6a305024',
    '0x703896c94bbb2b134da12c41a31696bd9a19ff1a',
    '0x341b5d0d8be7070295476a6513d766046e00fe47'
  ]

  await merkleTreeRepository.bulkCreate(users.map(v => ({ address: utils.getAddress(v) })))
}

main()
.then(() => {
  console.log('done.')
  process.exit(0)
})
.catch(e => {
  console.log(e)
})