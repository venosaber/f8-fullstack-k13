export interface Header{
  name: string,
  text: string
}

interface Master{
  id: string,
  name: string
}

export interface Employee extends Master{
  age: number,
  address: string,
  salary: number,
  position: string,
  status: string
}

export interface Product extends Master{
  shortName: string,
  code: string,
  expectedPrice: number,
  description: string,
  color: string | number
}

export interface Color extends Master{}