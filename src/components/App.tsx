import { FC } from 'react'
import { SimpleExample } from './SimpleExample'
import { AsyncExample } from './AsyncExample'

export const App: FC = () => (
  <div className="flex gap-2">
    <SimpleExample />
    <AsyncExample />
  </div>
)
