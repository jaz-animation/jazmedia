import { db } from '@db/dashboard/db'
import { rest } from 'msw'

export const handlerDashboard = [
  rest.get('/api/dashboard/analytics/projects', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.analytics))
  }),
]
