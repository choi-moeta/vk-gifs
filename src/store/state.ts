export type State = {
  user: User | null;
  gifs: {
    items: Gif[];
    count: number;
    offset: number;
  } | null
  settings: {
    columnsCount: number,
    columnWidth: number;
    firstBatchCount: number;
    fetchCount: number,
  };
}

export type Gif = {
  photo: string,
  video: string,
  gif: string,
  ratio: number,
  title: string,
}

export type User = {
  id: number;
  accessToken: string;
  expiresIn: number;
}

export const state: State = {
  user: {
    id:          Number(localStorage.getItem('user.id')),
    accessToken:        localStorage.getItem('user.accessToken') || '',
    expiresIn:   Number(localStorage.getItem('user.expiresIn')),
  },
  gifs: {
    items: JSON.parse(localStorage.getItem('gifs.items')   || '[]'),
    count:     Number(localStorage.getItem('gifs.count'))  || 0,
    offset:    Number(localStorage.getItem('gifs.offset')) || 0,
  },
  settings: {
    columnsCount:    Number(localStorage.getItem('settings.columnsCount'))     || 5,
    columnWidth:     Number(localStorage.getItem('settings.columnWidth'))     || 300,
    firstBatchCount: Number(localStorage.getItem('settings.firstBatchCount')) || 16,
    fetchCount:      Number(localStorage.getItem('settings.fetchCount'))      || 32,
  },
}
