export interface Header{
  name: string,
  text: string
}

interface Master{
  id: number,
  name: string
}

export interface Employee extends Master{
  age: number,
  address: string,
  salary: number,
  position: string,
  status: string,
}

export interface Product extends Master{
  shortName: string,
  code: string,
  importPrice: number,
  price: number,
  remaining: number,
  expDate: string,
  desc: string,
  color: string,
  unit: string,
}
