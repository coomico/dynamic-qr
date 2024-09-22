export interface Account {
  name: string,
  username: string,
  email: string
}

export interface Link {
  _id: string,
  title: string,
  shortUrl: string,
  originUrl: string,
  isPrivate: boolean,
  hasPassword: boolean,
  description?: string,
  visitCount: number,
  qrCode?: string,
  createdAt: string,
  updatedAt: string
}

export interface Notif {
  status: 'success' | 'error',
  title?: string,
  message: string
}