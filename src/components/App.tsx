import { FC } from 'react'
import { SimpleExample } from './SimpleExample'
import { AsyncExample } from './AsyncExample'
import { SWRExample } from './SWRExample'

export const App: FC = () => (
  <div className="flex gap-12">
    <SimpleExample />
    <AsyncExample />
    <SWRExample />
  </div>
)
