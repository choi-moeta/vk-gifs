export default {
  user: {
    id: 'user.id',
    accessToken: 'user.accessToken',
    expiresIn: 'user.expiresIn',
  },
  gifs: {
    items: 'gifs.items',
    count: 'gifs.count',
    offset: 'gifs.offset',
  },
  settings: {
    columnCount: 'settings.columnCount',
    columnMinWidth: 'settings.columnMinWidth',
    columnMaxWidth: 'settings.columnMaxWidth',
    firstFetchCount: 'settings.firstFetchCount',
    fetchCount: 'settings.fetchCount',
  },
} as const
