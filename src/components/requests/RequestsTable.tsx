import { type ColDef, type GridOptions } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { Prisma } from '@prisma/client'
import { m } from 'paraglide/messages.js'

import AgGridTheme from 'components/AgGrid/AgGridTheme'

const gridOptions: GridOptions = {
  ensureDomOrder: true,
  enableCellTextSelection: true
}

const colDefs: ColDef[] = [
  { field: 'id', headerName: m.requestID(), filter: true },
  { field: 'title', headerName: m.requests(), filter: true },
  { field: 'userID', headerName: m.userID(), filter: true },
  { field: 'state', headerName: m.state(), filter: true },
  { field: 'createdAt', headerName: m.createdAt() },
  { field: 'updatedAt', headerName: m.updatedAt() }
]

export default function RequestsTable(props: { initial: Prisma.requestsGetPayload<{}>[] }) {
  const { initial } = props

  return (
    <div className='w-full min-h-[500px] px-4 py-4'>
      <AgGridReact
        gridOptions={gridOptions}
        rowData={initial}
        columnDefs={colDefs}
        theme={AgGridTheme}
        autoSizeStrategy={{ type: 'fitCellContents' }}
      />
    </div>
  )
}
