require('module-alias/register')

import { StandardMerkleTree } from "@openzeppelin/merkle-tree"
import {
  merkleTreeRepository
} from '@model/index'

async function main() {
  const maxTreeId = await merkleTreeRepository.max('tree_id')
  const rows = await merkleTreeRepository.findAll({
    where: {
      tree_id: 0
    },
    order: [ [ 'id', 'ASC' ] ]
  })

  const cnt = rows.length
  const values = rows.map((v, index) => [ `${index}`, v.address ])
  const tree = StandardMerkleTree.of(values, ["uint256", "address"])
  const root = tree.root

  const treeId = Number(maxTreeId) + 1
  for (let i = 0; i < cnt; i++) {
    const row = rows[i]
    await row.update({
      treeId,
      index: i,
      root,
      proof: JSON.stringify(tree.getProof(i))
    })
  }
}

main()
.then(() => {
  console.log('done.')
  process.exit(0)
})
.catch(e => {
  console.log(e)
})