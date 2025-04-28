import {Product, Employee} from "./common.ts";

export interface BaseDialogProp {
  title: string,
  isOpen: boolean,
  onClose: () => void
}

export interface DialogProp extends BaseDialogProp{
  onConfirm: () => void,
  children?: any
}

export interface ProductDialogProp extends BaseDialogProp {
  isNew: boolean,
  onSave: (product: Product, isNew: boolean) => void,
  dialogProduct?: Product
}

export interface EmployeeDialogProp extends BaseDialogProp {
  isNew: boolean,
  onSave: (employee: Employee, isNew: boolean) => void,
  dialogEmployee?: Employee
}