'use client'
import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/_components/ui/dialog'
import { Input } from '@/app/_components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleIcon, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form'
import { NumericFormat } from 'react-number-format'
import { CreateProduct, createProductSchema } from '@/app/_actions/products/create-products/schema'
import { useState } from 'react'
import { createProduct } from '@/app/_actions/products/create-products'
import toast from 'react-hot-toast'

const AddProductButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const form = useForm<CreateProduct>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 1
    }
  })

  const onSubmit = async (data: CreateProduct) => {
    try {
      setTimeout(() => {}, 5000)
      await createProduct(data)
      setModalIsOpen(false)
      toast.success('Produto criado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar produto')
    }
  }
  return (
    <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Criar produto</DialogTitle>
              <DialogDescription>Insira as informações abaixo</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite o nome do produto' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator='.'
                      decimalSeparator=','
                      fixedDecimalScale
                      decimalScale={2}
                      prefix='R$'
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={values => field.onChange(values.floatValue)}
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Digite o estoque do produto' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='secondary' type='reset'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={form.formState.isSubmitting} className='flex gap-1.5'>
                Criar
                {form.formState.isSubmitting && <CircleIcon className='mr-2 h-4 w-4 animate-spin' />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductButton